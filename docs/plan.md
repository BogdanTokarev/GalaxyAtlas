# Project Plan — Solar System Quiz

## Concept
An educational website about our solar system.
The homepage features an interactive 3D animation of the solar system.
Clicking a planet navigates to its detail page, which pulls live data from an API.
Users can then take a quiz based on real planet data, and view their scores.

## Pages

### 1. index.html — Solar System Homepage
- Animated solar system with Sun at center
- All 8 planets orbiting at correct relative speeds
- Hover on planet: show planet name tooltip
- Click on planet: navigate to planet.html?name={planetName}
- Responsive: animation scales down on mobile
- Background: dark space with star field (CSS)

### 2. planet.html — Planet Detail Page
- Reads ?name= parameter from URL
- Fetches data from Solar System OpenData API
- Displays: name, gravity, radius, temperature, moons count,
  orbital period, rotation period, discovery info
- "Start Quiz" button → quiz.html?name={planetName}
- "Back" button → index.html
- Loading spinner while fetching
- Error message if fetch fails
- Handles unknown planet names gracefully

### 3. quiz.html — Interactive Quiz
- 5 questions per round, generated from API data
- Question types: multiple choice (4 options)
- Topics: gravity, temperature, moons, orbital period, radius
- Timer: 15 seconds per question
- Score counter visible throughout
- Correct/wrong answer feedback after each question
- End screen: score summary + option to save to LocalStorage
- "Play Again" and "Back to Planet" buttons

### 4. scores.html — High Scores
- Reads scores from LocalStorage
- Shows: planet name, score (X/5), date played
- Sort by score or by date
- "Clear Scores" button (with confirmation)
- Empty state message if no scores yet

## API Integration

### getPlanet(name)
Fetches a single planet by name.
Used by: planet.js, quiz.js

### getAllPlanets()
Fetches list of all solar system bodies filtered to planets.
Used by: solar.js (for planet names), quiz.js (for random questions)

## Responsive Breakpoints
- Mobile  (≤600px):  single column, smaller animation
- Tablet  (≈900px):  medium layout, animation at 60% size
- Desktop (≥1024px): full layout, full animation

## Work Division
- Student 1: index.html + solar.css + solar.js (animation + navigation)
- Student 2: api.js + planet.html + planet.js (API integration)
- Both: quiz.html + quiz.js + scores.html (collaboration)
- Both: style.css, README, responsive testing

## Phases

### Phase 1 — Setup (Day 1) ✅
- [x] Create all files with basic HTML skeleton
- [ ] Confirm Three.js allowed or not with lecturer
- [ ] Test API manually in browser console
- [x] Set up shared CSS variables in style.css

### Phase 2 — Homepage Animation (Days 2–4)
- [ ] CSS 3D solar system: sun + 8 orbiting planets
- [ ] Planet hover tooltips
- [ ] Click → navigate to planet.html
- [ ] Responsive animation

### Phase 3 — Planet Detail Page (Days 3–5)
- [ ] api.js: getPlanet() + getAllPlanets()
- [ ] planet.js: read URL param, call API, render data
- [ ] Loading / error / empty states
- [ ] Planet detail card design

### Phase 4 — Quiz (Days 5–7)
- [ ] quiz.js: question generation from API data
- [ ] Timer logic
- [ ] Scoring + LocalStorage save
- [ ] scores.html: read and display saved scores

### Phase 5 — Polish (Days 8–9)
- [ ] Test all 3 breakpoints
- [ ] Fix all console errors
- [ ] Final README
- [ ] Code cleanup + consistent naming

## Grading Checklist (100 points)
- [ ] Semantic HTML on all pages (15pts)
- [ ] Responsive layout, 3 breakpoints (20pts)
- [ ] JS interactivity, events, dynamic DOM (25pts)
- [ ] fetch + loading/error/empty states (25pts)
- [ ] Clean code + README (15pts)
