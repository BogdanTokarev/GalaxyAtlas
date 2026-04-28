# Solar System Quiz — Project Context

## Project Overview
An interactive solar system website with a 3D animated homepage,
individual planet detail pages powered by a live API, and a quiz game.
Built by two students as a final project.

## Tech Stack
- Vanilla JS (ES6+) only — NO frameworks
- HTML5 semantic tags throughout
- CSS3 with Flexbox and Grid
- fetch + async/await for all API calls
- LocalStorage for quiz scores
- CSS 3D transforms for solar system animation
  (Three.js allowed only if confirmed by lecturer)

## File Structure
```
project/
├── CLAUDE.md
├── README.md
├── index.html       ← solar system animation + planet navigation
├── planet.html      ← planet detail page (loads from API)
├── quiz.html        ← interactive quiz
├── scores.html      ← personal high scores
├── css/
│   ├── style.css    ← shared styles, variables, reset
│   ├── solar.css    ← 3D animation styles
│   └── quiz.css     ← quiz-specific styles
├── js/
│   ├── api.js       ← ALL fetch/API calls live here only
│   ├── solar.js     ← animation + click navigation
│   ├── planet.js    ← planet detail page logic
│   └── quiz.js      ← quiz logic, scoring, timer
├── assets/
│   └── (images, icons)
└── docs/
    ├── plan.md
    └── progress.md
```

## API
- Primary: Solar System OpenData
  Base URL: https://api.le-systeme-solaire.net/rest/bodies/
  Example: https://api.le-systeme-solaire.net/rest/bodies/mars
  No API key required.
- All fetch calls go through /js/api.js — never fetch directly in page scripts

## Key Data Fields Available
gravity, meanRadius, avgTemp, moons (array), sideralOrbit,
sideralRotation, discoveredBy, discoveryDate, bodyType, mass

## Coding Rules
- Every async operation must have: loading state, error state, empty state
- meta viewport tag on every HTML page
- dir="rtl" on <html> for Hebrew support
- 3 responsive breakpoints: ≤600px | ≈900px | ≥1024px
- Semantic structure on every page: header > nav > main > footer
- Planet name passed between pages via URL: planet.html?name=mars
- Quiz questions generated from live API data — not hardcoded

## What NOT to Do
- No jQuery, Bootstrap, React, Vue, Angular, Tailwind
- No inline styles for layout decisions
- No API keys committed to any file
- No console errors on final submission
- No copying code without understanding it

## Assignment Constraints (from lecturer)
- Minimum 4 pages or views
- Flexbox and/or Grid required
- fetch + async/await required
- Loading / error / empty states required
- README.md required
- Clean code with meaningful variable names