/* =============================================
   quiz.js — question generation, timer, scoring, LocalStorage
   Phase 4 implementation
   ============================================= */

/* ── constants ─────────────────────────────── */
const QUESTIONS_PER_ROUND = 5;
const SECONDS_PER_QUESTION = 15;
const LS_KEY = 'solarQuizScores';

/* Hebrew planet names (mirror solar.js) */
const HEBREW_NAMES_QUIZ = {
  mercury: 'מרקורי',
  venus:   'ונוס',
  earth:   'כדור הארץ',
  mars:    'מאדים',
  jupiter: 'צדק',
  saturn:  'שבתאי',
  uranus:  'אורנוס',
  neptune: 'נפטון',
};

/* ── state ─────────────────────────────────── */
let planets      = [];   // array of planet data objects from API
let questions    = [];   // generated questions for this round
let currentIndex = 0;
let score        = 0;
let timerHandle  = null;
let timeLeft     = SECONDS_PER_QUESTION;
let answered     = false;
let focusedPlanetName = null; // set when coming from planet.html?name=

/* ── DOM refs ──────────────────────────────── */
const elLoading         = () => document.getElementById('state-loading');
const elError           = () => document.getElementById('state-error');
const elGame            = () => document.getElementById('quiz-game');
const elEnd             = () => document.getElementById('quiz-end');
const elScoreDisplay    = () => document.getElementById('score-display');
const elCounter         = () => document.getElementById('question-counter');
const elTimer           = () => document.getElementById('timer-display');
const elProgressFill    = () => document.getElementById('progress-fill');
const elProgressBar     = () => document.querySelector('.quiz-progress-bar');
const elQuestionPlanet  = () => document.getElementById('question-planet');
const elQuestionText    = () => document.getElementById('question-text');
const elAnswerOptions   = () => document.getElementById('answer-options');
const elFeedback        = () => document.getElementById('answer-feedback');
const elFeedbackMsg     = () => document.getElementById('feedback-message');
const elFeedbackFact    = () => document.getElementById('feedback-fact');
const elFinalScore      = () => document.getElementById('final-score');
const elBtnSave         = () => document.getElementById('btn-save-score');
const elBtnPlayAgain    = () => document.getElementById('btn-play-again');
const elBtnBackPlanet   = () => document.getElementById('btn-back-planet');
const elSaveConfirm     = () => document.getElementById('save-confirmation');
const elErrorMessage    = () => document.getElementById('error-message');

/* ── helpers ───────────────────────────────── */
function showState(stateId) {
  ['state-loading', 'state-error', 'quiz-game', 'quiz-end'].forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    id === stateId ? el.removeAttribute('hidden') : el.setAttribute('hidden', '');
  });
}

/** Fisher-Yates shuffle in place, returns array */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** Pick n unique items from arr that are != exclude, or just n random */
function pickOthers(arr, exclude, n) {
  const pool = arr.filter((x) => x !== exclude);
  shuffle(pool);
  return pool.slice(0, n);
}

