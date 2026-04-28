/* =============================================
   scores.js — read, display, sort, clear LocalStorage scores
   Phase 4 implementation
   ============================================= */

const LS_KEY_SCORES = 'solarQuizScores';

const HEBREW_PLANET_NAMES = {
  mercury: 'מרקורי',
  venus:   'ונוס',
  earth:   'כדור הארץ',
  mars:    'מאדים',
  jupiter: 'צדק',
  saturn:  'שבתאי',
  uranus:  'אורנוס',
  neptune: 'נפטון',
};

/* ── helpers ───────────────────────────────── */
function loadScores() {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY_SCORES) || '[]');
  } catch {
    return [];
  }
}

function sortScores(scores, mode) {
  const copy = [...scores];
  switch (mode) {
    case 'score-desc': return copy.sort((a, b) => b.score - a.score || b.ts - a.ts);
    case 'score-asc':  return copy.sort((a, b) => a.score - b.score || b.ts - a.ts);
    default:           return copy.sort((a, b) => b.ts - a.ts); // date-desc
  }
}

function scoreEmoji(score, total) {
  const pct = score / total;
  if (pct === 1)   return '🏆';
  if (pct >= 0.8)  return '⭐';
  if (pct >= 0.6)  return '👍';
  return '🔄';
}

/* ── render ────────────────────────────────── */
function renderScores() {
  const scores = loadScores();
  const mode   = document.getElementById('sort-select')?.value || 'date-desc';
  const sorted = sortScores(scores, mode);

  const emptyEl   = document.getElementById('state-empty');
  const wrapperEl = document.getElementById('scores-table-wrapper');
  const tbody     = document.getElementById('scores-tbody');
  const controlsEl = document.getElementById('scores-controls');

  if (sorted.length === 0) {
    emptyEl?.removeAttribute('hidden');
    wrapperEl?.setAttribute('hidden', '');
    controlsEl?.setAttribute('hidden', '');
    return;
  }

  emptyEl?.setAttribute('hidden', '');
  wrapperEl?.removeAttribute('hidden');
  controlsEl?.removeAttribute('hidden');

  tbody.innerHTML = '';

  sorted.forEach((entry, i) => {
    const tr = document.createElement('tr');
    tr.className = i % 2 === 0 ? 'row-even' : 'row-odd';

    const planetLabel = HEBREW_PLANET_NAMES[entry.planet] || entry.planet || 'כללי';
    const emoji       = scoreEmoji(entry.score, entry.total);

    tr.innerHTML = `
      <td class="col-rank">${i + 1}</td>
      <td class="col-planet">${planetLabel}</td>
      <td class="col-score">${emoji} ${entry.score} / ${entry.total}</td>
      <td class="col-date">${entry.date || '—'}</td>
    `;

    tbody.appendChild(tr);
  });
}

/* ── clear ─────────────────────────────────── */
function clearScores() {
  localStorage.removeItem(LS_KEY_SCORES);
  renderScores();
}

/* ── init ──────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  renderScores();

  // Sort change
  document.getElementById('sort-select')?.addEventListener('change', renderScores);

  // Clear button → open dialog
  document.getElementById('btn-clear-scores')?.addEventListener('click', () => {
    document.getElementById('confirm-dialog')?.showModal();
  });

  // Confirm clear
  document.getElementById('btn-confirm-clear')?.addEventListener('click', () => {
    document.getElementById('confirm-dialog')?.close();
    clearScores();
  });

  // Cancel
  document.getElementById('btn-cancel-clear')?.addEventListener('click', () => {
    document.getElementById('confirm-dialog')?.close();
  });

  // Close dialog on backdrop click
  document.getElementById('confirm-dialog')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) e.currentTarget.close();
  });
});
