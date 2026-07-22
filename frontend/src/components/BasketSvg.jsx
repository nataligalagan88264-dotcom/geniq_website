import React, { useEffect, useRef, useState } from "react";

/**
 * BasketSvg — grocery basket metaphor. Same visual language as WardrobeSvg.
 * Scattered state: 5 products (яйца, мука, молоко, сахар, яблоки) around a basket outline.
 * Hover: products fly INTO the basket → full grocery revealed.
 */
export const BasketSvg = () => {
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

  return (
    <svg
      ref={rootRef}
      data-testid="basket-svg"
      viewBox="0 0 600 760"
      className={`w-full h-auto max-w-[580px] mx-auto overflow-visible basket-root ${assembled ? "is-assembled" : "is-scattered"}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ "--mx": 0, "--my": 0, touchAction: "manipulation" }}
      role="button"
      tabIndex="0"
      aria-label={assembled ? "Развернуть метафору корзины" : "Собрать метафору корзины"}
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
        .basket-root .parallax-a { transform: translate(calc(var(--mx) * -6px), calc(var(--my) * -5px)); transition: transform 0.2s linear; }
        .basket-root .parallax-b { transform: translate(calc(var(--mx) * 8px), calc(var(--my) * 6px)); transition: transform 0.2s linear; }
        .basket-root .parallax-c { transform: translate(calc(var(--mx) * -10px), calc(var(--my) * 8px)); transition: transform 0.2s linear; }

        .basket-root .part {
          transition: transform 1.05s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.55s ease;
          transform-box: fill-box;
          transform-origin: center;
          will-change: transform;
        }
        .basket-root.is-scattered .part-eggs   { transform: translate(-180px, -170px) rotate(-7deg); }
        .basket-root.is-scattered .part-flour  { transform: translate(180px, -190px) rotate(8deg); }
        .basket-root.is-scattered .part-milk   { transform: translate(-200px, 0px) rotate(-9deg); }
        .basket-root.is-scattered .part-sugar  { transform: translate(200px, -20px) rotate(6deg); }
        .basket-root.is-scattered .part-apple1 { transform: translate(-150px, 200px) rotate(-6deg); }
        .basket-root.is-scattered .part-apple2 { transform: translate(180px, 200px) rotate(9deg); }
        .basket-root.is-assembled .part { transform: translate(0, 0) rotate(0); }

        .basket-root .label-group { transition: opacity 0.55s ease; }
        .basket-root.is-assembled .label-group { opacity: 0; }
        .basket-root.is-scattered .label-group { opacity: 1; }

        .basket-root .basket-frame { transition: opacity 0.55s ease; opacity: 0.55; }
        .basket-root.is-assembled .basket-frame { opacity: 0.95; }

        @keyframes pulse-dot { 0%,100% { opacity: 0.4 } 50% { opacity: 1 } }
        .basket-root .pulse { animation: pulse-dot 3s ease-in-out infinite; }
      `}</style>

      <defs>
        <linearGradient id="bgv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#B79BE0" stopOpacity="0.85" />
          <stop offset="1" stopColor="#764CB0" stopOpacity="0.45" />
        </linearGradient>
        <linearGradient id="bgh" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#764CB0" stopOpacity="0.5" />
          <stop offset="0.5" stopColor="#B79BE0" stopOpacity="0.9" />
          <stop offset="1" stopColor="#764CB0" stopOpacity="0.5" />
        </linearGradient>
      </defs>

      {/* ground */}
      <ellipse cx="300" cy="700" rx="230" ry="20" stroke="rgba(118,76,176,0.22)" strokeWidth="1" />
      <ellipse cx="300" cy="700" rx="150" ry="12" stroke="rgba(118,76,176,0.14)" strokeWidth="1" />

      {/* BASKET FRAME (always visible) */}
      <g className="parallax-a basket-frame">
        {/* handles */}
        <path d="M 200 380 Q 300 300 400 380" stroke="url(#bgv)" strokeWidth="1.3" fill="none" strokeDasharray="3 4" />
        {/* top rim */}
        <path d="M 170 400 L 430 400 L 415 425 L 185 425 Z" stroke="url(#bgh)" strokeWidth="1.3" fill="rgba(30,20,55,0.15)" />
        {/* body — trapezoid */}
        <path d="M 185 425 L 415 425 L 395 660 L 205 660 Z" stroke="url(#bgv)" strokeWidth="1.3" fill="rgba(30,20,55,0.10)" />
        {/* weave — vertical lines */}
        {[220, 250, 280, 310, 340, 370].map((x, i) => (
          <line key={i} x1={x} y1="428" x2={x - (x - 300) * 0.08} y2="657"
                stroke="rgba(183,155,224,0.28)" strokeWidth="0.8" strokeDasharray="2 3" />
        ))}
        {/* weave — horizontal */}
        {[470, 520, 570, 620].map((y, i) => (
          <line key={i} x1={195 - (y - 425) * 0.03} y1={y} x2={405 + (y - 425) * 0.03} y2={y}
                stroke="rgba(183,155,224,0.22)" strokeWidth="0.8" strokeDasharray="2 3" />
        ))}
        {/* corners */}
        {[[185,425],[415,425],[205,660],[395,660]].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r="2" fill="#B79BE0" opacity="0.8" />
        ))}
      </g>

      {/* PART: eggs — a small carton with 6 eggs */}
      <g className="parallax-a">
        <g className="part part-eggs">
          <rect x="230" y="430" width="90" height="42" rx="4" stroke="url(#bgh)" strokeWidth="1.1" fill="rgba(30,20,55,0.25)" />
          {[0,1,2].map((c) =>
            [0,1].map((r) => (
              <ellipse key={`${c}-${r}`} cx={245 + c * 28} cy={441 + r * 18} rx="10" ry="7"
                       fill="rgba(183,155,224,0.15)" stroke="rgba(183,155,224,0.6)" strokeWidth="0.8" />
            ))
          )}
        </g>
      </g>

      {/* PART: flour — paper bag */}
      <g className="parallax-b">
        <g className="part part-flour">
          <path d="M 240 480 L 300 480 L 305 490 L 300 570 L 240 570 L 235 490 Z"
                stroke="url(#bgv)" strokeWidth="1.1" fill="rgba(30,20,55,0.25)" />
          {/* seam */}
          <line x1="240" y1="480" x2="238" y2="490" stroke="rgba(183,155,224,0.4)" strokeWidth="0.7" />
          <line x1="300" y1="480" x2="302" y2="490" stroke="rgba(183,155,224,0.4)" strokeWidth="0.7" />
          <text x="270" y="528" textAnchor="middle" fill="rgba(183,155,224,0.85)" fontSize="10" fontFamily="Montserrat" letterSpacing="1">МУКА</text>
          <line x1="245" y1="536" x2="295" y2="536" stroke="rgba(183,155,224,0.35)" strokeWidth="0.6" />
        </g>
      </g>

      {/* PART: milk — carton with slanted top */}
      <g className="parallax-b">
        <g className="part part-milk">
          <path d="M 320 450 L 380 450 L 385 460 L 380 480 L 320 480 L 315 460 Z"
                stroke="rgba(183,155,224,0.7)" strokeWidth="1" fill="rgba(30,20,55,0.3)" />
          <path d="M 315 480 L 385 480 L 385 590 L 315 590 Z"
                stroke="url(#bgv)" strokeWidth="1.1" fill="rgba(30,20,55,0.28)" />
          <line x1="350" y1="450" x2="350" y2="480" stroke="rgba(183,155,224,0.5)" strokeWidth="0.8" />
          <text x="350" y="530" textAnchor="middle" fill="rgba(183,155,224,0.85)" fontSize="10" fontFamily="Montserrat" letterSpacing="1">МОЛОКО</text>
          <circle cx="350" cy="555" r="3" fill="none" stroke="rgba(183,155,224,0.5)" strokeWidth="0.8" />
        </g>
      </g>

      {/* PART: sugar — pouch */}
      <g className="parallax-c">
        <g className="part part-sugar">
          <path d="M 335 490 L 395 490 L 400 500 L 395 580 L 335 580 L 330 500 Z"
                stroke="rgba(183,155,224,0.7)" strokeWidth="1" fill="rgba(30,20,55,0.25)" />
          <text x="365" y="538" textAnchor="middle" fill="rgba(183,155,224,0.8)" fontSize="9" fontFamily="Montserrat" letterSpacing="1">САХАР</text>
          <circle cx="345" cy="558" r="1.2" fill="#B79BE0" opacity="0.8" />
          <circle cx="358" cy="562" r="1" fill="#B79BE0" opacity="0.6" />
          <circle cx="380" cy="560" r="1.4" fill="#B79BE0" opacity="0.8" />
          <circle cx="370" cy="568" r="1" fill="#B79BE0" opacity="0.5" />
        </g>
      </g>

      {/* PART: apple 1 */}
      <g className="parallax-c">
        <g className="part part-apple1">
          <path d="M 220 550 Q 210 540 220 530 Q 230 520 240 530 Q 250 540 245 555 Q 240 580 230 585 Q 220 580 215 570 Z"
                stroke="url(#bgv)" strokeWidth="1.1" fill="rgba(30,20,55,0.3)" />
          {/* stem */}
          <path d="M 232 528 Q 236 520 240 522" stroke="rgba(183,155,224,0.7)" strokeWidth="1" fill="none" />
          {/* leaf */}
          <path d="M 240 522 Q 246 518 248 524 Q 244 524 240 524" fill="rgba(126,200,160,0.5)" stroke="rgba(126,200,160,0.9)" strokeWidth="0.6" />
          {/* highlight */}
          <ellipse cx="222" cy="545" rx="3" ry="5" fill="rgba(183,155,224,0.35)" opacity="0.6" />
        </g>
      </g>

      {/* PART: apple 2 (right) */}
      <g className="parallax-c">
        <g className="part part-apple2">
          <path d="M 360 555 Q 350 545 360 535 Q 370 525 380 535 Q 390 545 385 560 Q 380 585 370 590 Q 360 585 355 575 Z"
                stroke="url(#bgv)" strokeWidth="1.1" fill="rgba(30,20,55,0.3)" />
          <path d="M 372 533 Q 376 525 380 527" stroke="rgba(183,155,224,0.7)" strokeWidth="1" fill="none" />
          <path d="M 380 527 Q 386 523 388 529 Q 384 529 380 529" fill="rgba(126,200,160,0.5)" stroke="rgba(126,200,160,0.9)" strokeWidth="0.6" />
          <ellipse cx="362" cy="550" rx="3" ry="5" fill="rgba(183,155,224,0.35)" opacity="0.6" />
        </g>
      </g>

      {/* Labels for scattered state */}
      {[
        { x: 60,  y: 210, label: "яйца" },
        { x: 460, y: 200, label: "мука" },
        { x: 40,  y: 400, label: "молоко" },
        { x: 470, y: 400, label: "сахар" },
        { x: 90,  y: 620, label: "яблоки" },
        { x: 460, y: 620, label: "яблоки" },
      ].map((l, i) => (
        <g key={i} className="label-group">
          <rect x={l.x - 6} y={l.y - 12} width={l.label.length * 7 + 18} height="20" rx="10"
                stroke="rgba(183,155,224,0.5)" fill="rgba(8,6,18,0.72)" />
          <text x={l.x + 3} y={l.y + 2} fontSize="10" fill="rgba(255,255,255,0.82)" fontFamily="Montserrat">
            {l.label}
          </text>
        </g>
      ))}

      {/* sparkles */}
      <g>
        {[
          [80, 320], [520, 320], [50, 480], [560, 480], [110, 100], [500, 100],
          [40, 180], [560, 180], [30, 660], [570, 660],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="1.6" fill="#B79BE0" opacity="0.55" className={i % 2 === 0 ? "pulse" : ""} />
        ))}
      </g>

      {/* Hint */}
      <g className="label-group">
        <text x="300" y="740" fontSize="10" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontFamily="Montserrat" letterSpacing="1.5">
          НАВЕДИТЕ КУРСОР — ЧТОБЫ УВИДЕТЬ КОРЗИНУ
        </text>
      </g>
    </svg>
  );
};

export default BasketSvg;
