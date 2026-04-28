/* =============================================
   api.js — ALL fetch / API calls live here only
   Phase 3 implementation goes here
   ============================================= */

const API_BASE = 'https://api.le-systeme-solaire.net/rest/bodies/';

const PLANET_NAMES = [
  'mercury', 'venus', 'earth', 'mars',
  'jupiter', 'saturn', 'uranus', 'neptune',
];

/**
 * Fetch a single planet by name.
 * @param {string} name - lowercase planet name e.g. 'mars'
 * @returns {Promise<Object>} planet data object
 */
async function getPlanet(name) {
  const response = await fetch(`${API_BASE}${name}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch planet: ${name} (${response.status})`);
  }
  return response.json();
}

/**
 * Fetch all 8 planets in parallel.
 * @returns {Promise<Object[]>} array of planet data objects
 */
async function getAllPlanets() {
  const results = await Promise.all(PLANET_NAMES.map(getPlanet));
  return results;
}