/** Format a number to at most 2 decimal places */
function fmtNum(v, decimals = 2) {
  if (v === null || v === undefined) return '—';
  return Number(v).toLocaleString('he-IL', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
}

/* ── question generators ───────────────────── */
/*
  Each generator returns: { planetName, question, correct, options, fact }
  or null if the planet doesn't have the required data.
*/

function qGravity(planet, all) {
  if (!planet.gravity) return null;
  const correct = `${fmtNum(planet.gravity)} m/s²`;
  const others  = pickOthers(
    all.filter((p) => p.gravity).map((p) => `${fmtNum(p.gravity)} m/s²`),
    correct, 3
  );
  if (others.length < 3) return null;
  const hName = HEBREW_NAMES_QUIZ[planet.englishName?.toLowerCase()] || planet.englishName;
  return {
    planetName: hName,
    question:   `מהו כוח המשיכה של ${hName}?`,
    correct,
    options: shuffle([correct, ...others]),
    fact: `כוח המשיכה של ${hName} הוא ${correct}.`,
  };
}

function qRadius(planet, all) {
  if (!planet.meanRadius) return null;
  const correct = `${fmtNum(planet.meanRadius, 0)} ק"מ`;
  const others  = pickOthers(
    all.filter((p) => p.meanRadius).map((p) => `${fmtNum(p.meanRadius, 0)} ק"מ`),
    correct, 3
  );
  if (others.length < 3) return null;
  const hName = HEBREW_NAMES_QUIZ[planet.englishName?.toLowerCase()] || planet.englishName;
  return {
    planetName: hName,
    question:   `מהו הרדיוס הממוצע של ${hName}?`,
    correct,
    options: shuffle([correct, ...others]),
    fact: `הרדיוס הממוצע של ${hName} הוא ${correct}.`,
  };
}

function qMoons(planet, all) {
  const correct = Array.isArray(planet.moons) ? planet.moons.length : 0;
  const pool = all
    .map((p) => (Array.isArray(p.moons) ? p.moons.length : 0))
    .filter((v) => v !== correct);
  const others = [...new Set(pool)];
  shuffle(others);
  if (others.length < 3) return null;
  const hName = HEBREW_NAMES_QUIZ[planet.englishName?.toLowerCase()] || planet.englishName;
  const opts = shuffle([correct, ...others.slice(0, 3)]).map(String);
  return {
    planetName: hName,
    question:   `כמה ירחים יש ל${hName}?`,
    correct:    String(correct),
    options:    opts,
    fact: `ל${hName} יש ${correct} ירחים.`,
  };
}

function qOrbit(planet, all) {
  if (!planet.sideralOrbit) return null;
  const correct = `${fmtNum(planet.sideralOrbit, 1)} ימים`;
  const others  = pickOthers(
    all.filter((p) => p.sideralOrbit).map((p) => `${fmtNum(p.sideralOrbit, 1)} ימים`),
    correct, 3
  );
  if (others.length < 3) return null;
  const hName = HEBREW_NAMES_QUIZ[planet.englishName?.toLowerCase()] || planet.englishName;
  return {
    planetName: hName,
    question:   `כמה ימים לוקח ל${hName} להקיף את השמש?`,
    correct,
    options: shuffle([correct, ...others]),
    fact: `${hName} מקיף את השמש ב-${correct}.`,
  };
}

function qTemp(planet, all) {
  if (!planet.avgTemp || planet.avgTemp === 0) return null;
  const toC = (k) => Math.round(k - 273.15);
  const correct = `${toC(planet.avgTemp)} °C`;
  const others  = pickOthers(
    all.filter((p) => p.avgTemp && p.avgTemp !== 0).map((p) => `${toC(p.avgTemp)} °C`),
    correct, 3
  );
  if (others.length < 3) return null;
  const hName = HEBREW_NAMES_QUIZ[planet.englishName?.toLowerCase()] || planet.englishName;
  return {
    planetName: hName,
    question:   `מהי הטמפרטורה הממוצעת של ${hName}?`,
    correct,
    options: shuffle([correct, ...others]),
    fact: `הטמפרטורה הממוצעת של ${hName} היא ${correct}.`,
  };
}

const GENERATORS = [qGravity, qRadius, qMoons, qOrbit, qTemp];

/* ── question generation ───────────────────── */
function generateQuestions(allPlanets) {
  const pool = [];

  // Try every generator on every planet → collect valid questions
  allPlanets.forEach((planet) => {
    GENERATORS.forEach((gen) => {
      const q = gen(planet, allPlanets);
      if (q) pool.push(q);
    });
  });

  shuffle(pool);
  return pool.slice(0, QUESTIONS_PER_ROUND);
}

/* ── timer ─────────────────────────────────── */
function startTimer() {
  clearInterval(timerHandle);
  timeLeft = SECONDS_PER_QUESTION;
  updateTimerDisplay();

  timerHandle = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
      clearInterval(timerHandle);
      handleTimeout();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const el = elTimer();
  if (!el) return;
  el.textContent = timeLeft;
  el.classList.toggle('timer-value--urgent', timeLeft <= 5);
}

function handleTimeout() {
  if (answered) return;
  answered = true;
  const q = questions[currentIndex];
  showFeedback(false, `הזמן נגמר! התשובה הנכונה: ${q.correct}`, q.fact);
  lockOptions();
  scheduleNext();
}

/* ── rendering ─────────────────────────────── */
function renderQuestion() {
  answered = false;
  const q = questions[currentIndex];

  // HUD
  elScoreDisplay().textContent = score;
  elCounter().textContent      = `${currentIndex + 1} / ${QUESTIONS_PER_ROUND}`;

  // Progress bar
  const pct = (currentIndex / QUESTIONS_PER_ROUND) * 100;
  elProgressFill().style.width = `${pct}%`;
  elProgressBar()?.setAttribute('aria-valuenow', currentIndex);

  // Question text
  elQuestionPlanet().textContent = q.planetName;
  elQuestionText().textContent   = q.question;

  // Hide feedback
  elFeedback().setAttribute('hidden', '');

  // Build option buttons
  const list = elAnswerOptions();
  list.innerHTML = '';

  q.options.forEach((opt, i) => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'answer-btn';
    btn.id = `answer-option-${i}`;
    btn.textContent = opt;
    btn.addEventListener('click', () => handleAnswer(opt, btn));
    li.appendChild(btn);
    list.appendChild(li);
  });

  startTimer();
}

