# 🪐 Solar System Quiz

An interactive website about our solar system — explore planets, discover real data, and test your knowledge.

## 👥 Team
- Student 1 — [Name]
- Student 2 — [Name]

## 🌐 Live Demo
[Link to deployed site — add after deployment]

---

## 📄 Pages

| Page | File | Description |
|------|------|-------------|
| Homepage | `index.html` | 3D animated solar system — click any planet to explore |
| Planet Detail | `planet.html` | Live data about a planet fetched from API |
| Quiz | `quiz.html` | 5-question quiz based on real planet data |
| Scores | `scores.html` | Personal high scores saved locally |

---

## 🔌 API

**Solar System OpenData**
- Base URL: `https://api.le-systeme-solaire.net/rest/bodies/`
- Free, no API key required
- CORS open — works directly from the browser
- Provides: gravity, radius, temperature, moons, orbital data, discovery info

---

## 🛠️ Tech Stack

- **HTML5** — semantic tags throughout (`header`, `nav`, `main`, `section`, `footer`)
- **CSS3** — Flexbox, Grid, Media Queries, CSS 3D transforms
- **JavaScript** — Vanilla ES6+, `fetch`, `async/await`, `LocalStorage`
- No frameworks, no libraries, no build tools

---

## 📁 Project Structure

```
project/
├── index.html
├── planet.html
├── quiz.html
├── scores.html
├── README.md
├── css/
│   ├── style.css      # shared styles, CSS variables, reset
│   ├── solar.css      # 3D solar system animation
│   └── quiz.css       # quiz page styles
├── js/
│   ├── api.js         # all API calls (Solar System OpenData)
│   ├── solar.js       # homepage animation + navigation
│   ├── planet.js      # planet detail page logic
│   └── quiz.js        # quiz engine + scoring + LocalStorage
├── assets/
│   └── (images, icons)
└── docs/
    ├── plan.md
    └── progress.md
```

---

## 🚀 How to Run

No build step required.

**Option A — Direct:**
Open `index.html` in any modern browser.

**Option B — Local server (recommended, avoids CORS issues):**
```bash
# Python
python -m http.server 3000

# Node.js
npx serve .
```
Then open `http://localhost:3000`

---

## 📱 Responsive

Tested on:
- Mobile — 375px (iPhone SE)
- Tablet — 768px (iPad)
- Desktop — 1440px

---

## ✅ Features

- [x] 3D animated solar system with clickable planets
- [x] Live planet data from real API (no hardcoded facts)
- [x] Quiz with timer and scoring
- [x] Scores saved to LocalStorage
- [x] Loading / error / empty states on all async operations
- [x] Fully responsive — mobile, tablet, desktop
- [x] Semantic HTML5 throughout
- [x] RTL Hebrew support

---

## 🤝 Work Division

| Task | Owner |
|------|-------|
| HTML structure (all pages) | Both |
| Shared CSS + variables | Both |
| 3D solar system animation (`solar.css`, `solar.js`) | Student 1 |
| API integration (`api.js`, `planet.js`) | Student 2 |
| Quiz engine + scoring (`quiz.js`) | Both |
| Scores page (`scores.html`) | Student 1 |
| Responsive testing | Both |
| README | Both |

---

## 📦 Submission Checklist

- [ ] Site opens with no console errors
- [ ] All 4 pages work correctly
- [ ] API data loads and displays on planet page
- [ ] Quiz runs correctly end-to-end
- [ ] Scores save and display correctly
- [ ] Responsive on mobile, tablet, desktop
- [ ] README is complete
- [ ] Code is clean with meaningful names
- [ ] No sensitive data or API keys in code