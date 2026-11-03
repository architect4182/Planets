/* ====================================================================
   1. REMOTE ASSETS CONSTANTS
   ==================================================================== */
const BASE = 'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P';
const MARS_BG  = `${BASE}/3c83091e-4046-4fd6-adbb-2edb728be79a.mp4`;
const TO_EARTH = `${BASE}/fc3ded42-e845-41f3-a830-5cab512d79cd.mp4`;
const TO_VENUS = `${BASE}/b30f64d9-1637-477a-83df-d0fc6461a422.mp4`;
const TO_MARS  = `${BASE}/5fc5651c-3b5d-4171-b507-87f7e635d1b4.mp4`;
const MERCURY  = `${BASE}/d6fb8b6b-c15e-4aaa-9cf7-45bbb5e33372.jpg`;
const LOGO     = `${BASE}/eb7e0f53-50cd-4af5-abc4-8b9a52cdc01b.svg`;

/* ====================================================================
   4. DATA MODEL & COMPREHENSIVE ASTRONOMICAL TELEMETRY
   ==================================================================== */
const planets = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'];

const states = {
  mars: {
    name: 'Mars',
    next: 'Earth',
    number: '[03]',
    portal: TO_EARTH,
    background: 'mars-background',
    facts: [
      ['Distance:', 'About 228 million km (1.5 astronomical units).'],
      ['Year:', 'One Martian year is equal to 687 Earth days.'],
      ['Temperature:', 'Around -60 °C, dropping to -125 °C at the poles in winter.'],
      ['Atmosphere:', 'Very thin, consisting of 95% carbon dioxide, with frequent dust storms.']
    ]
  },
  earth: {
    name: 'Earth',
    next: 'Venus',
    number: '[02]',
    portal: TO_VENUS,
    background: 'earth-background',
    facts: [
      ['Distance:', '149.6 million km from the Sun.'],
      ['Year:', '365.25 Earth days.'],
      ['Temperature:', 'Average surface temperature around 15 °C.'],
      ['Atmosphere:', 'Mostly nitrogen and oxygen, supporting life and liquid water.']
    ]
  },
  venus: {
    name: 'Venus',
    next: 'Mercury',
    number: '[06]',
    image: MERCURY,
    background: 'venus-background',
    facts: [
      ['Distance:', '108.2 million km from the Sun.'],
      ['Year:', '225 Earth days.'],
      ['Temperature:', 'Around 465 °C — the hottest planet in the Solar System.'],
      ['Atmosphere:', 'Extremely dense, mostly carbon dioxide, with clouds of sulfuric acid.']
    ]
  }
};

