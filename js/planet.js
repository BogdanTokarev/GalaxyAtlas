/* =============================================
   planet.js — read URL param, fetch + render planet data
   Phase 3 implementation
   ============================================= */

/* ── helpers ──────────────────────────────── */

/** Return query-string value or null */
function getParam(key) {
  return new URLSearchParams(window.location.search).get(key);
}

/** Show exactly one state, hide the rest */
function showState(stateId) {
  const ids = ['state-loading', 'state-error', 'state-empty', 'planet-card'];
  ids.forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (id === stateId) {
      el.removeAttribute('hidden');
    } else {
      el.setAttribute('hidden', '');
    }
  });
}

/** Format a number with locale separators, or return fallback */
function fmt(value, decimals = 2, fallback = 'לא ידוע') {
  if (value === null || value === undefined || value === 0) return fallback;
  return Number(value).toLocaleString('he-IL', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
}

/* Hebrew planet name map */
const HEBREW_NAMES = {
  mercury: 'מרקורי',
  venus:   'ונוס',
  earth:   'כדור הארץ',
  mars:    'מאדים',
  jupiter: 'צדק',
  saturn:  'שבתאי',
  uranus:  'אורנוס',
  neptune: 'נפטון',
};

/* Hebrew body-type labels */
const TYPE_LABELS = {
  Planet:        'כוכב לכת',
  Dwarf Planet:  'כוכב לכת ננסי',
  Moon:          'ירח',
  Star:          'כוכב',
  Asteroid:      'אסטרואיד',
  Comet:         'שביט',
};

/* Planet accent colors (matching solar.js) */
const PLANET_COLORS = {
  mercury: '#a59889',
  venus:   '#d4a657',
  earth:   '#4b8feb',
  mars:    '#c4533a',
  jupiter: '#d4a574',
  saturn:  '#e1c699',
  uranus:  '#93cfd6',
  neptune: '#4060c0',
};

/* ── render ───────────────────────────────── */

function renderPlanet(data, planetName) {
  const hebrewName = HEBREW_NAMES[planetName] || data.englishName || planetName;
  const color      = PLANET_COLORS[planetName] || 'var(--color-primary)';

  /* Update <title> */
  document.title = `${hebrewName} | מערכת השמש`;

  /* Header */
  document.getElementById('planet-name').textContent = hebrewName;
  document.getElementById('planet-name').style.setProperty('--planet-accent', color);

  const typeRaw   = data.bodyType || '';
  const typeLabel = TYPE_LABELS[typeRaw] || typeRaw || 'לא ידוע';
  document.getElementById('planet-type').textContent = typeLabel;

  /* Stats */
  const gravity = data.gravity ? `${fmt(data.gravity)} m/s²` : 'לא ידוע';
  document.getElementById('stat-gravity').textContent = gravity;

  const radius = data.meanRadius ? `${fmt(data.meanRadius, 0)} ק"מ` : 'לא ידוע';
  document.getElementById('stat-radius').textContent = radius;

  const temp = (data.avgTemp && data.avgTemp !== 0)
    ? `${fmt(data.avgTemp, 0)} K  (${fmt(data.avgTemp - 273.15, 0)} °C)`
    : 'לא ידוע';
  document.getElementById('stat-temp').textContent = temp;

  const moons = Array.isArray(data.moons) && data.moons.length > 0
    ? data.moons.length.toString()
    : '0';
  document.getElementById('stat-moons').textContent = moons;

  const orbit = data.sideralOrbit ? `${fmt(data.sideralOrbit, 1)} ימים` : 'לא ידוע';
  document.getElementById('stat-orbit').textContent = orbit;

  const rotation = data.sideralRotation ? `${fmt(Math.abs(data.sideralRotation), 1)} שעות` : 'לא ידוע';
  document.getElementById('stat-rotation').textContent = rotation;

  const discoveredBy = data.discoveredBy || 'ידוע מימי קדם';
  document.getElementById('stat-discovered-by').textContent = discoveredBy;

  const discoveryDate = data.discoveryDate || '—';
  document.getElementById('stat-discovery-date').textContent = discoveryDate;

  /* Wire "Start Quiz" button */
  const btnQuiz = document.getElementById('btn-quiz');
  if (btnQuiz) {
    btnQuiz.href = `quiz.html?name=${encodeURIComponent(planetName)}`;
  }

  /* Apply planet accent color to card */
  const card = document.getElementById('planet-card');
  if (card) {
    card.style.setProperty('--planet-accent', color);
  }

  /* Build the planet visual sphere */
  buildPlanetVisual(planetName, color, data);

  showState('planet-card');
}

/** Inject a CSS-animated planet sphere into the card header */
function buildPlanetVisual(planetName, color, data) {
  const header = document.querySelector('.planet-card__header');
  if (!header || document.getElementById('planet-visual')) return;

  const visual = document.createElement('div');
  visual.id = 'planet-visual';
  visual.className = 'planet-visual';
  visual.setAttribute('aria-hidden', 'true');

  const sphere = document.createElement('div');
  sphere.className = 'planet-visual__sphere';
  sphere.style.setProperty('--sphere-color', color);

  /* Saturn gets rings */
  if (planetName === 'saturn') {
    sphere.classList.add('planet-visual__sphere--ringed');
  }

  visual.appendChild(sphere);
  header.prepend(visual);
}

/* ── init ─────────────────────────────────── */

async function init() {
  const planetName = getParam('name');

  /* No name param at all → empty state */
  if (!planetName) {
    showState('state-empty');
    return;
  }

  const name = planetName.toLowerCase().trim();

  /* Not one of the 8 known planets → empty state */
  const VALID = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];
  if (!VALID.includes(name)) {
    showState('state-empty');
    return;
  }

  showState('state-loading');

  try {
    const data = await getPlanet(name);

    if (!data || !data.englishName) {
      showState('state-empty');
      return;
    }

    renderPlanet(data, name);
  } catch (err) {
    console.error('[planet.js] fetch error:', err);
    const msg = document.getElementById('error-message');
    if (msg) msg.textContent = `שגיאה בטעינת נתונים עבור "${name}". נסה שוב מאוחר יותר.`;
    showState('state-error');
  }
}

document.addEventListener('DOMContentLoaded', init);
