import datetime
import os
import secrets
import sqlite3
from urllib.parse import urlencode

import requests as http_requests
import stripe
from dotenv import load_dotenv
from flask import Flask, abort, jsonify, redirect, request, send_from_directory, session
from google.auth.transport import requests as google_requests
from google.oauth2 import id_token
from werkzeug.security import check_password_hash, generate_password_hash

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load .env from this script's own directory, not the process's current
# working directory — load_dotenv() with no path searches upward from cwd,
# which breaks when this server is launched from elsewhere (e.g. a shared
# .claude/launch.json whose cwd is a sibling project folder).
load_dotenv(os.path.join(BASE_DIR, '.env'))

def _env(name, default=None):
    value = os.environ.get(name)
    if value is None:
        return default
    return value.strip()


def _env_secret(name, default=None):
    # Copy-pasting credentials into a dashboard (Render, etc.) from a
    # rendered chat table or similar can silently introduce a non-breaking
    # space or other invisible character ANYWHERE in the value, not just
    # the edges — plain .strip() only catches leading/trailing whitespace.
    # These values end up in HTTP headers (e.g. Stripe's Authorization:
    # Bearer <key>), where any non-ASCII byte causes an unhelpful
    # UnicodeEncodeError deep in the HTTP client rather than a clear
    # "bad credential" error. None of these are ever legitimately
    # non-ASCII, so drop any stray byte outside plain ASCII wherever it is.
    value = os.environ.get(name)
    if value is None:
        return default
    return value.encode('ascii', 'ignore').decode('ascii').strip()


GOOGLE_CLIENT_ID = _env_secret('GOOGLE_CLIENT_ID')
GOOGLE_CLIENT_SECRET = _env_secret('GOOGLE_CLIENT_SECRET')
GOOGLE_REDIRECT_URI = _env('GOOGLE_REDIRECT_URI', 'http://localhost:5050/api/auth/google/callback')

FACEBOOK_APP_ID = _env_secret('FACEBOOK_APP_ID')
FACEBOOK_APP_SECRET = _env_secret('FACEBOOK_APP_SECRET')
FACEBOOK_REDIRECT_URI = _env('FACEBOOK_REDIRECT_URI', 'http://localhost:5050/api/auth/facebook/callback')

FRONTEND_URL = _env('FRONTEND_URL', 'http://localhost:5050/')
SECRET_KEY = _env_secret('SECRET_KEY') or secrets.token_hex(32)

STRIPE_SECRET_KEY = _env_secret('STRIPE_SECRET_KEY')
STRIPE_PUBLISHABLE_KEY = _env_secret('STRIPE_PUBLISHABLE_KEY')
STRIPE_PRICE_ID = _env_secret('STRIPE_PRICE_ID')
STRIPE_WEBHOOK_SECRET = _env_secret('STRIPE_WEBHOOK_SECRET')
if STRIPE_SECRET_KEY:
    stripe.api_key = STRIPE_SECRET_KEY

# DATABASE_PATH lets a host point this at a persistent volume
# (e.g. Render/Railway disks aren't at the app's code path by default).
DB_PATH = os.environ.get('DATABASE_PATH') or os.path.join(BASE_DIR, 'data.db')

app = Flask(__name__, static_folder=BASE_DIR, static_url_path='')
app.secret_key = SECRET_KEY
app.config.update(
    SESSION_COOKIE_SAMESITE='Lax',
    SESSION_COOKIE_HTTPONLY=True,
    # Browsers refuse to send Secure cookies over plain http://localhost, so
    # only require HTTPS-only cookies once FRONTEND_URL is actually https.
    SESSION_COOKIE_SECURE=FRONTEND_URL.startswith('https://'),
    # Without this, Flask issues a session-only cookie (no Expires/Max-Age),
    # which most browsers wipe on full browser close — forcing a re-login
    # every time. session.permanent = True (set at each login below) makes
    # the cookie live for this long instead, so signing in once keeps you
    # signed in across visits.
    PERMANENT_SESSION_LIFETIME=datetime.timedelta(days=90),
)


def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute('PRAGMA foreign_keys = ON')
    return conn