/* Detailed scientific telemetry and exploration records */
const planetaryData = {
  mars: {
    name: 'Mars',
    title: 'MARS',
    badge: 'Red Planet Telemetry',
    subtitle: 'The 4th planet from the Sun and humanity’s primary candidate for interplanetary colonization.',
    specs: [
      { label: 'Equatorial Radius', value: '3,389.5 km (0.532 Earths)' },
      { label: 'Surface Gravity', value: '3.72 m/s² (0.379 g)' },
      { label: 'Mean Solar Distance', value: '227.9 million km (1.524 AU)' },
      { label: 'Orbital Period (Year)', value: '686.98 Earth Days (1.88 yrs)' },
      { label: 'Rotational Period (Sol)', value: '24h 37m 22s' },
      { label: 'Mean Surface Temp', value: '-63 °C (210 K, min -140 °C)' },
      { label: 'Surface Pressure', value: '6.1 mbar (0.006 atm)' },
      { label: 'Known Moons', value: '2 (Phobos & Deimos)' },
      { label: 'Axial Tilt', value: '25.19° (Earth-like seasons)' },
      { label: 'Escape Velocity', value: '5.03 km/s' }
    ],
    atmosphere: [
      { gas: 'Carbon Dioxide (CO₂)', pct: '95.32%', value: 95.32, color: '#ef4444' },
      { gas: 'Nitrogen (N₂)', pct: '2.60%', value: 2.6, color: '#3b82f6' },
      { gas: 'Argon (Ar)', pct: '1.90%', value: 1.9, color: '#a855f7' },
      { gas: 'Oxygen (O₂)', pct: '0.13%', value: 0.13, color: '#10b981' },
      { gas: 'Carbon Monoxide (CO)', pct: '0.08%', value: 0.08, color: '#f59e0b' },
      { gas: 'Water Vapor (H₂O)', pct: '0.03% (seasonal)', value: 0.03, color: '#06b6d4' }
    ],
    features: [
      { name: 'Olympus Mons', desc: 'The largest shield volcano and mountain in the Solar System. Rising 21.9 km above datum, it is roughly 2.5 times the height of Mount Everest and covers an area larger than Arizona.' },
      { name: 'Valles Marineris', desc: 'A vast tectonic canyon system stretching over 4,000 km along the Martian equator, up to 200 km wide and reaching depths of 7,000 meters — dwarfing the Grand Canyon.' },
      { name: 'Hellas Planitia', desc: 'A giant impact crater basin with a diameter of approximately 2,300 km and a depth of 7,152 meters, formed during the Late Heavy Bombardment ~4 billion years ago.' },
      { name: 'Planum Boreum & Australe', desc: 'Vast polar ice caps composed of perpetual water ice sheets capped by seasonal deposits of frozen carbon dioxide (dry ice) that sublimate every Martian summer.' }
    ],
    missions: [
      { year: '1971', name: 'Mariner 9', agency: 'NASA', desc: 'Became the first artificial spacecraft to orbit another planet, returning 7,329 photos that revealed extinct volcanoes and ancient dry riverbeds.' },
      { year: '1976', name: 'Viking 1 & 2', agency: 'NASA', desc: 'Successfully executed the first long-duration robotic surface landings and biological experiments on Martian soil.' },
      { year: '2004', name: 'Opportunity & Spirit', agency: 'NASA', desc: 'Twin robotic rovers that discovered sedimentary hematite spherules (“blueberries”), proving persistent standing liquid water existed in Mars’ ancient past.' },
      { year: '2012', name: 'Curiosity Rover', agency: 'NASA', desc: 'Discovered ancient organic molecules, sulfur, nitrogen, and verified ancient Gale Crater was once an oasis habitable lake system.' },
      { year: '2021', name: 'Perseverance & Ingenuity', agency: 'NASA', desc: 'Cached sedimentary core samples in Jezero Crater delta and completed 72 historic powered, controlled aerodynamic flights with the Ingenuity helicopter.' }
    ]
  },
  earth: {
    name: 'Earth',
    title: 'EARTH',
    badge: 'Biosphere Telemetry',
    subtitle: 'The 3rd planet from the Sun and the only known harbor of conscious life in the universe.',
    specs: [
      { label: 'Equatorial Radius', value: '6,378.1 km (1.000 Earth)' },
      { label: 'Surface Gravity', value: '9.807 m/s² (1.000 g)' },
      { label: 'Mean Solar Distance', value: '149.6 million km (1.000 AU)' },
      { label: 'Orbital Period (Year)', value: '365.256 Days' },
      { label: 'Rotational Period (Day)', value: '23h 56m 04s (Sidereal)' },
      { label: 'Mean Surface Temp', value: '15 °C (288 K, record 56.7 °C)' },
      { label: 'Atmospheric Pressure', value: '1,013.25 mbar (1.000 atm)' },
      { label: 'Known Moons', value: '1 (The Moon / Luna)' },
      { label: 'Axial Tilt', value: '23.44°' },
      { label: 'Escape Velocity', value: '11.186 km/s' }
    ],
    atmosphere: [
      { gas: 'Nitrogen (N₂)', pct: '78.08%', value: 78.08, color: '#3b82f6' },
      { gas: 'Oxygen (O₂)', pct: '20.95%', value: 20.95, color: '#10b981' },
      { gas: 'Argon (Ar)', pct: '0.93%', value: 0.93, color: '#a855f7' },
      { gas: 'Carbon Dioxide (CO₂)', pct: '0.042% (422 ppm)', value: 0.42, color: '#ef4444' },
      { gas: 'Trace Gases (Ne, He, CH₄)', pct: '0.003%', value: 0.03, color: '#f59e0b' },
      { gas: 'Water Vapor (H₂O)', pct: '0.25% to 4% (dynamic)', value: 1.5, color: '#06b6d4' }
    ],
    features: [
      { name: 'Mariana Trench (Challenger Deep)', desc: 'The deepest point in Earth’s oceans, descending 10,994 meters below sea level with hydrostatic pressure exceeding 1,086 bar (over 1,000 times atmospheric pressure).' },
      { name: 'Mid-Atlantic Ridge', desc: 'The longest mountain chain on Earth, spanning over 65,000 km across the ocean floors where tectonic divergence continually creates new basaltic oceanic crust.' },
      { name: 'Mount Everest (Sagarmatha)', desc: 'The highest elevation on Earth above sea level at 8,848.86 meters, born from the ongoing continental collision of the Indian and Eurasian tectonic plates.' },
      { name: 'Great Barrier Reef', desc: 'The world’s largest coral reef ecosystem, encompassing over 2,900 individual reefs spanning 2,300 km, entirely constructed by billions of tiny living coral polyps.' }
    ],
    missions: [
      { year: '1957', name: 'Sputnik 1', agency: 'USSR', desc: 'The dawn of the space age: humanity’s first artificial satellite injected into low Earth orbit.' },
      { year: '1968', name: 'Apollo 8', agency: 'NASA', desc: 'Humanity’s first crewed journey beyond low Earth orbit, orbiting the Moon and capturing the iconic “Earthrise” photograph.' },
      { year: '1972', name: 'Landsat 1', agency: 'NASA / USGS', desc: 'Inaugurated continuous multispectral civilian satellite remote sensing of global planetary landmasses and ecosystems.' },
      { year: '1998', name: 'International Space Station', agency: 'Multinational', desc: 'A microgravity laboratory continuously inhabited by humans for over 25 years, orbiting Earth every 92 minutes.' },
      { year: '2022', name: 'SWOT Satellite', agency: 'NASA / CNES', desc: 'Surveys 90% of Earth’s surface water in high-definition radar interferometry, revolutionizing ocean dynamics and hydrological modeling.' }
    ]
  },
  venus: {
    name: 'Venus',
    title: 'VENUS',
    badge: 'Inferno Telemetry',
    subtitle: 'The 2nd planet from the Sun, enveloped in runaway greenhouse carbon clouds.',
    specs: [
      { label: 'Equatorial Radius', value: '6,051.8 km (0.949 Earths)' },
      { label: 'Surface Gravity', value: '8.87 m/s² (0.904 g)' },
      { label: 'Mean Solar Distance', value: '108.2 million km (0.723 AU)' },
      { label: 'Orbital Period (Year)', value: '224.70 Earth Days' },
      { label: 'Rotational Period (Day)', value: '243.02 Earth Days (Retrograde)' },
      { label: 'Mean Surface Temp', value: '464 °C (737 K, leads to lead melting)' },
      { label: 'Surface Pressure', value: '92.0 bar (~91 atm, equal to 900m oceanic depth)' },
      { label: 'Known Moons', value: '0' },
      { label: 'Axial Tilt', value: '177.36° (Rotates upside-down)' },
      { label: 'Escape Velocity', value: '10.36 km/s' }
    ],
    atmosphere: [
      { gas: 'Carbon Dioxide (CO₂)', pct: '96.50%', value: 96.5, color: '#ef4444' },
      { gas: 'Nitrogen (N₂)', pct: '3.50%', value: 3.5, color: '#3b82f6' },
      { gas: 'Sulfur Dioxide (SO₂)', pct: '150 ppm (0.015%)', value: 0.15, color: '#eab308' },
      { gas: 'Argon (Ar)', pct: '70 ppm (0.007%)', value: 0.07, color: '#a855f7' },
      { gas: 'Water Vapor (H₂O)', pct: '20 ppm (0.002%)', value: 0.02, color: '#06b6d4' },
      { gas: 'Carbon Monoxide (CO)', pct: '17 ppm (0.0017%)', value: 0.017, color: '#f97316' }
    ],
    features: [
      { name: 'Maxwell Montes', desc: 'The highest mountain massif on Venus, towering 11 kilometers above the average surface radius in the northern Ishtar Terra highland continent.' },
      { name: 'Maat Mons', desc: 'An enormous volcanic shield reaching 8 kilometers high. Recent radar interferometry comparisons from Magellan suggest ongoing contemporary volcanism.' },
      { name: 'Aphrodite Terra', desc: 'The largest of the three terra highland regions on Venus, covering an area approximately equivalent in size to the continent of Africa.' },
      { name: 'Coronae (e.g. Artemis Corona)', desc: 'Massive circular volcano-tectonic ring features unique to Venus, measuring up to 2,600 km across, generated by rising mantle diapirs and lithospheric flexure.' }
    ],
    missions: [
      { year: '1962', name: 'Mariner 2', agency: 'NASA', desc: 'The first successful planetary encounter in human history, confirming scorching surface temperatures and an absence of a strong magnetic field.' },
      { year: '1970', name: 'Venera 7', agency: 'USSR', desc: 'Humanity’s first successful soft landing on another planet, surviving 23 minutes on the infernal surface to transmit direct temperature and pressure measurements.' },
      { year: '1982', name: 'Venera 13', agency: 'USSR', desc: 'Transmitted the first true-color panoramic photographs and acoustic recordings of the Venusian surface before succumbing to extreme heat after 127 minutes.' },
      { year: '1990', name: 'Magellan', agency: 'NASA', desc: 'Mapped 98% of Venus’ hidden surface using high-resolution synthetic aperture radar (SAR), cataloging craters, rift valleys, and thousands of volcanic calderas.' },
      { year: '2015', name: 'Akatsuki', agency: 'JAXA', desc: 'Entered Venusian orbit to study atmospheric super-rotation, where hurricane-velocity sulfuric clouds circle the globe every 4 Earth days.' }
    ]
  }
};

