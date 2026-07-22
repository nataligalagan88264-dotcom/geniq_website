import React, { useEffect, useRef, useState } from "react";
import { NEUROTYPE_COLORS } from "@/lib/constants";

/**
 * LensSvg — 9 neurotype "lenses" scattered around one main magnifier lens.
 * On hover, 9 mini colored lenses converge into a 3×3 grid inside the main lens
 * (matching the neurotype map: S / E / T × 3 modes).
 */
export const LensSvg = () => {
  const rootRef = useRef(null);
  const [assembled, setAssembled] = useState(false);

  const setHoverAssembly = (next) => {
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      setAssembled(next);
    }
  };

  const toggleTouchAssembly = () => {
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) {
      setAssembled((current) => !current);
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

  // 9 neurotypes with codes and their assembled coord inside the main lens (3x3 grid)
  const cx = 300, cy = 380;
  const gap = 52;
  const NEUROS = [
    { code: "S1", col: 0, row: 0, scatterX: -220, scatterY: -260 },
    { code: "S2", col: 1, row: 0, scatterX: 0,    scatterY: -280 },
    { code: "S3", col: 2, row: 0, scatterX: 230,  scatterY: -240 },
    { code: "E1", col: 0, row: 1, scatterX: -260, scatterY: 0 },
    { code: "E2", col: 1, row: 1, scatterX: 0,    scatterY: 320 },
    { code: "E3", col: 2, row: 1, scatterX: 260,  scatterY: 0 },
    { code: "T1", col: 0, row: 2, scatterX: -220, scatterY: 260 },
    { code: "T2", col: 1, row: 2, scatterX: -20,  scatterY: -320 },
    { code: "T3", col: 2, row: 2, scatterX: 230,  scatterY: 240 },
  ];

  return (
    <svg
      ref={rootRef}
      data-testid="lens-svg"
      viewBox="0 0 600 760"
      className={`w-full h-auto max-w-[680px] mx-auto overflow-visible lens-root ${assembled ? "is-assembled" : "is-scattered"}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ "--mx": 0, "--my": 0, touchAction: "manipulation" }}
      role="button"
      tabIndex="0"
      aria-label={assembled ? "Развернуть линзы нейротипов" : "Собрать линзы нейротипов"}
      aria-pressed={assembled}
      onMouseEnter={() => setHoverAssembly(true)}
      onMouseLeave={() => setHoverAssembly(false)}
      onClick={toggleTouchAssembly}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setAssembled((current) => !current);
        }
      }}
    >
      <style>{`
        .lens-root .parallax-a { transform: translate(calc(var(--mx) * -6px), calc(var(--my) * -5px)); transition: transform 0.2s linear; }
        .lens-root .parallax-b { transform: translate(calc(var(--mx) * 9px), calc(var(--my) * 7px)); transition: transform 0.2s linear; }

        .lens-root .mini {
          transition: transform 1.05s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.55s ease;
          transform-box: fill-box;
          transform-origin: center;
          will-change: transform;
        }
        ${NEUROS.map(n => `
          .lens-root.is-scattered .mini-${n.code} { transform: translate(${n.scatterX}px, ${n.scatterY}px); }
        `).join("")}
        .lens-root.is-assembled .mini { transform: translate(0, 0); }

        .lens-root .lens-frame { transition: opacity 0.55s ease, filter 0.55s ease; opacity: 0.55; }
        .lens-root.is-assembled .lens-frame { opacity: 0.95; filter: drop-shadow(0 0 22px rgba(183,155,224,0.4)); }

        .lens-root .beam { transition: opacity 0.55s ease; }
        .lens-root.is-scattered .beam { opacity: 0; }
        .lens-root.is-assembled .beam { opacity: 0.9; }

        .lens-root .label-group { transition: opacity 0.55s ease; }
        .lens-root.is-assembled .label-group { opacity: 0; }
        .lens-root.is-scattered .label-group { opacity: 1; }

        @keyframes pulse-dot { 0%,100% { opacity: 0.4 } 50% { opacity: 1 } }
        .lens-root .pulse { animation: pulse-dot 3s ease-in-out infinite; }
      `}</style>

      <defs>
        <radialGradient id="lensGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#B79BE0" stopOpacity="0.35" />
          <stop offset="0.7" stopColor="#764CB0" stopOpacity="0.12" />
          <stop offset="1" stopColor="#764CB0" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="lgv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#B79BE0" stopOpacity="0.85" />
          <stop offset="1" stopColor="#764CB0" stopOpacity="0.45" />
        </linearGradient>
      </defs>

      {/* Halo behind main lens */}
      <circle cx={cx} cy={cy} r="190" fill="url(#lensGlow)" />

      {/* MAIN LENS FRAME (magnifier body) */}
      <g className="parallax-a lens-frame">
        {/* handle */}
        <line x1="450" y1="530" x2="540" y2="640" stroke="url(#lgv)" strokeWidth="4" strokeLinecap="round" />
        <line x1="450" y1="530" x2="540" y2="640" stroke="rgba(255,255,255,0.15)" strokeWidth="1.2" strokeLinecap="round" />
        {/* ring */}
        <circle cx={cx} cy={cy} r="150" stroke="url(#lgv)" strokeWidth="4" />
        <circle cx={cx} cy={cy} r="140" stroke="rgba(183,155,224,0.28)" strokeWidth="1" strokeDasharray="2 4" />
        <circle cx={cx} cy={cy} r="125" stroke="rgba(183,155,224,0.16)" strokeWidth="0.7" />
        {/* glass tint */}
        <circle cx={cx} cy={cy} r="140" fill="rgba(30,20,55,0.35)" />
        {/* highlight sheen */}
        <path d={`M ${cx - 90} ${cy - 70} Q ${cx - 30} ${cy - 130} ${cx + 60} ${cy - 100}`}
              stroke="rgba(255,255,255,0.22)" strokeWidth="2" fill="none" />
        {/* subtle 3x3 guide (visible faintly) */}
        <line x1={cx - gap - 22} y1={cy - 100} x2={cx - gap - 22} y2={cy + 100} stroke="rgba(183,155,224,0.10)" strokeWidth="0.8" strokeDasharray="2 4" />
        <line x1={cx + gap + 22} y1={cy - 100} x2={cx + gap + 22} y2={cy + 100} stroke="rgba(183,155,224,0.10)" strokeWidth="0.8" strokeDasharray="2 4" />
        <line x1={cx - 100} y1={cy - gap - 22} x2={cx + 100} y2={cy - gap - 22} stroke="rgba(183,155,224,0.10)" strokeWidth="0.8" strokeDasharray="2 4" />
        <line x1={cx - 100} y1={cy + gap + 22} x2={cx + 100} y2={cy + gap + 22} stroke="rgba(183,155,224,0.10)" strokeWidth="0.8" strokeDasharray="2 4" />
      </g>

      {/* BEAMS — visible when assembled: light coming through 9 lenses */}
      <g className="beam parallax-b">
        {NEUROS.map((n) => {
          const targetX = cx + (n.col - 1) * gap;
          const targetY = cy + (n.row - 1) * gap;
          return (
            <line key={`beam-${n.code}`}
                  x1={cx} y1={cy - 250}
                  x2={targetX} y2={targetY}
                  stroke={NEUROTYPE_COLORS[n.code]} strokeOpacity="0.25" strokeWidth="0.8" />
          );
        })}
      </g>

      {/* 9 MINI COLORED LENSES — drawn at their assembled positions, translated out when scattered */}
      {NEUROS.map((n) => {
        const targetX = cx + (n.col - 1) * gap;
        const targetY = cy + (n.row - 1) * gap;
        const color = NEUROTYPE_COLORS[n.code];
        return (
          <g key={n.code} className={`mini mini-${n.code}`}>
            {/* glow */}
            <circle cx={targetX} cy={targetY} r="22" fill={color} fillOpacity="0.08" />
            {/* rim */}
            <circle cx={targetX} cy={targetY} r="20" stroke={color} strokeWidth="1.5" fill="rgba(8,6,18,0.6)" />
            {/* inner iris */}
            <circle cx={targetX} cy={targetY} r="13" stroke={color} strokeOpacity="0.5" strokeWidth="0.8" fill="none" />
            <circle cx={targetX} cy={targetY} r="5" fill={color} fillOpacity="0.65" />
            {/* code */}
            <text x={targetX} y={targetY + 3.5} textAnchor="middle"
                  fill="#fff" fontSize="10" fontWeight="600" fontFamily="Montserrat">
              {n.code}
            </text>
          </g>
        );
      })}

      {/* Central iris/eye — visible only when assembled the 9 lenses converge at center */}
      <g className="beam parallax-a">
        <circle cx={cx} cy={cy} r="10" fill="rgba(183,155,224,0.5)" />
        <circle cx={cx} cy={cy} r="4" fill="#fff" />
      </g>

      {/* Labels for scattered state */}
      {[
        { x: 55,  y: 130, label: "мир смыслов" },
        { x: 400, y: 92,  label: "9 нейротипов" },
        { x: 40,  y: 400, label: "мир эмоций" },
        { x: 460, y: 400, label: "мир материи" },
        { x: 120, y: 700, label: "линзы восприятия" },
      ].map((l, i) => (
        <g key={i} className="label-group">
          <rect x={l.x - 6} y={l.y - 12} width={l.label.length * 7 + 18} height="20" rx="10"
                stroke="rgba(183,155,224,0.5)" fill="rgba(8,6,18,0.72)" />
          <text x={l.x + 3} y={l.y + 2} fontSize="10" fill="rgba(255,255,255,0.82)" fontFamily="Montserrat">
            {l.label}
          </text>
        </g>
      ))}

      {/* Sparkles */}
      <g>
        {[
          [80, 320], [520, 320], [50, 460], [560, 460], [40, 180], [560, 180],
          [30, 620], [570, 620], [180, 60], [420, 60],
        ].map(([px, py], i) => (
          <circle key={i} cx={px} cy={py} r="1.6" fill="#B79BE0" opacity="0.55" className={i % 2 === 0 ? "pulse" : ""} />
        ))}
      </g>

      {/* Hint */}
      <g className="label-group">
        <text x="300" y="740" fontSize="10" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontFamily="Montserrat" letterSpacing="1.5">
          НАВЕДИТЕ КУРСОР — ЧТОБЫ СОБРАТЬ ЛИНЗУ
        </text>
      </g>
    </svg>
  );
};

export default LensSvg;
