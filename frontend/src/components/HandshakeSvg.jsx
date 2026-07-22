import React, { useEffect, useRef, useState } from "react";

/**
 * HandshakeSvg — polygonal wireframe handshake styled like WardrobeSvg.
 * Uses Lucide "Handshake" path as anatomical base + wireframe triangulation overlay,
 * violet gradient fill, thin lavender strokes, vertex dots, halo & radial rays.
 * Idle: dim + float. Hover: bright + glow + gentle shake.
 */
export const HandshakeSvg = () => {
  const rootRef = useRef(null);
  const [shaking, setShaking] = useState(false);

  const setHoverShaking = (next) => {
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      setShaking(next);
    }
  };

  const toggleTouchShaking = () => {
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) {
      setShaking((current) => !current);
    }
  };

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    let raf;
    let tx = 0, ty = 0, mx = 0, my = 0;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      mx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      my = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    const tick = () => {
      tx += (mx - tx) * 0.06;
      ty += (my - ty) * 0.06;
      el.style.setProperty("--mx", String(tx));
      el.style.setProperty("--my", String(ty));
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Radial rays emanating from the center (like the light-background reference)
  const rays = [];
  for (let i = 0; i < 20; i++) {
    const angle = (i / 20) * Math.PI * 2;
    const r1 = 200 + (i % 3) * 12;
    const r2 = r1 + 30 + (i % 4) * 15;
    rays.push({
      x1: 400 + Math.cos(angle) * r1,
      y1: 260 + Math.sin(angle) * r1,
      x2: 400 + Math.cos(angle) * r2,
      y2: 260 + Math.sin(angle) * r2,
      key: i,
    });
  }

  return (
    <svg
      ref={rootRef}
      data-testid="handshake-svg"
      viewBox="0 0 800 520"
      className={`w-full h-auto max-w-[620px] mx-auto handshake-root ${shaking ? "is-shaking" : "is-idle"}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ "--mx": 0, "--my": 0, touchAction: "manipulation" }}
      role="button"
      tabIndex="0"
      aria-label={shaking ? "Остановить анимацию партнёрства" : "Запустить анимацию партнёрства"}
      aria-pressed={shaking}
      onMouseEnter={() => setHoverShaking(true)}
      onMouseLeave={() => setHoverShaking(false)}
      onClick={toggleTouchShaking}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setShaking((current) => !current);
        }
      }}
    >
      <style>{`
        .handshake-root .parallax {
          transform: translate(calc(var(--mx) * -6px), calc(var(--my) * -4px));
          transition: transform 0.25s linear;
        }
        .handshake-root .icon-wrap {
          transition: opacity 0.6s ease, filter 0.6s ease;
        }
        .handshake-root.is-idle .icon-wrap {
          opacity: 0.7;
          filter: drop-shadow(0 0 0 rgba(183,155,224,0));
        }
        .handshake-root.is-shaking .icon-wrap {
          opacity: 1;
          filter: drop-shadow(0 0 18px rgba(183,155,224,0.5));
        }

        .handshake-root .wobble-wrap {
          transform-box: fill-box;
          transform-origin: center;
        }
        @keyframes shake-clasp {
          0%   { transform: translate(0, 0) rotate(0); }
          25%  { transform: translate(0, -5px) rotate(-0.8deg); }
          50%  { transform: translate(0, 0) rotate(0); }
          75%  { transform: translate(0, -3px) rotate(0.8deg); }
          100% { transform: translate(0, 0) rotate(0); }
        }
        .handshake-root.is-shaking .wobble-wrap {
          animation: shake-clasp 1.4s ease-in-out 0.5s infinite;
        }
        @keyframes float-idle {
          0%,100% { transform: translateY(0); }
          50%     { transform: translateY(-5px); }
        }
        .handshake-root.is-idle .wobble-wrap {
          animation: float-idle 5s ease-in-out infinite;
        }

        .handshake-root .rays,
        .handshake-root .label-group,
        .handshake-root .hint,
        .handshake-root .clash-glow { transition: opacity 0.5s ease; }
        .handshake-root.is-shaking .label-group,
        .handshake-root.is-shaking .hint { opacity: 0; }
        .handshake-root.is-idle .label-group,
        .handshake-root.is-idle .hint { opacity: 1; }
        .handshake-root.is-idle .rays { opacity: 0.15; }
        .handshake-root.is-shaking .rays { opacity: 0.65; }
        .handshake-root.is-idle .clash-glow { opacity: 0; }
        .handshake-root.is-shaking .clash-glow { opacity: 1; }

        @keyframes pulse-dot { 0%,100% { opacity: 0.35 } 50% { opacity: 1 } }
        .handshake-root .pulse { animation: pulse-dot 3s ease-in-out infinite; }

        /* Wireframe overlay triangulation lines */
        .handshake-root .wireframe line {
          stroke: rgba(183,155,224,0.35);
          stroke-width: 0.7;
        }
        .handshake-root .vertex-dot {
          fill: #B79BE0;
          opacity: 0.85;
        }
      `}</style>

      <defs>
        {/* Same visual language as WardrobeSvg — violet gradient with soft edges */}
        <linearGradient id="hsFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#B79BE0" stopOpacity="0.5" />
          <stop offset="0.6" stopColor="#764CB0" stopOpacity="0.55" />
          <stop offset="1" stopColor="#2A1B4A" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id="hsStroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#B79BE0" stopOpacity="0.85" />
          <stop offset="1" stopColor="#764CB0" stopOpacity="0.6" />
        </linearGradient>
        <radialGradient id="clashHalo" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#B79BE0" stopOpacity="0.4" />
          <stop offset="0.5" stopColor="#764CB0" stopOpacity="0.16" />
          <stop offset="1" stopColor="#764CB0" stopOpacity="0" />
        </radialGradient>
        <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>

      {/* Central halo */}
      <ellipse cx="400" cy="260" rx="290" ry="150" fill="url(#clashHalo)" />

      {/* Radial rays — like the reference sunburst */}
      <g className="rays" stroke="#B79BE0" strokeWidth="0.9" strokeOpacity="0.55" strokeLinecap="round">
        {rays.map((r) => (
          <line key={r.key} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} />
        ))}
      </g>

      {/* Wobble/scale container */}
      <g className="parallax">
        <g className="icon-wrap">
          <g className="wobble-wrap">
            <g transform="translate(232, 92) scale(14)">
              {/* Base filled shape — Lucide Handshake path filled to give the "body" */}
              <g fill="url(#hsFill)" stroke="url(#hsStroke)" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
                {/* All 5 sub-paths drawn as a compound with thick strokes for silhouette */}
                <path
                  d="m11 17 2 2a1 1 0 1 0 3-3"
                  strokeWidth="1.6"
                  fill="none"
                />
                <path
                  d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"
                  strokeWidth="1.6"
                  fill="url(#hsFill)"
                />
                <path
                  d="m21 3 1 11h-2"
                  strokeWidth="1.6"
                  fill="none"
                />
                <path
                  d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"
                  strokeWidth="1.6"
                  fill="url(#hsFill)"
                />
                <path d="M3 4h8" strokeWidth="1.6" fill="none" />
              </g>
            </g>

            {/* WIREFRAME triangulation overlay in the coord space of the icon (post-scale=14) */}
            <g className="wireframe">
              {/* Left arm/wing wireframe (extending from center-left outward) */}
              <line x1="100" y1="240" x2="300" y2="255" />
              <line x1="100" y1="240" x2="240" y2="290" />
              <line x1="300" y1="255" x2="240" y2="290" />
              <line x1="140" y1="220" x2="300" y2="255" />
              <line x1="140" y1="220" x2="240" y2="220" />
              <line x1="240" y1="220" x2="300" y2="255" />
              <line x1="180" y1="200" x2="240" y2="220" />
              <line x1="180" y1="200" x2="240" y2="290" />
              <line x1="60" y1="260" x2="140" y2="220" />
              <line x1="60" y1="260" x2="240" y2="290" />
              <line x1="60" y1="260" x2="100" y2="240" />

              {/* Center clasp wireframe */}
              <line x1="300" y1="255" x2="360" y2="230" />
              <line x1="300" y1="255" x2="400" y2="260" />
              <line x1="360" y1="230" x2="400" y2="260" />
              <line x1="400" y1="260" x2="440" y2="230" />
              <line x1="400" y1="260" x2="500" y2="255" />
              <line x1="440" y1="230" x2="500" y2="255" />
              <line x1="240" y1="290" x2="300" y2="255" />
              <line x1="240" y1="290" x2="360" y2="330" />
              <line x1="360" y1="330" x2="440" y2="330" />
              <line x1="360" y1="330" x2="400" y2="260" />
              <line x1="440" y1="330" x2="500" y2="255" />
              <line x1="440" y1="330" x2="400" y2="260" />

              {/* Right arm/wing wireframe (mirror) */}
              <line x1="500" y1="255" x2="700" y2="240" />
              <line x1="560" y1="290" x2="700" y2="240" />
              <line x1="500" y1="255" x2="560" y2="290" />
              <line x1="500" y1="255" x2="660" y2="220" />
              <line x1="660" y1="220" x2="560" y2="220" />
              <line x1="560" y1="220" x2="500" y2="255" />
              <line x1="620" y1="200" x2="660" y2="220" />
              <line x1="620" y1="200" x2="560" y2="290" />
              <line x1="740" y1="260" x2="660" y2="220" />
              <line x1="740" y1="260" x2="560" y2="290" />
              <line x1="740" y1="260" x2="700" y2="240" />

              {/* Finger detail wireframe on center bottom */}
              <line x1="360" y1="330" x2="380" y2="360" />
              <line x1="380" y1="360" x2="420" y2="360" />
              <line x1="420" y1="360" x2="440" y2="330" />
              <line x1="380" y1="360" x2="400" y2="260" />
              <line x1="420" y1="360" x2="400" y2="260" />
            </g>

            {/* Vertex dots at key joints */}
            <g>
              {[
                [100, 240], [140, 220], [180, 200], [240, 220], [240, 290], [300, 255], [60, 260],
                [360, 230], [400, 260], [440, 230], [360, 330], [440, 330], [380, 360], [420, 360],
                [500, 255], [560, 220], [620, 200], [660, 220], [560, 290], [700, 240], [740, 260],
              ].map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="2.2" className="vertex-dot" />
              ))}
            </g>
          </g>
        </g>

        {/* Central glow flare (hover only) */}
        <g className="clash-glow">
          <circle cx="400" cy="260" r="22" fill="rgba(183,155,224,0.5)" filter="url(#softGlow)" />
          <circle cx="400" cy="260" r="6" fill="rgba(255,240,255,0.95)" />
        </g>
      </g>

      {/* Ground reflection */}
      <ellipse cx="400" cy="480" rx="270" ry="10" stroke="rgba(118,76,176,0.22)" strokeWidth="1" />
      <ellipse cx="400" cy="480" rx="160" ry="6" stroke="rgba(118,76,176,0.14)" strokeWidth="1" />

      {/* Idle labels */}
      <g className="label-group">
        <rect x="30" y="120" width="98" height="20" rx="10" stroke="rgba(183,155,224,0.5)" fill="rgba(8,6,18,0.72)" />
        <text x="40" y="134" fontSize="10" fill="rgba(255,255,255,0.82)" fontFamily="Montserrat">вы · партнёр</text>

        <rect x="662" y="120" width="108" height="20" rx="10" stroke="rgba(183,155,224,0.5)" fill="rgba(8,6,18,0.72)" />
        <text x="672" y="134" fontSize="10" fill="rgba(255,255,255,0.82)" fontFamily="Montserrat">GENIQ · система</text>
      </g>

      {/* Ambient sparkles */}
      <g>
        {[[100, 80], [700, 80], [50, 400], [750, 400], [200, 60], [600, 60], [400, 90], [400, 440]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="1.6" fill="#B79BE0" opacity="0.55" className={i % 2 === 0 ? "pulse" : ""} />
        ))}
      </g>

      {/* Hint */}
      <g className="hint">
        <text x="400" y="508" fontSize="10" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontFamily="Montserrat" letterSpacing="1.5">
          НАВЕДИТЕ КУРСОР — ЧТОБЫ ПОЖАТЬ РУКИ
        </text>
      </g>
    </svg>
  );
};

export default HandshakeSvg;