/* Full 8-planet Solar System Directory */
const solarSystemCatalog = [
  {
    id: 'mercury',
    name: 'Mercury',
    type: 'Terrestrial Planet',
    distAU: '0.387 AU',
    distKm: '57.9M km',
    radius: '2,439.7 km',
    orbitalPeriod: '87.97 Days',
    moons: 0,
    desc: 'The smallest and innermost planet, with extreme temperature swings from -180 °C at night to 430 °C during the day due to lack of a protective atmosphere.',
    teleportState: null
  },
  {
    id: 'venus',
    name: 'Venus',
    type: 'Terrestrial Planet',
    distAU: '0.723 AU',
    distKm: '108.2M km',
    radius: '6,051.8 km',
    orbitalPeriod: '224.7 Days',
    moons: 0,
    desc: 'A runaway greenhouse world veiled in reflective sulfuric acid clouds, hosting the hottest planetary surface in the entire Solar System.',
    teleportState: 'venus'
  },
  {
    id: 'earth',
    name: 'Earth',
    type: 'Terrestrial Planet',
    distAU: '1.000 AU',
    distKm: '149.6M km',
    radius: '6,371.0 km',
    orbitalPeriod: '365.25 Days',
    moons: 1,
    desc: 'The dynamic blue marble, uniquely characterized by active plate tectonics, abundant surface liquid water oceans, and an oxygen-rich biosphere.',
    teleportState: 'earth'
  },
  {
    id: 'mars',
    name: 'Mars',
    type: 'Terrestrial Planet',
    distAU: '1.524 AU',
    distKm: '227.9M km',
    radius: '3,389.5 km',
    orbitalPeriod: '687 Days',
    moons: 2,
    desc: 'The rusted desert world possessing towering extinct shield volcanoes, colossal equatorial canyon systems, and frozen subsurface water ice.',
    teleportState: 'mars'
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    type: 'Gas Giant',
    distAU: '5.204 AU',
    distKm: '778.5M km',
    radius: '69,911 km',
    orbitalPeriod: '11.86 Years',
    moons: 95,
    desc: 'The monarch of planets with more than double the mass of all other solar system planets combined, hosting the iconic centuries-old Great Red Spot anticyclone.',
    teleportState: null
  },
  {
    id: 'saturn',
    name: 'Saturn',
    type: 'Gas Giant',
    distAU: '9.582 AU',
    distKm: '1.43B km',
    radius: '58,232 km',
    orbitalPeriod: '29.45 Years',
    moons: 146,
    desc: 'Renowned for its breathtaking ring system of pure water ice boulders and diverse moons, including organic-rich smog-shrouded Titan and geyser-erupting Enceladus.',
    teleportState: null
  },
  {
    id: 'uranus',
    name: 'Uranus',
    type: 'Ice Giant',
    distAU: '19.20 AU',
    distKm: '2.87B km',
    radius: '25,362 km',
    orbitalPeriod: '84.02 Years',
    moons: 28,
    desc: 'An ice giant with a pale cyan atmosphere enriched in methane, tilted on its side at an extreme 97.77° axial inclination rolling around the Sun like a ball.',
    teleportState: null
  },
  {
    id: 'neptune',
    name: 'Neptune',
    type: 'Ice Giant',
    distAU: '30.05 AU',
    distKm: '4.50B km',
    radius: '24,622 km',
    orbitalPeriod: '164.8 Years',
    moons: 16,
    desc: 'The windiest world in the Solar System, harboring supersonic methane jetstreams exceeding 2,100 km/h and the captured retrograde cryogenic moon Triton.',
    teleportState: null
  }
];

/* DOM Elements */
const experienceEl    = document.querySelector('.experience');
const preloader       = document.getElementById('preloader');
const preloaderVid    = document.getElementById('preloader-video');
const preloaderCount  = document.getElementById('preloader-count');
const preloaderVal    = document.getElementById('preloader-value');
const floatingLogo    = document.getElementById('floating-logo');
const portalCanvas    = document.getElementById('portal-canvas');
const portalCtx       = portalCanvas.getContext('2d');
const sceneCanvas     = document.getElementById('scene-canvas');
const sceneCtx        = sceneCanvas.getContext('2d');
const portalBtn       = document.getElementById('portal');
const portalVideo     = document.getElementById('portal-video');
const portalImage     = document.getElementById('portal-image');
const nextName        = document.getElementById('next-name');
const nextNumber      = document.getElementById('next-number');
const planetTitle     = document.getElementById('planet-title');
const factsList       = document.getElementById('facts');
const planetList      = document.querySelector('.planet-list');
const transitionVideo = document.getElementById('transition-video');
const customCursor    = document.querySelector('.custom-cursor');

