'use client';

import { useEffect, useRef, useState } from 'react';

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

    /* Ambient linear shade */
    function drawShade(targetCtx) {
      const yStart = window.innerHeight * 0.52;
      const yEnd = window.innerHeight;
      const grad = targetCtx.createLinearGradient(0, yStart, 0, yEnd);
      grad.addColorStop(0, 'rgba(0,0,0,0)');
      grad.addColorStop(1, 'rgba(0,0,0,0.88)');
      targetCtx.fillStyle = grad;
      targetCtx.fillRect(0, yStart, window.innerWidth, yEnd - yStart);
    }

    /* Resize Canvas */
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

    /* Start Experience after preloader */
    async function startExperience() {
      const marsBg = marsBgRef.current;
      if (marsBg) {
        marsBg.loop = true;
        marsBg.play().catch(() => { });
      }

      // Ensure portal media loadable
      await new Promise((resolve) => {
        if (pVid && pVid.readyState >= 2) return resolve();
        if (pVid) {
          pVid.addEventListener('canplay', () => resolve(), { once: true });
          pVid.addEventListener('error', () => resolve(), { once: true });
        }
        setTimeout(resolve, 1600);
      });

      if (pVid) {
        pVid.loop = true;
        pVid.play().catch(() => { });
      }

      await revealMask();
      document.body.classList.add('intro-ready');
      setTimeout(() => {
        revealPlanetContent();
      }, 850);
    }

    /* Preloader Sequence */
    function runPreloader() {
      const pVid = preloaderVidRef.current;
      const pVal = preloaderValRef.current;
      const pCount = preloaderCountRef.current;
      const fLogo = floatingLogoRef.current;
      const pLoader = preloaderRef.current;
      if (!pVid) return;

      let finished = false;
      let rafId = null;

      function finish() {
        if (finished) return;
        finished = true;
        if (rafId) cancelAnimationFrame(rafId);
        if (pVal) pVal.textContent = '100';
        if (pCount) pCount.classList.add('is-leaving');
        if (fLogo) fLogo.classList.add('is-docked');
        if (pLoader) pLoader.classList.add('is-background');
        document.body.classList.add('preload-complete');

        startExperience();

        setTimeout(() => {
          if (pCount) pCount.remove();
        }, 750);
        setTimeout(() => {
          if (fLogo) fLogo.classList.add('is-settled');
        }, 2000);
      }

      function tick() {
        if (finished) return;
        if (pVid.duration && pVid.duration > 0) {
          const pct = Math.min(100, Math.round((pVid.currentTime / pVid.duration) * 100));
          if (pVal) pVal.textContent = String(pct);
          if (pct >= 99 && pVid.currentTime >= pVid.duration - 0.05) {
            finish();
            return;
          }
        }
        rafId = requestAnimationFrame(tick);
      }

      function onMeta() {
        const dur = pVid.duration;
        if (dur && isFinite(dur) && dur > 0) {
          pVid.playbackRate = Math.max(0.25, dur / 3);
        }
        const playPromise = pVid.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            rafId = requestAnimationFrame(tick);
          }).catch(() => finish());
        } else {
          rafId = requestAnimationFrame(tick);
        }
      }

      pVid.addEventListener('ended', finish, { once: true });
      pVid.addEventListener('error', finish, { once: true });

      if (pVid.readyState >= 1) {
        onMeta();
      } else {
        pVid.addEventListener('loadedmetadata', onMeta, { once: true });
      }

      setTimeout(() => {
        if (!finished) finish();
      }, 4500);
    }

    /* Travel Warp Transition */
    async function travel() {
      if (s.busy || s.current === 'venus') return;
      s.busy = true;
      s.targetX = 0;
      s.targetY = 0;

      const next = s.current === 'mars' ? 'earth' : 'venus';

      try {
        if (!tVid || !expEl) return;
        tVid.src = states[s.current].portal;
        tVid.load();
        expEl.classList.add('is-loading');

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

        expEl.classList.remove('is-loading', 'content-revealing', 'mask-revealing');
        expEl.classList.add('is-transitioning');

        tVid.currentTime = 0;
        tVid.playbackRate = 1.3;
        s.canvasOpacity = 1;
        s.transitionActive = true;

        await tVid.play();

        // Portal window swallows screen
        await animateValue(v => { s.expansion = v; }, 1100);

        // Await ended
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

        expEl.classList.add('is-committing');
        applyRender(next);

        // Await two rAFs
        await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));

        s.transitionActive = false;
        s.expansion = 0;
        s.maskScale = 0;
        s.canvasOpacity = 1;

        expEl.classList.remove('is-transitioning', 'is-committing');

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

    if (pBtn) {
      pBtn.onclick = travel;
    }

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

          portalCtx.fillStyle = '#030303';
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

    /* Custom Cursor Loop */
    let cursorAnimId;
    function cursorLoop() {
      s.orbitX += (s.pointerX - s.orbitX) * 0.2;
      s.orbitY += (s.pointerY - s.orbitY) * 0.2;
      if (cursorEl) {
        cursorEl.style.transform = `translate3d(${s.orbitX}px, ${s.orbitY}px, 0)`;
      }
      cursorAnimId = requestAnimationFrame(cursorLoop);
    }

    /* Boot sequence */
    [marsBgRef.current, earthBgRef.current, venusBgRef.current].forEach(v => {
      if (v) {
        v.pause();
        v.currentTime = 0;
      }
    });

    applyRender('mars');
    animId = requestAnimationFrame(draw);
    cursorAnimId = requestAnimationFrame(cursorLoop);
    runPreloader();

    return () => {
      cancelAnimationFrame(animId);
      cancelAnimationFrame(cursorAnimId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('mouseleave', onPointerLeave);
      if (pBtn) {
        pBtn.removeEventListener('pointerenter', onPortalEnter);
        pBtn.removeEventListener('pointerleave', onPortalLeave);
      }
    };
  }, []);

  return (
    <main className="experience" data-planet={currentPlanet} ref={experienceRef}>
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

      {/* Floating Logo (glides from center into header slot) */}
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
            <a className="active" href="#about" onClick={e => e.preventDefault()}>About</a>
            <a href="#explore" onClick={e => e.preventDefault()}>Explore</a>
            <a href="#planets" onClick={e => e.preventDefault()}>Planets</a>
          </nav>
          <button className="menu" type="button" onClick={e => e.preventDefault()}>Menu</button>
        </div>
      </header>

      {/* Planet Navigation Sidebar */}
      <aside className="planet-list chrome" ref={planetListRef} aria-label="Planets">
        {planets.map(p => {
          const isActive = p.toLowerCase() === states[currentPlanet].name.toLowerCase();
          return (
            <span key={p} className={`planet-item${isActive ? ' active' : ''}`}>
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

      {/* Dynamic Planet Content */}
      <section className="planet-content chrome" aria-live="polite">
        <h1 id="planet-title">{states[currentPlanet].name.toUpperCase()}</h1>
        <dl id="facts">
          {facts.map(([k, v], idx) => (
            <div key={idx} className="fact">
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </section>

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

