'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

/* ====================================================================
   1. REMOTE ASSETS
   ==================================================================== */
const BASE = 'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P';
const MARS_BG = `${BASE}/3c83091e-4046-4fd6-adbb-2edb728be79a.mp4`;
const TO_EARTH = `${BASE}/fc3ded42-e845-41f3-a830-5cab512d79cd.mp4`;
const TO_VENUS = `${BASE}/b30f64d9-1637-477a-83df-d0fc6461a422.mp4`;
const TO_MARS = `${BASE}/5fc5651c-3b5d-4171-b507-87f7e635d1b4.mp4`;
const MERCURY = `${BASE}/d6fb8b6b-c15e-4aaa-9cf7-45bbb5e33372.jpg`;
const LOGO = `${BASE}/eb7e0f53-50cd-4af5-abc4-8b9a52cdc01b.svg`;

/* ====================================================================
   4. DATA MODEL & SCIENTIFIC TELEMETRY
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

const planetaryData = {
  mars: {
    name: 'Mars',
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

/* ====================================================================
   EASING & MATH HELPERS
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

function getRoundedRectPoints(w, h, r) {
  r = Math.max(0, Math.min(r, w / 2, h / 2));
  const corners = [
    [w / 2 - r, -h / 2 + r, -Math.PI / 2, 0],
    [w / 2 - r, h / 2 - r, 0, Math.PI / 2],
    [-w / 2 + r, h / 2 - r, Math.PI / 2, Math.PI],
    [-w / 2 + r, -h / 2 + r, Math.PI, Math.PI * 1.5]
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

export default function PlanetJumpingPage() {
  const [currentPlanet, setCurrentPlanet] = useState('mars');
  const [facts, setFacts] = useState(states.mars.facts);
  const [nextName, setNextName] = useState(states.mars.next);
  const [nextNumber, setNextNumber] = useState(states.mars.number);
  const [portalAria, setPortalAria] = useState(`Travel to ${states.mars.next}`);
  const [hasImage, setHasImage] = useState(false);

  /* Modal Navigation State */
  const [activeModal, setActiveModal] = useState(null); // 'explore' | 'about' | 'planets' | null
  const [activeTab, setActiveTab] = useState('specs');

  /* Element References */
  const experienceRef = useRef(null);
  const marsBgRef = useRef(null);
  const earthBgRef = useRef(null);
  const venusBgRef = useRef(null);
  const preloaderRef = useRef(null);
  const preloaderVidRef = useRef(null);
  const preloaderCountRef = useRef(null);
  const preloaderValRef = useRef(null);
  const floatingLogoRef = useRef(null);
  const portalCanvasRef = useRef(null);
  const sceneCanvasRef = useRef(null);
  const portalBtnRef = useRef(null);
  const portalVideoRef = useRef(null);
  const portalImageRef = useRef(null);
  const planetListRef = useRef(null);
  const transitionVidRef = useRef(null);
  const customCursorRef = useRef(null);

  /* Jump controller ref */
  const jumpHandlerRef = useRef(null);
  const travelHandlerRef = useRef(null);

  /* Mutable Animation State */
  const stateRef = useRef({
    current: 'mars',
    busy: false,
    transitionActive: false,
    expansion: 0,
    maskScale: 1,
    canvasOpacity: 1,
    hasFrozenScene: false,
    dpr: 1,
    targetX: 0,
    targetY: 0,
    rotX: 0,
    rotY: 0,
    lastFrameTime: performance.now(),
    pointerX: 0,
    pointerY: 0,
    orbitX: 0,
    orbitY: 0,
    cursorVisible: false,
    isFirstRender: true
  });

  /* Open / Close Modal Handlers */
  const openModal = useCallback((type, defaultTab) => {
    setActiveModal(type);
    if (type === 'explore') setActiveTab(defaultTab || 'specs');
    else if (type === 'about') setActiveTab(defaultTab || 'overview');
    else if (type === 'planets') setActiveTab(defaultTab || 'all');
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
  }, []);

  /* Teleportation trigger */
  const jumpToPlanet = useCallback((target) => {
    if (jumpHandlerRef.current) {
      jumpHandlerRef.current(target);
    }
  }, []);

  useEffect(() => {
    const s = stateRef.current;
    s.pointerX = window.innerWidth / 2;
    s.pointerY = window.innerHeight / 2;
    s.orbitX = s.pointerX;
    s.orbitY = s.pointerY;

    const portalCanvas = portalCanvasRef.current;
    const portalCtx = portalCanvas.getContext('2d');
    const sceneCanvas = sceneCanvasRef.current;
    const sceneCtx = sceneCanvas.getContext('2d');
    const expEl = experienceRef.current;
    const pBtn = portalBtnRef.current;
    const pVid = portalVideoRef.current;
    const pImg = portalImageRef.current;
    const tVid = transitionVidRef.current;
    const cursorEl = customCursorRef.current;

    /* Cover draw utility */
    function drawCover(targetCtx, media) {
      if (!media) return;
      let mw = 0;
      let mh = 0;
      if (media instanceof HTMLVideoElement) {
        mw = media.videoWidth || 1920;
        mh = media.videoHeight || 1080;
      } else if (media instanceof HTMLImageElement) {
        mw = media.naturalWidth || 1920;
        mh = media.naturalHeight || 1080;
      } else if (media instanceof HTMLCanvasElement) {
        mw = media.width;
        mh = media.height;
      }
      if (!mw || !mh) return;

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const scale = Math.max(vw / mw, vh / mh);
      const dw = mw * scale;
      const dh = mh * scale;
      const dx = (vw - dw) / 2;
      const dy = (vh - dh) / 2;

      targetCtx.drawImage(media, dx, dy, dw, dh);
    }

    function drawShade(targetCtx) {
      const grad = targetCtx.createLinearGradient(0, 0, 0, window.innerHeight);
      grad.addColorStop(0.52, 'rgba(0, 0, 0, 0)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0.88)');
      targetCtx.fillStyle = grad;
      targetCtx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    }

    /* Resize Canvas Handler */
    function resizeCanvas() {
      s.dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;

      portalCanvas.width = w * s.dpr;
      portalCanvas.height = h * s.dpr;
      portalCanvas.style.width = w + 'px';
      portalCanvas.style.height = h + 'px';
      portalCtx.setTransform(s.dpr, 0, 0, s.dpr, 0, 0);

      if (!s.hasFrozenScene) {
        sceneCanvas.width = w * s.dpr;
        sceneCanvas.height = h * s.dpr;
        sceneCanvas.style.width = w + 'px';
        sceneCanvas.style.height = h + 'px';
        sceneCtx.setTransform(s.dpr, 0, 0, s.dpr, 0, 0);
      }
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    /* Pointer Tilt Event Listeners */
    function onPointerMove(e) {
      s.pointerX = e.clientX;
      s.pointerY = e.clientY;
      if (!s.cursorVisible && cursorEl) {
        s.cursorVisible = true;
        cursorEl.classList.add('is-visible');
      }
      if (s.busy) return;
      s.targetY = (e.clientX / window.innerWidth - 0.5) * 37.4;
      s.targetX = (e.clientY / window.innerHeight - 0.5) * -33;
    }

    function onPointerLeave() {
      s.targetX = 0;
      s.targetY = 0;
      s.cursorVisible = false;
      if (cursorEl) cursorEl.classList.remove('is-visible');
    }

    function onPortalEnter() {
      if (cursorEl) cursorEl.classList.add('is-enter');
    }

    function onPortalLeave() {
      if (cursorEl) cursorEl.classList.remove('is-enter');
    }

    window.addEventListener('pointermove', onPointerMove);
    document.addEventListener('mouseleave', onPointerLeave);
    if (pBtn) {
      pBtn.addEventListener('pointerenter', onPortalEnter);
      pBtn.addEventListener('pointerleave', onPortalLeave);
    }

    /* Reveal animations */
    function revealMask() {
      if (!expEl) return Promise.resolve();
      expEl.classList.remove('mask-revealing');
      void expEl.offsetWidth; // force reflow
      expEl.classList.add('mask-revealing');
      s.maskScale = 0;
      return animateValue(v => { s.maskScale = v; }, 1050);
    }

    function revealPlanetContent() {
      if (!expEl) return;
      expEl.classList.remove('content-revealing');
      void expEl.offsetWidth; // force reflow
      expEl.classList.add('content-revealing');
    }

    /* State renderer */
    function applyRender(planetKey) {
      s.current = planetKey;
      const state = states[planetKey];

      setCurrentPlanet(planetKey);
      setFacts(state.facts);
      setNextName(state.next);
      setNextNumber(state.number);
      setPortalAria(`Travel to ${state.next}`);
      setHasImage(!!state.image);

      if (expEl) expEl.setAttribute('data-planet', planetKey);

      // Retrigger switching on planet list
      const pList = planetListRef.current;
      if (pList) {
        if (!s.isFirstRender) {
          pList.classList.remove('is-switching');
          void pList.offsetWidth;
          pList.classList.add('is-switching');
        } else {
          s.isFirstRender = false;
        }
      }

      // Background video visibility
      const bgMap = {
        'mars-background': marsBgRef.current,
        'earth-background': earthBgRef.current,
        'venus-background': venusBgRef.current
      };
      Object.entries(bgMap).forEach(([id, vid]) => {
        if (!vid) return;
        if (id === state.background) {
          vid.classList.add('is-visible');
          vid.loop = true;
          vid.play().catch(() => { });
        } else {
          vid.classList.remove('is-visible');
        }
      });

      // Portal media
      if (state.image) {
        if (pImg) pImg.style.display = 'block';
        if (pVid) {
          pVid.style.display = 'none';
          pVid.pause();
        }
      } else {
        if (pImg) pImg.style.display = 'none';
        if (pVid) {
          pVid.style.display = 'block';
          if (state.portal && pVid.src !== state.portal) {
            pVid.src = state.portal;
            pVid.load();
          }
          pVid.loop = true;
          pVid.play().catch(() => { });
        }
      }
    }

    /* Travel transition */
    async function travel() {
      if (s.busy || s.current === 'venus') return;
      s.busy = true;
      s.targetX = 0;
      s.targetY = 0;

      const next = s.current === 'mars' ? 'earth' : 'venus';

      try {
        tVid.src = states[s.current].portal;
        tVid.load();
        if (expEl) expEl.classList.add('is-loading');

        await new Promise((resolve) => {
          let done = false;
          function cleanup() {
            if (done) return;
            done = true;
            tVid.removeEventListener('canplaythrough', onReady);
            tVid.removeEventListener('error', onReady);
            clearTimeout(timer);
            resolve();
          }
          function onReady() { cleanup(); }
          tVid.addEventListener('canplaythrough', onReady, { once: true });
          tVid.addEventListener('error', onReady, { once: true });
          const timer = setTimeout(cleanup, 1600);
          if (tVid.readyState >= 4) cleanup();
        });

        if (expEl) {
          expEl.classList.remove('is-loading', 'content-revealing', 'mask-revealing');
          expEl.classList.add('is-transitioning');
        }

        tVid.currentTime = 0;
        tVid.playbackRate = 1.3;
        s.canvasOpacity = 1;
        s.transitionActive = true;

        await tVid.play();
        await animateValue(v => { s.expansion = v; }, 1100);

        await new Promise((resolve) => {
          if (tVid.ended) return resolve();
          function onEnded() { cleanup(); resolve(); }
          function onError() { cleanup(); resolve(); }
          function cleanup() {
            tVid.removeEventListener('ended', onEnded);
            tVid.removeEventListener('error', onError);
            clearTimeout(timeoutId);
          }
          tVid.addEventListener('ended', onEnded, { once: true });
          tVid.addEventListener('error', onError, { once: true });
          const timeoutId = setTimeout(() => {
            cleanup();
            resolve();
          }, 25000);
        });

        // Freeze last frame into sceneCanvas
        s.hasFrozenScene = true;
        sceneCanvas.width = window.innerWidth * s.dpr;
        sceneCanvas.height = window.innerHeight * s.dpr;
        sceneCtx.setTransform(s.dpr, 0, 0, s.dpr, 0, 0);
        sceneCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        drawCover(sceneCtx, tVid);

        if (expEl) expEl.classList.add('is-committing');
        applyRender(next);

        await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));

        s.transitionActive = false;
        s.expansion = 0;
        s.maskScale = 0;
        s.canvasOpacity = 1;

        if (expEl) expEl.classList.remove('is-transitioning', 'is-committing');

        const maskReveal = revealMask();
        setTimeout(() => {
          revealPlanetContent();
        }, 100);

        await maskReveal;

        setTimeout(() => {
          tVid.removeAttribute('src');
          tVid.load();
          s.busy = false;
        }, 450);

      } catch (err) {
        console.error('Travel transition error:', err);
        s.transitionActive = false;
        s.expansion = 0;
        s.maskScale = 1;
        s.canvasOpacity = 1;
        if (expEl) expEl.classList.remove('is-loading', 'is-transitioning', 'is-committing');
        s.busy = false;
      }
    }

    travelHandlerRef.current = travel;
    if (pBtn) {
      pBtn.onclick = travel;
    }

    /* Jump directly to a planet */
    async function jumpTo(targetPlanet) {
      if (s.busy || s.current === targetPlanet) {
        closeModal();
        return;
      }
      closeModal();

      s.busy = true;
      s.targetX = 0;
      s.targetY = 0;
      if (expEl) expEl.classList.add('is-transitioning');
      await new Promise(r => setTimeout(r, 350));

      applyRender(targetPlanet);
      await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));

      if (expEl) expEl.classList.remove('is-transitioning');
      const maskReveal = revealMask();
      setTimeout(() => {
        revealPlanetContent();
        s.busy = false;
      }, 120);
      await maskReveal;
    }

    jumpHandlerRef.current = jumpTo;

    /* Main Canvas Draw Loop */
    let animId;
    function draw() {
      portalCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      if (s.hasFrozenScene) {
        portalCtx.drawImage(sceneCanvas, 0, 0, window.innerWidth, window.innerHeight);
        drawShade(portalCtx);
      }

      const now = performance.now();
      const dt = Math.min(now - s.lastFrameTime, 40);
      s.lastFrameTime = now;

      s.rotX += (s.targetX - s.rotX) * Math.min(1, dt * 0.009);
      s.rotY += (s.targetY - s.rotY) * Math.min(1, dt * 0.009);

      if (pBtn) {
        const rect = pBtn.getBoundingClientRect();
        const rectCx = rect.left + rect.width / 2;
        const rectCy = rect.top + rect.height / 2;
        const e = s.expansion;

        const cx = rectCx + (window.innerWidth / 2 - rectCx) * e;
        const cy = rectCy + (window.innerHeight / 2 - rectCy) * e;
        const baseW = rect.width + (window.innerWidth - rect.width) * e;
        const baseH = rect.height + (window.innerHeight - rect.height) * e;
        const scale = e ? 1 : s.maskScale;
        const w = baseW * scale;
        const h = baseH * scale;
        const r = 90 * (1 - e) * scale;
        const rx = s.rotX * (1 - e);
        const ry = s.rotY * (1 - e);

        if (w > 1 && h > 1) {
          const points = getRoundedRectPoints(w, h, r);

          const ax = rx * Math.PI / 180;
          const ay = ry * Math.PI / 180;
          const cosAy = Math.cos(ay);
          const sinAy = Math.sin(ay);
          const cosAx = Math.cos(ax);
          const sinAx = Math.sin(ax);

          portalCtx.save();
          portalCtx.globalAlpha = s.canvasOpacity;
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

          portalCtx.fillStyle = '#0a0908';
          portalCtx.fillRect(0, 0, window.innerWidth, window.innerHeight);

          const mediaToDraw = s.transitionActive
            ? tVid
            : (states[s.current].image ? pImg : pVid);
          drawCover(portalCtx, mediaToDraw);

          if (s.transitionActive) {
            drawShade(portalCtx);
          }

          portalCtx.restore();
        }
      }

      animId = requestAnimationFrame(draw);
    }
    animId = requestAnimationFrame(draw);

    /* Cursor animation loop */
    let cursorAnimId;
    function cursorLoop() {
      s.orbitX += (s.pointerX - s.orbitX) * 0.2;
      s.orbitY += (s.pointerY - s.orbitY) * 0.2;
      if (cursorEl) {
        cursorEl.style.transform = `translate3d(${s.orbitX}px, ${s.orbitY}px, 0)`;
      }
      cursorAnimId = requestAnimationFrame(cursorLoop);
    }
    cursorAnimId = requestAnimationFrame(cursorLoop);

    /* Media Readiness */
    function ensurePortalMediaReady() {
      return new Promise((resolve) => {
        const isImg = !!states[s.current].image;
        if (isImg) {
          if (pImg.complete && pImg.naturalWidth > 0) return resolve();
          pImg.addEventListener('load', () => resolve(), { once: true });
          pImg.addEventListener('error', () => resolve(), { once: true });
        } else {
          if (pVid.readyState >= 2) return resolve();
          pVid.addEventListener('canplay', () => resolve(), { once: true });
          pVid.addEventListener('error', () => resolve(), { once: true });
        }
      });
    }

    /* Start experience after preloader */
    async function startExperience() {
      const bgVid = marsBgRef.current;
      if (bgVid) {
        bgVid.classList.add('is-visible');
        bgVid.loop = true;
        bgVid.play().catch(() => {});
      }

      await ensurePortalMediaReady();

      if (!states[s.current].image && pVid) {
        pVid.loop = true;
        pVid.play().catch(() => {});
      }

      await revealMask();
      document.body.classList.add('intro-ready');
      setTimeout(() => {
        revealPlanetContent();
      }, 850);
    }

    /* Preloader Sequence */
    const preloaderVid = preloaderVidRef.current;
    const preloaderCount = preloaderCountRef.current;
    const preloaderVal = preloaderValRef.current;
    const preloader = preloaderRef.current;
    const floatingLogo = floatingLogoRef.current;

    let preloaderFinished = false;
    let preloaderRaf = null;

    function finishPreloader() {
      if (preloaderFinished) return;
      preloaderFinished = true;
      if (preloaderRaf) cancelAnimationFrame(preloaderRaf);
      if (preloaderVal) preloaderVal.textContent = '100';
      if (preloaderCount) preloaderCount.classList.add('is-leaving');
      if (floatingLogo) floatingLogo.classList.add('is-docked');
      if (preloader) preloader.classList.add('is-background');
      document.body.classList.add('preload-complete');

      startExperience();

      setTimeout(() => {
        if (preloaderCount) preloaderCount.remove();
      }, 750);
      setTimeout(() => {
        if (floatingLogo) floatingLogo.classList.add('is-settled');
      }, 2000);
    }

    function preloaderTick() {
      if (preloaderFinished) return;
      if (preloaderVid && preloaderVid.duration && preloaderVid.duration > 0) {
        const pct = Math.min(100, Math.round((preloaderVid.currentTime / preloaderVid.duration) * 100));
        if (preloaderVal) preloaderVal.textContent = String(pct);
        if (pct >= 99 && preloaderVid.currentTime >= preloaderVid.duration - 0.05) {
          finishPreloader();
          return;
        }
      }
      preloaderRaf = requestAnimationFrame(preloaderTick);
    }

    function onPreloaderMeta() {
      const dur = preloaderVid.duration;
      if (dur && isFinite(dur) && dur > 0) {
        preloaderVid.playbackRate = Math.max(0.25, dur / 3);
      }
      const playPromise = preloaderVid.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          preloaderRaf = requestAnimationFrame(preloaderTick);
        }).catch(() => {
          finishPreloader();
        });
      } else {
        preloaderRaf = requestAnimationFrame(preloaderTick);
      }
    }

    if (preloaderVid) {
      preloaderVid.addEventListener('ended', finishPreloader, { once: true });
      preloaderVid.addEventListener('error', finishPreloader, { once: true });

      if (preloaderVid.readyState >= 1) {
        onPreloaderMeta();
      } else {
        preloaderVid.addEventListener('loadedmetadata', onPreloaderMeta, { once: true });
      }
    }

    const preloaderSafetyTimeout = setTimeout(() => {
      if (!preloaderFinished) finishPreloader();
    }, 4500);

    /* Keyboard listener */
    function onKeyDown(e) {
      if (e.key === 'Escape') {
        closeModal();
        return;
      }
      if (['input', 'textarea'].includes(document.activeElement?.tagName?.toLowerCase())) {
        return;
      }
      if (e.key === '1') jumpTo('mars');
      else if (e.key === '2') jumpTo('earth');
      else if (e.key === '3') jumpTo('venus');
      else if (e.key === ' ' && !activeModal) {
        e.preventDefault();
        travel();
      }
    }
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('mouseleave', onPointerLeave);
      window.removeEventListener('keydown', onKeyDown);
      clearTimeout(preloaderSafetyTimeout);
      cancelAnimationFrame(animId);
      cancelAnimationFrame(cursorAnimId);
      if (preloaderRaf) cancelAnimationFrame(preloaderRaf);
    };
  }, [closeModal, activeModal]);

  /* Render modal contents based on activeTab */
  const currentData = planetaryData[currentPlanet] || planetaryData.mars;

  let filteredCatalog = solarSystemCatalog;
  if (activeTab === 'terrestrial') {
    filteredCatalog = solarSystemCatalog.filter(p => p.type === 'Terrestrial Planet');
  } else if (activeTab === 'giants') {
    filteredCatalog = solarSystemCatalog.filter(p => p.type.includes('Giant'));
  }

  return (
    <main className="experience" ref={experienceRef} data-planet={currentPlanet}>
      {/* Background Videos */}
      <div className="backgrounds" aria-hidden="true">
        <video
          id="mars-background"
          ref={marsBgRef}
          className="background is-visible"
          src={MARS_BG}
          muted
          playsInline
          preload="auto"
          crossOrigin="anonymous"
        />
        <video
          id="earth-background"
          ref={earthBgRef}
          className="background"
          src={TO_EARTH}
          muted
          playsInline
          preload="auto"
          crossOrigin="anonymous"
        />
        <video
          id="venus-background"
          ref={venusBgRef}
          className="background"
          src={TO_VENUS}
          muted
          playsInline
          preload="auto"
          crossOrigin="anonymous"
        />
      </div>

      {/* Preloader Sequence */}
      <div className="preloader" id="preloader" ref={preloaderRef} aria-label={`Loading ${states[currentPlanet].name}`}>
        <video
          id="preloader-video"
          ref={preloaderVidRef}
          src={TO_MARS}
          muted
          playsInline
          preload="auto"
          crossOrigin="anonymous"
        />
        <div className="preloader-shade" />
      </div>

      {/* Floating Logo */}
      <img
        className="floating-logo"
        id="floating-logo"
        ref={floatingLogoRef}
        src={LOGO}
        alt="Ubernatural Logo"
      />

      {/* Preloader Counter */}
      <div className="preloader-count" id="preloader-count" ref={preloaderCountRef} aria-live="polite">
        <span id="preloader-value" ref={preloaderValRef}>0</span>
        <span className="percent">%</span>
      </div>

      {/* Staging & Portal Canvas */}
      <canvas id="scene-canvas" className="scene-canvas" ref={sceneCanvasRef} aria-hidden="true" />
      <div className="shade" aria-hidden="true" />

      {/* Header Chrome */}
      <header className="header chrome">
        <div className="header-actions">
          <nav className="nav" aria-label="Primary navigation">
            <a
              className={activeModal === 'about' ? 'active' : ''}
              href="#about"
              onClick={e => { e.preventDefault(); openModal('about'); }}
            >
              About
            </a>
            <a
              className={activeModal === 'explore' ? 'active' : ''}
              href="#explore"
              onClick={e => { e.preventDefault(); openModal('explore'); }}
            >
              Explore
            </a>
            <a
              className={activeModal === 'planets' ? 'active' : ''}
              href="#planets"
              onClick={e => { e.preventDefault(); openModal('planets'); }}
            >
              Planets
            </a>
          </nav>
          <button
            className="menu"
            type="button"
            onClick={() => {
              if (activeModal) closeModal();
              else openModal('about');
            }}
          >
            Menu
          </button>
        </div>
      </header>

      {/* Planet Navigation Sidebar */}
      <aside className="planet-list chrome" ref={planetListRef} aria-label="Planets">
        {planets.map(p => {
          const pLower = p.toLowerCase();
          const isActive = pLower === states[currentPlanet].name.toLowerCase();
          const canTeleport = ['mars', 'earth', 'venus'].includes(pLower);
          return (
            <span
              key={p}
              className={`planet-item${isActive ? ' active' : ''}`}
              style={{ cursor: canTeleport ? 'pointer' : 'default' }}
              title={canTeleport ? `Teleport to ${p}` : undefined}
              onClick={() => {
                if (canTeleport) jumpToPlanet(pLower);
              }}
            >
              {p}
            </span>
          );
        })}
      </aside>

      {/* 3D Portal Window */}
      <canvas id="portal-canvas" className="portal-canvas" ref={portalCanvasRef} aria-hidden="true" />

      <section className="portal-wrap chrome" aria-label="Next destination">
        <div className="portal-heading">
          <span>Next:</span>
          <span>
            <span id="next-number">{nextNumber}</span>{' '}
            <strong id="next-name">{nextName}</strong>
          </span>
        </div>
        <button
          className="portal"
          id="portal"
          ref={portalBtnRef}
          type="button"
          aria-label={portalAria}
        >
          <video
            id="portal-video"
            ref={portalVideoRef}
            src={states[currentPlanet].portal || TO_EARTH}
            muted
            playsInline
            preload="auto"
            crossOrigin="anonymous"
            style={{ display: hasImage ? 'none' : 'block' }}
          />
          <img
            id="portal-image"
            ref={portalImageRef}
            src={MERCURY}
            alt="Mercury surface"
            crossOrigin="anonymous"
            style={{ display: hasImage ? 'block' : 'none' }}
          />
        </button>
      </section>

      {/* Dynamic Planet Content & Telemetry Trigger */}
      <section className="planet-content chrome" aria-live="polite">
        <div className="planet-content-left">
          <h1 id="planet-title">{states[currentPlanet].name.toUpperCase()}</h1>
          <button
            className="telemetry-btn"
            id="telemetry-btn"
            type="button"
            aria-label="Inspect planetary telemetry and scientific data"
            onClick={() => openModal('explore', 'specs')}
          >
            <span className="telemetry-btn-dot" />
            <span>Inspect Telemetry & Science</span>
          </button>
        </div>
        <dl id="facts">
          {facts.map(([k, v], idx) => (
            <div key={idx} className="fact">
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Modal Overlay Dialog */}
      <div
        className={`modal-overlay${activeModal ? ' is-open' : ''}`}
        id="modal-overlay"
        aria-hidden={!activeModal}
        role="dialog"
        aria-modal="true"
        onClick={e => {
          if (e.target === e.currentTarget) closeModal();
        }}
      >
        <div className="modal-container" id="modal-container">
          <header className="modal-header">
            <div className="modal-title-group">
              <h2 id="modal-title">
                {activeModal === 'explore' && `${currentData.name} — Planetary Telemetry`}
                {activeModal === 'about' && 'Mission & Physics Briefing'}
                {activeModal === 'planets' && 'Solar System Directory'}
              </h2>
              <span className="modal-badge" id="modal-badge">
                {activeModal === 'explore' && currentData.badge}
                {activeModal === 'about' && 'SYSTEM OVERVIEW'}
                {activeModal === 'planets' && 'CELESTIAL CATALOG'}
              </span>
            </div>
            <button className="modal-close-btn" id="modal-close-btn" type="button" onClick={closeModal} aria-label="Close modal">
              <span>Close</span>
              <kbd>ESC</kbd>
            </button>
          </header>

          {/* Modal Section Tabs */}
          <nav className="modal-tabs" id="modal-tabs" aria-label="Section tabs">
            {activeModal === 'explore' && (
              <>
                <button
                  className={`modal-tab-btn${activeTab === 'specs' ? ' active' : ''}`}
                  type="button"
                  onClick={() => setActiveTab('specs')}
                >
                  Physical Telemetry
                </button>
                <button
                  className={`modal-tab-btn${activeTab === 'atmosphere' ? ' active' : ''}`}
                  type="button"
                  onClick={() => setActiveTab('atmosphere')}
                >
                  Atmospheric Composition
                </button>
                <button
                  className={`modal-tab-btn${activeTab === 'features' ? ' active' : ''}`}
                  type="button"
                  onClick={() => setActiveTab('features')}
                >
                  Geological Landmarks
                </button>
                <button
                  className={`modal-tab-btn${activeTab === 'missions' ? ' active' : ''}`}
                  type="button"
                  onClick={() => setActiveTab('missions')}
                >
                  Historic Missions
                </button>
              </>
            )}

            {activeModal === 'about' && (
              <>
                <button
                  className={`modal-tab-btn${activeTab === 'overview' ? ' active' : ''}`}
                  type="button"
                  onClick={() => setActiveTab('overview')}
                >
                  Mission Overview
                </button>
                <button
                  className={`modal-tab-btn${activeTab === 'physics' ? ' active' : ''}`}
                  type="button"
                  onClick={() => setActiveTab('physics')}
                >
                  Portal Physics
                </button>
                <button
                  className={`modal-tab-btn${activeTab === 'controls' ? ' active' : ''}`}
                  type="button"
                  onClick={() => setActiveTab('controls')}
                >
                  Flight Controls
                </button>
              </>
            )}

            {activeModal === 'planets' && (
              <>
                <button
                  className={`modal-tab-btn${activeTab === 'all' ? ' active' : ''}`}
                  type="button"
                  onClick={() => setActiveTab('all')}
                >
                  All 8 Planets
                </button>
                <button
                  className={`modal-tab-btn${activeTab === 'terrestrial' ? ' active' : ''}`}
                  type="button"
                  onClick={() => setActiveTab('terrestrial')}
                >
                  Terrestrial Worlds
                </button>
                <button
                  className={`modal-tab-btn${activeTab === 'giants' ? ' active' : ''}`}
                  type="button"
                  onClick={() => setActiveTab('giants')}
                >
                  Gas & Ice Giants
                </button>
              </>
            )}
          </nav>

          {/* Modal Body Content */}
          <div className="modal-body" id="modal-body" tabIndex={0}>
            {activeModal === 'explore' && activeTab === 'specs' && (
              <>
                <p className="section-desc">{currentData.subtitle} Precise orbital mechanics and physical constants recorded by interplanetary orbiters and radar telemetry.</p>
                <div className="specs-grid">
                  {currentData.specs.map((s, idx) => (
                    <div key={idx} className="spec-card">
                      <div className="spec-label">{s.label}</div>
                      <div className="spec-value">{s.value}</div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeModal === 'explore' && activeTab === 'atmosphere' && (
              <>
                <p className="section-desc">Volumetric atmospheric chemical breakdown measured by entry probes and mass spectrometers.</p>
                <div className="comp-list">
                  {currentData.atmosphere.map((c, idx) => (
                    <div key={idx} className="comp-item">
                      <div className="comp-labels">
                        <span className="comp-gas">{c.gas}</span>
                        <span className="comp-pct">{c.pct}</span>
                      </div>
                      <div className="comp-bar-track">
                        <div
                          className="comp-bar-fill"
                          style={{
                            width: `${Math.min(100, Math.max(1.5, c.value))}%`,
                            background: c.color
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeModal === 'explore' && activeTab === 'features' && (
              <>
                <p className="section-desc">Principal geological structures, impact basins, and topographical landmarks identified across the planetary surface.</p>
                <div className="features-grid">
                  {currentData.features.map((f, idx) => (
                    <div key={idx} className="feature-card">
                      <h3>{f.name}</h3>
                      <p>{f.desc}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeModal === 'explore' && activeTab === 'missions' && (
              <>
                <p className="section-desc">Pioneering human and robotic exploration milestones that unveiled this world to science.</p>
                <div className="timeline">
                  {currentData.missions.map((m, idx) => (
                    <div key={idx} className="timeline-item">
                      <div className="timeline-header">
                        <span className="timeline-year">{m.year}</span>
                        <span className="timeline-name">{m.name}</span>
                        <span className="timeline-agency">{m.agency}</span>
                      </div>
                      <p className="timeline-desc">{m.desc}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeModal === 'about' && activeTab === 'overview' && (
              <>
                <p className="section-desc"><strong>Planet Jumping</strong> is a high-performance space exploration gateway engineered without third-party frameworks. It immerses observers in planetary transitions through an optical screen-locked spacetime portal.</p>
                <div className="features-grid">
                  <div className="feature-card">
                    <h3>Interplanetary Trajectory</h3>
                    <p>Traversing from the arid dunes of Mars, across the fertile oceans of Earth, toward the supercritical sulfuric atmosphere of Venus, each orbit features authentic high-definition orbital cinematics and verified planetary measurements.</p>
                  </div>
                  <div className="feature-card">
                    <h3>Dual-Engine Architecture</h3>
                    <p>Delivered both as a pristine standalone zero-dependency web experience (HTML5, CSS3, ES2022) and as a modern production Next.js App Router application with hardware-accelerated canvas compositing.</p>
                  </div>
                </div>
              </>
            )}

            {activeModal === 'about' && activeTab === 'physics' && (
              <>
                <p className="section-desc">The visual illusion of peering through a physical portal relies on mathematical coordinate transformation and screen-locked optical geometry.</p>
                <div className="features-grid">
                  <div className="feature-card">
                    <h3>Inverse Screen Transformation</h3>
                    <p>Unlike standard 3D meshes where textures rotate with the container, the portal samples video pixels directly in screen coordinate space. When your cursor tilts the portal frame, the interior image stays firmly locked to the universe behind it.</p>
                  </div>
                  <div className="feature-card">
                    <h3>Dual-Canvas Pipeline</h3>
                    <p>A hidden background canvas buffers transition frames, while the foreground portal canvas computes sub-pixel rounded-rectangle polygon clipping with quadratic bezier curvature and dynamic illumination falloff.</p>
                  </div>
                </div>
              </>
            )}

            {activeModal === 'about' && activeTab === 'controls' && (
              <>
                <p className="section-desc">Seamlessly navigate between worlds using intuitive gestures or rapid keyboard teleportation shortcuts.</p>
                <div className="controls-list">
                  <div className="control-item">
                    <div className="control-title"><kbd>Click Portal</kbd> or <kbd>Space</kbd></div>
                    <div className="control-desc">Engage warp engines and jump to the designated destination planet.</div>
                  </div>
                  <div className="control-item">
                    <div className="control-title"><kbd>1</kbd> <kbd>2</kbd> <kbd>3</kbd></div>
                    <div className="control-desc">Instant teleporter hotkeys: [1] Mars Orbit, [2] Earth Orbit, [3] Venus Orbit.</div>
                  </div>
                  <div className="control-item">
                    <div className="control-title"><kbd>ESC</kbd></div>
                    <div className="control-desc">Instantly close active telemetry modals or navigation overlays.</div>
                  </div>
                  <div className="control-item">
                    <div className="control-title"><kbd>Mouse Tilt</kbd></div>
                    <div className="control-desc">Move your cursor across the screen to observe realistic portal parallax physics.</div>
                  </div>
                </div>
              </>
            )}

            {activeModal === 'planets' && (
              <>
                <p className="section-desc">Catalogue of major celestial bodies orbiting Sol. Planets marked with active transits allow direct orbital insertion.</p>
                <div className="directory-grid">
                  {filteredCatalog.map(p => {
                    const isCurrent = p.teleportState === currentPlanet;
                    const canTeleport = !!p.teleportState;

                    return (
                      <div key={p.id} className="directory-card">
                        <div className="directory-card-top">
                          <div className="directory-card-title-row">
                            <span className="directory-card-name">{p.name}</span>
                            <span className="directory-card-type">{p.type}</span>
                          </div>
                          <div className="directory-card-stats">
                            <div className="directory-card-stat">
                              <span>Solar Distance</span>
                              <span>{p.distAU}</span>
                            </div>
                            <div className="directory-card-stat">
                              <span>Diameter</span>
                              <span>{p.radius}</span>
                            </div>
                            <div className="directory-card-stat">
                              <span>Orbital Period</span>
                              <span>{p.orbitalPeriod}</span>
                            </div>
                            <div className="directory-card-stat">
                              <span>Moons</span>
                              <span>{p.moons}</span>
                            </div>
                          </div>
                          <p className="directory-card-desc">{p.desc}</p>
                        </div>
                        {isCurrent ? (
                          <button className="directory-jump-btn disabled" disabled type="button">
                            Current Orbit
                          </button>
                        ) : canTeleport ? (
                          <button
                            className="directory-jump-btn"
                            type="button"
                            onClick={() => jumpToPlanet(p.teleportState)}
                          >
                            Teleport to {p.name}
                          </button>
                        ) : (
                          <button className="directory-jump-btn disabled" disabled type="button">
                            Uncharted Outer Orbit
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Transition Layer & Custom Cursor */}
      <div className="transition-layer" aria-hidden="true">
        <video id="transition-video" ref={transitionVidRef} muted playsInline preload="auto" crossOrigin="anonymous" />
      </div>
      <div className="loading" aria-hidden="true">Preparing orbit…</div>

      <div className="custom-cursor" ref={customCursorRef} aria-hidden="true">
        <span className="cursor-orbit" />
        <span className="cursor-dot" />
        <span className="cursor-label">Enter</span>
      </div>
    </main>
  );
}