/* Modal DOM Elements */
const modalOverlay    = document.getElementById('modal-overlay');
const modalContainer  = document.getElementById('modal-container');
const modalTitle      = document.getElementById('modal-title');
const modalBadge      = document.getElementById('modal-badge');
const modalTabs       = document.getElementById('modal-tabs');
const modalBody       = document.getElementById('modal-body');
const modalCloseBtn   = document.getElementById('modal-close-btn');
const telemetryBtn    = document.getElementById('telemetry-btn');
const navLinks        = document.querySelectorAll('.nav a');
const menuBtn         = document.querySelector('.menu');

/* State Variables */
let current = 'mars';
let isFirstRender = true;
let busy = false;
let transitionActive = false;
let expansion = 0;
let maskScale = 1;
let canvasOpacity = 1;
let hasFrozenScene = false;
let dpr = 1;

/* Modal Navigation State */
let activeModal = null; // 'explore' | 'about' | 'planets'
let activeTab = null;

/* Tilt Physics */
let targetX = 0;
let targetY = 0;
let rotX = 0;
let rotY = 0;
let lastFrameTime = performance.now();

/* Custom Cursor Coordinates */
let pointerX = window.innerWidth / 2;
let pointerY = window.innerHeight / 2;
let orbitX = pointerX;
let orbitY = pointerY;
let cursorVisible = false;

/* Prevent default jumps on nav links */
document.querySelectorAll('.nav a, .menu').forEach(el => {
  el.addEventListener('click', (e) => e.preventDefault());
});

/* ====================================================================
   8. EASING & ANIMATION HELPER
   ==================================================================== */
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function animateValue(setter, duration) {
  return new Promise((resolve) => {
    const startTime = performance.now();
    function step(now) {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      const eased = easeInOutCubic(t);
      setter(eased);
      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        setter(1);
        resolve();
      }
    }
    requestAnimationFrame(step);
  });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ====================================================================
   4. RENDER METHOD
   ==================================================================== */
function render() {
  const state = states[current];

  experienceEl.setAttribute('data-planet', current);
  planetTitle.textContent = state.name.toUpperCase();
  nextName.textContent = state.next;
  nextNumber.textContent = state.number;
  portalBtn.setAttribute('aria-label', `Travel to ${state.next}`);

  factsList.innerHTML = state.facts
    .map(([key, val]) => `<div class="fact"><dt>${escapeHtml(key)}</dt><dd>${escapeHtml(val)}</dd></div>`)
    .join('');

  planetList.innerHTML = planets
    .map(p => {
      const isActive = p.toLowerCase() === state.name.toLowerCase();
      return `<span class="planet-item${isActive ? ' active' : ''}" data-planet-name="${p.toLowerCase()}">${p}</span>`;
    })
    .join('');

  planetList.querySelectorAll('.planet-item').forEach(item => {
    const pName = item.getAttribute('data-planet-name');
    if (['mars', 'earth', 'venus'].includes(pName)) {
      item.style.cursor = 'pointer';
      item.setAttribute('title', `Teleport to ${item.textContent}`);
      item.addEventListener('click', () => jumpToPlanet(pName));
    }
  });

  if (!isFirstRender) {
    planetList.classList.remove('is-switching');
    void planetList.offsetWidth;
    planetList.classList.add('is-switching');
  } else {
    isFirstRender = false;
  }

  const backgrounds = document.querySelectorAll('.backgrounds .background');
  backgrounds.forEach(bg => {
    if (bg.id === state.background) {
      bg.classList.add('is-visible');
      bg.loop = true;
      bg.play().catch(() => {});
    } else {
      bg.classList.remove('is-visible');
    }
  });

  if (state.image) {
    portalImage.style.display = 'block';
    portalVideo.style.display = 'none';
    portalVideo.pause();
  } else {
    portalImage.style.display = 'none';
    portalVideo.style.display = 'block';
    if (state.portal && portalVideo.src !== state.portal) {
      portalVideo.src = state.portal;
      portalVideo.load();
    }
    portalVideo.loop = true;
    portalVideo.play().catch(() => {});
  }

  if (activeModal === 'explore') {
    renderModal();
  }
}

/* ====================================================================
   7. CANVAS SIZING & DRAWING UTILITIES
   ==================================================================== */