function handleAnswer(chosen, btnEl) {
  if (answered) return;
  answered = true;
  clearInterval(timerHandle);

  const q       = questions[currentIndex];
  const correct = chosen === q.correct;

  if (correct) {
    score++;
    elScoreDisplay().textContent = score;
    btnEl.classList.add('answer-btn--correct');
    showFeedback(true, '✔ נכון!', q.fact);
  } else {
    btnEl.classList.add('answer-btn--wrong');
    showFeedback(false, `✘ לא נכון. התשובה הנכונה: ${q.correct}`, q.fact);
    // Highlight correct
    highlightCorrect(q.correct);
  }

  lockOptions(btnEl);
  scheduleNext();
}

function highlightCorrect(correctText) {
  document.querySelectorAll('.answer-btn').forEach((btn) => {
    if (btn.textContent === correctText) btn.classList.add('answer-btn--correct');
  });
}

function lockOptions(clickedEl) {
  document.querySelectorAll('.answer-btn').forEach((btn) => {
    btn.disabled = true;
    if (btn !== clickedEl && !btn.classList.contains('answer-btn--correct')) {
      btn.classList.add('answer-btn--disabled');
    }
  });
}

function showFeedback(correct, message, fact) {
  const fb = elFeedback();
  fb.removeAttribute('hidden');
  fb.className = `answer-feedback answer-feedback--${correct ? 'correct' : 'wrong'}`;
  elFeedbackMsg().textContent = message;
  elFeedbackFact().textContent = fact || '';
}

function scheduleNext() {
  setTimeout(() => {
    currentIndex++;
    if (currentIndex < QUESTIONS_PER_ROUND) {
      renderQuestion();
    } else {
      showEndScreen();
    }
  }, 2200);
}

/* ── end screen ────────────────────────────── */
function showEndScreen() {
  elProgressFill().style.width = '100%';
  elProgressBar()?.setAttribute('aria-valuenow', QUESTIONS_PER_ROUND);

  elFinalScore().textContent = score;
  elSaveConfirm().setAttribute('hidden', '');
  elBtnSave().disabled = false;
  elBtnSave().textContent = 'שמור ניקוד';

  // Wire back-to-planet button
  if (focusedPlanetName) {
    elBtnBackPlanet().href = `planet.html?name=${encodeURIComponent(focusedPlanetName)}`;
    elBtnBackPlanet().removeAttribute('hidden');
  } else {
    elBtnBackPlanet().setAttribute('hidden', '');
  }

  showState('quiz-end');
}

/* ── LocalStorage ──────────────────────────── */
function saveScore() {
  const entry = {
    planet: focusedPlanetName || 'כללי',
    score,
    total: QUESTIONS_PER_ROUND,
    date:  new Date().toLocaleDateString('he-IL'),
    ts:    Date.now(),
  };

  const existing = JSON.parse(localStorage.getItem(LS_KEY) || '[]');
  existing.unshift(entry);
  localStorage.setItem(LS_KEY, JSON.stringify(existing));

  elBtnSave().disabled = true;
  elBtnSave().textContent = '✔ נשמר';
  elSaveConfirm().removeAttribute('hidden');
}

/* ── play again ────────────────────────────── */
function playAgain() {
  currentIndex = 0;
  score        = 0;
  questions    = generateQuestions(planets);
  showState('quiz-game');
  renderQuestion();
}

/* ── init ─────────────────────────────────── */
async function init() {
  // Check if we came from a specific planet
  const param = new URLSearchParams(window.location.search).get('name');
  if (param) focusedPlanetName = param.toLowerCase().trim();

  showState('state-loading');

  try {
    planets   = await getAllPlanets();
    questions = generateQuestions(planets);

    if (questions.length < QUESTIONS_PER_ROUND) {
      throw new Error(`לא נוצרו מספיק שאלות (${questions.length}/${QUESTIONS_PER_ROUND})`);
    }

    showState('quiz-game');
    renderQuestion();
  } catch (err) {
    console.error('[quiz.js] init error:', err);
    const el = elErrorMessage();
    if (el) el.textContent = 'לא ניתן לטעון את שאלות החידון. נסה שוב מאוחר יותר.';
    showState('state-error');
  }
}

/* ── event wiring ──────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  init();

  document.getElementById('btn-save-score')?.addEventListener('click', saveScore);
  document.getElementById('btn-play-again')?.addEventListener('click', playAgain);
});
