import React, { useEffect, useRef, useState } from "react";

/**
 * Digital wardrobe with recognizable parts (doors, shelf, rod+hangers, drawer, feet, cornice).
 * On hover the parts assemble into a whole wardrobe; on leave they scatter again.
 * Also keeps subtle mouse parallax on the whole SVG (--mx/--my CSS vars).
 */
export const WardrobeSvg = () => {
  const rootRef = useRef(null);
  const [assembled, setAssembled] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || !window.matchMedia("(hover: none), (pointer: coarse)").matches) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      setAssembled(entry.isIntersecting && entry.intersectionRatio >= 0.32);
    }, {
      threshold: [0, 0.32, 0.55],
      rootMargin: "-10% 0px -10% 0px",
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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

  return (
    <svg
      ref={rootRef}
      data-testid="wardrobe-svg"
      viewBox="0 0 600 760"
      className={`w-full h-auto max-w-[520px] mx-auto wardrobe-root ${assembled ? "is-assembled" : "is-scattered"}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ "--mx": 0, "--my": 0 }}
      onMouseEnter={() => setHoverAssembly(true)}
      onMouseLeave={() => setHoverAssembly(false)}
      onClick={toggleTouchAssembly}
    >
      <style>{`
        .wardrobe-root .parallax-a { transform: translate(calc(var(--mx) * -6px), calc(var(--my) * -5px)); transition: transform 0.2s linear; }
        .wardrobe-root .parallax-b { transform: translate(calc(var(--mx) * 8px), calc(var(--my) * 6px)); transition: transform 0.2s linear; }
        .wardrobe-root .parallax-c { transform: translate(calc(var(--mx) * -10px), calc(var(--my) * 8px)); transition: transform 0.2s linear; }

        .wardrobe-root .part {
          transition:
            transform 1.85s cubic-bezier(0.22, 1, 0.36, 1),
            opacity 0.75s ease;
          transform-box: fill-box;
          transform-origin: center;
          will-change: transform;
        }

        /* Scattered (default) positions */
        .wardrobe-root.is-scattered .part-door-left  { transform: translate(-150px, -80px) rotate(-7deg); }
        .wardrobe-root.is-scattered .part-door-right { transform: translate(160px, -70px) rotate(8deg); }
        .wardrobe-root.is-scattered .part-shelf      { transform: translate(170px, 40px) rotate(6deg); }
        .wardrobe-root.is-scattered .part-rod        { transform: translate(-170px, -150px) rotate(-9deg); }
        .wardrobe-root.is-scattered .part-drawer     { transform: translate(-180px, 110px) rotate(4deg); }
        .wardrobe-root.is-scattered .part-foot-l     { transform: translate(-140px, 90px) rotate(-6deg); }
        .wardrobe-root.is-scattered .part-foot-r     { transform: translate(150px, 100px) rotate(6deg); }
        .wardrobe-root.is-scattered .part-cornice    { transform: translate(20px, -160px) rotate(-2deg); }

        /* Assembled */
        .wardrobe-root.is-assembled .part { transform: translate(0, 0) rotate(0); }

        /* Scatter labels — visible when scattered, fade when assembled */
        .wardrobe-root .label-group { transition: opacity 0.7s ease; }
        .wardrobe-root.is-assembled .label-group { opacity: 0; transition-delay: 1.05s; }
        .wardrobe-root.is-scattered .label-group { opacity: 1; transition-delay: 0.35s; }

        /* Frame outline is a bit more visible when assembled */
        .wardrobe-root .frame-outline { transition: opacity 0.55s ease, stroke 0.55s ease; opacity: 0.55; }
        .wardrobe-root.is-assembled .frame-outline { opacity: 0.9; }

        /* Sparkles pulse */
        @keyframes pulse-dot { 0%,100% { opacity: 0.4 } 50% { opacity: 1 } }
        .wardrobe-root .pulse { animation: pulse-dot 3s ease-in-out infinite; }
      `}</style>

      <defs>
        <linearGradient id="wgv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#B79BE0" stopOpacity="0.85" />
          <stop offset="1" stopColor="#764CB0" stopOpacity="0.45" />
        </linearGradient>
        <linearGradient id="wgh" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#764CB0" stopOpacity="0.5" />
          <stop offset="0.5" stopColor="#B79BE0" stopOpacity="0.85" />
          <stop offset="1" stopColor="#764CB0" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="wgmirror" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#B79BE0" stopOpacity="0.15" />
          <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="1" stopColor="#B79BE0" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {/* ground ellipses */}
      <ellipse cx="300" cy="700" rx="230" ry="20" stroke="rgba(118,76,176,0.22)" strokeWidth="1" />
      <ellipse cx="300" cy="700" rx="150" ry="12" stroke="rgba(118,76,176,0.14)" strokeWidth="1" />
      <circle cx="300" cy="700" r="2" fill="#B79BE0" className="pulse" />

      {/* ------ CABINET FRAME (always visible, target) ------ */}
      <g className="parallax-a">
        {/* Outer frame */}
        <rect
          x="200" y="180" width="200" height="420"
          className="frame-outline"
          stroke="url(#wgv)" strokeWidth="1.3"
          strokeDasharray="2 4"
        />
        {/* Central vertical divider (where doors meet) */}
        <line x1="300" y1="182" x2="300" y2="598" stroke="rgba(183,155,224,0.18)" strokeWidth="0.8" strokeDasharray="3 4" />
        {/* Corners */}
        {[[200,180],[400,180],[200,600],[400,600]].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r="2" fill="#B79BE0" opacity="0.85" />
        ))}
      </g>

      {/* ------ PARTS (assembled positions drawn — CSS translates them out when scattered) ------ */}

      {/* Cornice / top */}
      <g className="parallax-a">
        <g className="part part-cornice">
          <rect x="188" y="164" width="224" height="14" stroke="url(#wgh)" strokeWidth="1.2" />
          <line x1="200" y1="171" x2="400" y2="171" stroke="rgba(183,155,224,0.5)" strokeWidth="0.6" />
          <circle cx="300" cy="171" r="1.8" fill="#B79BE0" className="pulse" />
        </g>
      </g>

      {/* Left door */}
      <g className="parallax-a">
        <g className="part part-door-left">
          <rect x="200" y="180" width="100" height="380" stroke="url(#wgv)" strokeWidth="1.2" fill="rgba(30,20,55,0.15)" />
          {/* panel lines */}
          <rect x="212" y="200" width="76" height="150" stroke="rgba(183,155,224,0.35)" strokeWidth="0.8" />
          <rect x="212" y="360" width="76" height="180" stroke="rgba(183,155,224,0.35)" strokeWidth="0.8" />
          {/* handle */}
          <line x1="290" y1="360" x2="290" y2="390" stroke="#B79BE0" strokeWidth="2" strokeLinecap="round" />
          <circle cx="290" cy="360" r="2" fill="#B79BE0" />
          <circle cx="290" cy="390" r="2" fill="#B79BE0" />
        </g>
      </g>

      {/* Right door (with mirror) */}
      <g className="parallax-a">
        <g className="part part-door-right">
          <rect x="300" y="180" width="100" height="380" stroke="url(#wgv)" strokeWidth="1.2" fill="rgba(30,20,55,0.15)" />
          {/* mirror inset */}
          <rect x="312" y="205" width="76" height="290" fill="url(#wgmirror)" stroke="rgba(183,155,224,0.5)" strokeWidth="0.8" />
          {/* mirror sheen */}
          <line x1="322" y1="220" x2="380" y2="290" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
          <line x1="322" y1="240" x2="360" y2="285" stroke="rgba(255,255,255,0.08)" strokeWidth="0.6" />
          {/* handle */}
          <line x1="310" y1="360" x2="310" y2="390" stroke="#B79BE0" strokeWidth="2" strokeLinecap="round" />
          <circle cx="310" cy="360" r="2" fill="#B79BE0" />
          <circle cx="310" cy="390" r="2" fill="#B79BE0" />
        </g>
      </g>

      {/* Shelf (inside the cabinet) */}
      <g className="parallax-b">
        <g className="part part-shelf">
          <rect x="210" y="342" width="180" height="7" fill="rgba(183,155,224,0.18)" stroke="url(#wgh)" strokeWidth="1" />
          {/* support brackets */}
          <path d="M 220 349 L 224 358 L 216 358 Z" fill="rgba(183,155,224,0.55)" />
          <path d="M 380 349 L 384 358 L 376 358 Z" fill="rgba(183,155,224,0.55)" />
          <circle cx="300" cy="345" r="1.5" fill="#B79BE0" className="pulse" />
        </g>
      </g>

      {/* Hanging rod + hangers */}
      <g className="parallax-b">
        <g className="part part-rod">
          {/* rod */}
          <line x1="215" y1="235" x2="385" y2="235" stroke="url(#wgh)" strokeWidth="2" strokeLinecap="round" />
          <circle cx="215" cy="235" r="2.5" fill="#B79BE0" />
          <circle cx="385" cy="235" r="2.5" fill="#B79BE0" />
          {/* hanger 1 */}
          <g stroke="rgba(183,155,224,0.75)" strokeWidth="1" strokeLinecap="round">
            <line x1="255" y1="235" x2="255" y2="243" />
            <path d="M 232 268 L 255 243 L 278 268 L 232 268 Z" fill="none" />
          </g>
          {/* hanger 2 */}
          <g stroke="rgba(183,155,224,0.75)" strokeWidth="1" strokeLinecap="round">
            <line x1="320" y1="235" x2="320" y2="245" />
            <path d="M 297 272 L 320 245 L 343 272 L 297 272 Z" fill="none" />
          </g>
          {/* hanger 3 */}
          <g stroke="rgba(183,155,224,0.65)" strokeWidth="1" strokeLinecap="round">
            <line x1="360" y1="235" x2="360" y2="242" />
            <path d="M 342 262 L 360 242 L 378 262 L 342 262 Z" fill="none" />
          </g>
        </g>
      </g>

      {/* Drawer */}
      <g className="parallax-c">
        <g className="part part-drawer">
          <rect x="210" y="555" width="180" height="48" fill="rgba(30,20,55,0.25)" stroke="url(#wgv)" strokeWidth="1.2" />
          {/* handle bars */}
          <line x1="245" y1="580" x2="285" y2="580" stroke="#B79BE0" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="315" y1="580" x2="355" y2="580" stroke="#B79BE0" strokeWidth="2.2" strokeLinecap="round" />
          {/* subtle drawer grain */}
          <line x1="216" y1="565" x2="384" y2="565" stroke="rgba(183,155,224,0.2)" strokeWidth="0.5" strokeDasharray="2 3" />
          <line x1="216" y1="595" x2="384" y2="595" stroke="rgba(183,155,224,0.2)" strokeWidth="0.5" strokeDasharray="2 3" />
        </g>
      </g>

      {/* Feet — left */}
      <g className="parallax-c">
        <g className="part part-foot-l">
          <path d="M 215 600 L 250 600 L 245 620 L 220 620 Z" fill="rgba(30,20,55,0.35)" stroke="url(#wgv)" strokeWidth="1" />
        </g>
      </g>

      {/* Feet — right */}
      <g className="parallax-c">
        <g className="part part-foot-r">
          <path d="M 350 600 L 385 600 L 380 620 L 355 620 Z" fill="rgba(30,20,55,0.35)" stroke="url(#wgv)" strokeWidth="1" />
        </g>
      </g>

      {/* ------ Scattered-state labels (auto fade when assembled) ------ */}
      {[
        { x: 76,  y: 88,  label: "фасад", dx: 6 },
        { x: 458, y: 88,  label: "зеркало", dx: 6 },
        { x: 468, y: 220, label: "полка", dx: 6 },
        { x: 78,  y: 168, label: "штанга", dx: 6 },
        { x: 66,  y: 570, label: "ящик", dx: 6 },
        { x: 470, y: 570, label: "опоры", dx: 6 },
        { x: 244, y: 62,  label: "карниз", dx: 6 },
      ].map((l, i) => (
        <g key={i} className="label-group">
          <rect
            x={l.x - l.dx}
            y={l.y - 12}
            width={l.label.length * 7 + 18}
            height="20"
            rx="10"
            stroke="rgba(183,155,224,0.5)"
            fill="rgba(8,6,18,0.72)"
          />
          <text x={l.x + 3} y={l.y + 2} fontSize="10" fill="rgba(255,255,255,0.82)" fontFamily="Montserrat">
            {l.label}
          </text>
        </g>
      ))}

      {/* Sparkles / screws */}
      <g>
        {[
          [80, 320], [520, 320], [50, 460], [560, 460], [110, 660], [500, 660],
          [40, 220], [560, 220], [40, 130], [560, 130],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="1.6" fill="#B79BE0" opacity="0.55" className={i % 2 === 0 ? "pulse" : ""} />
        ))}
      </g>

      {/* Hint below */}
      <g className="label-group">
        <text x="300" y="740" fontSize="10" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontFamily="Montserrat" letterSpacing="1.5">
          НАВЕДИТЕ КУРСОР — ЧТОБЫ СОБРАТЬ
        </text>
      </g>
    </svg>
  );
};

export default WardrobeSvg;