function resizeCanvas() {
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = window.innerWidth;
  const h = window.innerHeight;

  portalCanvas.width = w * dpr;
  portalCanvas.height = h * dpr;
  portalCanvas.style.width = w + 'px';
  portalCanvas.style.height = h + 'px';
  portalCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

  if (!hasFrozenScene) {
    sceneCanvas.width = w * dpr;
    sceneCanvas.height = h * dpr;
    sceneCanvas.style.width = w + 'px';
    sceneCanvas.style.height = h + 'px';
    sceneCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
}
window.addEventListener('resize', resizeCanvas);

function drawCover(targetCtx, media) {
  if (!media) return;
  const mw = media.videoWidth || media.naturalWidth || media.width || 0;
  const mh = media.videoHeight || media.naturalHeight || media.height || 0;
  if (!mw || !mh) return;
  const scale = Math.max(window.innerWidth / mw, window.innerHeight / mh);
  const w = mw * scale;
  const h = mh * scale;
  const x = (window.innerWidth - w) / 2;
  const y = (window.innerHeight - h) / 2;
  targetCtx.drawImage(media, x, y, w, h);
}

function drawShade(targetCtx) {
  const yStart = window.innerHeight * 0.52;
  const yEnd = window.innerHeight;
  const grad = targetCtx.createLinearGradient(0, yStart, 0, yEnd);
  grad.addColorStop(0, 'rgba(0,0,0,0)');
  grad.addColorStop(1, 'rgba(0,0,0,0.88)');
  targetCtx.fillStyle = grad;
  targetCtx.fillRect(0, yStart, window.innerWidth, yEnd - yStart);
}

function getRoundedRectPoints(w, h, r) {
  r = Math.max(0, Math.min(r, w / 2, h / 2));
  const corners = [
    [ w / 2 - r, -h / 2 + r, -Math.PI / 2, 0 ],
    [ w / 2 - r,  h / 2 - r, 0,            Math.PI / 2 ],
    [-w / 2 + r,  h / 2 - r, Math.PI / 2,  Math.PI ],
    [-w / 2 + r, -h / 2 + r, Math.PI,      Math.PI * 1.5 ]
  ];
  const points = [];
  for (let c = 0; c < 4; c++) {
    const [arcX, arcY, startAngle, endAngle] = corners[c];
    for (let i = 0; i <= 10; i++) {
      const angle = startAngle + (endAngle - startAngle) * (i / 10);
      points.push([
        arcX + r * Math.cos(angle),
        arcY + r * Math.sin(angle)
      ]);
    }
  }
  return points;
}

/* Pointer Tilt */
window.addEventListener('pointermove', (e) => {
  if (busy) return;
  targetY = (e.clientX / window.innerWidth - 0.5) * 37.4;
  targetX = (e.clientY / window.innerHeight - 0.5) * -33;
});

document.addEventListener('pointerleave', () => {
  targetX = 0;
  targetY = 0;
});

/* ====================================================================
   7. MAIN DRAW LOOP
   ==================================================================== */
function draw() {
  portalCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  if (hasFrozenScene) {
    portalCtx.drawImage(sceneCanvas, 0, 0, window.innerWidth, window.innerHeight);
    drawShade(portalCtx);
  }

  const now = performance.now();
  const dt = Math.min(now - lastFrameTime, 40);
  lastFrameTime = now;

  rotX += (targetX - rotX) * Math.min(1, dt * 0.009);
  rotY += (targetY - rotY) * Math.min(1, dt * 0.009);

  const rect = portalBtn.getBoundingClientRect();
  const rectCx = rect.left + rect.width / 2;
  const rectCy = rect.top + rect.height / 2;
  const e = expansion;

  const cx = rectCx + (window.innerWidth / 2 - rectCx) * e;
  const cy = rectCy + (window.innerHeight / 2 - rectCy) * e;
  const baseW = rect.width + (window.innerWidth - rect.width) * e;
  const baseH = rect.height + (window.innerHeight - rect.height) * e;
  const scale = e ? 1 : maskScale;
  const w = baseW * scale;
  const h = baseH * scale;
  const r = 90 * (1 - e) * scale;
  const rx = rotX * (1 - e);
  const ry = rotY * (1 - e);

  if (w > 1 && h > 1) {
    const points = getRoundedRectPoints(w, h, r);

    const ax = rx * Math.PI / 180;
    const ay = ry * Math.PI / 180;
    const cosAy = Math.cos(ay);
    const sinAy = Math.sin(ay);
    const cosAx = Math.cos(ax);
    const sinAx = Math.sin(ax);

    portalCtx.save();
    portalCtx.globalAlpha = canvasOpacity;
    portalCtx.beginPath();

    for (let i = 0; i < points.length; i++) {
      const [px, py] = points[i];
      const xx = px * cosAy;
      const yy = py * cosAx;
      const z = px * sinAy - py * sinAx;
      const p = 850 / (850 + z);
      const sx = cx + xx * p;
      const sy = cy + yy * p;
      if (i === 0) {
        portalCtx.moveTo(sx, sy);
      } else {
        portalCtx.lineTo(sx, sy);
      }
    }
    portalCtx.closePath();
    portalCtx.clip();

    portalCtx.fillStyle = '#030303';
    portalCtx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    const mediaToDraw = transitionActive
      ? transitionVideo
      : (states[current].image ? portalImage : portalVideo);
    drawCover(portalCtx, mediaToDraw);

    if (transitionActive) {
      drawShade(portalCtx);
    }

    portalCtx.restore();
  }

  requestAnimationFrame(draw);
}

/* ====================================================================
   9. CUSTOM CURSOR LOOP & HANDLERS
   ==================================================================== */
window.addEventListener('pointermove', (e) => {
  pointerX = e.clientX;
  pointerY = e.clientY;
  if (!cursorVisible) {
    cursorVisible = true;
    customCursor.classList.add('is-visible');
  }
});

document.addEventListener('mouseleave', () => {
  cursorVisible = false;
  customCursor.classList.remove('is-visible');
});

portalBtn.addEventListener('pointerenter', () => {
  customCursor.classList.add('is-enter');
});

portalBtn.addEventListener('pointerleave', () => {
  customCursor.classList.remove('is-enter');
});

function cursorLoop() {
  orbitX += (pointerX - orbitX) * 0.2;
  orbitY += (pointerY - orbitY) * 0.2;
  customCursor.style.transform = `translate3d(${orbitX}px, ${orbitY}px, 0)`;
  requestAnimationFrame(cursorLoop);
}

/* ====================================================================
   6. PRELOADER & START EXPERIENCE
   ==================================================================== */
function revealMask() {
  experienceEl.classList.remove('mask-revealing');
  void experienceEl.offsetWidth;
  experienceEl.classList.add('mask-revealing');
  maskScale = 0;
  return animateValue(v => { maskScale = v; }, 1050);
}

function revealPlanetContent() {
  experienceEl.classList.remove('content-revealing');
  void experienceEl.offsetWidth;
  experienceEl.classList.add('content-revealing');
}

function ensurePortalMediaReady() {
  return new Promise((resolve) => {
    const isImg = !!states[current].image;
    if (isImg) {
      if (portalImage.complete && portalImage.naturalWidth > 0) {
        return resolve();
      }
      portalImage.addEventListener('load', () => resolve(), { once: true });
      portalImage.addEventListener('error', () => resolve(), { once: true });
    } else {
      if (portalVideo.readyState >= 2) {
        return resolve();
      }
      portalVideo.addEventListener('canplay', () => resolve(), { once: true });
      portalVideo.addEventListener('error', () => resolve(), { once: true });
    }
    setTimeout(resolve, 1600);
  });
}

async function startExperience() {
  const bgVid = document.getElementById(states[current].background);
  if (bgVid) {
    bgVid.loop = true;
    bgVid.play().catch(() => {});
  }

  await ensurePortalMediaReady();

  if (!states[current].image && portalVideo) {
    portalVideo.loop = true;
    portalVideo.play().catch(() => {});
  }

  await revealMask();
  document.body.classList.add('intro-ready');
  setTimeout(() => {
    revealPlanetContent();
  }, 850);
}

function runPreloader() {
  let finished = false;
  let rafId = null;

  function finish() {
    if (finished) return;
    finished = true;
    if (rafId) cancelAnimationFrame(rafId);
    preloaderVal.textContent = '100';
    preloaderCount.classList.add('is-leaving');
    floatingLogo.classList.add('is-docked');
    preloader.classList.add('is-background');
    document.body.classList.add('preload-complete');
    startExperience();
    setTimeout(() => {
      preloaderCount.remove();
    }, 750);
    setTimeout(() => {
      floatingLogo.classList.add('is-settled');
    }, 2000);
  }

  function tick() {
    if (finished) return;
    if (preloaderVid.duration && preloaderVid.duration > 0) {
      const pct = Math.min(100, Math.round((preloaderVid.currentTime / preloaderVid.duration) * 100));
      preloaderVal.textContent = String(pct);
      if (pct >= 99 && preloaderVid.currentTime >= preloaderVid.duration - 0.05) {
        finish();
        return;
      }
    }
    rafId = requestAnimationFrame(tick);
  }

  function onMeta() {
    const dur = preloaderVid.duration;
    if (dur && isFinite(dur) && dur > 0) {
      preloaderVid.playbackRate = Math.max(0.25, dur / 3);
    }
    const playPromise = preloaderVid.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        rafId = requestAnimationFrame(tick);
      }).catch(err => {
        console.warn('Preloader video play rejected:', err);
        finish();
      });
    } else {
      rafId = requestAnimationFrame(tick);
    }
  }

  preloaderVid.addEventListener('ended', finish, { once: true });
  preloaderVid.addEventListener('error', finish, { once: true });

  if (preloaderVid.readyState >= 1) {
    onMeta();
  } else {
    preloaderVid.addEventListener('loadedmetadata', onMeta, { once: true });
  }

  setTimeout(() => {
    if (!finished) finish();
  }, 4500);
}

