/* =============================================
   solar.js — 3D solar system animation + planet click navigation
   Phase 2 implementation
   ============================================= */

const PLANETS = [
  { name: 'mercury', label: 'מרקורי',     radius: 60,  size: 8,  duration: 4,  color: '#a59889' },
  { name: 'venus',   label: 'ונוס',        radius: 90,  size: 14, duration: 7,  color: '#d4a657' },
  { name: 'earth',   label: 'כדור הארץ',   radius: 125, size: 15, duration: 10, color: '#4b8feb' },
  { name: 'mars',    label: 'מאדים',       radius: 155, size: 11, duration: 14, color: '#c4533a' },
  { name: 'jupiter', label: 'צדק',         radius: 200, size: 28, duration: 22, color: '#d4a574' },
  { name: 'saturn',  label: 'שבתאי',       radius: 235, size: 22, duration: 30, color: '#e1c699', hasRings: true },
  { name: 'uranus',  label: 'אורנוס',      radius: 265, size: 17, duration: 40, color: '#93cfd6' },
  { name: 'neptune', label: 'נפטון',       radius: 290, size: 17, duration: 50, color: '#4060c0' },
];

const STAR_COUNT = 180;

document.addEventListener('DOMContentLoaded', () => {
  buildStarfield();
  buildPlanets();
});

function buildPlanets() {
  const system = document.getElementById('solar-system');
  if (!system) return;

  PLANETS.forEach((planet) => {
    // Random negative delay so planets don't all start lined up at the top
    const delay = -(Math.random() * planet.duration);
    const delayStr = `${delay.toFixed(2)}s`;
    const durationStr = `${planet.duration}s`;

    const orbit = document.createElement('div');
    orbit.className = 'orbit';
    orbit.style.setProperty('--orbit-size', `${planet.radius * 2}px`);
    orbit.style.setProperty('--orbit-duration', durationStr);
    orbit.style.setProperty('--orbit-delay', delayStr);

    const position = document.createElement('div');
    position.className = 'planet-position';

    const button = document.createElement('button');
    button.type = 'button';
    button.className = `planet planet--${planet.name}`;
    if (planet.hasRings) button.classList.add('planet--ringed');
    button.dataset.planet = planet.name;
    button.style.setProperty('--planet-size', `${planet.size}px`);
    button.style.setProperty('--planet-color', planet.color);
    button.style.setProperty('--orbit-duration', durationStr);
    button.style.setProperty('--orbit-delay', delayStr);
    button.setAttribute('aria-label', `${planet.label} — מעבר לעמוד הכוכב`);

    const tooltip = document.createElement('span');
    tooltip.className = 'planet-tooltip';
    tooltip.textContent = planet.label;
    button.appendChild(tooltip);

    button.addEventListener('click', () => {
      window.location.href = `planet.html?name=${planet.name}`;
    });

    position.appendChild(button);
    orbit.appendChild(position);
    system.appendChild(orbit);
  });
}

function buildStarfield() {
  const scene = document.querySelector('.solar-scene');
  if (!scene) return;

  const starfield = document.createElement('div');
  starfield.className = 'starfield';
  starfield.setAttribute('aria-hidden', 'true');

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < STAR_COUNT; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.top = `${(Math.random() * 100).toFixed(2)}%`;
    star.style.left = `${(Math.random() * 100).toFixed(2)}%`;
    const size = Math.random() < 0.85 ? 1 : 2;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.animationDelay = `${(Math.random() * 3).toFixed(2)}s`;
    star.style.setProperty('--star-opacity', (0.4 + Math.random() * 0.6).toFixed(2));
    fragment.appendChild(star);
  }

  starfield.appendChild(fragment);
  scene.prepend(starfield);
}
