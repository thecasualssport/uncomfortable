(() => {
  'use strict';

  const CHALLENGE_POOL = [
    { id: 'compliment', title: 'Compliment a Stranger', wheelLabel: 'Compliment', description: 'Give a genuine, specific compliment to a stranger about something they’re wearing or doing.' },
    { id: 'ask-discount', title: 'Ask For a Discount', wheelLabel: 'Ask Discount', description: 'Ask for a discount or a better deal at a store or café, out loud, no matter the reaction.' },
    { id: 'eye-contact', title: 'Hold Eye Contact', wheelLabel: 'Eye Contact', description: 'Hold eye contact with 5 strangers today until they look away first.' },
    { id: 'new-chat', title: 'Start a Conversation', wheelLabel: 'New Chat', description: 'Strike up a real conversation with someone you don’t know.' },
    { id: 'ask-favor', title: 'Ask a Small Favor', wheelLabel: 'Ask Favor', description: 'Ask a stranger for something small — the time, directions, a dollar — expecting to be told no.' },
    { id: 'sit-strangers', title: 'Sit With Strangers', wheelLabel: 'Sit Together', description: 'Ask to join a group of strangers at a table or bench.' },
    { id: 'vulnerable-truth', title: 'Share a Vulnerable Truth', wheelLabel: 'Open Up', description: 'Tell someone close to you an insecurity you’ve never shared before.' },
    { id: 'apologize', title: 'Apologize', wheelLabel: 'Apologize', description: 'Apologize to someone you wronged, even if it happened a long time ago.' },
    { id: 'cold-plunge', title: 'Cold Plunge', wheelLabel: 'Cold Plunge', description: 'Take a 2-minute cold shower or ice-water plunge. Breathe through it.' },
    { id: 'barefoot-walk', title: 'Barefoot Walk', wheelLabel: 'Go Barefoot', description: 'Walk barefoot on grass, dirt, or gravel for 30 minutes.' },
    { id: 'day-fast', title: '24-Hour Fast', wheelLabel: '24hr Fast', description: 'Fast from food for 24 hours — water, black coffee, and tea only.' },
    { id: 'floor-sleep', title: 'Sleep on the Floor', wheelLabel: 'Floor Sleep', description: 'Sleep on the hard floor with no mattress or pillow tonight.' },
    { id: 'sauna-sit', title: 'Sauna Sit', wheelLabel: 'Sauna Sit', description: 'Sit in a hot sauna or hot room for 20 minutes with no distractions.' },
    { id: 'plank-hold', title: 'Plank Hold', wheelLabel: 'Plank Hold', description: 'Hold a plank for a cumulative 5 minutes today, in as few sets as possible.' },
    { id: 'stair-sprint', title: 'Stair Sprint', wheelLabel: 'Stair Sprint', description: 'Run up and down the tallest public stairs you can find, 10 times.' },
    { id: 'rain-walk', title: 'Walk in the Rain', wheelLabel: 'Rain Walk', description: 'Walk or run 5km in the rain with no umbrella.' },
    { id: 'social-blackout', title: 'Social Media Blackout', wheelLabel: 'App Blackout', description: 'Delete every social app from your phone for 48 hours.' },
    { id: 'phone-free-morning', title: 'Phone-Free Morning', wheelLabel: 'No Phone AM', description: 'Don’t touch your phone for the first hour after waking up.' },
    { id: 'silent-commute', title: 'Silent Commute', wheelLabel: 'Silent Ride', description: 'Ride or drive your commute in total silence — no music, no podcast.' },
    { id: 'screen-free-evening', title: 'Screen-Free Evening', wheelLabel: 'No Screens', description: 'Spend tonight after 7pm with zero screens of any kind.' },
    { id: 'grayscale-week', title: 'Grayscale Phone', wheelLabel: 'Grayscale', description: 'Switch your phone to grayscale mode for the rest of the day.' },
    { id: 'write-flaws', title: 'Write Your Flaws', wheelLabel: 'List Flaws', description: 'Write down your 5 biggest flaws and read them out loud to yourself.' },
    { id: 'change-mind', title: 'Argue the Other Side', wheelLabel: 'Flip Views', description: 'Research a view you disagree with for an hour, then argue for it.' },
    { id: 'say-i-dont-know', title: 'Say "I Don’t Know"', wheelLabel: 'Admit Unsure', description: 'The next time you’re pressured to sound certain, say “I don’t know” instead.' },
    { id: 'own-mistake', title: 'Own a Mistake', wheelLabel: 'Own Mistake', description: 'Admit a mistake to your boss or a client before they discover it.' },
    { id: 'sit-discomfort', title: 'Sit With Discomfort', wheelLabel: 'Sit With It', description: 'Sit with an uncomfortable emotion for 20 minutes without trying to fix it.' },
    { id: 'publish-raw', title: 'Publish Something Raw', wheelLabel: 'Go Public', description: 'Write something honest and post it publicly under your real name.' },
    { id: 'cold-pitch', title: 'Cold Pitch Someone', wheelLabel: 'Cold Pitch', description: 'Cold-email or cold-call someone you admire and ask for 10 minutes of their time.' },
    { id: 'harsh-feedback', title: 'Ask for Harsh Feedback', wheelLabel: 'Ask Feedback', description: 'Share unfinished work and ask someone for brutally honest feedback.' },
    { id: 'ask-raise', title: 'Ask for a Raise', wheelLabel: 'Ask Raise', description: 'Ask your manager for a raise or promotion, with your reasons ready.' },
    { id: 'quit-something', title: 'Quit Something', wheelLabel: 'Quit It', description: 'End a commitment or project that no longer serves you.' },
    { id: 'no-sugar', title: 'No Sugar Day', wheelLabel: 'No Sugar', description: 'Cut all added sugar for the day — read every label.' },
    { id: 'eat-alone', title: 'Eat Alone, No Phone', wheelLabel: 'Eat Alone', description: 'Sit through a full meal by yourself at a restaurant with your phone put away.' },
    { id: 'non-dominant-hand', title: 'Non-Dominant Hand Meal', wheelLabel: 'Wrong Hand', description: 'Eat an entire meal using only your non-dominant hand.' },
    { id: 'cook-new', title: 'Cook Something New', wheelLabel: 'New Recipe', description: 'Cook a recipe you’ve never attempted, from ingredients you rarely buy.' },
    { id: 'no-spend', title: 'No-Spend Day', wheelLabel: 'No Spend', description: 'Spend $0 today using only what you already have.' },
    { id: 'map-free', title: 'Map-Free Navigation', wheelLabel: 'No GPS', description: 'Get somewhere new today without using GPS or maps.' },
    { id: 'fix-it-yourself', title: 'Fix It Yourself', wheelLabel: 'Fix It', description: 'Learn to fix one broken thing in your home instead of paying someone.' },
    { id: 'sing-out', title: 'Sing in Public', wheelLabel: 'Sing Out', description: 'Sing or hum out loud somewhere public for 30 seconds.' },
    { id: 'dance-public', title: 'Dance in Public', wheelLabel: 'Dance', description: 'Dance without music in public for 30 seconds.' },
    { id: 'say-hello', title: 'Say Hello to Everyone', wheelLabel: 'Say Hello', description: 'Say hello to every person you pass on a 10-minute walk.' },
    { id: 'public-speech', title: 'Impromptu Speech', wheelLabel: 'Speak Up', description: 'Give a 60-second impromptu speech to whoever will listen.' },
  ];

  const DAY_MS = 86400000;

  function providerLabel(p) {
    return { google: 'Google', facebook: 'Facebook', apple: 'Apple', x: 'X', password: 'Email' }[p] || p;
  }

  function firstNameOf(user) {
    if (!user || !user.name) return 'there';
    return user.name.trim().split(/\s+/)[0];
  }

  function initialsOf(user) {
    if (!user || !user.name) return '?';
    const parts = user.name.trim().split(/\s+/);
    const first = parts[0] ? parts[0][0] : '';
    const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
    return (first + last).toUpperCase();
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function dateKey(d) {
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  function hashStr(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }

  function mulberry32(seed) {
    return function () {
      seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function dailyChallenges(key) {
    const rng = mulberry32(hashStr(key));
    const pool = CHALLENGE_POOL.slice();
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool.slice(0, 8);
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  // ---------------- calendar export (.ics) ----------------
  //
  // Generates a standard iCalendar file with a reminder alarm, which any
  // calendar app (Apple Calendar, Google Calendar, Outlook, etc.) can
  // import — the reminder then surfaces as a real OS notification,
  // including the lock screen, via that calendar app's own alert system.
  // This works everywhere without needing extra OAuth scopes or a
  // provider-specific integration.

  function icsEscape(str) {
    return String(str)
      .replace(/\\/g, '\\\\')
      .replace(/;/g, '\\;')
      .replace(/,/g, '\\,')
      .replace(/\n/g, '\\n');
  }

  function formatIcsUtc(date) {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  }

  function buildIcsContent(challenge) {
    const now = new Date();
    const start = new Date(now.getTime() + 2 * 60 * 60 * 1000); // remind in 2 hours
    const end = new Date(start.getTime() + 30 * 60 * 1000);
    const uid = 'uncomfortable-' + now.getTime() + '-' + Math.random().toString(36).slice(2) + '@uncomfortablecalendar.com';

    const lines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Uncomfortable Calendar//EN',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      'UID:' + uid,
      'DTSTAMP:' + formatIcsUtc(now),
      'DTSTART:' + formatIcsUtc(start),
      'DTEND:' + formatIcsUtc(end),
      'SUMMARY:' + icsEscape('Uncomfortable Challenge: ' + challenge.title),
      'DESCRIPTION:' + icsEscape(challenge.description),
      'BEGIN:VALARM',
      'ACTION:DISPLAY',
      'DESCRIPTION:' + icsEscape(challenge.title),
      'TRIGGER:-PT0M',
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR',
    ];
    return lines.join('\r\n');
  }

  function downloadIcsForChallenge(challenge) {
    const blob = new Blob([buildIcsContent(challenge)], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'uncomfortable-challenge.ics';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  // ---------------- state ----------------

  const state = {
    user: null, // { name, email, provider }
    tab: 'home',
    stage: 'idle', // idle | spinning | result | accepted | done | failed
    wheelRotation: 0,
    currentIndex: 0,
    rerollUsedToday: false,
    rerollByDate: {}, // dateKey -> bool
    history: {}, // dateKey -> { index, title, failed }
    viewYear: new Date().getFullYear(),
    viewMonth: new Date().getMonth(),
    selectedDayKey: null,
    authMode: 'signin', // signin | signup
    authError: '',
    authBusy: false,
    showAccountModal: false,
    resultError: '',
    showAdInterstitial: false,
    adSecondsLeft: 5,
    billingError: '',
    billingBusy: false,
    showSpinLockModal: false,
  };

  let adTimerId = null;

  // ---------------- backend API ----------------

  async function apiFetch(path, options) {
    let res;
    try {
      res = await fetch(path, {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        ...options,
      });
    } catch (e) {
      throw new Error('Could not reach the server — check your connection and try again.');
    }
    let body = null;
    try { body = await res.json(); } catch (e) {}
    if (!res.ok) {
      throw new Error((body && body.error) || 'Something went wrong. Is the server running?');
    }
    return body;
  }

  function fetchSession() {
    return apiFetch('/api/session').then((data) => data.user);
  }

  function apiSignUp(name, email, password) {
    return apiFetch('/api/auth/signup', { method: 'POST', body: JSON.stringify({ name, email, password }) })
      .then((data) => data.user);
  }

  function apiSignIn(email, password) {
    return apiFetch('/api/auth/signin', { method: 'POST', body: JSON.stringify({ email, password }) })
      .then((data) => data.user);
  }

  function apiSignOut() {
    return apiFetch('/api/auth/signout', { method: 'POST' });
  }

  function fetchHistory() {
    return apiFetch('/api/history');
  }

  function postDay(dateKeyStr, index, title, failed) {
    return apiFetch('/api/history/day', {
      method: 'POST',
      body: JSON.stringify({ dateKey: dateKeyStr, index, title, failed }),
    });
  }

  function postReroll(dateKeyStr) {
    return apiFetch('/api/history/reroll', {
      method: 'POST',
      body: JSON.stringify({ dateKey: dateKeyStr }),
    });
  }

  function apiCreateCheckoutSession() {
    return apiFetch('/api/billing/create-checkout-session', { method: 'POST' });
  }

  function apiConfirmCheckout(sessionId) {
    return apiFetch('/api/billing/confirm?session_id=' + encodeURIComponent(sessionId));
  }

  function apiBillingPortal() {
    return apiFetch('/api/billing/portal', { method: 'POST' });
  }

  // ---------------- session bootstrapping ----------------

  async function loadUserData() {
    const data = await fetchHistory();
    const today = dateKey(new Date());
    state.history = data.history || {};
    state.rerollByDate = data.rerollByDate || {};
    state.rerollUsedToday = !!state.rerollByDate[today];
    state.stage = 'idle';
    state.currentIndex = 0;
    const entry = state.history[today];
    if (entry) {
      state.stage = entry.failed ? 'failed' : 'done';
      state.currentIndex = entry.index || 0;
    }
    state.tab = 'home';
    state.viewYear = new Date().getFullYear();
    state.viewMonth = new Date().getMonth();
    state.selectedDayKey = null;
  }

  async function init() {
    try {
      const user = await fetchSession();
      if (user) {
        state.user = user;
        await loadUserData();
      }
    } catch (e) {
      state.authError = e.message;
    }
  }

  function consumeAuthErrorFromUrl() {
    const params = new URLSearchParams(location.search);
    const code = params.get('auth_error');
    if (!code) return;
    const messages = {
      access_denied: 'Google sign-in was cancelled.',
      state_mismatch: 'Something went wrong with Google sign-in — please try again.',
      token_exchange_failed: 'Could not complete Google sign-in — please try again.',
      invalid_token: 'Could not verify Google sign-in — please try again.',
      no_email: 'That Google account has no email address — try a different account.',
    };
    state.authError = messages[code] || 'Google sign-in failed — please try again.';
    params.delete('auth_error');
    const rest = params.toString();
    history.replaceState({}, '', location.pathname + (rest ? '?' + rest : ''));
  }

  async function consumeCheckoutResultFromUrl() {
    const params = new URLSearchParams(location.search);
    const checkout = params.get('checkout');
    if (!checkout) return;
    const sessionId = params.get('session_id');
    params.delete('checkout');
    params.delete('session_id');
    const rest = params.toString();
    history.replaceState({}, '', location.pathname + (rest ? '?' + rest : ''));

    if (checkout !== 'success' || !sessionId || !state.user) return;

    try {
      const data = await apiConfirmCheckout(sessionId);
      state.user = data.user;
      state.showAccountModal = true;
    } catch (e) {
      state.billingError = e.message;
      state.showAccountModal = true;
    }
  }

  async function signOut() {
    try { await apiSignOut(); } catch (e) {}
    clearInterval(adTimerId);
    stopNextSpinCountdown();
    state.user = null;
    state.history = {};
    state.rerollByDate = {};
    state.stage = 'idle';
    state.tab = 'home';
    state.selectedDayKey = null;
    state.showAccountModal = false;
    state.authMode = 'signin';
    state.authError = '';
    state.showAdInterstitial = false;
    state.billingError = '';
    state.billingBusy = false;
    state.showSpinLockModal = false;
    render();
  }

  function computeStreak(history) {
    let streak = 0;
    let d = new Date();
    if (!history[dateKey(d)]) d = new Date(d.getTime() - DAY_MS);
    let guard = 0;
    while (history[dateKey(d)] && !history[dateKey(d)].failed && guard < 3650) {
      streak++;
      d = new Date(d.getTime() - DAY_MS);
      guard++;
    }
    return streak;
  }

  function todaysPool() {
    return dailyChallenges(dateKey(new Date()));
  }

  // ---------------- DOM refs ----------------

  const el = {
    screenHome: document.getElementById('screen-home'),
    screenCalendar: document.getElementById('screen-calendar'),
    streakNum: document.getElementById('streakNum'),
    streakFlame: document.getElementById('streakFlame'),
    coachLine: document.getElementById('coachLine'),
    wheelWrap: document.getElementById('wheelWrap'),
    wheel: document.getElementById('wheel'),
    wheelLabels: document.getElementById('wheelLabels'),
    spinBtn: document.getElementById('spinBtn'),
    resultCard: document.getElementById('resultCard'),
    tabBar: document.getElementById('tabBar'),
    tabHome: document.getElementById('tabHome'),
    tabCalendar: document.getElementById('tabCalendar'),
    calTitle: document.getElementById('calTitle'),
    calStreak: document.getElementById('calStreak'),
    calTotal: document.getElementById('calTotal'),
    monthLabel: document.getElementById('monthLabel'),
    calGrid: document.getElementById('calGrid'),
    prevMonth: document.getElementById('prevMonth'),
    nextMonth: document.getElementById('nextMonth'),
    dayModal: document.getElementById('dayModal'),
    accountModal: document.getElementById('accountModal'),
    adModal: document.getElementById('adModal'),
    spinLockModal: document.getElementById('spinLockModal'),

    screenAuth: document.getElementById('screen-auth'),
    authTitle: document.getElementById('authTitle'),
    authSubtitle: document.getElementById('authSubtitle'),
    socialCol: document.getElementById('socialCol'),
    authForm: document.getElementById('authForm'),
    nameField: document.getElementById('nameField'),
    authName: document.getElementById('authName'),
    authEmail: document.getElementById('authEmail'),
    passwordField: document.getElementById('passwordField'),
    authPassword: document.getElementById('authPassword'),
    authError: document.getElementById('authError'),
    authSubmitBtn: document.getElementById('authSubmitBtn'),
    authSwitchText: document.getElementById('authSwitchText'),
    authSwitchBtn: document.getElementById('authSwitchBtn'),

    accountBar: document.getElementById('accountBar'),
    accountChip: document.getElementById('accountChip'),
    accountAvatar: document.getElementById('accountAvatar'),
    accountGreeting: document.getElementById('accountGreeting'),
    signOutBtn: document.getElementById('signOutBtn'),
  };

  let labelsBuiltForKey = null;

  function buildWheelLabels() {
    const key = dateKey(new Date());
    if (labelsBuiltForKey === key) return;
    labelsBuiltForKey = key;
    const pool = todaysPool();
    const anglePerSeg = 360 / pool.length;
    el.wheelLabels.innerHTML = pool.map((c, i) => {
      const angle = i * anglePerSeg + anglePerSeg / 2;
      return `<div class="wheel-label" style="transform:rotate(${angle}deg) translateY(-108px)">${escapeHtml(c.wheelLabel)}</div>`;
    }).join('');
  }

  // ---------------- handlers ----------------

  function handleSpin() {
    if (state.stage === 'spinning') return;
    if (state.history[dateKey(new Date())]) {
      openSpinLockModal();
      return;
    }
    state.resultError = '';
    const pool = todaysPool();
    const targetIndex = Math.floor(Math.random() * pool.length);
    const anglePerSeg = 360 / pool.length;
    const segCenter = targetIndex * anglePerSeg + anglePerSeg / 2;
    const desiredMod = (360 - segCenter + 360) % 360;
    const currentMod = ((state.wheelRotation % 360) + 360) % 360;
    let delta = desiredMod - currentMod;
    if (delta < 0) delta += 360;
    const extraSpins = 1800 + Math.floor(Math.random() * 3) * 360;
    state.wheelRotation = state.wheelRotation + extraSpins + delta;
    state.stage = 'spinning';
    render();
    setTimeout(() => {
      state.stage = 'result';
      state.currentIndex = targetIndex;
      render();
    }, 3300);
  }

  function handleAccept() {
    state.resultError = '';
    state.stage = 'accepted';
    render();
  }

  async function handleReroll() {
    if (state.rerollUsedToday) return;
    state.resultError = '';
    const today = dateKey(new Date());
    try {
      await postReroll(today);
    } catch (e) {
      state.resultError = e.message || 'Couldn’t save that — check your connection and try again.';
      render();
      return;
    }
    state.rerollByDate = { ...state.rerollByDate, [today]: true };
    state.rerollUsedToday = true;
    state.stage = 'idle';
    render();
    handleSpin();
  }

  function startRerollFlow() {
    if (state.rerollUsedToday) return;
    if (state.user && state.user.isPremium) {
      handleReroll();
      return;
    }
    openAdInterstitial();
  }

  function openAdInterstitial() {
    clearInterval(adTimerId);
    state.showAdInterstitial = true;
    state.adSecondsLeft = 5;
    render();
    adTimerId = setInterval(() => {
      state.adSecondsLeft = Math.max(0, state.adSecondsLeft - 1);
      if (state.adSecondsLeft === 0) clearInterval(adTimerId);
      render();
    }, 1000);
  }

  function closeAdInterstitial(proceedWithReroll) {
    clearInterval(adTimerId);
    state.showAdInterstitial = false;
    render();
    if (proceedWithReroll) handleReroll();
  }

  async function startUpgrade() {
    if (state.billingBusy) return;
    state.billingBusy = true;
    state.billingError = '';
    render();
    try {
      const data = await apiCreateCheckoutSession();
      window.location.href = data.url;
    } catch (e) {
      state.billingError = e.message;
      state.billingBusy = false;
      render();
    }
  }

  async function openBillingPortal() {
    if (state.billingBusy) return;
    state.billingBusy = true;
    state.billingError = '';
    render();
    try {
      const data = await apiBillingPortal();
      window.location.href = data.url;
    } catch (e) {
      state.billingError = e.message;
      state.billingBusy = false;
      render();
    }
  }

  async function handleComplete() {
    const today = dateKey(new Date());
    const pool = todaysPool();
    const title = pool[state.currentIndex].title;
    state.resultError = '';
    try {
      await postDay(today, state.currentIndex, title, false);
    } catch (e) {
      state.resultError = e.message || 'Couldn’t save that — check your connection and try again.';
      render();
      return;
    }
    state.history = { ...state.history, [today]: { index: state.currentIndex, title, failed: false } };
    state.stage = 'done';
    render();
  }

  async function handleFail() {
    const today = dateKey(new Date());
    const pool = todaysPool();
    const title = pool[state.currentIndex].title;
    state.resultError = '';
    try {
      await postDay(today, state.currentIndex, title, true);
    } catch (e) {
      state.resultError = e.message || 'Couldn’t save that — check your connection and try again.';
      render();
      return;
    }
    state.history = { ...state.history, [today]: { index: state.currentIndex, title, failed: true } };
    state.stage = 'failed';
    render();
  }

  function handleReturnToWheel() {
    state.resultError = '';
    state.stage = 'idle';
    render();
  }

  function goToHome() {
    state.tab = 'home';
    render();
  }

  function goToCalendar() {
    state.tab = 'calendar';
    render();
  }

  function prevMonth() {
    let m = state.viewMonth - 1, y = state.viewYear;
    if (m < 0) { m = 11; y--; }
    state.viewMonth = m; state.viewYear = y;
    render();
  }

  function nextMonth() {
    let m = state.viewMonth + 1, y = state.viewYear;
    if (m > 11) { m = 0; y++; }
    state.viewMonth = m; state.viewYear = y;
    render();
  }

  function openDayDetail(key) {
    state.selectedDayKey = key;
    render();
  }

  function closeDayDetail() {
    state.selectedDayKey = null;
    render();
  }

  // ---------------- render ----------------

  function renderHeader() {
    const streak = computeStreak(state.history);
    el.streakNum.textContent = String(streak);
    el.streakFlame.classList.toggle('is-lit', streak > 0);
    const firstName = firstNameOf(state.user);

    let coachLine = `${firstName}, spin to find today’s edge.`;
    if (state.stage === 'spinning') coachLine = 'The wheel decides. No backing out.';
    if (state.stage === 'result') coachLine = 'Your challenge for today:';
    if (state.stage === 'accepted') coachLine = `You said yes, ${firstName}. Now go do it.`;
    if (state.stage === 'done') coachLine = `Discomfort conquered, ${firstName}. Nice work.`;
    if (state.stage === 'failed') coachLine = 'It happens. Spin again tomorrow.';
    el.coachLine.textContent = coachLine;
  }

  let nextSpinTimerId = null;

  function msUntilNextMidnight() {
    const now = new Date();
    const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);
    return nextMidnight.getTime() - now.getTime();
  }

  function formatCountdown(ms) {
    const totalSeconds = Math.max(0, Math.floor(ms / 1000));
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
  }

  function openSpinLockModal() {
    state.showSpinLockModal = true;
    render();
  }

  function closeSpinLockModal() {
    stopNextSpinCountdown();
    state.showSpinLockModal = false;
    render();
  }

  function renderSpinLockModal() {
    if (!state.showSpinLockModal) { el.spinLockModal.innerHTML = ''; return; }

    el.spinLockModal.innerHTML = `
      <div class="day-modal-backdrop" id="spinLockBackdrop">
        <div class="day-modal">
          <div class="next-spin-lock">
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><rect x="2.5" y="6" width="9" height="6.5" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M4.5 6V4.2a2.5 2.5 0 015 0V6" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
            <span>Already spun today</span>
          </div>
          <div class="card-title">Next spin in <span id="nextSpinTime">--:--:--</span></div>
          <div class="card-desc">You've already faced today's challenge. Come back after midnight for a new one.</div>
          <button class="pill pill-outline day-modal-close" data-action="closeSpinLockModal">Close</button>
        </div>
      </div>`;

    startNextSpinCountdown();
  }

  function stopNextSpinCountdown() {
    if (nextSpinTimerId) { clearInterval(nextSpinTimerId); nextSpinTimerId = null; }
  }

  function startNextSpinCountdown() {
    stopNextSpinCountdown();
    const tick = () => {
      const timeEl = document.getElementById('nextSpinTime');
      if (!timeEl) { stopNextSpinCountdown(); return; }
      const ms = msUntilNextMidnight();
      if (ms <= 0) {
        stopNextSpinCountdown();
        loadUserData().then(render);
        return;
      }
      timeEl.textContent = formatCountdown(ms);
    };
    tick();
    nextSpinTimerId = setInterval(tick, 1000);
  }

  function renderWheel() {
    const showWheel = state.stage === 'idle' || state.stage === 'spinning';
    el.wheelWrap.style.display = showWheel ? '' : 'none';
    el.spinBtn.style.display = showWheel ? '' : 'none';
    if (showWheel) {
      buildWheelLabels();
      el.wheel.style.transform = `rotate(${state.wheelRotation}deg)`;
      el.spinBtn.disabled = state.stage === 'spinning';
      el.spinBtn.textContent = state.stage === 'spinning' ? 'Spinning…' : 'Spin the Wheel';
    }
  }

  function renderResultCard() {
    const showCard = state.stage === 'result' || state.stage === 'accepted' || state.stage === 'done' || state.stage === 'failed';
    if (!showCard) { el.resultCard.innerHTML = ''; stopNextSpinCountdown(); return; }

    const pool = todaysPool();
    const challenge = pool[state.currentIndex] || pool[0];
    const kicker = state.stage === 'done' ? 'Completed' : state.stage === 'failed' ? 'Not Completed' : 'Today’s Challenge';

    const isPremium = !!(state.user && state.user.isPremium);
    let rerollLabel = 'Reroll';
    if (state.rerollUsedToday) rerollLabel = 'Reroll used';
    else if (!isPremium) rerollLabel = 'Reroll (watch ad)';

    let inner = '';
    if (state.stage === 'result') {
      inner = `
        <div class="card-actions">
          <button class="pill pill-accept" data-action="accept">Accept Challenge</button>
          <button class="pill pill-reroll" data-action="reroll" ${state.rerollUsedToday ? 'disabled' : ''}>${escapeHtml(rerollLabel)}</button>
        </div>`;
    } else if (state.stage === 'accepted') {
      inner = `
        <div class="stage-block">
          <div class="stage-progress-label">IN PROGRESS — go do it now</div>
          <button class="pill pill-complete" data-action="complete">Mark Complete</button>
          <button class="pill pill-fail" data-action="fail">Unsuccessful</button>
          <button class="pill pill-outline" data-action="addToCalendar">Add reminder to Calendar</button>
        </div>`;
    } else if (state.stage === 'done') {
      inner = `
        <div class="done-block">
          <div class="done-row">
            <svg width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10" fill="var(--color-accent-2-600)"/><path d="M5.5 10.2l3 3 6-6.6" stroke="var(--color-bg)" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <div class="done-label">Discomfort conquered, ${escapeHtml(firstNameOf(state.user))}.</div>
          </div>
          <div class="done-actions">
            <button class="pill pill-outline" data-action="goToCalendar">View Calendar</button>
            <button class="pill pill-outline" data-action="returnToWheel">Return to Wheel</button>
          </div>
        </div>`;
    } else if (state.stage === 'failed') {
      inner = `
        <div class="done-block">
          <div class="failed-label">Not today. That's alright — try again tomorrow.</div>
          <div class="failed-actions">
            <button class="pill pill-outline" data-action="goToCalendar">View Calendar</button>
            <button class="pill pill-outline" data-action="returnToWheel">Return to Wheel</button>
          </div>
        </div>`;
    }

    const errorBlock = state.resultError
      ? `<div class="card-error">${escapeHtml(state.resultError)}</div>`
      : '';

    el.resultCard.innerHTML = `
      <div class="result-card">
        <div class="card-kicker">${escapeHtml(kicker)}</div>
        <div class="card-title">${escapeHtml(challenge.title)}</div>
        <div class="card-desc">${escapeHtml(challenge.description)}</div>
        ${inner}
        ${errorBlock}
      </div>`;

    if (state.stage === 'done' || state.stage === 'failed') {
      startNextSpinCountdown();
    } else {
      stopNextSpinCountdown();
    }
  }

  function renderCalendar() {
    if (state.tab !== 'calendar') return;
    el.calTitle.textContent = `${firstNameOf(state.user)}’s Streak`;
    const streak = computeStreak(state.history);
    const totalCompleted = Object.keys(state.history).length;
    el.calStreak.textContent = String(streak);
    el.calTotal.textContent = String(totalCompleted);

    const first = new Date(state.viewYear, state.viewMonth, 1);
    el.monthLabel.textContent = first.toLocaleString('default', { month: 'long', year: 'numeric' });

    const startOffset = first.getDay();
    const daysInMonth = new Date(state.viewYear, state.viewMonth + 1, 0).getDate();
    const todayKey = dateKey(new Date());
    const todayStart = new Date().setHours(0, 0, 0, 0);

    let html = '';
    for (let i = 0; i < startOffset; i++) html += '<div class="cal-cell"></div>';
    for (let day = 1; day <= daysInMonth; day++) {
      const d = new Date(state.viewYear, state.viewMonth, day);
      const key = dateKey(d);
      const entry = state.history[key];
      const completed = !!entry && !entry.failed;
      const failed = !!entry && !!entry.failed;
      const isToday = key === todayKey;
      const isFuture = d.getTime() > todayStart;

      const classes = ['cal-cell', 'has-day'];
      if (completed) classes.push('completed');
      else if (failed) classes.push('failed');
      else if (isFuture) classes.push('future');
      if (isToday && !completed && !failed) classes.push('today-outline');
      if (!isFuture) classes.push('clickable');

      let content;
      if (completed) {
        content = '<svg width="13" height="13" viewBox="0 0 20 20"><path d="M4 10.5l4.5 4.5L16 6" stroke="var(--color-bg)" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      } else if (failed) {
        content = '✕';
      } else {
        content = String(day);
      }
      const keyAttr = isFuture ? '' : ` data-key="${key}"`;
      html += `<div class="${classes.join(' ')}"${keyAttr}>${content}</div>`;
    }
    el.calGrid.innerHTML = html;
  }

  function renderDayModal() {
    const key = state.selectedDayKey;
    if (!key) { el.dayModal.innerHTML = ''; return; }

    const [y, m, d] = key.split('-').map(Number);
    const dateLabel = new Date(y, m - 1, d).toLocaleDateString('default', {
      weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
    });
    const entry = state.history[key];

    let body;
    if (entry) {
      const pool = dailyChallenges(key);
      const challenge = pool[entry.index] || { title: entry.title, description: '' };
      const kicker = entry.failed ? 'Not Completed' : 'Completed';
      body = `
        <div class="card-kicker">${escapeHtml(kicker)}</div>
        <div class="card-title">${escapeHtml(challenge.title)}</div>
        <div class="card-desc">${escapeHtml(challenge.description)}</div>`;
    } else {
      body = `<div class="day-modal-empty">No challenge faced this day.</div>`;
    }

    el.dayModal.innerHTML = `
      <div class="day-modal-backdrop">
        <div class="day-modal">
          <div class="day-modal-date">${escapeHtml(dateLabel)}</div>
          ${body}
          <button class="pill pill-outline day-modal-close" data-action="closeDayModal">Close</button>
        </div>
      </div>`;
  }

  function renderTabs() {
    const isHome = state.tab === 'home';
    el.tabHome.classList.toggle('active', isHome);
    el.tabCalendar.classList.toggle('active', !isHome);
    el.screenHome.hidden = !isHome;
    el.screenCalendar.hidden = isHome;
  }

  function renderAuth() {
    const isSignup = state.authMode === 'signup';
    el.authTitle.textContent = isSignup ? 'Create your account' : 'Welcome back';
    el.authSubtitle.textContent = isSignup ? 'Sign up to start today’s challenge.' : 'Sign in to keep your streak going.';
    el.authSwitchText.textContent = isSignup ? 'Already have an account?' : "Don't have an account?";
    el.authSwitchBtn.textContent = isSignup ? 'Sign in' : 'Sign up';

    el.nameField.hidden = !isSignup;
    el.authSubmitBtn.textContent = isSignup ? 'Sign Up' : 'Sign In';
    el.authSubmitBtn.disabled = state.authBusy;

    el.authError.hidden = !state.authError;
    el.authError.textContent = state.authError || '';
  }

  function renderAccountBar() {
    if (!state.user) return;
    el.accountAvatar.textContent = initialsOf(state.user);
    el.accountGreeting.textContent = `Hi, ${firstNameOf(state.user)}`;
  }

  function renderAccountModal() {
    if (!state.showAccountModal || !state.user) { el.accountModal.innerHTML = ''; return; }
    const u = state.user;

    const planLabel = u.isPremium ? 'Ad-Free — $3.49/mo' : 'Free (ads on reroll)';
    const planBadgeClass = u.isPremium ? 'plan-badge plan-badge-premium' : 'plan-badge';
    const planAction = u.isPremium
      ? `<button class="pill pill-outline" data-action="manageBilling" ${state.billingBusy ? 'disabled' : ''}>${state.billingBusy ? 'Opening…' : 'Manage Subscription'}</button>`
      : `<button class="pill pill-accept" data-action="upgrade" ${state.billingBusy ? 'disabled' : ''}>${state.billingBusy ? 'Opening…' : 'Upgrade — $3.49/mo'}</button>`;
    const billingErrorBlock = state.billingError
      ? `<div class="card-error">${escapeHtml(state.billingError)}</div>`
      : '';

    el.accountModal.innerHTML = `
      <div class="day-modal-backdrop" id="accountModalBackdrop">
        <div class="day-modal">
          <div class="day-modal-date">Account</div>
          <div class="card-title">${escapeHtml(u.name)}</div>
          <div class="card-desc">${escapeHtml(u.email)}<br>Signed in with ${escapeHtml(providerLabel(u.provider))}</div>
          <div class="plan-row"><span class="${planBadgeClass}">${escapeHtml(planLabel)}</span></div>
          ${planAction}
          ${billingErrorBlock}
          <button class="pill pill-outline day-modal-close" data-action="closeAccountModal">Close</button>
        </div>
      </div>`;
  }

  let adModalSessionOpen = false;

  function updateAdCountdownDom() {
    const secondsLeft = state.adSecondsLeft;
    const continueLabel = secondsLeft > 0 ? `Continue in ${secondsLeft}s` : 'Continue to Challenge';
    const btn = el.adModal.querySelector('[data-action="continueAd"]');
    if (btn) {
      btn.textContent = continueLabel;
      btn.disabled = secondsLeft > 0;
    }
  }

  function renderAdModal() {
    if (!state.showAdInterstitial) {
      el.adModal.innerHTML = '';
      adModalSessionOpen = false;
      return;
    }

    // The countdown ticks via the main render() loop once a second. Rebuilding
    // this modal's innerHTML on every tick would recreate the <ins> ad element
    // each time, forcing AdSense to re-request an ad every second — broken UX
    // and a real risk of the account getting flagged for invalid traffic. So
    // the ad markup is built exactly once per "open"; ticks after that only
    // patch the countdown text/button directly.
    if (adModalSessionOpen) {
      updateAdCountdownDom();
      return;
    }
    adModalSessionOpen = true;

    const secondsLeft = state.adSecondsLeft;
    const continueLabel = secondsLeft > 0 ? `Continue in ${secondsLeft}s` : 'Continue to Challenge';

    el.adModal.innerHTML = `
      <div class="day-modal-backdrop">
        <div class="day-modal ad-modal">
          <div class="ad-modal-label">Advertisement</div>
          <div class="ad-modal-content">
            <ins class="adsbygoogle"
                 style="display:block"
                 data-ad-client="ca-pub-8922964802782980"
                 data-ad-slot="5307486358"
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
          </div>
          <div class="ad-modal-note">Free plan shows an ad before each reroll.</div>
          <button class="pill pill-outline" data-action="upgradeFromAd">Skip ads — Go Ad-Free for $3.49/mo</button>
          <button class="pill pill-accept ad-modal-continue" data-action="continueAd" ${secondsLeft > 0 ? 'disabled' : ''}>${escapeHtml(continueLabel)}</button>
        </div>
      </div>`;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // AdSense script may not be loaded yet (blocked, offline, ad blocker) —
      // the modal still works, it just won't show a filled ad.
    }
  }

  function render() {
    if (!state.user) {
      el.screenAuth.hidden = false;
      el.accountBar.hidden = true;
      el.screenHome.hidden = true;
      el.screenCalendar.hidden = true;
      el.tabBar.hidden = true;
      el.dayModal.innerHTML = '';
      el.accountModal.innerHTML = '';
      el.adModal.innerHTML = '';
      el.spinLockModal.innerHTML = '';
      renderAuth();
      return;
    }

    el.screenAuth.hidden = true;
    el.accountBar.hidden = false;
    el.tabBar.hidden = false;
    renderAccountBar();
    renderTabs();
    if (state.tab === 'home') {
      renderHeader();
      renderWheel();
      renderResultCard();
    } else {
      renderCalendar();
    }
    renderDayModal();
    renderAccountModal();
    renderAdModal();
    renderSpinLockModal();
  }

  // ---------------- wire up ----------------

  el.spinBtn.addEventListener('click', handleSpin);
  el.tabHome.addEventListener('click', goToHome);
  el.tabCalendar.addEventListener('click', goToCalendar);
  el.prevMonth.addEventListener('click', prevMonth);
  el.nextMonth.addEventListener('click', nextMonth);

  el.resultCard.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]');
    if (!btn || btn.disabled) return;
    const action = btn.dataset.action;
    if (action === 'accept') handleAccept();
    else if (action === 'reroll') startRerollFlow();
    else if (action === 'complete') handleComplete();
    else if (action === 'fail') handleFail();
    else if (action === 'goToCalendar') goToCalendar();
    else if (action === 'returnToWheel') handleReturnToWheel();
    else if (action === 'addToCalendar') {
      const pool = todaysPool();
      const challenge = pool[state.currentIndex] || pool[0];
      downloadIcsForChallenge(challenge);
    }
  });

  el.spinLockModal.addEventListener('click', (e) => {
    if (e.target.id === 'spinLockBackdrop') { closeSpinLockModal(); return; }
    const btn = e.target.closest('[data-action="closeSpinLockModal"]');
    if (btn) closeSpinLockModal();
  });

  el.calGrid.addEventListener('click', (e) => {
    const cell = e.target.closest('.cal-cell.clickable[data-key]');
    if (!cell) return;
    openDayDetail(cell.dataset.key);
  });

  el.dayModal.addEventListener('click', (e) => {
    if (e.target.classList.contains('day-modal-backdrop')) { closeDayDetail(); return; }
    const btn = e.target.closest('[data-action="closeDayModal"]');
    if (btn) closeDayDetail();
  });

  el.socialCol.addEventListener('click', (e) => {
    const btn = e.target.closest('.social-btn');
    if (!btn) return;
    const provider = btn.dataset.provider;
    if (provider === 'google') {
      window.location.href = '/api/auth/google/start';
      return;
    }
    state.authError = `${providerLabel(provider)} sign-in isn't wired up yet — only Google is live right now.`;
    render();
  });

  el.authSwitchBtn.addEventListener('click', () => {
    state.authMode = state.authMode === 'signup' ? 'signin' : 'signup';
    state.authError = '';
    render();
  });

  el.authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = el.authName.value.trim();
    const email = el.authEmail.value.trim();
    const password = el.authPassword.value;

    if (!validateEmail(email)) {
      state.authError = 'Enter a valid email address.';
      render();
      return;
    }
    if (state.authMode === 'signup' && !name) {
      state.authError = 'Enter your name.';
      render();
      return;
    }

    state.authBusy = true;
    state.authError = '';
    render();

    try {
      const user = state.authMode === 'signup'
        ? await apiSignUp(name, email, password)
        : await apiSignIn(email, password);
      state.user = user;
      state.authError = '';
      el.authForm.reset();
      await loadUserData();
    } catch (err) {
      state.authError = err.message;
    }
    state.authBusy = false;
    render();
  });

  el.signOutBtn.addEventListener('click', signOut);

  el.accountChip.addEventListener('click', () => {
    state.showAccountModal = true;
    render();
  });

  el.accountModal.addEventListener('click', (e) => {
    if (e.target.id === 'accountModalBackdrop') { state.showAccountModal = false; render(); return; }
    const btn = e.target.closest('[data-action]');
    if (!btn || btn.disabled) return;
    const action = btn.dataset.action;
    if (action === 'closeAccountModal') { state.showAccountModal = false; render(); }
    else if (action === 'upgrade') startUpgrade();
    else if (action === 'manageBilling') openBillingPortal();
  });

  el.adModal.addEventListener('click', (e) => {
    if (e.target.classList.contains('day-modal-backdrop')) { closeAdInterstitial(false); return; }
    const btn = e.target.closest('[data-action]');
    if (!btn || btn.disabled) return;
    const action = btn.dataset.action;
    if (action === 'continueAd') closeAdInterstitial(true);
    else if (action === 'upgradeFromAd') { closeAdInterstitial(false); startUpgrade(); }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (state.selectedDayKey) closeDayDetail();
    else if (state.showAdInterstitial) closeAdInterstitial(false);
    else if (state.showSpinLockModal) closeSpinLockModal();
    else if (state.showAccountModal) { state.showAccountModal = false; render(); }
  });

  consumeAuthErrorFromUrl();
  init()
    .then(consumeCheckoutResultFromUrl)
    .then(render);
})();