/* ====================================================================
   8. TRAVEL TRANSITION (click the portal)
   ==================================================================== */
async function travel() {
  if (busy || current === 'venus') return;
  busy = true;
  targetX = 0;
  targetY = 0;

  const next = current === 'mars' ? 'earth' : 'venus';

  try {
    transitionVideo.src = states[current].portal;
    transitionVideo.load();
    experienceEl.classList.add('is-loading');

    await new Promise((resolve) => {
      let done = false;
      function cleanup() {
        if (done) return;
        done = true;
        transitionVideo.removeEventListener('canplaythrough', onReady);
        transitionVideo.removeEventListener('error', onReady);
        clearTimeout(timer);
        resolve();
      }
      function onReady() { cleanup(); }
      transitionVideo.addEventListener('canplaythrough', onReady, { once: true });
      transitionVideo.addEventListener('error', onReady, { once: true });
      const timer = setTimeout(cleanup, 1600);
      if (transitionVideo.readyState >= 4) cleanup();
    });

    experienceEl.classList.remove('is-loading', 'content-revealing', 'mask-revealing');
    experienceEl.classList.add('is-transitioning');

    transitionVideo.currentTime = 0;
    transitionVideo.playbackRate = 1.3;
    canvasOpacity = 1;
    transitionActive = true;

    await transitionVideo.play();
    await animateValue(v => { expansion = v; }, 1100);

    await new Promise((resolve) => {
      if (transitionVideo.ended) return resolve();
      function onEnded() { cleanup(); resolve(); }
      function onError() { cleanup(); resolve(); }
      function cleanup() {
        transitionVideo.removeEventListener('ended', onEnded);
        transitionVideo.removeEventListener('error', onError);
        clearTimeout(timeoutId);
      }
      transitionVideo.addEventListener('ended', onEnded, { once: true });
      transitionVideo.addEventListener('error', onError, { once: true });
      const timeoutId = setTimeout(() => {
        cleanup();
        resolve();
      }, 25000);
    });

    hasFrozenScene = true;
    sceneCanvas.width = window.innerWidth * dpr;
    sceneCanvas.height = window.innerHeight * dpr;
    sceneCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    sceneCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    drawCover(sceneCtx, transitionVideo);

    current = next;
    experienceEl.classList.add('is-committing');
    render();

    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));

    transitionActive = false;
    expansion = 0;
    maskScale = 0;
    canvasOpacity = 1;

    experienceEl.classList.remove('is-transitioning', 'is-committing');

    const maskReveal = revealMask();
    setTimeout(() => {
      revealPlanetContent();
    }, 100);

    await maskReveal;

    setTimeout(() => {
      transitionVideo.removeAttribute('src');
      transitionVideo.load();
      busy = false;
    }, 450);

  } catch (err) {
    console.error('Travel transition error:', err);
    transitionActive = false;
    expansion = 0;
    maskScale = 1;
    canvasOpacity = 1;
    experienceEl.classList.remove('is-loading', 'is-transitioning', 'is-committing');
    busy = false;
  }
}

/* ====================================================================
   10. MODAL CONTROLLERS & SCIENTIFIC SECTIONS
   ==================================================================== */
function openModal(type, preferredTab) {
  activeModal = type;
  if (type === 'explore') {
    activeTab = preferredTab || 'specs';
  } else if (type === 'about') {
    activeTab = preferredTab || 'overview';
  } else if (type === 'planets') {
    activeTab = preferredTab || 'all';
  }
  renderModal();
  modalOverlay.classList.add('is-open');
  modalOverlay.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-active');
  modalBody.scrollTop = 0;
  modalBody.focus();

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === `#${type}`) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

