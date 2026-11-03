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
   4. DATA MODEL
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
      return `<span class="planet-item${isActive ? ' active' : ''}">${p}</span>`;
    })
    .join('');

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

