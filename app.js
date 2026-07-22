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
    { id: 'wave-at-a-stranger', title: 'Wave at a Stranger', wheelLabel: 'Wave Hello', description: 'Wave at a stranger who is looking in your direction and see how they react.' },
    { id: 'ask-a-stranger-the-time', title: 'Ask a Stranger the Time', wheelLabel: 'Ask the Time', description: 'Ask a stranger for the time, even if you\'re wearing a watch or holding a phone.' },
    { id: 'smile-at-someone-stressed', title: 'Smile at Someone Stressed', wheelLabel: 'Smile at Them', description: 'Smile warmly at three people today who look stressed or upset.' },
    { id: 'thank-a-worker-by-name', title: 'Thank a Worker by Name', wheelLabel: 'Thank by Name', description: 'Read a retail worker or cashier\'s name badge and wish them a genuinely great day by name.' },
    { id: 'ask-directions-you-know', title: 'Ask Directions You Know', wheelLabel: 'Ask Directions', description: 'Ask someone for directions to a place you already know how to get to.' },
    { id: 'say-hello-in-the-elevator', title: 'Say Hello in the Elevator', wheelLabel: 'Elevator Hello', description: 'Say hello to someone in an elevator instead of looking at your phone.' },
    { id: 'ask-to-pet-a-dog', title: 'Ask to Pet a Dog', wheelLabel: 'Pet a Dog', description: 'Ask a stranger if you can pet their dog, even if it feels awkward to ask.' },
    { id: 'ask-for-a-dramatic-photo', title: 'Ask for a Dramatic Photo', wheelLabel: 'Dramatic Photo', description: 'Ask a stranger to take a photo of you posing dramatically.' },
    { id: 'ask-for-free-day-old-pastries', title: 'Ask for Free Day-Old Pastries', wheelLabel: 'Ask Pastries', description: 'Ask a café if they have any free day-old pastries they\'re about to throw out.' },
    { id: 'ask-for-honest-outfit-feedback', title: 'Ask for Honest Outfit Feedback', wheelLabel: 'Outfit Feedback', description: 'Ask a complete stranger for their honest opinion on your outfit.' },
    { id: 'ask-to-borrow-a-phone', title: 'Ask to Borrow a Phone', wheelLabel: 'Borrow Phone', description: 'Ask someone if you can borrow their phone to make a quick, non-emergency call.' },
    { id: 'offer-to-buy-a-stranger-coffee', title: 'Offer to Buy a Stranger Coffee', wheelLabel: 'Buy Coffee', description: 'Ask a stranger if you can buy them a coffee, or swap something you have for something of theirs.' },
    { id: 'ask-for-a-five-year-old-explanation', title: 'Ask for a Five-Year-Old Explanation', wheelLabel: 'Explain Simply', description: 'Ask someone to explain a concept to you as if you were five years old.' },
    { id: 'lie-down-in-public', title: 'Lie Down in Public', wheelLabel: 'Lie Down', description: 'Lay down on the floor or sidewalk in a crowded public place for 15 seconds, then get up and walk away.' },
    { id: 'walk-backwards-a-block', title: 'Walk Backwards a Block', wheelLabel: 'Walk Backward', description: 'Walk backwards for an entire city block in a busy area.' },
    { id: 'freeze-in-a-crowd', title: 'Freeze in a Crowd', wheelLabel: 'Freeze Still', description: 'Stand completely still in a crowded walking street for two minutes.' },
    { id: 'wear-your-shirt-inside-out', title: 'Wear Your Shirt Inside Out', wheelLabel: 'Shirt Inside Out', description: 'Wear your shirt inside out or backwards in public for a whole afternoon.' },
    { id: 'give-free-high-fives', title: 'Give Free High Fives', wheelLabel: 'Free High Fives', description: 'Walk around a public park carrying a sign that says "Free High Fives" — and actually give them.' },
    { id: 'sit-right-next-to-a-stranger', title: 'Sit Right Next to a Stranger', wheelLabel: 'Sit Close', description: 'Sit right next to someone on a bench or bus when there are plenty of empty seats available.' },
    { id: 'celebrate-out-loud', title: 'Celebrate Out Loud', wheelLabel: 'Celebrate Loud', description: 'Openly celebrate a minor personal achievement out loud in a public space.' },
    { id: 'read-a-weird-book-in-public', title: 'Read a Weird Book in Public', wheelLabel: 'Weird Book', description: 'Read an unusual or bizarre-titled book openly on public transit.' },
    { id: 'high-five-five-strangers', title: 'High-Five Five Strangers', wheelLabel: '5 High-Fives', description: 'High-five five random strangers throughout the day.' },
    { id: 'call-an-old-friend', title: 'Call an Old Friend', wheelLabel: 'Call Old Friend', description: 'Call an old friend you haven\'t spoken to in over a year just to say you miss them.' },
    { id: 'tell-family-why-you-appreciate-them', title: 'Tell Family Why You Appreciate Them', wheelLabel: 'Say Thanks', description: 'Tell a family member exactly why you appreciate them, without any prompting.' },
    { id: 'write-a-letter-to-your-mentor', title: 'Write a Letter to Your Mentor', wheelLabel: 'Mentor Letter', description: 'Write a long, handwritten letter of appreciation to a mentor and deliver it.' },
    { id: 'discuss-a-boundary', title: 'Discuss a Boundary', wheelLabel: 'Set a Boundary', description: 'Initiate a conversation about a boundary you\'ve been too afraid to set.' },
    { id: 'ask-what-annoys-them', title: 'Ask What Annoys Them', wheelLabel: 'What Annoys You', description: 'Ask your closest friend: "What is one thing I do that annoys you the most?"' },
    { id: 'ask-how-to-be-better', title: 'Ask How to Be Better', wheelLabel: 'How to Improve', description: 'Ask your partner or a family member: "How can I be a better person for you?"' },
    { id: 'sit-in-silence-together', title: 'Sit in Silence Together', wheelLabel: 'Silent Together', description: 'Sit in silence with a loved one for 5 minutes while looking into their eyes.' },
    { id: 'strike-a-pose-in-a-store', title: 'Strike a Pose in a Store', wheelLabel: 'Store Pose', description: 'Strike a dramatic bodybuilding pose in the middle of a grocery store aisle.' },
    { id: 'play-rock-paper-scissors', title: 'Play Rock Paper Scissors', wheelLabel: 'RPS Battle', description: 'Ask a stranger if they want to play a quick game of Rock, Paper, Scissors.' },
    { id: 'skip-down-the-sidewalk', title: 'Skip Down the Sidewalk', wheelLabel: 'Skip a Block', description: 'Skip instead of walk for a 100-meter stretch on a busy sidewalk.' },
    { id: 'start-a-mexican-wave', title: 'Start a Mexican Wave', wheelLabel: 'Start a Wave', description: 'Start a Mexican wave in a crowd or waiting room.' },
    { id: 'sketch-a-stranger', title: 'Sketch a Stranger', wheelLabel: 'Sketch Someone', description: 'Sit in a public space, sketch a portrait of a stranger, then give it to them.' },
    { id: 'sing-off-key-karaoke', title: 'Sing Off-Key Karaoke', wheelLabel: 'Karaoke Night', description: 'Go to a local karaoke night and sing a song completely out of your vocal range.' },
    { id: 'wear-a-funny-hat-for-errands', title: 'Wear a Funny Hat for Errands', wheelLabel: 'Funny Hat', description: 'Wear a funny hat or bold costume item while running your regular errands.' },
    { id: 'freeze-the-last-minute', title: 'Freeze the Last Minute', wheelLabel: 'Cold Finish', description: 'Turn the shower to freezing cold for the final 60 seconds of your normal wash.' },
    { id: 'take-a-full-ice-bath', title: 'Take a Full Ice Bath', wheelLabel: 'Ice Bath', description: 'Take a 10-minute ice bath in your bathtub using cold tap water and ice.' },
    { id: 'winter-walk-in-a-t-shirt', title: 'Winter Walk in a T-Shirt', wheelLabel: 'T-Shirt Walk', description: 'Go for a 15-minute walk in winter weather wearing only a single t-shirt.' },
    { id: 'run-in-the-heat', title: 'Run in the Heat', wheelLabel: 'Heat Run', description: 'Go for a run during the hottest part of the day, staying safe but embracing the sweat.' },
    { id: 'ice-water-face-washes', title: 'Ice Water Face Washes', wheelLabel: 'Ice Face Wash', description: 'Wash your face with ice-cold water every hour on the hour for a full workday.' },
    { id: 'no-ac-or-heating-all-day', title: 'No AC or Heating All Day', wheelLabel: 'No AC or Heat', description: 'Turn off the AC or heating in your house or car for an entire day.' },
    { id: 'ice-bucket-hands-and-feet', title: 'Ice Bucket Hands and Feet', wheelLabel: 'Ice Bucket', description: 'Plunge your hands and feet into a bucket of ice water for 3 full minutes.' },
    { id: 'jump-into-natural-water', title: 'Jump Into Natural Water', wheelLabel: 'Cold Water Jump', description: 'Jump into a natural body of water — ocean, lake, or river — early in the morning.' },
    { id: 'non-dominant-hand-all-day', title: 'Non-Dominant Hand All Day', wheelLabel: 'Wrong Hand Day', description: 'Spend a whole day using your non-dominant hand for everything — eating, brushing teeth, opening doors.' },
    { id: 'sit-cross-legged-for-an-hour', title: 'Sit Cross-Legged for an Hour', wheelLabel: 'Cross-Legged', description: 'Sit cross-legged on the floor for 1 hour while working or watching something.' },
    { id: 'blindfolded-at-home', title: 'Blindfolded at Home', wheelLabel: 'Blindfold Chores', description: 'Blindfold yourself for 2 hours at home while trying to do basic chores.' },
    { id: 'wear-a-weighted-backpack', title: 'Wear a Weighted Backpack', wheelLabel: 'Weighted Pack', description: 'Spend 4 hours wearing a heavy backpack or weights as you go about your day at home.' },
    { id: 'dont-sit-for-four-hours', title: 'Don\'t Sit for Four Hours', wheelLabel: 'No Sitting', description: 'Do not sit down for a full 4-hour block of time during the day.' },
    { id: 'perfect-posture-all-day', title: 'Perfect Posture All Day', wheelLabel: 'Perfect Posture', description: 'Keep your posture perfectly straight for an entire day — no slouching allowed.' },
    { id: 'sunrise-walk', title: 'Sunrise Walk', wheelLabel: 'Early Walk', description: 'Wake up at 4:30 AM and immediately go outside for a walk.' },
    { id: '100-burpees-fast', title: '100 Burpees Fast', wheelLabel: '100 Burpees', description: 'Do 100 burpees as fast as you possibly can.' },
    { id: '20-000-steps', title: '20,000 Steps', wheelLabel: '20K Steps', description: 'Walk 20,000 steps in a single day.' },
    { id: 'triple-50-before-breakfast', title: 'Triple 50 Before Breakfast', wheelLabel: 'Triple 50', description: 'Do 50 push-ups, 50 squats, and 50 sit-ups before breakfast.' },
    { id: 'five-minute-dead-hang', title: 'Five-Minute Dead Hang', wheelLabel: 'Dead Hang', description: 'Hang from a pull-up bar for a cumulative total of 5 minutes in one session.' },
    { id: 'three-minute-wall-sit', title: 'Three-Minute Wall Sit', wheelLabel: 'Wall Sit', description: 'Hold a wall sit for 3 minutes straight.' },
    { id: 'late-night-workout', title: 'Late-Night Workout', wheelLabel: 'Late Workout', description: 'Do a workout at 10:00 PM when you\'re completely exhausted and want to go to bed.' },
    { id: 'empty-your-bedroom', title: 'Empty Your Bedroom', wheelLabel: 'Empty Room', description: 'Empty your bedroom of everything except your bed for three days.' },
    { id: 'same-outfit-for-five-days', title: 'Same Outfit for Five Days', wheelLabel: '5-Day Outfit', description: 'Wear the exact same outfit for 5 days in a row, washing it nightly.' },
    { id: 'clean-with-a-toothbrush', title: 'Clean With a Toothbrush', wheelLabel: 'Toothbrush Clean', description: 'Clean part of your living space using only a toothbrush or small cloth.' },
    { id: 'live-out-of-a-backpack', title: 'Live Out of a Backpack', wheelLabel: 'Backpack Living', description: 'Live out of a single backpack of items for one full week at home.' },
    { id: 'candlelit-evening', title: 'Candlelit Evening', wheelLabel: 'Candle Only', description: 'Turn off all the lights in your home after dark and use only one candle.' },
    { id: 'walk-everywhere-today', title: 'Walk Everywhere Today', wheelLabel: 'Walk Only', description: 'Walk everywhere you need to go today instead of driving or taking transit, up to 10km.' },
    { id: 'declutter-50-items', title: 'Declutter 50 Items', wheelLabel: 'Declutter 50', description: 'Declutter 50 items from your home in one hour by donating or tossing them.' },
    { id: 'clean-up-a-park', title: 'Clean Up a Park', wheelLabel: 'Clean the Park', description: 'Clean up trash in your neighborhood park for 2 hours straight.' },
    { id: 'naked-mirror-reflection', title: 'Naked Mirror Reflection', wheelLabel: 'Mirror Time', description: 'Look at yourself in a full-length mirror for 5 minutes without judging what you see.' },
    { id: 'try-a-weird-exercise', title: 'Try a Weird Exercise', wheelLabel: 'Weird Exercise', description: 'Go to a public gym or park and do an intentionally awkward or weird-looking exercise.' },
    { id: 'shower-with-eyes-closed', title: 'Shower With Eyes Closed', wheelLabel: 'Eyes Closed', description: 'Keep your eyes closed for the entire duration of a shower.' },
    { id: 'wall-handstand', title: 'Wall Handstand', wheelLabel: 'Handstand', description: 'Do a handstand or headstand against a wall until your muscles shake.' },
    { id: 'three-minute-hamstring-hold', title: 'Three-Minute Hamstring Hold', wheelLabel: 'Hamstring Hold', description: 'Stretch your hamstrings until it hurts slightly and hold it for a full 3 minutes.' },
    { id: 'chew-forty-times-a-bite', title: 'Chew Forty Times a Bite', wheelLabel: 'Chew 40x', description: 'Chew every single bite of your food 40 times before swallowing during a meal.' },
    { id: 'fifteen-minutes-of-deep-squats', title: 'Fifteen Minutes of Deep Squats', wheelLabel: 'Deep Squats', description: 'Sit in deep squats for a cumulative 15 minutes today.' },
    { id: 'balance-an-object-on-your-head', title: 'Balance an Object on Your Head', wheelLabel: 'Head Balance', description: 'Walk with an object balanced on your head for 15 minutes.' },
    { id: 'move-in-slow-motion', title: 'Move in Slow Motion', wheelLabel: 'Slow Motion Hour', description: 'Spend an hour moving in slow motion — 10 seconds for every step or reach.' },
    { id: 'calls-only-notifications', title: 'Calls-Only Notifications', wheelLabel: 'Calls Only', description: 'Disable all notifications on your phone except for direct phone calls.' },
    { id: 'phone-off-by-seven', title: 'Phone Off by Seven', wheelLabel: 'Phone Off 7PM', description: 'Turn your phone off completely at 7:00 PM and don\'t turn it back on until morning.' },
    { id: 'delete-your-favorite-app', title: 'Delete Your Favorite App', wheelLabel: 'Delete Fav App', description: 'Delete your favorite mobile game or time-wasting app permanently.' },
    { id: 'three-days-no-streaming', title: 'Three Days No Streaming', wheelLabel: 'No Streaming', description: 'Log out of all streaming platforms — Netflix, YouTube, etc. — for 3 days.' },
    { id: 'phone-sleeps-elsewhere', title: 'Phone Sleeps Elsewhere', wheelLabel: 'Phone Elsewhere', description: 'Leave your phone in a different room while you sleep.' },
    { id: 'no-emojis-for-a-week', title: 'No Emojis for a Week', wheelLabel: 'No Emojis', description: 'Don\'t use any emojis in your text messages for an entire week.' },
    { id: 'a-day-with-no-metrics', title: 'A Day With No Metrics', wheelLabel: 'No Metrics', description: 'Go a whole day without looking at any metrics — views, likes, bank balance, step count.' },
    { id: 'a-screen-free-sunday', title: 'A Screen-Free Sunday', wheelLabel: 'No-Screen Sunday', description: 'Spend an entire Sunday without looking at a single screen — TV, phone, or computer.' },
    { id: 'every-meal-in-silence', title: 'Every Meal in Silence', wheelLabel: 'Silent Meals', description: 'Eat every meal today in absolute silence, without screens, books, or music.' },
    { id: 'stare-at-a-blank-wall', title: 'Stare at a Blank Wall', wheelLabel: 'Blank Wall', description: 'Spend 2 hours staring at a blank wall without doing anything else.' },
    { id: 'paper-and-pen-only', title: 'Paper and Pen Only', wheelLabel: 'Paper Only', description: 'Spend an hour at a coffee shop with nothing but a pad of paper and a pen.' },
    { id: 'chore-without-a-soundtrack', title: 'Chore Without a Soundtrack', wheelLabel: 'Silent Chore', description: 'Do a tedious chore, like dishes or laundry, without music or podcasts.' },
    { id: 'watch-the-clouds', title: 'Watch the Clouds', wheelLabel: 'Cloud Watching', description: 'Sit outside for 45 minutes just watching the clouds move.' },
    { id: 'work-only-internet', title: 'Work-Only Internet', wheelLabel: 'Work Net Only', description: 'Do not use the internet for anything other than mandatory work tasks today.' },
    { id: 'a-computer-free-weekend', title: 'A Computer-Free Weekend', wheelLabel: 'No Computer', description: 'Keep your computer closed for the entire weekend.' },
    { id: 'unsubscribe-from-50-newsletters', title: 'Unsubscribe From 50 Newsletters', wheelLabel: '50 Unsubscribes', description: 'Unsubscribe from 50 email newsletters in one sitting.' },
    { id: 'curate-your-feed-ruthlessly', title: 'Curate Your Feed Ruthlessly', wheelLabel: 'Curate Feed', description: 'Unfollow every account on social media that doesn\'t directly inspire or educate you.' },
    { id: 'three-days-of-print-only', title: 'Three Days of Print Only', wheelLabel: 'Print Only', description: 'Spend 3 days reading only physical print — books, newspapers — instead of digital text.' },
    { id: 'block-your-top-three-sites', title: 'Block Your Top Three Sites', wheelLabel: 'Block Top Sites', description: 'Block your top 3 most-visited websites for a week using a site blocker.' },
    { id: 'same-song-for-two-hours', title: 'Same Song for Two Hours', wheelLabel: 'Song on Repeat', description: 'Listen to the exact same song on repeat for 2 hours while working.' },
    { id: 'foreign-film-no-subtitles', title: 'Foreign Film, No Subtitles', wheelLabel: 'No Subtitles', description: 'Watch a movie or documentary in a language you don\'t speak, without subtitles.' },
    { id: 'no-comments-section', title: 'No Comments Section', wheelLabel: 'No Comments', description: 'Don\'t read the comments section on any post, video, or article for a week.' },
    { id: 'delete-a-thousand-photos', title: 'Delete a Thousand Photos', wheelLabel: '1000 Photos Gone', description: 'Delete 1,000 photos from your camera roll to practice non-attachment.' },
    { id: 'wipe-your-home-screen', title: 'Wipe Your Home Screen', wheelLabel: 'Clean Screen', description: 'Wipe your phone home screen completely clean of all icons.' },
    { id: 'an-evening-by-the-window', title: 'An Evening by the Window', wheelLabel: 'Window Evening', description: 'Spend an entire evening sitting by a window doing absolutely nothing.' },
    { id: 'calls-and-voice-memos-only', title: 'Calls and Voice Memos Only', wheelLabel: 'Voice Only', description: 'Only communicate via phone call or voice memo today — no text messages allowed.' },
    { id: 'wait-an-hour-to-reply', title: 'Wait an Hour to Reply', wheelLabel: 'Wait to Reply', description: 'Wait exactly one hour before replying to any non-urgent message today.' },
    { id: 'a-week-with-no-gossip', title: 'A Week With No Gossip', wheelLabel: 'No Gossip', description: 'Don\'t complain, criticize, or gossip online or in texts for a full week.' },
    { id: 'send-an-admiration-video', title: 'Send an Admiration Video', wheelLabel: 'Admiration Video', description: 'Send a video message to someone you admire, telling them how they\'ve impacted you.' },
    { id: 'delete-the-overworked-draft', title: 'Delete the Overworked Draft', wheelLabel: 'Delete the Draft', description: 'Delete an unreleased project, draft, or photo you\'ve been obsessing over perfecting.' },
    { id: 'leave-five-glowing-reviews', title: 'Leave Five Glowing Reviews', wheelLabel: '5 Reviews', description: 'Leave a positive, detailed review for 5 local businesses you love.' },
    { id: 'email-a-creator', title: 'Email a Creator', wheelLabel: 'Email a Creator', description: 'Send an email to an author or creator explaining how their work changed your life.' },
    { id: 'reply-to-negativity-with-kindness', title: 'Reply to Negativity With Kindness', wheelLabel: 'Kind Reply', description: 'Reply to a mean or negative comment with pure kindness and understanding.' },
    { id: 'three-hours-of-non-fiction', title: 'Three Hours of Non-Fiction', wheelLabel: '3-Hour Read', description: 'Read a complex non-fiction book for 3 hours straight without stopping.' },
    { id: 'ninety-minutes-one-task', title: 'Ninety Minutes, One Task', wheelLabel: '90-Min Focus', description: 'Work on a single task for 90 minutes without switching tabs or looking away.' },
    { id: 'two-thousand-unedited-words', title: 'Two Thousand Unedited Words', wheelLabel: '2000 Words', description: 'Write 2,000 words of stream-of-consciousness text without editing a single word.' },
    { id: 'an-hour-on-mortality', title: 'An Hour on Mortality', wheelLabel: 'Mortality Hour', description: 'Sit in a dark room for 1 hour meditating on your own mortality.' },
    { id: 'gratitude-until-it-overflows', title: 'Gratitude Until It Overflows', wheelLabel: 'Gratitude Dump', description: 'Spend 30 minutes listing everything you\'re grateful for until you run out or well up.' },
    { id: 'memorize-a-poem', title: 'Memorize a Poem', wheelLabel: 'Memorize a Poem', description: 'Memorize a long poem or speech by heart in one afternoon.' },
    { id: 'deep-clean-your-desktop', title: 'Deep-Clean Your Desktop', wheelLabel: 'Clean Desktop', description: 'Spend an hour deep-cleaning your digital files and desktop until it\'s spotless.' },
    { id: 'count-every-blue-thing', title: 'Count Every Blue Thing', wheelLabel: 'Count Blue', description: 'Sit in a public space and count every blue item you see for 30 minutes.' },
    { id: 'brainstorm-100-bad-ideas', title: 'Brainstorm 100 Bad Ideas', wheelLabel: '100 Bad Ideas', description: 'Spend an evening brainstorming 100 bad ideas for a business or hobby.' },
    { id: 'reset-your-sleep-schedule', title: 'Reset Your Sleep Schedule', wheelLabel: 'Early Bedtime', description: 'Go to sleep at 8:30 PM to reset an erratic sleep schedule.' },
    { id: 'list-what-you-hate', title: 'List What You Hate', wheelLabel: 'List Hates', description: 'Write a list of 10 things you hate about your current life situation.' },
    { id: 'letter-to-younger-you', title: 'Letter to Younger You', wheelLabel: 'Younger Self', description: 'Spend 15 minutes writing a letter to yourself from 10 years ago.' },
    { id: 'letter-to-older-you', title: 'Letter to Older You', wheelLabel: 'Future Self', description: 'Spend 15 minutes writing a letter to yourself, 10 years from now.' },
    { id: 'journal-your-biggest-fear', title: 'Journal Your Biggest Fear', wheelLabel: 'Fear Journal', description: 'Journal extensively about the thing you\'re most afraid will happen this year.' },
    { id: 'track-every-penny', title: 'Track Every Penny', wheelLabel: 'Track Spending', description: 'Track every single penny you spend for the next 30 days without fail.' },
    { id: 'write-your-money-goal', title: 'Write Your Money Goal', wheelLabel: 'Money Goal', description: 'Write down exactly how much money you want to make, and why you haven\'t done it yet.' },
    { id: 'values-vs-reality-check', title: 'Values vs. Reality Check', wheelLabel: 'Values Check', description: 'Write down your personal core values and evaluate where you\'re failing them.' },
    { id: 'map-your-bad-habit', title: 'Map Your Bad Habit', wheelLabel: 'Habit Triggers', description: 'Identify your biggest bad habit and document the exact triggers that cause it.' },
    { id: 'write-your-own-obituary', title: 'Write Your Own Obituary', wheelLabel: 'Write Obituary', description: 'Write your own obituary, as you want to be remembered.' },
    { id: 'read-the-opposing-view', title: 'Read the Opposing View', wheelLabel: 'Opposing View', description: 'Read a long-form essay or book from a perspective you strongly disagree with.' },
    { id: 'root-for-the-other-side', title: 'Root for the Other Side', wheelLabel: 'Root Other Side', description: 'Watch a debate and actively root for the side you typically oppose.' },
    { id: 'admit-you-were-wrong', title: 'Admit You Were Wrong', wheelLabel: 'Admit Wrong', description: 'Admit you were wrong out loud during a disagreement or discussion.' },
    { id: 'listen-all-day-no-opinions', title: 'Listen All Day, No Opinions', wheelLabel: 'Just Listen', description: 'Spend an entire day listening to others without giving your opinion or advice once.' },
    { id: 'hear-them-out-fully', title: 'Hear Them Out Fully', wheelLabel: 'Hear Them Out', description: 'Ask someone you disagree with to explain their worldview without interrupting them.' },
    { id: 'research-the-unknown', title: 'Research the Unknown', wheelLabel: 'Research Unknown', description: 'Research a topic you know nothing about for 2 hours and write a summary.' },
    { id: 'teach-and-take-critique', title: 'Teach and Take Critique', wheelLabel: 'Teach & Critique', description: 'Teach a complex concept to someone else and let them critique your explanation.' },
    { id: 'actually-change-your-mind', title: 'Actually Change Your Mind', wheelLabel: 'Change Your Mind', description: 'Change your mind on a minor belief you\'ve held for years, based on new evidence.' },
    { id: 'attend-an-unfamiliar-service', title: 'Attend an Unfamiliar Service', wheelLabel: 'New Culture', description: 'Attend a religious service or community gathering from a culture different from your own.' },
    { id: 'take-a-different-route', title: 'Take a Different Route', wheelLabel: 'New Route', description: 'Take an entirely different route to work or school, even if it takes longer.' },
    { id: 'rearrange-your-room', title: 'Rearrange Your Room', wheelLabel: 'Rearrange Room', description: 'Rearrange all the furniture in your living room or bedroom today.' },
    { id: 'brush-teeth-on-one-leg', title: 'Brush Teeth on One Leg', wheelLabel: 'One-Leg Brushing', description: 'Brush your teeth while standing on one leg with your eyes closed.' },
    { id: 'out-the-door-in-two-minutes', title: 'Out the Door in Two Minutes', wheelLabel: 'Two-Minute Exit', description: 'Wake up, throw on clothes, and walk out the front door within 2 minutes.' },
    { id: 'watch-your-thoughts', title: 'Watch Your Thoughts', wheelLabel: 'Watch Thoughts', description: 'Spend 1 hour sitting completely still, watching your thoughts pass like clouds.' },
    { id: 'two-weeks-without-news', title: 'Two Weeks Without News', wheelLabel: 'No News', description: 'Stop watching or reading the news for 2 full weeks.' },
    { id: 'hated-chore-first', title: 'Hated Chore First', wheelLabel: 'Hated Chore', description: 'Do your most hated chore first thing in the morning before anything else.' },
    { id: 'new-morning-routine', title: 'New Morning Routine', wheelLabel: 'New Routine', description: 'Change your morning routine completely for one week.' },
    { id: 'plan-your-dream-life', title: 'Plan Your Dream Life', wheelLabel: 'Plan Dream Life', description: 'Spend an evening planning your dream life down to the dollar and the hour.' },
    { id: 'walk-noticeably-slower', title: 'Walk Noticeably Slower', wheelLabel: 'Walk Slower', description: 'Walk at a noticeably slower pace than everyone else on the street.' },
    { id: 'let-yourself-cry', title: 'Let Yourself Cry', wheelLabel: 'Let It Out', description: 'Allow yourself to cry intentionally by accessing a deeply suppressed emotion.' },
    { id: 'forgive-without-an-apology', title: 'Forgive Without an Apology', wheelLabel: 'Forgive Silently', description: 'Forgive someone in your heart who never apologized to you.' },
    { id: 'burn-your-guilt-list', title: 'Burn Your Guilt List', wheelLabel: 'Burn the Guilt', description: 'Write down everything you feel guilty about, then burn the paper.' },
    { id: 'say-i-love-you-first', title: 'Say I Love You First', wheelLabel: 'Say It First', description: 'Tell someone you love them when you aren\'t sure if they\'ll say it back.' },
    { id: 'celebrate-their-success', title: 'Celebrate Their Success', wheelLabel: 'Celebrate Them', description: 'Express authentic enthusiasm for someone else\'s success, even if you feel jealous.' },
    { id: 'send-love-to-your-enemy', title: 'Send Love to Your Enemy', wheelLabel: 'Send Love', description: 'Sit quietly and intentionally send thoughts of love and wellness to your worst enemy.' },
    { id: 'face-a-phobia-safely', title: 'Face a Phobia Safely', wheelLabel: 'Face a Phobia', description: 'Face a phobia directly, in a safe environment — heights, spiders, whatever it is.' },
    { id: 'celebrate-a-small-loss', title: 'Celebrate a Small Loss', wheelLabel: 'Celebrate Losses', description: 'Spend a day treating small losses as learning moments rather than failures.' },
    { id: 'own-the-group-failure', title: 'Own the Group Failure', wheelLabel: 'Own the Failure', description: 'Take 100% responsibility for a group failure, even if it wasn\'t entirely your fault.' },
    { id: 'ask-a-friend-your-worst-traits', title: 'Ask a Friend Your Worst Traits', wheelLabel: 'Worst Traits', description: 'Write down your worst character traits and ask a close friend if they agree.' },
    { id: 'a-day-with-no-excuses', title: 'A Day With No Excuses', wheelLabel: 'No Excuses', description: 'Spend a whole day without making a single excuse for anything you do or fail to do.' },
    { id: 'a-week-without-complaints', title: 'A Week Without Complaints', wheelLabel: 'No Complaining', description: 'Stop complaining about the weather, traffic, or things outside your control for a week.' },
    { id: 'ban-i-cant-for-a-week', title: 'Ban \'I Can\'t\' for a Week', wheelLabel: 'Ban \'I Can\'t\'', description: 'Eliminate the words "I can\'t" from your vocabulary for 7 days.' },
    { id: 'truth-over-a-white-lie', title: 'Truth Over a White Lie', wheelLabel: 'Tell the Truth', description: 'Tell someone the unvarnished truth in a situation where a white lie would be easier.' },
    { id: 'give-away-something-prized', title: 'Give Away Something Prized', wheelLabel: 'Give It Away', description: 'Give away a prized personal possession to someone who needs it more than you.' },
    { id: 'decline-an-obligation', title: 'Decline an Obligation', wheelLabel: 'Say No to Plans', description: 'Say no to a social invitation or obligation you don\'t actually want to attend.' },
    { id: 'cut-the-low-value-tasks', title: 'Cut the Low-Value Tasks', wheelLabel: 'Cut Low-Value', description: 'Spend an hour analyzing your schedule and cutting out all low-value tasks.' },
    { id: 'say-you-deserve-this', title: 'Say You Deserve This', wheelLabel: 'You Deserve This', description: 'Look in a mirror for 10 minutes and say: "I am exactly where I deserve to be."' },
    { id: 'post-a-video-of-yourself', title: 'Post a Video of Yourself', wheelLabel: 'Post a Video', description: 'Record a 5-minute video of yourself speaking on a topic you love and post it.' },
    { id: 'post-your-art', title: 'Post Your Art', wheelLabel: 'Post Your Art', description: 'Sketch a drawing and post it online, even if you think your art skills are terrible.' },
    { id: 'publish-your-first-blog-post', title: 'Publish Your First Blog Post', wheelLabel: 'First Blog Post', description: 'Start a public blog and publish your first entry today.' },
    { id: 'release-a-podcast-episode', title: 'Release a Podcast Episode', wheelLabel: 'Release Podcast', description: 'Record a podcast episode on your phone and release it.' },
    { id: 'pitch-a-crazy-idea', title: 'Pitch a Crazy Idea', wheelLabel: 'Pitch Crazy Idea', description: 'Pitch a wild, unconventional idea to your team or boss at work.' },
    { id: 'create-then-destroy-it', title: 'Create Then Destroy It', wheelLabel: 'Create & Destroy', description: 'Create a piece of art or writing and deliberately destroy it right after.' },
    { id: 'publicly-critique-a-product', title: 'Publicly Critique a Product', wheelLabel: 'Public Critique', description: 'Write a detailed critique of a product you use daily and tag the company.' },
    { id: 'apply-for-the-big-job', title: 'Apply for the Big Job', wheelLabel: 'Dream Job Apply', description: 'Apply for a job you feel completely underqualified for.' },
    { id: 'cold-call-a-business', title: 'Cold Call a Business', wheelLabel: 'Cold Call', description: 'Cold call a business to pitch a collaboration or service.' },
    { id: 'message-a-creator-you-admire', title: 'Message a Creator You Admire', wheelLabel: 'Msg a Creator', description: 'Message a creator you look up to with a valuable insight — no asks attached.' },
    { id: 'pitch-yourself-as-a-guest', title: 'Pitch Yourself as a Guest', wheelLabel: 'Pitch as Guest', description: 'Pitch yourself as a guest on a small podcast.' },
    { id: 'shadow-a-business-owner', title: 'Shadow a Business Owner', wheelLabel: 'Shadow for a Day', description: 'Ask a local business owner if you can shadow them for a day, for free.' },
    { id: 'network-with-three-strangers', title: 'Network With Three Strangers', wheelLabel: 'Network x3', description: 'Network with 3 strangers at a local meetup or event.' },
    { id: 'comment-on-ten-posts', title: 'Comment on Ten Posts', wheelLabel: '10 Comments', description: 'Leave an insightful comment on 10 different posts in your field today.' },
    { id: 'volunteer-your-skills', title: 'Volunteer Your Skills', wheelLabel: 'Charity Work', description: 'Offer to do a free project for a charity or non-profit to build your portfolio.' },
    { id: 'write-to-a-ceo', title: 'Write to a CEO', wheelLabel: 'Letter to a CEO', description: 'Send a physical letter to a CEO or founder of a company you admire.' },
    { id: 'four-hours-one-project', title: 'Four Hours, One Project', wheelLabel: '4-Hour Focus', description: 'Work on a single high-priority project for 4 hours without checking email or chat.' },
    { id: 'a-thousand-words-no-editing', title: 'A Thousand Words, No Editing', wheelLabel: '1000 Words Fast', description: 'Write a 1,000-word article in under 30 minutes without stopping to edit.' },
    { id: 'stand-all-workday', title: 'Stand All Workday', wheelLabel: 'Standing Workday', description: 'Spend an entire workday standing up instead of sitting down.' },
    { id: 'two-hours-earlier-for-yourself', title: 'Two Hours Earlier for Yourself', wheelLabel: 'Early for You', description: 'Wake up 2 hours earlier than usual to work on a personal passion project.' },
    { id: 'inbox-zero', title: 'Inbox Zero', wheelLabel: 'Inbox Zero', description: 'Go through your email inbox and clear it to absolute zero.' },
    { id: 'an-isolation-day', title: 'An Isolation Day', wheelLabel: 'Isolation Day', description: 'Block out a full day with no meetings, no calls — deep work only.' },
    { id: 'map-the-whole-launch', title: 'Map the Whole Launch', wheelLabel: 'Map the Launch', description: 'Spend 2 hours mapping every step required to launch your next big project.' },
    { id: 'finish-the-procrastinated-project', title: 'Finish the Procrastinated Project', wheelLabel: 'Finish It Now', description: 'Finish a project you\'ve been procrastinating on for over a month, in one sprint.' },
    { id: 'fifteen-minute-desk-sprint', title: 'Fifteen-Minute Desk Sprint', wheelLabel: 'Desk Sprint', description: 'Set a 15-minute timer and clean your desk as fast as possible until it\'s flawless.' },
    { id: 'find-three-costs-to-cut', title: 'Find Three Costs to Cut', wheelLabel: 'Cut 3 Costs', description: 'Review your finances from the past year and find 3 unnecessary costs to cut.' },
    { id: 'learn-to-code-in-an-afternoon', title: 'Learn to Code in an Afternoon', wheelLabel: 'Learn to Code', description: 'Pick up the absolute basics of a programming language in one afternoon.' },
    { id: 'try-a-new-instrument', title: 'Try a New Instrument', wheelLabel: 'New Instrument', description: 'Pick up an instrument you don\'t know how to play and practice for 2 hours.' },
    { id: 'learn-to-juggle', title: 'Learn to Juggle', wheelLabel: 'Learn to Juggle', description: 'Learn how to juggle 3 objects in one weekend.' },
    { id: 'summarize-a-technical-paper', title: 'Summarize a Technical Paper', wheelLabel: 'Summarize Paper', description: 'Read a technical paper outside your field and try to summarize it.' },
    { id: 'practice-public-speaking', title: 'Practice Public Speaking', wheelLabel: 'Practice Speech', description: 'Spend an hour practicing public speaking in front of a mirror or camera.' },
    { id: 'learn-five-essential-knots', title: 'Learn Five Essential Knots', wheelLabel: 'Five Knots', description: 'Learn how to tie 5 essential utility knots by heart.' },
    { id: 'count-to-ten-in-five-languages', title: 'Count to Ten in Five Languages', wheelLabel: '5 Languages', description: 'Learn how to count to 10 in 5 different languages today.' },
    { id: 'memorize-a-deck-of-cards', title: 'Memorize a Deck of Cards', wheelLabel: 'Memorize Cards', description: 'Study a memory technique and use it to memorize a full deck of cards.' },
    { id: 'teach-your-best-skill', title: 'Teach Your Best Skill', wheelLabel: 'Teach Your Skill', description: 'Teach a friend a skill you\'ve mastered, until they can do it themselves.' },
    { id: 'decline-a-bad-client', title: 'Decline a Bad Client', wheelLabel: 'Decline a Client', description: 'Say no to a low-paying or high-stress client or project.' },
    { id: 'auto-reply-and-disconnect', title: 'Auto-Reply and Disconnect', wheelLabel: 'Auto-Reply Setup', description: 'Set an auto-responder on your work email stating you only check it twice a day.' },
    { id: 'delegate-a-task-you-love', title: 'Delegate a Task You Love', wheelLabel: 'Delegate It', description: 'Delegate a task you love doing but know you shouldn\'t be handling anymore.' },
    { id: 'fire-a-toxic-client', title: 'Fire a Toxic Client', wheelLabel: 'Fire a Client', description: 'Fire a toxic or problematic client, customer, or partner.' },
    { id: 'leave-the-laptop-at-work', title: 'Leave the Laptop at Work', wheelLabel: 'Laptop Stays', description: 'Leave your work laptop at the office over the weekend — no checking email from home.' },
    { id: 'no-work-messages-after-five', title: 'No Work Messages After Five', wheelLabel: 'No Work After 5', description: 'Stop checking work messages after 5:00 PM for an entire week.' },
    { id: 'give-direct-feedback', title: 'Give Direct Feedback', wheelLabel: 'Direct Feedback', description: 'Give constructive, direct, kind feedback to a colleague who is underperforming.' },
    { id: 'pitch-to-the-executives', title: 'Pitch to the Executives', wheelLabel: 'Pitch to Execs', description: 'Pitch a radical strategy change to your company\'s leadership team.' },
    { id: 'four-liters-a-day', title: 'Four Liters a Day', wheelLabel: '4L Water Week', description: 'Drink 4 liters of water every day for a full week.' },
    { id: 'three-days-no-caffeine', title: 'Three Days No Caffeine', wheelLabel: 'No Caffeine', description: 'Do not drink any caffeine for 3 days straight.' },
    { id: 'a-week-of-whole-foods', title: 'A Week of Whole Foods', wheelLabel: 'Whole Foods Week', description: 'Eat only whole, single-ingredient foods for an entire week.' },
    { id: 'swap-coffee-for-tea', title: 'Swap Coffee for Tea', wheelLabel: 'Swap the Coffee', description: 'Swap your morning coffee for a cup of plain warm water or green tea.' },
    { id: 'three-days-plant-based', title: 'Three Days Plant-Based', wheelLabel: 'Plant-Based', description: 'Eat a completely plant-based diet for 3 days.' },
    { id: 'a-month-with-no-fast-food', title: 'A Month With No Fast Food', wheelLabel: 'No Fast Food', description: 'Do not eat any fast food or takeout for a month.' },
    { id: 'two-weeks-no-soda', title: 'Two Weeks No Soda', wheelLabel: 'No Soda', description: 'Cut out all carbonated sodas and drinks for two weeks.' },
    { id: 'a-week-without-snacking', title: 'A Week Without Snacking', wheelLabel: 'No Snacking', description: 'Fast from all snacks between meals for a week.' },
    { id: 'flip-your-biggest-meal', title: 'Flip Your Biggest Meal', wheelLabel: 'Flip Meals', description: 'Eat your largest meal of the day as breakfast, and have a tiny dinner.' },
    { id: 'eat-a-meal-blindfolded', title: 'Eat a Meal Blindfolded', wheelLabel: 'Blindfolded Meal', description: 'Eat a meal completely blindfolded to enhance your sense of taste.' },
    { id: 'raw-garlic-in-the-morning', title: 'Raw Garlic in the Morning', wheelLabel: 'Raw Garlic', description: 'Eat a raw clove of garlic or a slice of ginger first thing in the morning.' },
    { id: 'a-week-of-floor-meals', title: 'A Week of Floor Meals', wheelLabel: 'Floor Meals', description: 'Sit on the floor to eat all of your meals for a week.' },
    { id: 'cook-for-someone-else', title: 'Cook for Someone Else', wheelLabel: 'Cook for Them', description: 'Prepare a meal for someone else based entirely on their favorite foods, not yours.' },
    { id: 'water-before-every-meal', title: 'Water Before Every Meal', wheelLabel: 'Water First', description: 'Drink a glass of water before every single snack or meal today.' },
    { id: 'stop-at-eighty-percent', title: 'Stop at Eighty Percent', wheelLabel: 'Stop at 80%', description: 'Stop eating immediately when you feel 80% full.' },
    { id: 'perfect-bed-thirty-days', title: 'Perfect Bed, Thirty Days', wheelLabel: '30-Day Bed', description: 'Make your bed perfectly within 2 minutes of waking up, for 30 days straight.' },
    { id: 'zero-dishes-in-the-sink', title: 'Zero Dishes in the Sink', wheelLabel: 'Zero Dishes', description: 'Wash every dish immediately after using it — never let one sit in the sink today.' },
    { id: 'vacuum-every-day', title: 'Vacuum Every Day', wheelLabel: 'Daily Vacuum', description: 'Vacuum or sweep your entire living space every single day for a week.' },
    { id: 'hotel-level-bathroom', title: 'Hotel-Level Bathroom', wheelLabel: 'Clean Bathroom', description: 'Deep clean your toilet and bathroom until it looks like a hotel.' },
    { id: 'empty-trash-at-half-full', title: 'Empty Trash at Half-Full', wheelLabel: 'Empty Trash', description: 'Empty your trash cans the moment they hit half-full, for a week.' },
    { id: 'wipe-every-high-touch-surface', title: 'Wipe Every High-Touch Surface', wheelLabel: 'Wipe Surfaces', description: 'Wipe down all high-touch surfaces — doorknobs, light switches — in your house today.' },
    { id: 'organize-your-closet', title: 'Organize Your Closet', wheelLabel: 'Organize Closet', description: 'Organize your closet by clothing type and color.' },
    { id: 'donate-five-books', title: 'Donate Five Books', wheelLabel: 'Donate 5 Books', description: 'Throw away or donate 5 books you know you\'ll never read again.' },
    { id: 'wash-all-your-bedding', title: 'Wash All Your Bedding', wheelLabel: 'Wash Bedding', description: 'Wash all your bedding, sheets, and pillowcases today.' },
    { id: 'deep-clean-your-car', title: 'Deep Clean Your Car', wheelLabel: 'Clean the Car', description: 'Clean out your car\'s interior until there is zero dust or clutter.' },
    { id: 'twenty-minutes-of-foam-rolling', title: 'Twenty Minutes of Foam Rolling', wheelLabel: 'Foam Roll', description: 'Spend 20 minutes foam rolling or deeply massaging tight muscle groups.' },
    { id: 'deep-body-twist-stretch', title: 'Deep Body Twist Stretch', wheelLabel: 'Twist Stretch', description: 'Sit in a deep body twist stretch for 5 minutes per side.' },
    { id: 'fifty-calf-raises', title: 'Fifty Calf Raises', wheelLabel: 'Calf Raises', description: 'Do 50 calf raises while waiting for your food to cook or coffee to brew.' },
    { id: 'hang-from-every-doorway', title: 'Hang From Every Doorway', wheelLabel: 'Doorway Hangs', description: 'Hang from a door frame or bar for 60 seconds every time you walk through one today.' },
    { id: 'neck-and-jaw-mobility', title: 'Neck and Jaw Mobility', wheelLabel: 'Jaw Mobility', description: 'Spend 15 minutes doing neck and jaw mobility exercises.' },
    { id: 'walk-backwards-at-home', title: 'Walk Backwards at Home', wheelLabel: 'Backward Walk', description: 'Walk backwards around your backyard or living room for 10 minutes.' },
    { id: 'hourly-jumping-jacks', title: 'Hourly Jumping Jacks', wheelLabel: 'Hourly Jacks', description: 'Do 20 jumping jacks every hour on the hour during your workday.' },
    { id: 'ten-minutes-of-balance-work', title: 'Ten Minutes of Balance Work', wheelLabel: 'Balance Work', description: 'Spend 10 minutes doing balance work — standing on one foot with eyes closed.' },
    { id: 'walk-after-a-heavy-meal', title: 'Walk After a Heavy Meal', wheelLabel: 'Post-Meal Walk', description: 'Go for a brisk walk immediately after eating a heavy dinner.' },
    { id: 'fifteen-minutes-of-box-breathing', title: 'Fifteen Minutes of Box Breathing', wheelLabel: 'Box Breathing', description: 'Practice deep, rhythmic box breathing — 4s in, 4s hold, 4s out, 4s hold — for 15 minutes.' },
    { id: 'a-week-of-consistent-sleep', title: 'A Week of Consistent Sleep', wheelLabel: 'Consistent Sleep', description: 'Go to sleep and wake up at the exact same time for 7 days straight, weekends included.' },
    { id: 'wind-down-with-fiction', title: 'Wind Down With Fiction', wheelLabel: 'Wind Down', description: 'Spend the last 30 minutes of your day reading a fiction book under dim lighting.' },
    { id: 'log-your-day-in-15-minutes', title: 'Log Your Day in 15 Minutes', wheelLabel: 'Log Your Day', description: 'Keep an accurate log of every activity you do in 15-minute increments today.' },
    { id: 'block-blue-light-after-six', title: 'Block Blue Light After Six', wheelLabel: 'Block Blue Light', description: 'Wear blue-light blocking glasses or turn off overhead lights after 6:00 PM.' },
    { id: 'a-pitch-black-bedroom', title: 'A Pitch-Black Bedroom', wheelLabel: 'Pitch-Black Room', description: 'Set up your bedroom so it\'s pitch black — no visible standby lights anywhere.' },
    { id: 'tomorrows-top-priority', title: 'Tomorrow\'s Top Priority', wheelLabel: 'Top Priority', description: 'Write down your top priority for the next day before you go to sleep.' },
    { id: 'ten-minutes-of-morning-sun', title: 'Ten Minutes of Morning Sun', wheelLabel: 'Morning Sun', description: 'Spend 10 minutes sitting in the sun immediately after waking up.' },
    { id: 'move-the-alarm-clock', title: 'Move the Alarm Clock', wheelLabel: 'Move Your Alarm', description: 'Put your alarm clock on the opposite side of the room so you have to get up to stop it.' },
    { id: 'an-hour-of-total-darkness', title: 'An Hour of Total Darkness', wheelLabel: 'Darkness Hour', description: 'Spend an hour in complete darkness before going to sleep.' },
    { id: 'cancel-three-subscriptions', title: 'Cancel Three Subscriptions', wheelLabel: 'Cancel 3 Subs', description: 'Cancel three subscription services you haven\'t used in the past month.' },
    { id: 'a-fifteen-dollar-grocery-run', title: 'A Fifteen-Dollar Grocery Run', wheelLabel: '$15 Groceries', description: 'Go grocery shopping with a strict budget of $15 for 3 days of food.' },
    { id: 'sell-something-today', title: 'Sell Something Today', wheelLabel: 'Sell Something', description: 'Look through your house for items to sell on an online marketplace today.' },
    { id: 'calculate-your-net-worth', title: 'Calculate Your Net Worth', wheelLabel: 'Net Worth Check', description: 'Calculate your exact net worth, down to the cent.' },
    { id: 'flag-last-months-impulse-buys', title: 'Flag Last Month\'s Impulse Buys', wheelLabel: 'Flag Impulses', description: 'Go through your bank statement and flag every impulse purchase from last month.' },
    { id: 'an-uncomfortable-savings-transfer', title: 'An Uncomfortable Savings Transfer', wheelLabel: 'Savings Transfer', description: 'Set up an automatic transfer to savings that makes your main account feel uncomfortably low.' },
    { id: 'find-five-free-things', title: 'Find Five Free Things', wheelLabel: '5 Free Things', description: 'Find 5 free things to do in your city that you\'ve never tried before.' },
    { id: 'a-gourmet-leftovers-meal', title: 'A Gourmet Leftovers Meal', wheelLabel: 'Leftover Feast', description: 'Cook a gourmet meal using only random leftovers found in your pantry and freezer.' },
    { id: 'delete-saved-card-details', title: 'Delete Saved Card Details', wheelLabel: 'Delete Cards', description: 'Delete your saved credit card details from all online shopping sites.' },
    { id: 'navigate-with-a-paper-map', title: 'Navigate With a Paper Map', wheelLabel: 'Paper Map', description: 'Navigate to a specific point in your city using only a physical paper map.' },
    { id: 'point-true-north', title: 'Point True North', wheelLabel: 'Find True North', description: 'Try to point exactly toward true North without looking at a compass.' },
    { id: 'find-your-way-home-by-asking', title: 'Find Your Way Home by Asking', wheelLabel: 'Ask Way Home', description: 'Navigate home from an unfamiliar location by asking people for directions.' },
    { id: 'learn-to-read-a-topo-map', title: 'Learn to Read a Topo Map', wheelLabel: 'Topo Maps', description: 'Spend an hour learning how to read topographic maps and trail markings.' },
    { id: 'find-three-constellations', title: 'Find Three Constellations', wheelLabel: 'Stargazing', description: 'Go stargazing and identify at least 3 distinct constellations.' },
    { id: 'explore-a-new-nature-reserve', title: 'Explore a New Nature Reserve', wheelLabel: 'New Trail', description: 'Explore a local nature reserve or trail you\'ve never visited before.' },
    { id: 'ride-the-line-to-the-end', title: 'Ride the Line to the End', wheelLabel: 'Ride to the End', description: 'Take a random bus or train route to the end of the line and explore the area.' },
    { id: 'notice-ten-architectural-details', title: 'Notice Ten Architectural Details', wheelLabel: '10 Details', description: 'Walk around your city and notice 10 architectural details you\'ve never seen before.' },
    { id: 'a-midnight-walk', title: 'A Midnight Walk', wheelLabel: 'Midnight Walk', description: 'Go for a midnight walk in a safe, well-lit area to experience your town in silence.' },
    { id: 'start-a-fire-with-flint', title: 'Start a Fire With Flint', wheelLabel: 'Flint Fire', description: 'Learn how to start a fire using flint and steel, where safe and legal.' },
    { id: 'sharpen-a-kitchen-knife', title: 'Sharpen a Kitchen Knife', wheelLabel: 'Sharpen a Knife', description: 'Learn how to sharpen a kitchen knife properly using a whetstone.' },
    { id: 'mend-a-tear-by-hand', title: 'Mend a Tear by Hand', wheelLabel: 'Mend by Hand', description: 'Learn how to mend a tear in your clothes or sew a button back on by hand.' },
    { id: 'change-a-flat-tire', title: 'Change a Flat Tire', wheelLabel: 'Change a Tire', description: 'Learn how to change a flat tire on a car efficiently.' },
    { id: 'learn-basic-first-aid', title: 'Learn Basic First Aid', wheelLabel: 'Basic First Aid', description: 'Learn basic first aid procedures — CPR, the Heimlich maneuver, wound dressing.' },
    { id: 'purify-your-own-water', title: 'Purify Your Own Water', wheelLabel: 'Purify Water', description: 'Purify tap water using a field filter or by boiling it over a camp stove.' },
    { id: 'bake-bread-from-scratch', title: 'Bake Bread From Scratch', wheelLabel: 'Bake Bread', description: 'Bake a loaf of bread completely from scratch using raw ingredients.' },
    { id: 'identify-edible-wild-plants', title: 'Identify Edible Wild Plants', wheelLabel: 'Wild Plants', description: 'Learn to identify 3 edible wild plants that grow in your local area.' },
    { id: 'pack-an-emergency-bag', title: 'Pack an Emergency Bag', wheelLabel: 'Emergency Bag', description: 'Pack an emergency go-bag with all your essential items and documents.' },
    { id: 'take-something-apart', title: 'Take Something Apart', wheelLabel: 'Disassemble It', description: 'Disassemble a broken household item to see how it works, then reassemble it.' },
    { id: 'an-hour-in-a-dark-closet', title: 'An Hour in a Dark Closet', wheelLabel: 'Dark Closet Hour', description: 'Spend 1 hour sitting in a dark closet without any sound or stimulation.' },
    { id: 'an-afternoon-of-earplugs', title: 'An Afternoon of Earplugs', wheelLabel: 'Earplug Hours', description: 'Spend an afternoon wearing earplugs, navigating life using only your visual sense.' },
    { id: 'cook-by-smell-and-taste', title: 'Cook by Smell and Taste', wheelLabel: 'Cook by Feel', description: 'Cook a meal using only your sense of smell and taste to judge seasoning — no measuring.' },
    { id: 'isolate-ten-sounds', title: 'Isolate Ten Sounds', wheelLabel: 'Isolate Sounds', description: 'Spend 30 minutes outside trying to isolate and identify 10 distinct sounds.' },
    { id: 'walk-your-house-in-the-dark', title: 'Walk Your House in the Dark', wheelLabel: 'Dark House Walk', description: 'Walk through your own house in total darkness without bumping into anything.' },
    { id: 'touch-twenty-textures', title: 'Touch Twenty Textures', wheelLabel: '20 Textures', description: 'Touch 20 different textures in nature — bark, moss, stones, dirt — and focus on the feeling.' },
    { id: 'watch-your-pupils-move', title: 'Watch Your Pupils Move', wheelLabel: 'Watch Pupils', description: 'Sit in front of a mirror and watch your pupils dilate and constrict in response to light.' },
    { id: 'a-vow-of-silence', title: 'A Vow of Silence', wheelLabel: 'Vow of Silence', description: 'Go a whole day without speaking a single word out loud.' },
    { id: 'eat-with-your-eyes-closed', title: 'Eat With Your Eyes Closed', wheelLabel: 'Eyes-Closed Meal', description: 'Eat a meal with your eyes closed, focusing entirely on texture and temperature.' },
    { id: 'track-an-insect', title: 'Track an Insect', wheelLabel: 'Track an Insect', description: 'Spend 30 minutes tracking a single insect\'s movement through a garden.' },
    { id: 'an-hour-with-no-clock', title: 'An Hour With No Clock', wheelLabel: 'No Clock Hour', description: 'Sit still and do nothing for exactly 60 minutes — track the time only in your head.' },
    { id: 'a-day-with-no-clocks', title: 'A Day With No Clocks', wheelLabel: 'Clockless Sunday', description: 'Fast from all clocks, watches, and time indicators for an entire Sunday.' },
    { id: 'a-day-on-your-own-rhythm', title: 'A Day on Your Own Rhythm', wheelLabel: 'Natural Rhythm', description: 'Spend a day operating purely on your body\'s natural rhythms — eat when hungry, sleep when tired.' },
    { id: 'trace-an-insecurity-to-its-root', title: 'Trace an Insecurity to Its Root', wheelLabel: 'Trace Insecurity', description: 'Spend 2 hours analyzing your childhood to find the root of a current insecurity.' },
    { id: 'write-your-philosophy', title: 'Write Your Philosophy', wheelLabel: 'Write Philosophy', description: 'Spend an hour writing your personal philosophy on life, death, and happiness.' },
    { id: 'watch-a-river-for-two-hours', title: 'Watch a River for Two Hours', wheelLabel: 'Watch the River', description: 'Sit by a flowing river or stream and watch the water pass for 2 hours.' },
    { id: 'a-midnight-work-session', title: 'A Midnight Work Session', wheelLabel: 'Midnight Session', description: 'Wake up at midnight and spend 1 hour working on your most important goal before going back to sleep.' },
    { id: 'review-your-life-goals', title: 'Review Your Life Goals', wheelLabel: 'Review Goals', description: 'Spend 3 hours reviewing your life goals and updating them based on who you are today.' },
    { id: 'wear-a-visible-temp-tattoo', title: 'Wear a Visible Temp Tattoo', wheelLabel: 'Temp Tattoo', description: 'Wear a temporary tattoo in a highly visible place, like your neck, for a day.' },
    { id: 'talk-to-an-inanimate-object', title: 'Talk to an Inanimate Object', wheelLabel: 'Talk to Objects', description: 'Talk to an inanimate object, like a plant or vending machine, politely in public.' },
    { id: 'walk-a-balloon-like-treasure', title: 'Walk a Balloon Like Treasure', wheelLabel: 'Balloon Walk', description: 'Walk down the street carrying a single balloon as if it were a highly valuable item.' },
    { id: 'ask-for-invisible-ink', title: 'Ask for Invisible Ink', wheelLabel: 'Invisible Ink', description: 'Ask a store employee where they keep the "invisible ink," or another fictional product.' },
    { id: 'pay-in-slow-counted-coins', title: 'Pay in Slow, Counted Coins', wheelLabel: 'Pay in Coins', description: 'Pay for a minor item using only coins, counting them out very slowly.' },
    { id: 'wear-two-mismatched-socks', title: 'Wear Two Mismatched Socks', wheelLabel: 'Mismatched Socks', description: 'Wear two completely different colored socks out in public, intentionally.' },
    { id: 'walk-a-stuffed-animal', title: 'Walk a Stuffed Animal', wheelLabel: 'Stuffed Animal', description: 'Walk a stuffed animal on a leash through a public park for 10 minutes.' },
    { id: 'settle-a-mundane-debate', title: 'Settle a Mundane Debate', wheelLabel: 'Settle a Debate', description: 'Ask a stranger to help settle a mundane debate, like whether a hot dog is a sandwich.' },
    { id: 'sunglasses-indoors-all-day', title: 'Sunglasses Indoors All Day', wheelLabel: 'Indoor Shades', description: 'Wear sunglasses indoors for an entire day, including during conversations.' },
    { id: 'give-a-driver-a-big-thumbs-up', title: 'Give a Driver a Big Thumbs-Up', wheelLabel: 'Thumbs-Up Driver', description: 'Give an enthusiastic, slow-motion double thumbs-up to a passing driver.' },
    { id: 'leave-a-funny-face-on-a-mirror', title: 'Leave a Funny Face on a Mirror', wheelLabel: 'Funny Face Note', description: 'Draw a funny face on a sticky note and leave it on a public mirror.' },
    { id: 'hide-a-note-in-a-bookstore-book', title: 'Hide a Note in a Bookstore Book', wheelLabel: 'Hidden Note', description: 'Leave an encouraging note hidden inside a random book at a local bookstore.' },
    { id: 'hide-a-painted-rock', title: 'Hide a Painted Rock', wheelLabel: 'Painted Rock', description: 'Leave a hidden rock painted with a smiling face on a park bench.' },
    { id: 'chalk-a-hopscotch-grid', title: 'Chalk a Hopscotch Grid', wheelLabel: 'Chalk Hopscotch', description: 'Draw a hopscotch grid on a public sidewalk using chalk and watch people use it.' },
    { id: 'hold-an-encouraging-sign', title: 'Hold an Encouraging Sign', wheelLabel: 'Encouraging Sign', description: 'Stand on a street corner holding a sign that says "You are doing great."' },
    { id: 'leave-a-flower-and-a-note', title: 'Leave a Flower and a Note', wheelLabel: 'Flower Note', description: 'Leave a flower on a stranger\'s car windshield with a kind note.' },
    { id: 'give-an-object-a-backstory', title: 'Give an Object a Backstory', wheelLabel: 'Object Backstory', description: 'Give a completely fictional, dramatic backstory to a mundane object you own.' },
    { id: 'write-a-paperclip-review', title: 'Write a Paperclip Review', wheelLabel: 'Paperclip Review', description: 'Spend 30 minutes writing a satirical review for an everyday item like a paperclip.' },
    { id: 'fold-and-leave-a-paper-crane', title: 'Fold and Leave a Paper Crane', wheelLabel: 'Paper Crane', description: 'Fold a tiny paper crane and leave it on a public bus or train seat.' },
    { id: 'wear-a-homemade-cape', title: 'Wear a Homemade Cape', wheelLabel: 'Homemade Cape', description: 'Wear a homemade superhero cape while running your regular weekend errands.' },
    { id: 'total-honesty-for-a-day', title: 'Total Honesty for a Day', wheelLabel: 'Total Honesty', description: 'Answer every question today with absolute honesty, avoiding polite pleasantries.' },
    { id: 'use-a-new-word-three-times', title: 'Use a New Word Three Times', wheelLabel: 'New Word x3', description: 'Use a word you\'ve never used before in conversation at least 3 times today.' },
    { id: 'speak-slightly-softer', title: 'Speak Slightly Softer', wheelLabel: 'Speak Softer', description: 'Speak slightly softer than usual today, so people have to lean in to hear you.' },
    { id: 'conviction-about-the-trivial', title: 'Conviction About the Trivial', wheelLabel: 'Trivial Topic', description: 'Speak with total conviction about a completely unimportant topic, like the best pen.' },
    { id: 'pause-before-every-response', title: 'Pause Before Every Response', wheelLabel: 'Pause First', description: 'Pause for a full 3 seconds before responding to anything anyone says today.' },
    { id: 'ask-a-deep-question-out-of-nowhere', title: 'Ask a Deep Question Out of Nowhere', wheelLabel: 'Deep Question', description: 'Ask someone an unexpectedly deep question, like "What is your biggest regret?"' },
    { id: 'tell-a-stranger-a-joke', title: 'Tell a Stranger a Joke', wheelLabel: 'Stranger Joke', description: 'Tell a joke to a stranger, even if you\'re terrible at delivering punchlines.' },
    { id: 'short-sentences-only', title: 'Short Sentences Only', wheelLabel: 'Short Sentences', description: 'Speak using only short, direct sentences for a 2-hour period.' },
    { id: 'mirror-their-body-language', title: 'Mirror Their Body Language', wheelLabel: 'Mirror Body', description: 'Mirror the body language of the person you\'re talking to for an entire meeting.' },
    { id: 'compliment-a-personality-trait', title: 'Compliment a Personality Trait', wheelLabel: 'Real Compliment', description: 'Compliment someone on a personality trait rather than their physical appearance.' },
    { id: 'a-dramatic-theatrical-bow', title: 'A Dramatic Theatrical Bow', wheelLabel: 'Theatrical Bow', description: 'Do a dramatic theatrical bow after finishing a completely normal task in front of others.' },
    { id: 'stretch-dramatically-in-a-library', title: 'Stretch Dramatically in a Library', wheelLabel: 'Library Stretch', description: 'Stand up and stretch dramatically in the middle of a quiet library or study space.' },
    { id: 'act-like-a-billionaire-shopping', title: 'Act Like a Billionaire Shopping', wheelLabel: 'Billionaire Act', description: 'Walk into a luxury store acting like a billionaire buyer.' },
    { id: 'play-a-song-with-a-street-performer', title: 'Play a Song With a Street Performer', wheelLabel: 'Join the Busker', description: 'Ask a street performer if you can play or sing one song with them.' },
    { id: 'try-an-open-mic-with-no-prep', title: 'Try an Open Mic With No Prep', wheelLabel: 'Open Mic', description: 'Enter a local talent show or open mic night with zero preparation.' },
    { id: 'ask-strangers-for-a-group-selfie', title: 'Ask Strangers for a Group Selfie', wheelLabel: 'Group Selfie', description: 'Ask a public group if you can take a group selfie with them, like old friends.' },
    { id: 'do-jumping-jacks-in-an-elevator', title: 'Do Jumping Jacks in an Elevator', wheelLabel: 'Elevator Jacks', description: 'Do 10 jumping jacks inside an elevator while other people are in it.' },
    { id: 'give-a-five-minute-tour-of-your-city', title: 'Give a Five-Minute Tour of Your City', wheelLabel: 'City Tour Guide', description: 'Pretend to be a tour guide in your own city for 5 minutes to friends or strangers.' },
    { id: 'read-a-book-out-loud-while-walking', title: 'Read a Book Out Loud While Walking', wheelLabel: 'Read Out Loud', description: 'Walk down a busy street while reading a physical book out loud.' },
    { id: 'applaud-a-normal-act', title: 'Applaud a Normal Act', wheelLabel: 'Applaud Normal', description: 'Start clapping enthusiastically for someone who just did something totally ordinary.' },
    { id: 'wear-tape-on-your-forehead', title: 'Wear Tape on Your Forehead', wheelLabel: 'Tape on Forehead', description: 'Walk through a crowded area with a piece of tape on your forehead.' },
    { id: 'sit-facing-the-wrong-way', title: 'Sit Facing the Wrong Way', wheelLabel: 'Backwards Bench', description: 'Sit backwards on a public bench, facing away from the street.' },
    { id: 'ask-to-cook-your-own-meal', title: 'Ask to Cook Your Own Meal', wheelLabel: 'Cook It Yourself', description: 'Ask a restaurant if you can cook your own meal in their kitchen — expect a hard no.' },
    { id: 'hold-a-tell-me-your-secrets-sign', title: 'Hold a \'Tell Me Your Secrets\' Sign', wheelLabel: 'Secrets Sign', description: 'Stand in a public square holding a sign that reads "Tell me your secrets."' },
    { id: 'carry-an-empty-fragile-box', title: 'Carry an Empty Fragile Box', wheelLabel: 'Fragile Box', description: 'Walk around a busy shopping center carrying an empty box marked "Fragile."' },
    { id: 'walk-a-block-with-a-stranger', title: 'Walk a Block With a Stranger', wheelLabel: 'Walk a Stranger', description: 'Ask a stranger if you can walk with them for one block, practicing socializing.' },
    { id: 'try-on-the-most-ridiculous-outfit', title: 'Try On the Most Ridiculous Outfit', wheelLabel: 'Wild Outfit', description: 'Try on the most ridiculous outfit you can find in a store and ask the clerk for feedback.' },
    { id: 'ask-for-the-ministry-of-silly-walks', title: 'Ask for the Ministry of Silly Walks', wheelLabel: 'Silly Walks', description: 'Walk into an office building and ask the front desk for the "Ministry of Silly Walks."' },
    { id: 'stand-smiling-in-the-rain', title: 'Stand Smiling in the Rain', wheelLabel: 'Smile in Rain', description: 'Stand outside in the rain without an umbrella, looking up at the sky with a big smile.' },
    { id: 'laugh-for-sixty-seconds-straight', title: 'Laugh for Sixty Seconds Straight', wheelLabel: 'Laugh 60 Seconds', description: 'Sit in a public park and laugh out loud for 60 seconds straight, with no stimulus.' },
    { id: '300-squats-in-a-day', title: '300 Squats in a Day', wheelLabel: '300 Squats', description: 'Do 300 squats spread throughout the course of a single day.' },
    { id: 'ten-kilometers-wet-socks', title: 'Ten Kilometers, Wet Socks', wheelLabel: 'Wet Sock Walk', description: 'Walk 10 kilometers with wet socks and shoes — embrace the friction.' },
    { id: 'a-one-hour-total-plank', title: 'A One-Hour Total Plank', wheelLabel: '1-Hour Plank', description: 'Complete a cumulative 1 hour of plank position, in as few sets as possible.' },
    { id: 'a-weighted-ten-mile-walk', title: 'A Weighted Ten-Mile Walk', wheelLabel: 'Weighted Miles', description: 'Complete a 10-mile walk carrying a backpack loaded with 15kg of weight.' },
    { id: '100-push-ups-a-day-all-week', title: '100 Push-Ups a Day, All Week', wheelLabel: 'Push-Up Week', description: 'Do 100 push-ups every single day for a full week.' },
    { id: 'a-3-am-run', title: 'A 3 AM Run', wheelLabel: '3 AM Run', description: 'Wake up at 3:00 AM, run 3 kilometers, and go right back to sleep.' },
    { id: 'a-freezing-shower-before-bed', title: 'A Freezing Shower Before Bed', wheelLabel: 'Bedtime Cold', description: 'Take a 5-minute freezing cold shower right before you go to bed.' },
    { id: 'twelve-hours-outdoors', title: 'Twelve Hours Outdoors', wheelLabel: '12 Hours Outside', description: 'Spend 12 hours straight outdoors in nature without going inside once.' },
    { id: 'a-ten-minute-wall-sit', title: 'A Ten-Minute Wall Sit', wheelLabel: '10-Min Wall Sit', description: 'Perform a 10-minute wall sit split across only two sets.' },
    { id: 'an-all-out-5k', title: 'An All-Out 5K', wheelLabel: 'Max Effort 5K', description: 'Run a 5K time trial at your absolute maximum capacity.' },
    { id: 'four-hours-of-total-stillness', title: 'Four Hours of Total Stillness', wheelLabel: '4-Hour Stillness', description: 'Sit alone in a room for 4 hours with absolutely no stimulation or movement.' },
    { id: 'a-400-page-book-this-weekend', title: 'A 400-Page Book This Weekend', wheelLabel: '400-Page Weekend', description: 'Read an entire 400-page non-fiction book in one single weekend.' },
    { id: 'a-5-000-word-life-essay', title: 'A 5,000-Word Life Essay', wheelLabel: '5000-Word Essay', description: 'Write a 5,000-word essay on your life goals and philosophies in a single day.' },
    { id: 'erase-your-digital-footprint', title: 'Erase Your Digital Footprint', wheelLabel: 'Digital Purge', description: 'Delete your entire digital footprint — old accounts, unused emails, social histories.' },
    { id: '5-am-all-week-no-snooze', title: '5 AM All Week, No Snooze', wheelLabel: '5 AM Week', description: 'Spend a whole week waking up at 5:00 AM without pressing snooze once.' },
    { id: 'a-day-of-disliked-tasks-no-complaints', title: 'A Day of Disliked Tasks, No Complaints', wheelLabel: 'Disliked Tasks', description: 'Spend a full day doing only tasks you dislike, without complaining once.' },
    { id: 'audit-five-years-of-money-mistakes', title: 'Audit Five Years of Money Mistakes', wheelLabel: 'Money Audit', description: 'Spend 2 hours deeply analyzing your financial mistakes from the last 5 years.' },
    { id: 'stare-at-a-spot-for-45-minutes', title: 'Stare at a Spot for 45 Minutes', wheelLabel: '45-Min Stare', description: 'Stare at a single spot on the wall for 45 minutes without moving your body.' },
    { id: 'a-no-spend-month', title: 'A No-Spend Month', wheelLabel: 'No-Spend Month', description: 'Go an entire month without buying anything except basic groceries and rent.' },
    { id: 'cold-pitch-twenty-businesses', title: 'Cold Pitch Twenty Businesses', wheelLabel: '20 Cold Pitches', description: 'Cold pitch 20 businesses in your area, by phone or in person, in one day.' },
    { id: 'ask-five-strangers-for-100', title: 'Ask Five Strangers for $100', wheelLabel: 'Ask for $100', description: 'Ask 5 strangers for a hundred dollars, handling the rejection gracefully.' },
    { id: 'a-five-minute-park-presentation', title: 'A Five-Minute Park Presentation', wheelLabel: 'Park Speech', description: 'Give a 5-minute public presentation in a park to whoever stops to listen.' },
    { id: 'ask-out-of-your-league', title: 'Ask Out of Your League', wheelLabel: 'Out of League', description: 'Ask someone out on a date who you feel is completely out of your league.' },
    { id: 'call-a-former-boss-for-critique', title: 'Call a Former Boss for Critique', wheelLabel: 'Old Boss Review', description: 'Call a former employer or client and ask for a brutal critique of your performance.' },
    { id: 'eat-lunch-without-your-hands', title: 'Eat Lunch Without Your Hands', wheelLabel: 'No-Hands Lunch', description: 'Sit at a busy public table and eat your lunch without using your hands.' },
    { id: 'sing-the-anthem-loudly', title: 'Sing the Anthem Loudly', wheelLabel: 'Sing the Anthem', description: 'Stand in a crowded public space and sing the national anthem at the top of your lungs.' },
    { id: 'sweep-a-shops-floor-for-free', title: 'Sweep a Shop\'s Floor for Free', wheelLabel: 'Free Sweep', description: 'Ask a local shop owner if you can sweep their floors for free, right now.' },
    { id: 'donate-eighty-percent-of-your-clothes', title: 'Donate Eighty Percent of Your Clothes', wheelLabel: 'Donate 80%', description: 'Throw away or donate 80% of your clothing items.' },
    { id: 'three-nights-on-the-floor', title: 'Three Nights on the Floor', wheelLabel: '3 Nights Floor', description: 'Sleep on the floor without a blanket, pillow, or mattress for 3 nights in a row.' },
    { id: 'live-in-one-room-for-a-week', title: 'Live in One Room for a Week', wheelLabel: 'One-Room Week', description: 'Live out of a single room in your house for an entire week, leaving the rest untouched.' },
    { id: 'five-days-without-internet', title: 'Five Days Without Internet', wheelLabel: '5 Days Offline', description: 'Disconnect your home internet router for 5 days straight.' },
    { id: 'live-out-of-moving-boxes', title: 'Live Out of Moving Boxes', wheelLabel: 'Boxed-Up Living', description: 'Pack up everything you own into boxes as if you\'re moving, and live out of them for a week.' },
    { id: 'seventy-two-hours-unplugged', title: 'Seventy-Two Hours Unplugged', wheelLabel: '72-Hour Unplug', description: 'Turn off your phone and all electronics for a full 72-hour period.' },
    { id: 'four-days-of-rice-beans-and-water', title: 'Four Days of Rice, Beans, and Water', wheelLabel: 'Rice & Beans', description: 'Eat only rice, beans, and water for 4 days straight to experience basic nutrition.' },
    { id: 'a-weekend-completely-alone', title: 'A Weekend Completely Alone', wheelLabel: 'Solo Weekend', description: 'Spend an entire weekend alone in your house, without talking to anyone or consuming content.' },
    { id: 'document-your-relationship-mistakes', title: 'Document Your Relationship Mistakes', wheelLabel: 'Love Audit', description: 'Write a 10-page document outlining every mistake you\'ve made in your relationships.' },
    { id: 'an-hour-asking-who-am-i', title: 'An Hour Asking \'Who Am I?\'', wheelLabel: 'Who Am I Hour', description: 'Spend an hour staring into a mirror asking yourself: "Who am I when nobody is watching?"' },
    { id: 'write-a-forgiveness-letter', title: 'Write a Forgiveness Letter', wheelLabel: 'Forgive Letter', description: 'Write a letter forgiving the person who caused you the most emotional pain — you don\'t have to send it.' },
    { id: 'a-full-day-of-volunteering', title: 'A Full Day of Volunteering', wheelLabel: 'Volunteer Day', description: 'Spend a full day volunteering at a local homeless shelter or soup kitchen.' },
    { id: 'share-your-deepest-secret', title: 'Share Your Deepest Secret', wheelLabel: 'Deepest Secret', description: 'Write down your deepest, darkest secret and share it with your closest confidant.' },
    { id: 'a-day-of-total-selflessness', title: 'A Day of Total Selflessness', wheelLabel: 'All Selfless', description: 'Spend an entire day acting completely selflessly — doing everything for others, nothing for yourself.' },
    { id: 'plan-your-financial-freedom', title: 'Plan Your Financial Freedom', wheelLabel: 'Freedom Plan', description: 'Create a comprehensive financial plan to achieve freedom in the next 5 years.' },
    { id: 'face-your-biggest-creative-fear', title: 'Face Your Biggest Creative Fear', wheelLabel: 'Creative Fear', description: 'Face your biggest creative fear — launching, posting, publishing — today.' },
    { id: 'vow-to-stop-complaining', title: 'Vow to Stop Complaining', wheelLabel: 'No Complaints', description: 'Commit to never complaining about circumstances outside your control again.' },
    { id: 'stairs-only-all-day', title: 'Stairs Only, All Day', wheelLabel: 'Stairs Only', description: 'Take the stairs instead of the elevator every single time today.' },
    { id: 'park-in-the-furthest-spot', title: 'Park in the Furthest Spot', wheelLabel: 'Furthest Parking', description: 'Park your car at the absolute furthest spot in the parking lot.' },
    { id: 'floss-twice-a-day', title: 'Floss Twice a Day', wheelLabel: 'Floss Twice', description: 'Floss your teeth perfectly twice a day for a full week.' },
    { id: 'polish-your-phone', title: 'Polish Your Phone', wheelLabel: 'Polish Phone', description: 'Clean your phone screen and case until it looks brand new.' },
    { id: 'sticky-note-your-top-goals', title: 'Sticky-Note Your Top Goals', wheelLabel: 'Goal Sticky Note', description: 'Write your top 3 goals on a sticky note and put it on your bathroom mirror.' },
    { id: 'stretch-before-bed', title: 'Stretch Before Bed', wheelLabel: 'Bedtime Stretch', description: 'Spend 5 minutes stretching your calves and hamstrings before bed.' },
    { id: 'sit-straight-in-transit', title: 'Sit Straight in Transit', wheelLabel: 'Sit Straight', description: 'Sit up completely straight while driving or riding transit today.' },
    { id: 'say-thank-you-not-sorry', title: 'Say Thank You, Not Sorry', wheelLabel: 'Thank You', description: 'Say "Thank you for waiting" instead of "Sorry I\'m late" — swap apology for gratitude today.' },
    { id: 'empty-your-spam-folder', title: 'Empty Your Spam Folder', wheelLabel: 'Empty Spam', description: 'Empty your email spam folder and trash bin completely.' },
    { id: 'clear-the-kitchen-counters', title: 'Clear the Kitchen Counters', wheelLabel: 'Clear Counters', description: 'Clear off every single item from your kitchen counters right now.' },
    { id: 'breathe-before-you-react', title: 'Breathe Before You React', wheelLabel: 'Breathe First', description: 'Spend 2 minutes doing deep breathing before reacting to an annoying email or text.' },
    { id: 'one-spot-for-keys-and-wallet', title: 'One Spot for Keys and Wallet', wheelLabel: 'One Spot Only', description: 'Put your keys and wallet in the exact same spot every time you walk inside today.' },
    { id: 'pick-up-five-things', title: 'Pick Up Five Things', wheelLabel: 'Pick Up 5', description: 'Walk around your house and pick up 5 things that are out of place.' },
    { id: 'delete-five-unused-apps', title: 'Delete Five Unused Apps', wheelLabel: 'Delete 5 Apps', description: 'Delete 5 unused apps from your phone right now.' },
    { id: 'text-someone-youre-thinking-of-them', title: 'Text Someone You\'re Thinking of Them', wheelLabel: 'Thinking of You', description: 'Send a text to a friend telling them you\'re thinking of them.' },
    { id: 'a-silent-minute-before-lunch', title: 'A Silent Minute Before Lunch', wheelLabel: 'Silent Minute', description: 'Spend 1 minute sitting in absolute silence before eating your lunch.' },
    { id: 'smile-at-yourself', title: 'Smile at Yourself', wheelLabel: 'Smile at You', description: 'Smile at yourself in the mirror for 30 seconds straight.' },
    { id: 'phone-off-during-the-movie', title: 'Phone Off During the Movie', wheelLabel: 'Phone Off Movie', description: 'Turn your phone off for the duration of a movie or meal.' },
    { id: 'one-thing-you-learned-today', title: 'One Thing You Learned Today', wheelLabel: 'One Thing', description: 'Write down one thing you learned today before you go to sleep.' },
    { id: 'iron-tomorrows-outfit', title: 'Iron Tomorrow\'s Outfit', wheelLabel: 'Iron Tonight', description: 'Iron or steam your outfit for tomorrow, tonight.' },
    { id: 'organize-one-drawer', title: 'Organize One Drawer', wheelLabel: 'One Drawer', description: 'Spend 5 minutes organizing one drawer in your desk or kitchen.' },
    { id: 'black-coffee-today', title: 'Black Coffee Today', wheelLabel: 'Black Coffee', description: 'Drink your coffee black today, without sugar or milk.' },
    { id: 'check-your-tire-pressure', title: 'Check Your Tire Pressure', wheelLabel: 'Tire Pressure', description: 'Check the tire pressure on your vehicle today.' },
    { id: 'three-minutes-of-ankle-mobility', title: 'Three Minutes of Ankle Mobility', wheelLabel: 'Ankle Mobility', description: 'Spend 3 minutes doing ankle mobility work.' },
    { id: 'a-book-instead-of-a-charger', title: 'A Book Instead of a Charger', wheelLabel: 'Book Nightstand', description: 'Put a book on your nightstand instead of your phone charger.' },
    { id: 'say-no-to-a-small-treat', title: 'Say No to a Small Treat', wheelLabel: 'Skip the Treat', description: 'Say no to a minor distraction or treat today.' },
    { id: 'clean-the-lint-trap', title: 'Clean the Lint Trap', wheelLabel: 'Clean Lint Trap', description: 'Clean out the lint trap in your dryer or the filter in your dishwasher.' },
    { id: 'two-minute-budget-check', title: 'Two-Minute Budget Check', wheelLabel: 'Budget Check', description: 'Spend 2 minutes reviewing your personal budget for the month.' },
    { id: 'write-tomorrows-to-do-list', title: 'Write Tomorrow\'s To-Do List', wheelLabel: 'Tomorrow\'s List', description: 'Write a physical list of things you need to do tomorrow before shutting down work.' },
    { id: 'stretch-your-wrists', title: 'Stretch Your Wrists', wheelLabel: 'Wrist Stretch', description: 'Spend 5 minutes stretching your wrists and forearms if you work at a computer.' },
    { id: 'three-breaths-before-you-go-in', title: 'Three Breaths Before You Go In', wheelLabel: 'Three Breaths', description: 'Take 3 deep breaths before getting out of your car.' },
    { id: 'do-not-disturb-for-focus-hours', title: 'Do Not Disturb for Focus Hours', wheelLabel: 'DND Focus Hours', description: 'Put your phone on "Do Not Disturb" during your focus hours today.' },
    { id: 'clean-your-glasses', title: 'Clean Your Glasses', wheelLabel: 'Clean Glasses', description: 'Clean the lenses of your glasses or sunglasses perfectly.' },
    { id: 'five-minutes-of-foot-mobility', title: 'Five Minutes of Foot Mobility', wheelLabel: 'Foot Mobility', description: 'Spend 5 minutes doing foot mobility exercises barefoot.' },
    { id: 'organize-your-shoes', title: 'Organize Your Shoes', wheelLabel: 'Organize Shoes', description: 'Organize your shoes neatly by the front door.' },
    { id: 'think-through-one-avoided-problem', title: 'Think Through One Avoided Problem', wheelLabel: 'Think It Through', description: 'Spend 2 minutes thinking about a solution to a problem you\'ve been avoiding.' },
    { id: 'wipe-down-your-keyboard', title: 'Wipe Down Your Keyboard', wheelLabel: 'Wipe Keyboard', description: 'Wipe down the keyboard and trackpad of your laptop.' },
    { id: 'doorway-chest-stretch', title: 'Doorway Chest Stretch', wheelLabel: 'Chest Stretch', description: 'Spend 5 minutes stretching your chest and shoulders against a doorway.' },
    { id: 'an-extra-liter-of-water', title: 'An Extra Liter of Water', wheelLabel: 'Extra Liter', description: 'Drink an extra liter of water today.' },
    { id: 'take-a-different-aisle', title: 'Take a Different Aisle', wheelLabel: 'Different Aisle', description: 'Take a different path down a grocery store aisle than you normally do.' },
    { id: 'visualize-tomorrow', title: 'Visualize Tomorrow', wheelLabel: 'Visualize It', description: 'Spend 2 minutes visualizing your ideal day tomorrow.' },
    { id: 'put-laundry-away-immediately', title: 'Put Laundry Away Immediately', wheelLabel: 'Laundry Away Now', description: 'Put your clothes away immediately after laundry instead of letting them sit in the basket.' },
    { id: 'three-minutes-on-your-breath', title: 'Three Minutes on Your Breath', wheelLabel: 'Breath Focus', description: 'Spend 3 minutes meditating on the sensation of your breath.' },
    { id: 'clear-your-browser-history', title: 'Clear Your Browser History', wheelLabel: 'Clear History', description: 'Clear your web browser history and cookies completely.' },
    { id: 'read-something-challenging', title: 'Read Something Challenging', wheelLabel: 'Challenging Read', description: 'Spend 5 minutes reading a challenging article or essay.' },
    { id: 'a-face-first-cold-plunge', title: 'A Face-First Cold Plunge', wheelLabel: 'Face Cold Plunge', description: 'Take a 60-second cold plunge with just your face in a bowl of ice water before starting your day.' },
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

  const CLIENT_ID_KEY = 'uc_client_id';

  // Every visitor needs a stable identity to personalize the daily wheel
  // with — logged-in accounts already have one (email); guests get a
  // random id generated once and kept in localStorage so their set of 8
  // stays the same across a reload but differs from everyone else's.
  function randomId() {
    return (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : (Math.random().toString(36).slice(2) + Date.now().toString(36));
  }

  function getClientId() {
    try {
      let id = localStorage.getItem(CLIENT_ID_KEY);
      if (!id) {
        id = randomId();
        localStorage.setItem(CLIENT_ID_KEY, id);
      }
      return id;
    } catch (e) {
      // localStorage unavailable (private browsing, storage disabled, etc.) —
      // fall back to an id that's at least unique per page load, so
      // simultaneous visitors hitting this path don't all collide on the
      // same literal fallback value and end up sharing one wheel.
      if (!window.__ucFallbackClientId) window.__ucFallbackClientId = randomId();
      return window.__ucFallbackClientId;
    }
  }

  function wheelIdentity() {
    return (state.user && state.user.email) || getClientId();
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

  // The wheel is organized into fixed-length "cycles" of consecutive days —
  // each cycle is one shuffle of the full pool, sliced into non-overlapping
  // 8-item windows (one per day), so within a cycle no challenge can repeat.
  // Consecutive cycles are chained: each cycle's shuffle is resolved (retried
  // with a salt if needed) so its first day never repeats the previous
  // cycle's last day — guaranteeing no day ever repeats what the same person
  // saw the day before, not just "usually different."
  const CYCLE_EPOCH = new Date('2026-01-01T00:00:00');
  const PER_CYCLE = Math.ceil(CHALLENGE_POOL.length / 8);
  const cyclePoolCache = {};

  function rawCycleShuffle(cycleIndex, identitySuffix, salt) {
    const seedStr = 'cycle' + cycleIndex + identitySuffix + (salt ? '-' + salt : '');
    const rng = mulberry32(hashStr(seedStr));
    const pool = CHALLENGE_POOL.slice();
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    const padNeeded = PER_CYCLE * 8 - pool.length;
    return pool.concat(pool.slice(0, padNeeded));
  }

  function resolveCyclePool(targetCycleIndex, identitySuffix) {
    const target = Math.max(0, targetCycleIndex);
    const targetKey = target + identitySuffix;
    if (cyclePoolCache[targetKey]) return cyclePoolCache[targetKey];

    let prevPadded = null;
    for (let i = 0; i <= target; i++) {
      const cacheKey = i + identitySuffix;
      if (cyclePoolCache[cacheKey]) {
        prevPadded = cyclePoolCache[cacheKey];
        continue;
      }
      let padded;
      if (i === 0) {
        padded = rawCycleShuffle(i, identitySuffix, 0);
      } else {
        const avoidIds = new Set(prevPadded.slice((PER_CYCLE - 1) * 8, PER_CYCLE * 8).map((c) => c.id));
        let salt = 0;
        do {
          padded = rawCycleShuffle(i, identitySuffix, salt);
          salt++;
        } while (padded.slice(0, 8).some((c) => avoidIds.has(c.id)) && salt <= 50);
      }
      cyclePoolCache[cacheKey] = padded;
      prevPadded = padded;
    }
    return cyclePoolCache[targetKey];
  }

  // `key` is "YYYY-MM-DD|identity".
  function dailyChallenges(key) {
    const sep = key.indexOf('|');
    const dateStr = sep === -1 ? key : key.slice(0, sep);
    const identitySuffix = sep === -1 ? '' : key.slice(sep);

    const d = new Date(dateStr + 'T00:00:00');
    const dayIndex = isNaN(d.getTime()) ? 0 : Math.round((d.getTime() - CYCLE_EPOCH.getTime()) / DAY_MS);
    const cycleIndex = Math.floor(dayIndex / PER_CYCLE);
    const posInCycle = ((dayIndex % PER_CYCLE) + PER_CYCLE) % PER_CYCLE;

    const padded = resolveCyclePool(cycleIndex, identitySuffix);
    return padded.slice(posInCycle * 8, posInCycle * 8 + 8);
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
    isGuest: false,
    showAuthScreen: false,
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
    showShareModal: false,
    shareTitle: '',
    shareText: '',
    shareStage: '',
    shareCopied: false,
  };

  let adTimerId = null;

  // ---------------- guest (local-only) storage ----------------

  const GUEST_HISTORY_KEY = 'uc_guest_history';
  const GUEST_REROLL_KEY = 'uc_guest_reroll';
  const GUEST_MODE_KEY = 'uc_guest_mode';

  function loadGuestHistory() {
    try { return JSON.parse(localStorage.getItem(GUEST_HISTORY_KEY)) || {}; } catch (e) { return {}; }
  }
  function saveGuestHistory(history) {
    try { localStorage.setItem(GUEST_HISTORY_KEY, JSON.stringify(history)); } catch (e) {}
  }
  function loadGuestReroll() {
    try { return JSON.parse(localStorage.getItem(GUEST_REROLL_KEY)) || {}; } catch (e) { return {}; }
  }
  function saveGuestReroll(reroll) {
    try { localStorage.setItem(GUEST_REROLL_KEY, JSON.stringify(reroll)); } catch (e) {}
  }
  function clearGuestData() {
    try {
      localStorage.removeItem(GUEST_HISTORY_KEY);
      localStorage.removeItem(GUEST_REROLL_KEY);
      localStorage.removeItem(GUEST_MODE_KEY);
    } catch (e) {}
  }

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

  function loadGuestUserData() {
    const today = dateKey(new Date());
    state.history = loadGuestHistory();
    state.rerollByDate = loadGuestReroll();
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

  function enterGuestMode() {
    state.isGuest = true;
    state.showAuthScreen = false;
    try { localStorage.setItem(GUEST_MODE_KEY, '1'); } catch (e) {}
    loadGuestUserData();
  }

  // Carries a guest's local progress into their new/existing account once they
  // sign up or log in, so trying the wheel first never costs them their streak.
  // Only fills in days the server doesn't already have — never overwrites real
  // account history with local guest data.
  async function migrateGuestDataIfAny() {
    const guestHistory = loadGuestHistory();
    const guestReroll = loadGuestReroll();
    const historyKeys = Object.keys(guestHistory);
    const rerollKeys = Object.keys(guestReroll);
    if (!historyKeys.length && !rerollKeys.length) return;

    try {
      const data = await fetchHistory();
      const serverHistory = data.history || {};
      const serverReroll = data.rerollByDate || {};
      for (const key of historyKeys) {
        if (serverHistory[key]) continue;
        const entry = guestHistory[key];
        try { await postDay(key, entry.index, entry.title, entry.failed); } catch (e) {}
      }
      for (const key of rerollKeys) {
        if (!guestReroll[key] || serverReroll[key]) continue;
        try { await postReroll(key); } catch (e) {}
      }
    } catch (e) {
      // best effort — don't block sign-in over a failed migration
    } finally {
      clearGuestData();
    }
  }

  async function init() {
    try {
      const user = await fetchSession();
      if (user) {
        state.user = user;
        await migrateGuestDataIfAny();
        await loadUserData();
        return;
      }
    } catch (e) {
      state.authError = e.message;
    }
    try {
      if (localStorage.getItem(GUEST_MODE_KEY) === '1') {
        state.isGuest = true;
        loadGuestUserData();
      }
    } catch (e) {}
  }

  function consumeAuthErrorFromUrl() {
    const params = new URLSearchParams(location.search);
    const code = params.get('auth_error');
    if (!code) return;
    const provider = providerLabel(params.get('auth_provider') || 'google');
    const messages = {
      access_denied: `${provider} sign-in was cancelled.`,
      state_mismatch: `Something went wrong with ${provider} sign-in — please try again.`,
      token_exchange_failed: `Could not complete ${provider} sign-in — please try again.`,
      invalid_token: `Could not verify ${provider} sign-in — please try again.`,
      no_email: `That ${provider} account has no email address — try a different account.`,
    };
    state.authError = messages[code] || `${provider} sign-in failed — please try again.`;
    params.delete('auth_error');
    params.delete('auth_provider');
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
    state.isGuest = false;
    state.showAuthScreen = false;
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

  function personalizedPoolKey() {
    return dateKey(new Date()) + '|' + wheelIdentity();
  }

  function todaysPool() {
    return dailyChallenges(personalizedPoolKey());
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
    shareModal: document.getElementById('shareModal'),

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
    guestSignInBtn: document.getElementById('guestSignInBtn'),
    authBackBtn: document.getElementById('authBackBtn'),
    welcomeGateModal: document.getElementById('welcomeGateModal'),
    guestStreakNote: document.getElementById('guestStreakNote'),
  };

  let labelsBuiltForKey = null;

  function buildWheelLabels() {
    const key = personalizedPoolKey();
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

  function trackSpin(spinType, challengeTitle) {
    if (typeof gtag !== 'function') return;
    gtag('event', 'spin_wheel', {
      spin_type: spinType,
      item_id: challengeTitle,
    });
  }

  function hasUnlimitedSpins() {
    return !!(state.user && state.user.unlimitedSpins);
  }

  function handleSpin(isReroll) {
    if (state.stage === 'spinning') return;
    if (state.history[dateKey(new Date())] && !hasUnlimitedSpins()) {
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
      trackSpin(isReroll ? 'reroll' : 'initial', pool[targetIndex].title);
      render();
    }, 3300);
  }

  function handleAccept() {
    state.resultError = '';
    state.stage = 'accepted';
    render();
  }

  async function handleReroll() {
    const unlimited = hasUnlimitedSpins();
    if (state.rerollUsedToday && !unlimited) return;
    state.resultError = '';
    if (!unlimited) {
      const today = dateKey(new Date());
      if (state.isGuest) {
        state.rerollByDate = { ...state.rerollByDate, [today]: true };
        saveGuestReroll(state.rerollByDate);
      } else {
        try {
          await postReroll(today);
        } catch (e) {
          state.resultError = e.message || 'Couldn’t save that — check your connection and try again.';
          render();
          return;
        }
        state.rerollByDate = { ...state.rerollByDate, [today]: true };
      }
      state.rerollUsedToday = true;
    }
    state.stage = 'idle';
    render();
    // The wheel was hidden (display:none) while the result card was showing.
    // Un-hiding it and setting its new rotation in the same synchronous tick
    // gives the CSS transition nothing to animate from — the browser never
    // paints the "visible at rest" frame in between, so it just snaps to
    // the final position instantly. Waiting two animation frames guarantees
    // that resting frame actually gets painted first.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => handleSpin(true));
    });
  }

  function startRerollFlow() {
    const unlimited = hasUnlimitedSpins();
    if (state.rerollUsedToday && !unlimited) return;
    if (unlimited || (state.user && state.user.isPremium)) {
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
    if (!state.user) {
      state.showAuthScreen = true;
      state.authMode = 'signup';
      state.authError = 'Create a free account first, then you can go ad-free.';
      render();
      return;
    }
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
    const entry = { index: state.currentIndex, title, failed: false };
    if (state.isGuest) {
      state.history = { ...state.history, [today]: entry };
      saveGuestHistory(state.history);
    } else {
      try {
        await postDay(today, state.currentIndex, title, false);
      } catch (e) {
        state.resultError = e.message || 'Couldn’t save that — check your connection and try again.';
        render();
        return;
      }
      state.history = { ...state.history, [today]: entry };
    }
    state.stage = 'done';
    render();
  }

  async function handleFail() {
    const today = dateKey(new Date());
    const pool = todaysPool();
    const title = pool[state.currentIndex].title;
    state.resultError = '';
    const entry = { index: state.currentIndex, title, failed: true };
    if (state.isGuest) {
      state.history = { ...state.history, [today]: entry };
      saveGuestHistory(state.history);
    } else {
      try {
        await postDay(today, state.currentIndex, title, true);
      } catch (e) {
        state.resultError = e.message || 'Couldn’t save that — check your connection and try again.';
        render();
        return;
      }
      state.history = { ...state.history, [today]: entry };
    }
    state.stage = 'failed';
    render();
  }

  function handleReturnToWheel() {
    state.resultError = '';
    state.stage = 'idle';
    render();
  }

  // ---------------- sharing ----------------

  function buildShareUrl() {
    return 'https://www.uncomfortablecalendar.com/';
  }

  // Reports to GA4's standard "share" event (Reports > Engagement > Events in
  // the GA dashboard) so shares are visible without any extra GA config.
  // `stage` (result/done/failed) becomes content_type so you can see which
  // moment people share from, not just how many shares happen overall.
  function trackShare(method, stage) {
    if (typeof gtag !== 'function') return;
    gtag('event', 'share', {
      method: method,
      content_type: stage || 'unknown',
      item_id: state.shareTitle || '',
    });
  }

  function buildShareText(challenge, stage) {
    const url = buildShareUrl();
    if (stage === 'done') {
      const streak = computeStreak(state.history);
      const streakBit = streak > 1 ? ` (${streak}-day streak)` : '';
      return `I just completed today's Uncomfortable Calendar challenge: "${challenge.title}"${streakBit} 💪\n${url}`;
    }
    if (stage === 'failed') {
      return `Today's Uncomfortable Calendar challenge got the best of me: "${challenge.title}" 😅 Back at it tomorrow.\n${url}`;
    }
    return `I just got today's Uncomfortable Calendar challenge: "${challenge.title}" 😬 Wish me luck!\n${url}`;
  }

  function openShareModal(stage) {
    const pool = todaysPool();
    const challenge = pool[state.currentIndex] || pool[0];
    state.shareTitle = challenge.title;
    state.shareText = buildShareText(challenge, stage);
    state.shareStage = stage;
    state.shareCopied = false;
    state.showShareModal = true;
    render();
  }

  function closeShareModal() {
    state.showShareModal = false;
    render();
  }

  async function shareNative() {
    if (!navigator.share) return;
    try {
      await navigator.share({ title: 'Uncomfortable Calendar', text: state.shareText });
      trackShare('native', state.shareStage);
      closeShareModal();
    } catch (e) {
      // user cancelled the native share sheet — leave our modal open
    }
  }

  function shareViaWhatsapp() {
    trackShare('whatsapp', state.shareStage);
    window.open('https://wa.me/?text=' + encodeURIComponent(state.shareText), '_blank', 'noopener');
  }

  function shareViaFacebook() {
    trackShare('facebook', state.shareStage);
    const url = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(buildShareUrl()) + '&quote=' + encodeURIComponent(state.shareText);
    window.open(url, '_blank', 'noopener');
  }

  function shareViaX() {
    trackShare('x', state.shareStage);
    window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(state.shareText), '_blank', 'noopener');
  }

  async function copyShareText() {
    try {
      await navigator.clipboard.writeText(state.shareText);
      trackShare('copy', state.shareStage);
      state.shareCopied = true;
      render();
      setTimeout(() => { state.shareCopied = false; render(); }, 1800);
    } catch (e) {
      // clipboard API unavailable (e.g. insecure context) — silently no-op,
      // the WhatsApp/Facebook/X buttons still work either way
    }
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
    el.guestStreakNote.hidden = !state.isGuest;
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

  function renderShareModal() {
    if (!state.showShareModal) { el.shareModal.innerHTML = ''; return; }

    const nativeBtn = (typeof navigator !== 'undefined' && navigator.share)
      ? `<button class="pill pill-accept" data-action="shareNative">Share via device…</button>`
      : '';

    el.shareModal.innerHTML = `
      <div class="day-modal-backdrop" id="shareModalBackdrop">
        <div class="day-modal share-modal">
          <div class="day-modal-date">Share</div>
          <div class="card-title">${escapeHtml(state.shareTitle)}</div>
          <div class="card-desc share-preview">${escapeHtml(state.shareText)}</div>
          ${nativeBtn}
          <div class="share-row">
            <button class="pill pill-outline" data-action="shareWhatsapp">WhatsApp</button>
            <button class="pill pill-outline" data-action="shareFacebook">Facebook</button>
            <button class="pill pill-outline" data-action="shareX">X</button>
          </div>
          <button class="pill pill-outline" data-action="shareCopy">${state.shareCopied ? 'Copied!' : 'Copy Text'}</button>
          <button class="pill pill-outline day-modal-close" data-action="closeShareModal">Close</button>
        </div>
      </div>`;
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
    const unlimited = hasUnlimitedSpins();
    let rerollLabel = 'Reroll';
    if (state.rerollUsedToday && !unlimited) rerollLabel = 'Reroll used';
    else if (!isPremium && !unlimited) rerollLabel = 'Reroll (watch ad)';

    const shareIconBtn = `
      <button class="pill share-btn" data-action="share">
        <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path d="M9 2v9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
          <path d="M5.5 5.5L9 2l3.5 3.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M4 8v6a1 1 0 001 1h8a1 1 0 001-1V8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>Share</span>
      </button>`;

    let inner = '';
    if (state.stage === 'result') {
      inner = `
        <div class="card-actions">
          <button class="pill pill-accept" data-action="accept">Accept Challenge</button>
          <button class="pill pill-reroll" data-action="reroll" ${(state.rerollUsedToday && !unlimited) ? 'disabled' : ''}>${escapeHtml(rerollLabel)}</button>
        </div>
        <div class="secondary-actions">${shareIconBtn}</div>`;
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
          <div class="secondary-actions">${shareIconBtn}</div>
        </div>`;
    } else if (state.stage === 'failed') {
      inner = `
        <div class="done-block">
          <div class="failed-label">Not today. That's alright — try again tomorrow.</div>
          <div class="failed-actions">
            <button class="pill pill-outline" data-action="goToCalendar">View Calendar</button>
            <button class="pill pill-outline" data-action="returnToWheel">Return to Wheel</button>
          </div>
          <div class="secondary-actions">${shareIconBtn}</div>
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
    el.calTitle.textContent = state.user ? `${firstNameOf(state.user)}’s Streak` : 'Your Streak';
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
      const pool = dailyChallenges(key + '|' + wheelIdentity());
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

  function renderWelcomeGate() {
    if (state.user || state.isGuest) { el.welcomeGateModal.innerHTML = ''; return; }
    el.welcomeGateModal.innerHTML = `
      <div class="day-modal-backdrop">
        <div class="day-modal welcome-gate">
          <img class="brand-mark" src="/logo.svg" alt="" width="44" height="44">
          <div class="brand-line1">Uncomfortable</div>
          <div class="brand-line2">Calendar</div>
          <p class="card-desc">One challenge a day. Spin now — no account needed.</p>
          <button class="pill pill-accept" data-action="gateSignIn">Sign Up / Log In</button>
          <button class="pill pill-outline" data-action="gateGuest">Continue as Guest</button>
        </div>
      </div>`;
  }

  function render() {
    if (!state.user && state.showAuthScreen) {
      el.screenAuth.hidden = false;
      el.accountBar.hidden = true;
      el.screenHome.hidden = true;
      el.screenCalendar.hidden = true;
      el.tabBar.hidden = true;
      el.dayModal.innerHTML = '';
      el.accountModal.innerHTML = '';
      el.adModal.innerHTML = '';
      el.spinLockModal.innerHTML = '';
      el.welcomeGateModal.innerHTML = '';
      el.shareModal.innerHTML = '';
      renderAuth();
      return;
    }

    el.screenAuth.hidden = true;
    el.accountBar.hidden = false;
    el.tabBar.hidden = false;

    if (state.user) {
      el.accountChip.hidden = false;
      el.signOutBtn.hidden = false;
      el.guestSignInBtn.hidden = true;
      renderAccountBar();
    } else {
      el.accountChip.hidden = true;
      el.signOutBtn.hidden = true;
      el.guestSignInBtn.hidden = false;
    }

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
    renderWelcomeGate();
    renderShareModal();
  }

  // ---------------- wire up ----------------

  el.spinBtn.addEventListener('click', () => handleSpin());
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
    else if (action === 'share') openShareModal(state.stage);
  });

  el.shareModal.addEventListener('click', (e) => {
    if (e.target.id === 'shareModalBackdrop') { closeShareModal(); return; }
    const btn = e.target.closest('[data-action]');
    if (!btn || btn.disabled) return;
    const action = btn.dataset.action;
    if (action === 'closeShareModal') closeShareModal();
    else if (action === 'shareNative') shareNative();
    else if (action === 'shareWhatsapp') shareViaWhatsapp();
    else if (action === 'shareFacebook') shareViaFacebook();
    else if (action === 'shareX') shareViaX();
    else if (action === 'shareCopy') copyShareText();
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
    if (provider === 'google' || provider === 'facebook') {
      window.location.href = '/api/auth/' + provider + '/start';
      return;
    }
    state.authError = `${providerLabel(provider)} sign-in isn't wired up yet.`;
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
      state.isGuest = false;
      state.showAuthScreen = false;
      state.authError = '';
      el.authForm.reset();
      await migrateGuestDataIfAny();
      await loadUserData();
    } catch (err) {
      state.authError = err.message;
    }
    state.authBusy = false;
    render();
  });

  el.signOutBtn.addEventListener('click', signOut);

  el.authBackBtn.addEventListener('click', () => {
    state.showAuthScreen = false;
    state.authError = '';
    render();
  });

  el.guestSignInBtn.addEventListener('click', () => {
    state.showAuthScreen = true;
    render();
  });

  el.guestStreakNote.addEventListener('click', () => {
    state.showAuthScreen = true;
    render();
  });

  el.welcomeGateModal.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    if (btn.dataset.action === 'gateSignIn') { state.showAuthScreen = true; render(); }
    else if (btn.dataset.action === 'gateGuest') { enterGuestMode(); render(); }
  });

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
    else if (state.showShareModal) closeShareModal();
    else if (state.showAccountModal) { state.showAccountModal = false; render(); }
  });

  consumeAuthErrorFromUrl();
  init()
    .then(consumeCheckoutResultFromUrl)
    .then(render);
})();