function closeModal() {
  if (!activeModal) return;
  activeModal = null;
  activeTab = null;
  modalOverlay.classList.remove('is-open');
  modalOverlay.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-active');
  navLinks.forEach(link => {
    link.classList.remove('active');
  });
}

function renderModal() {
  if (!activeModal) return;

  if (activeModal === 'explore') {
    const data = planetaryData[current] || planetaryData.mars;
    modalTitle.textContent = `${data.name} — Planetary Telemetry`;
    modalBadge.textContent = data.badge;

    const tabs = [
      { id: 'specs', label: 'Physical Telemetry' },
      { id: 'atmosphere', label: 'Atmospheric Composition' },
      { id: 'features', label: 'Geological Landmarks' },
      { id: 'missions', label: 'Historic Missions' }
    ];

    modalTabs.innerHTML = tabs.map(t => 
      `<button class="modal-tab-btn${activeTab === t.id ? ' active' : ''}" data-tab="${t.id}" type="button">${escapeHtml(t.label)}</button>`
    ).join('');

    renderExploreContent(data);

  } else if (activeModal === 'about') {
    modalTitle.textContent = 'Mission & Physics Briefing';
    modalBadge.textContent = 'SYSTEM OVERVIEW';

    const tabs = [
      { id: 'overview', label: 'Mission Overview' },
      { id: 'physics', label: 'Portal Physics' },
      { id: 'controls', label: 'Flight Controls' }
    ];

    modalTabs.innerHTML = tabs.map(t => 
      `<button class="modal-tab-btn${activeTab === t.id ? ' active' : ''}" data-tab="${t.id}" type="button">${escapeHtml(t.label)}</button>`
    ).join('');

    renderAboutContent();

  } else if (activeModal === 'planets') {
    modalTitle.textContent = 'Solar System Directory';
    modalBadge.textContent = 'CELESTIAL CATALOG';

    const tabs = [
      { id: 'all', label: 'All 8 Planets' },
      { id: 'terrestrial', label: 'Terrestrial Worlds' },
      { id: 'giants', label: 'Gas & Ice Giants' }
    ];

    modalTabs.innerHTML = tabs.map(t => 
      `<button class="modal-tab-btn${activeTab === t.id ? ' active' : ''}" data-tab="${t.id}" type="button">${escapeHtml(t.label)}</button>`
    ).join('');

    renderPlanetsContent();
  }

  modalTabs.querySelectorAll('.modal-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeTab = btn.getAttribute('data-tab');
      renderModal();
    });
  });
}

function renderExploreContent(data) {
  if (activeTab === 'specs') {
    modalBody.innerHTML = `
      <p class="section-desc">${escapeHtml(data.subtitle)} Precise orbital mechanics and physical constants recorded by interplanetary orbiters and radar telemetry.</p>
      <div class="specs-grid">
        ${data.specs.map(s => `
          <div class="spec-card">
            <div class="spec-label">${escapeHtml(s.label)}</div>
            <div class="spec-value">${escapeHtml(s.value)}</div>
          </div>
        `).join('')}
      </div>
    `;
  } else if (activeTab === 'atmosphere') {
    modalBody.innerHTML = `
      <p class="section-desc">Volumetric atmospheric chemical breakdown measured by entry probes and mass spectrometers.</p>
      <div class="comp-list">
        ${data.atmosphere.map(c => `
          <div class="comp-item">
            <div class="comp-labels">
              <span class="comp-gas">${escapeHtml(c.gas)}</span>
              <span class="comp-pct">${escapeHtml(c.pct)}</span>
            </div>
            <div class="comp-bar-track">
              <div class="comp-bar-fill" style="width: ${Math.min(100, Math.max(1.5, c.value))}%; background: ${c.color}"></div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  } else if (activeTab === 'features') {
    modalBody.innerHTML = `
      <p class="section-desc">Principal geological structures, impact basins, and topographical landmarks identified across the planetary surface.</p>
      <div class="features-grid">
        ${data.features.map(f => `
          <div class="feature-card">
            <h3>${escapeHtml(f.name)}</h3>
            <p>${escapeHtml(f.desc)}</p>
          </div>
        `).join('')}
      </div>
    `;
  } else if (activeTab === 'missions') {
    modalBody.innerHTML = `
      <p class="section-desc">Pioneering human and robotic exploration milestones that unveiled this world to science.</p>
      <div class="timeline">
        ${data.missions.map(m => `
          <div class="timeline-item">
            <div class="timeline-header">
              <span class="timeline-year">${escapeHtml(m.year)}</span>
              <span class="timeline-name">${escapeHtml(m.name)}</span>
              <span class="timeline-agency">${escapeHtml(m.agency)}</span>
            </div>
            <p class="timeline-desc">${escapeHtml(m.desc)}</p>
          </div>
        `).join('')}
      </div>
    `;
  }
}