def init_db():
    conn = get_db()
    conn.executescript('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT,
            provider TEXT NOT NULL,
            google_sub TEXT,
            created_at TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS challenge_days (
            user_id INTEGER NOT NULL REFERENCES users(id),
            date_key TEXT NOT NULL,
            challenge_index INTEGER NOT NULL,
            title TEXT NOT NULL,
            failed INTEGER NOT NULL,
            PRIMARY KEY (user_id, date_key)
        );
        CREATE TABLE IF NOT EXISTS daily_state (
            user_id INTEGER NOT NULL REFERENCES users(id),
            date_key TEXT NOT NULL,
            reroll_used INTEGER NOT NULL DEFAULT 0,
            PRIMARY KEY (user_id, date_key)
        );
    ''')

    existing_cols = {row['name'] for row in conn.execute('PRAGMA table_info(users)').fetchall()}
    added_cols = {
        'subscription_status': "TEXT NOT NULL DEFAULT 'free'",
        'stripe_customer_id': 'TEXT',
        'stripe_subscription_id': 'TEXT',
        'facebook_sub': 'TEXT',
    }
    for col, decl in added_cols.items():
        if col not in existing_cols:
            conn.execute(f'ALTER TABLE users ADD COLUMN {col} {decl}')

    conn.commit()
    conn.close()


init_db()

PREMIUM_STATUSES = {'active', 'trialing'}

# Accounts here skip the daily spin lock and the once-a-day reroll limit
# entirely (and get ad-free rerolls, same as a paying subscriber) — a
# manual allowlist rather than a real "admin" system since it's just for
# testing the app extensively without fighting the daily gates.
UNLIMITED_SPIN_EMAILS = {'jamesspporter@gmail.com', 'jh767837@yahoo.com.au'}


def user_json(row):
    return {
        'name': row['name'],
        'email': row['email'],
        'provider': row['provider'],
        'isPremium': row['subscription_status'] in PREMIUM_STATUSES,
        'subscriptionStatus': row['subscription_status'],
        'unlimitedSpins': row['email'] in UNLIMITED_SPIN_EMAILS,
    }


def current_user_row():
    uid = session.get('user_id')
    if not uid:
        return None
    conn = get_db()
    row = conn.execute('SELECT * FROM users WHERE id = ?', (uid,)).fetchone()
    conn.close()
    return row


def require_user_row():
    row = current_user_row()
    if not row:
        abort(401)
    return row


# ---------------- apex -> www redirect ----------------
#
# The apex domain (uncomfortablecalendar.com, no www) currently reaches this
# app only if DNS points it here directly — historically it went through
# GoDaddy's domain forwarding instead, which only forwards the bare "/" and
# 404s on every other path (including /ads.txt, which is why Google AdSense
# couldn't verify it against the apex domain). Once DNS points the apex at
# Render too, this makes every path redirect to the canonical www host with
# the path preserved — ads.txt crawlers (and browsers) follow the redirect
# and land on the real file instead of a dead end.
APEX_HOST = 'uncomfortablecalendar.com'
CANONICAL_HOST = 'www.uncomfortablecalendar.com'


@app.before_request
def redirect_apex_to_www():
    if request.host == APEX_HOST:
        target = f'https://{CANONICAL_HOST}{request.path}'
        if request.query_string:
            target += '?' + request.query_string.decode('utf-8')
        return redirect(target, code=301)


# ---------------- static frontend ----------------

@app.route('/')
def index():
    return send_from_directory(BASE_DIR, 'index.html')


@app.route('/healthz')
def healthz():
    return jsonify({'ok': True})


# ---------------- session ----------------

@app.route('/api/session')
def api_session():
    row = current_user_row()
    return jsonify({'user': user_json(row) if row else None})


# ---------------- email / password auth ----------------

@app.route('/api/auth/signup', methods=['POST'])
def api_signup():
    data = request.get_json(force=True, silent=True) or {}
    name = (data.get('name') or '').strip()
    email = (data.get('email') or '').strip().lower()
    password = data.get('password') or ''

    if not name:
        return jsonify({'error': 'Enter your name.'}), 400
    if '@' not in email or '.' not in email.split('@')[-1]:
        return jsonify({'error': 'Enter a valid email address.'}), 400
    if len(password) < 4:
        return jsonify({'error': 'Password must be at least 4 characters.'}), 400

    conn = get_db()
    if conn.execute('SELECT id FROM users WHERE email = ?', (email,)).fetchone():
        conn.close()
        return jsonify({'error': 'An account with that email already exists — try signing in instead.'}), 409

    cur = conn.execute(
        'INSERT INTO users (name, email, password_hash, provider, created_at) VALUES (?, ?, ?, ?, ?)',
        (name, email, generate_password_hash(password, method='pbkdf2:sha256'), 'password', datetime.datetime.utcnow().isoformat()),
    )
    conn.commit()
    uid = cur.lastrowid
    conn.close()

    session.clear()
    session['user_id'] = uid
    session.permanent = True
    return jsonify({'user': {'name': name, 'email': email, 'provider': 'password'}})


@app.route('/api/auth/signin', methods=['POST'])
def api_signin():
    data = request.get_json(force=True, silent=True) or {}
    email = (data.get('email') or '').strip().lower()
    password = data.get('password') or ''

    conn = get_db()
    row = conn.execute('SELECT * FROM users WHERE email = ?', (email,)).fetchone()
    conn.close()

    if not row:
        return jsonify({'error': 'No account found for that email — try signing up.'}), 404
    if row['provider'] != 'password':
        label = row['provider'].capitalize()
        return jsonify({'error': f'This account uses {label} sign-in — continue with {label} above.'}), 400
    if not check_password_hash(row['password_hash'], password):
        return jsonify({'error': 'Incorrect password.'}), 401

    session.clear()
    session['user_id'] = row['id']
    session.permanent = True
    return jsonify({'user': user_json(row)})


@app.route('/api/auth/signout', methods=['POST'])
def api_signout():
    session.clear()
    return jsonify({'ok': True})


def _auth_error_redirect(code, provider):
    return redirect(FRONTEND_URL + '?' + urlencode({'auth_error': code, 'auth_provider': provider}))


# ---------------- Google OAuth ----------------

@app.route('/api/auth/google/start')
def google_start():
    if not GOOGLE_CLIENT_ID or not GOOGLE_CLIENT_SECRET:
        return (
            'Google OAuth is not configured on the server. '
            'Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env and restart the server.',
            500,
        )
    state = secrets.token_urlsafe(24)
    session['oauth_state'] = state
    params = {
        'client_id': GOOGLE_CLIENT_ID,
        'redirect_uri': GOOGLE_REDIRECT_URI,
        'response_type': 'code',
        'scope': 'openid email profile',
        'state': state,
        'prompt': 'select_account',
    }
    return redirect('https://accounts.google.com/o/oauth2/v2/auth?' + urlencode(params))


@app.route('/api/auth/google/callback')
def google_callback():
    error = request.args.get('error')
    if error:
        return _auth_error_redirect(error, 'google')

    state = request.args.get('state')
    expected_state = session.pop('oauth_state', None)
    if not state or state != expected_state:
        return _auth_error_redirect('state_mismatch', 'google')

    code = request.args.get('code')
    if not code:
        return _auth_error_redirect('missing_code', 'google')

    token_resp = http_requests.post('https://oauth2.googleapis.com/token', data={
        'code': code,
        'client_id': GOOGLE_CLIENT_ID,
        'client_secret': GOOGLE_CLIENT_SECRET,
        'redirect_uri': GOOGLE_REDIRECT_URI,
        'grant_type': 'authorization_code',
    }, timeout=10)

    if token_resp.status_code != 200:
        return _auth_error_redirect('token_exchange_failed', 'google')

    tokens = token_resp.json()
    try:
        idinfo = id_token.verify_oauth2_token(
            tokens['id_token'], google_requests.Request(), GOOGLE_CLIENT_ID
        )
    except Exception:
        return _auth_error_redirect('invalid_token', 'google')

    google_sub = idinfo['sub']
    email = (idinfo.get('email') or '').lower()
    name = idinfo.get('name') or (email.split('@')[0] if email else 'there')

    if not email:
        return _auth_error_redirect('no_email', 'google')

    conn = get_db()
    row = conn.execute(
        'SELECT * FROM users WHERE google_sub = ? OR email = ?', (google_sub, email)
    ).fetchone()

    if row:
        conn.execute(
            'UPDATE users SET google_sub = ?, provider = ? WHERE id = ?',
            (google_sub, 'google', row['id']),
        )
        uid = row['id']
    else:
        cur = conn.execute(
            'INSERT INTO users (name, email, password_hash, provider, google_sub, created_at) '
            'VALUES (?, ?, NULL, ?, ?, ?)',
            (name, email, 'google', google_sub, datetime.datetime.utcnow().isoformat()),
        )
        uid = cur.lastrowid

    conn.commit()
    conn.close()

    session.clear()
    session['user_id'] = uid
    session.permanent = True
    return redirect(FRONTEND_URL)


# ---------------- Facebook OAuth ----------------

@app.route('/api/auth/facebook/start')
def facebook_start():
    if not FACEBOOK_APP_ID or not FACEBOOK_APP_SECRET:
        return (
            'Facebook OAuth is not configured on the server. '
            'Set FACEBOOK_APP_ID and FACEBOOK_APP_SECRET in .env and restart the server.',
            500,
        )
    state = secrets.token_urlsafe(24)
    session['oauth_state'] = state
    params = {
        'client_id': FACEBOOK_APP_ID,
        'redirect_uri': FACEBOOK_REDIRECT_URI,
        'response_type': 'code',
        'scope': 'email',
        'state': state,
    }
    return redirect('https://www.facebook.com/v21.0/dialog/oauth?' + urlencode(params))


@app.route('/api/auth/facebook/callback')
def facebook_callback():
    error = request.args.get('error')
    if error:
        return _auth_error_redirect(error, 'facebook')

    state = request.args.get('state')
    expected_state = session.pop('oauth_state', None)
    if not state or state != expected_state:
        return _auth_error_redirect('state_mismatch', 'facebook')

    code = request.args.get('code')
    if not code:
        return _auth_error_redirect('missing_code', 'facebook')

    token_resp = http_requests.get('https://graph.facebook.com/v21.0/oauth/access_token', params={
        'client_id': FACEBOOK_APP_ID,
        'client_secret': FACEBOOK_APP_SECRET,
        'redirect_uri': FACEBOOK_REDIRECT_URI,
        'code': code,
    }, timeout=10)

    access_token = token_resp.json().get('access_token') if token_resp.status_code == 200 else None
    if not access_token:
        return _auth_error_redirect('token_exchange_failed', 'facebook')

    profile_resp = http_requests.get('https://graph.facebook.com/v21.0/me', params={
        'fields': 'id,name,email',
        'access_token': access_token,
    }, timeout=10)

    if profile_resp.status_code != 200:
        return _auth_error_redirect('invalid_token', 'facebook')

    profile = profile_resp.json()
    facebook_sub = profile.get('id')
    email = (profile.get('email') or '').lower()
    name = profile.get('name') or (email.split('@')[0] if email else 'there')

    if not email:
        return _auth_error_redirect('no_email', 'facebook')

    conn = get_db()
    row = conn.execute(
        'SELECT * FROM users WHERE facebook_sub = ? OR email = ?', (facebook_sub, email)
    ).fetchone()

    if row:
        conn.execute(
            'UPDATE users SET facebook_sub = ?, provider = ? WHERE id = ?',
            (facebook_sub, 'facebook', row['id']),
        )
        uid = row['id']
    else:
        cur = conn.execute(
            'INSERT INTO users (name, email, password_hash, provider, facebook_sub, created_at) '
            'VALUES (?, ?, NULL, ?, ?, ?)',
            (name, email, 'facebook', facebook_sub, datetime.datetime.utcnow().isoformat()),
        )
        uid = cur.lastrowid

    conn.commit()
    conn.close()

    session.clear()
    session['user_id'] = uid
    session.permanent = True
    return redirect(FRONTEND_URL)


# ---------------- billing (Stripe) ----------------
#
# Stripe webhooks require a public HTTPS URL — they can never reach a plain
# `localhost` dev server. So the primary way a subscription gets activated
# here is /api/billing/confirm, called by the frontend the moment it lands
# back on success_url with a session_id. The webhook handler below is kept
# for correctness once this app is deployed somewhere with a real domain
# (renewals, cancellations, and failed payments arrive as webhooks, not as
# a browser redirect).

def _update_subscription_by_customer(customer_id, status, subscription_id):
    if not customer_id:
        return
    conn = get_db()
    conn.execute(
        'UPDATE users SET subscription_status = ?, stripe_subscription_id = ? WHERE stripe_customer_id = ?',
        (status, subscription_id, customer_id),
    )
    conn.commit()
    conn.close()


@app.route('/api/billing/create-checkout-session', methods=['POST'])
def billing_create_checkout_session():
    user = require_user_row()
    if not STRIPE_SECRET_KEY or not STRIPE_PRICE_ID:
        return jsonify({'error': 'Billing is not configured on the server yet.'}), 500

    try:
        customer_id = user['stripe_customer_id']
        if not customer_id:
            customer = stripe.Customer.create(email=user['email'], name=user['name'])
            customer_id = customer.id
            conn = get_db()
            conn.execute('UPDATE users SET stripe_customer_id = ? WHERE id = ?', (customer_id, user['id']))
            conn.commit()
            conn.close()

        checkout_session = stripe.checkout.Session.create(
            mode='subscription',
            customer=customer_id,
            client_reference_id=str(user['id']),
            line_items=[{'price': STRIPE_PRICE_ID, 'quantity': 1}],
            success_url=FRONTEND_URL + '?checkout=success&session_id={CHECKOUT_SESSION_ID}',
            cancel_url=FRONTEND_URL + '?checkout=cancel',
        )
    except stripe.error.StripeError as e:
        return jsonify({'error': str(e.user_message or e)}), 400
    except Exception:
        return jsonify({'error': 'Could not start checkout — please try again in a moment.'}), 500

    return jsonify({'url': checkout_session.url})


@app.route('/api/billing/confirm')
def billing_confirm():
    user = require_user_row()
    session_id = request.args.get('session_id')
    if not session_id:
        return jsonify({'error': 'Missing session_id.'}), 400
    if not STRIPE_SECRET_KEY:
        return jsonify({'error': 'Billing is not configured on the server yet.'}), 500

    try:
        checkout_session = stripe.checkout.Session.retrieve(session_id)
    except stripe.error.StripeError:
        return jsonify({'error': 'Could not verify that checkout session.'}), 400

    if checkout_session.client_reference_id != str(user['id']):
        return jsonify({'error': 'That checkout session does not belong to this account.'}), 403

    if checkout_session.status != 'complete':
        return jsonify({'error': 'That checkout has not completed yet.'}), 400

    subscription_id = checkout_session.subscription
    status = 'active'
    if subscription_id:
        subscription = stripe.Subscription.retrieve(subscription_id)
        status = subscription.status

    conn = get_db()
    conn.execute(
        'UPDATE users SET subscription_status = ?, stripe_subscription_id = ?, stripe_customer_id = ? WHERE id = ?',
        (status, subscription_id, checkout_session.customer, user['id']),
    )
    conn.commit()
    row = conn.execute('SELECT * FROM users WHERE id = ?', (user['id'],)).fetchone()
    conn.close()

    return jsonify({'user': user_json(row)})


@app.route('/api/billing/portal', methods=['POST'])
def billing_portal():
    user = require_user_row()
    if not STRIPE_SECRET_KEY:
        return jsonify({'error': 'Billing is not configured on the server yet.'}), 500
    if not user['stripe_customer_id']:
        return jsonify({'error': 'No billing account found for this user yet.'}), 400

    try:
        portal_session = stripe.billing_portal.Session.create(
            customer=user['stripe_customer_id'],
            return_url=FRONTEND_URL,
        )
    except stripe.error.StripeError as e:
        return jsonify({'error': str(e.user_message or e)}), 400

    return jsonify({'url': portal_session.url})


@app.route('/api/billing/webhook', methods=['POST'])
def billing_webhook():
    if not STRIPE_WEBHOOK_SECRET:
        return jsonify({'error': 'Webhook not configured.'}), 500

    payload = request.data
    sig_header = request.headers.get('Stripe-Signature', '')
    try:
        event = stripe.Webhook.construct_event(payload, sig_header, STRIPE_WEBHOOK_SECRET)
    except (ValueError, stripe.error.SignatureVerificationError):
        return jsonify({'error': 'Invalid webhook signature.'}), 400

    event_type = event['type']
    obj = event['data']['object']

    if event_type == 'checkout.session.completed':
        customer_id = obj.get('customer')
        subscription_id = obj.get('subscription')
        status = 'active'
        if subscription_id:
            subscription = stripe.Subscription.retrieve(subscription_id)
            status = subscription.status
        _update_subscription_by_customer(customer_id, status, subscription_id)

    elif event_type == 'customer.subscription.updated':
        _update_subscription_by_customer(obj.get('customer'), obj.get('status'), obj.get('id'))

    elif event_type == 'customer.subscription.deleted':
        _update_subscription_by_customer(obj.get('customer'), 'canceled', obj.get('id'))

    return jsonify({'received': True})


# ---------------- per-user challenge history ----------------

@app.route('/api/history')
def api_history():
    user = require_user_row()
    conn = get_db()
    rows = conn.execute(
        'SELECT * FROM challenge_days WHERE user_id = ?', (user['id'],)
    ).fetchall()
    history = {
        r['date_key']: {'index': r['challenge_index'], 'title': r['title'], 'failed': bool(r['failed'])}
        for r in rows
    }
    # Return every date's reroll flag (like `history` above) rather than
    # resolving "today" server-side — the server's clock (UTC on most hosts)
    # doesn't match the visitor's timezone, so "today" must be decided by
    # the client, which already does this correctly for `history` itself.
    reroll_rows = conn.execute(
        'SELECT date_key, reroll_used FROM daily_state WHERE user_id = ?', (user['id'],)
    ).fetchall()
    reroll_by_date = {r['date_key']: bool(r['reroll_used']) for r in reroll_rows}
    conn.close()
    return jsonify({
        'history': history,
        'rerollByDate': reroll_by_date,
    })


@app.route('/api/history/day', methods=['POST'])
def api_history_day():
    user = require_user_row()
    data = request.get_json(force=True, silent=True) or {}
    date_key = data.get('dateKey')
    index = data.get('index')
    title = data.get('title')
    failed = bool(data.get('failed'))

    if not date_key or index is None or not title:
        return jsonify({'error': 'Missing fields.'}), 400

    conn = get_db()
    conn.execute(
        'INSERT INTO challenge_days (user_id, date_key, challenge_index, title, failed) '
        'VALUES (?, ?, ?, ?, ?) '
        'ON CONFLICT(user_id, date_key) DO UPDATE SET '
        'challenge_index = excluded.challenge_index, title = excluded.title, failed = excluded.failed',
        (user['id'], date_key, index, title, int(failed)),
    )
    conn.commit()
    conn.close()
    return jsonify({'ok': True})


@app.route('/api/history/reroll', methods=['POST'])
def api_reroll():
    user = require_user_row()
    data = request.get_json(force=True, silent=True) or {}
    date_key = data.get('dateKey')
    if not date_key:
        return jsonify({'error': 'Missing dateKey.'}), 400

    conn = get_db()
    conn.execute(
        'INSERT INTO daily_state (user_id, date_key, reroll_used) VALUES (?, ?, 1) '
        'ON CONFLICT(user_id, date_key) DO UPDATE SET reroll_used = 1',
        (user['id'], date_key),
    )
    conn.commit()
    conn.close()
    return jsonify({'ok': True})


@app.errorhandler(401)
def unauthorized(_e):
    return jsonify({'error': 'Not signed in.'}), 401


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5050))
    host = os.environ.get('HOST', '127.0.0.1')
    debug = os.environ.get('FLASK_DEBUG', '0') == '1'
    app.run(host=host, port=port, debug=debug)
