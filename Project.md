# Progress Log — Solar System Quiz

> Update this file at the END of every Claude Code session.
> At the START of each session, tell Claude: "read @docs/progress.md"

---

## Current Status
**Phase:** 1 — Setup
**Last updated:** —
**Next session goal:** —

---

## File Completion Status

### HTML Pages
- [ ] index.html — skeleton only
- [ ] planet.html — skeleton only
- [ ] quiz.html — skeleton only
- [ ] scores.html — skeleton only

### CSS
- [ ] css/style.css — variables + reset + shared layout
- [ ] css/solar.css — 3D animation
- [ ] css/quiz.css — quiz styles

### JavaScript
- [ ] js/api.js — getPlanet() + getAllPlanets()
- [ ] js/solar.js — animation + planet click navigation
- [ ] js/planet.js — URL param + render planet data
- [ ] js/quiz.js — questions + timer + scoring + LocalStorage

### Other
- [ ] README.md — complete
- [ ] Responsive: mobile tested
- [ ] Responsive: tablet tested
- [ ] Responsive: desktop tested
- [ ] 0 console errors confirmed

---

## Session Log

### Session 1 — [date]
**Goal:**
**Completed:**
**Blockers:**
**Next:**

### Session 2 — [date]
**Goal:**
**Completed:**
**Blockers:**
**Next:**

### Session 3 — [date]
**Goal:**
**Completed:**
**Blockers:**
**Next:**

---

## Known Issues / Decisions Pending
- [ ] Confirm with lecturer: is Three.js allowed?
- [ ] Decide: Hebrew or English UI labels?
- [ ] Decide: how many quiz questions per round? (currently 5)

---

## Notes for Claude
- Planet names for the API: mercury, venus, earth, mars,
  jupiter, saturn, uranus, neptune
- URL pattern for planet page: planet.html?name=mars
- All quiz questions must be generated dynamically from API data
- LocalStorage key for scores: "solarQuizScores"