function renderAboutContent() {
  if (activeTab === 'overview') {
    modalBody.innerHTML = `
      <p class="section-desc"><strong>Planet Jumping</strong> is a high-performance space exploration gateway engineered without third-party frameworks. It immerses observers in planetary transitions through an optical screen-locked spacetime portal.</p>
      <div class="features-grid">
        <div class="feature-card">
          <h3>Interplanetary Trajectory</h3>
          <p>Traversing from the arid dunes of Mars, across the fertile oceans of Earth, toward the supercritical sulfuric atmosphere of Venus, each orbit features authentic high-definition orbital cinematics and verified planetary measurements.</p>
        </div>
        <div class="feature-card">
          <h3>Dual-Engine Architecture</h3>
          <p>Delivered both as a pristine standalone zero-dependency web experience (HTML5, CSS3, ES2022) and as a modern production Next.js App Router application with hardware-accelerated canvas compositing.</p>
        </div>
      </div>
    `;
  } else if (activeTab === 'physics') {
    modalBody.innerHTML = `
      <p class="section-desc">The visual illusion of peering through a physical portal relies on mathematical coordinate transformation and screen-locked optical geometry.</p>
      <div class="features-grid">
        <div class="feature-card">
          <h3>Inverse Screen Transformation</h3>
          <p>Unlike standard 3D meshes where textures rotate with the container, the portal samples video pixels directly in screen coordinate space. When your cursor tilts the portal frame, the interior image stays firmly locked to the universe behind it.</p>
        </div>
        <div class="feature-card">
          <h3>Dual-Canvas Pipeline</h3>
          <p>A hidden background canvas buffers transition frames, while the foreground portal canvas computes sub-pixel rounded-rectangle polygon clipping with quadratic bezier curvature and dynamic illumination falloff.</p>
        </div>
      </div>
    `;
  } else if (activeTab === 'controls') {
    modalBody.innerHTML = `
      <p class="section-desc">Seamlessly navigate between worlds using intuitive gestures or rapid keyboard teleportation shortcuts.</p>
      <div class="controls-list">
        <div class="control-item">
          <div class="control-title"><kbd>Click Portal</kbd> or <kbd>Space</kbd></div>
          <div class="control-desc">Engage warp engines and jump to the designated destination planet.</div>
        </div>
        <div class="control-item">
          <div class="control-title"><kbd>1</kbd> <kbd>2</kbd> <kbd>3</kbd></div>
          <div class="control-desc">Instant teleporter hotkeys: [1] Mars Orbit, [2] Earth Orbit, [3] Venus Orbit.</div>
        </div>
        <div class="control-item">
          <div class="control-title"><kbd>ESC</kbd></div>
          <div class="control-desc">Instantly close active telemetry modals or navigation overlays.</div>
        </div>
        <div class="control-item">
          <div class="control-title"><kbd>Mouse Tilt</kbd></div>
          <div class="control-desc">Move your cursor across the screen to observe realistic portal parallax physics.</div>
        </div>
      </div>
    `;
  }
}

function renderPlanetsContent() {
  let list = solarSystemCatalog;
  if (activeTab === 'terrestrial') {
    list = solarSystemCatalog.filter(p => p.type === 'Terrestrial Planet');
  } else if (activeTab === 'giants') {
    list = solarSystemCatalog.filter(p => p.type.includes('Giant'));
  }

  modalBody.innerHTML = `
    <p class="section-desc">Catalogue of major celestial bodies orbiting Sol. Planets marked with active transits allow direct orbital insertion.</p>
    <div class="directory-grid">
      ${list.map(p => {
        const isCurrent = p.teleportState === current;
        const canTeleport = !!p.teleportState;
        let btnHtml = '';
        if (isCurrent) {
          btnHtml = `<button class="directory-jump-btn disabled" disabled type="button">Current Orbit</button>`;
        } else if (canTeleport) {
          btnHtml = `<button class="directory-jump-btn" data-jump="${p.teleportState}" type="button">Teleport to ${escapeHtml(p.name)}</button>`;
        } else {
          btnHtml = `<button class="directory-jump-btn disabled" disabled type="button">Uncharted Outer Orbit</button>`;
        }

        return `
          <div class="directory-card">
            <div class="directory-card-top">
              <div class="directory-card-title-row">
                <span class="directory-card-name">${escapeHtml(p.name)}</span>
                <span class="directory-card-type">${escapeHtml(p.type)}</span>
              </div>
              <div class="directory-card-stats">
                <div class="directory-card-stat">
                  <span>Solar Distance</span>
                  <span>${escapeHtml(p.distAU)}</span>
                </div>
                <div class="directory-card-stat">
                  <span>Diameter</span>
                  <span>${escapeHtml(p.radius)}</span>
                </div>
                <div class="directory-card-stat">
                  <span>Orbital Period</span>
                  <span>${escapeHtml(p.orbitalPeriod)}</span>
                </div>
                <div class="directory-card-stat">
                  <span>Moons</span>
                  <span>${escapeHtml(String(p.moons))}</span>
                </div>
              </div>
              <p class="directory-card-desc">${escapeHtml(p.desc)}</p>
            </div>
            ${btnHtml}
          </div>
        `;
      }).join('')}
    </div>
  `;

  modalBody.querySelectorAll('[data-jump]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-jump');
      jumpToPlanet(target);
    });
  });
}

/* ====================================================================
   11. DIRECT PLANET TELEPORTATION & HOTKEYS
   ==================================================================== */
async function jumpToPlanet(targetPlanet) {
  if (busy || current === targetPlanet) {
    closeModal();
    return;
  }
  closeModal();

  if ((current === 'mars' && targetPlanet === 'earth') || (current === 'earth' && targetPlanet === 'venus')) {
    travel();
    return;
  }

  busy = true;
  targetX = 0;
  targetY = 0;
  experienceEl.classList.add('is-transitioning');
  await new Promise(r => setTimeout(r, 400));

  current = targetPlanet;
  render();
  await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));

  experienceEl.classList.remove('is-transitioning');
  const maskReveal = revealMask();
  setTimeout(() => {
    revealPlanetContent();
    busy = false;
  }, 120);
  await maskReveal;
}

/* Event Listeners */
if (telemetryBtn) {
  telemetryBtn.addEventListener('click', () => openModal('explore', 'specs'));
}

if (modalCloseBtn) {
  modalCloseBtn.addEventListener('click', closeModal);
}

if (modalOverlay) {
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
}

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const href = link.getAttribute('href');
    if (href === '#about') openModal('about');
    else if (href === '#explore') openModal('explore');
    else if (href === '#planets') openModal('planets');
  });
});

if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    if (activeModal) closeModal();
    else openModal('about');
  });
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
    return;
  }
  if (['input', 'textarea'].includes(document.activeElement?.tagName?.toLowerCase())) {
    return;
  }
  if (e.key === '1') {
    jumpToPlanet('mars');
  } else if (e.key === '2') {
    jumpToPlanet('earth');
  } else if (e.key === '3') {
    jumpToPlanet('venus');
  } else if (e.key === ' ' && !activeModal) {
    e.preventDefault();
    travel();
  }
});

portalBtn.addEventListener('click', travel);

/* ====================================================================
   12. BOOT ORDER
   ==================================================================== */
document.querySelectorAll('.backgrounds .background').forEach(v => {
  v.pause();
  v.currentTime = 0;
});

resizeCanvas();
render();
requestAnimationFrame(draw);
requestAnimationFrame(cursorLoop);
runPreloader();

