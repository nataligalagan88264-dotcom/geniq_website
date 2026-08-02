import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { NEUROTYPE_COLORS } from "@/lib/constants";
import { NEUROTYPE_AVATARS } from "@/lib/neurotypeAssets";
import homeSections from "@/content/home-sections.json";

/**
 * Neurotype gallery — circular 3D carousel.
 */

const TYPES = homeSections.gallery.items;

const WORLD_LABELS = {
  S: "СМЫСЛОВ",
  E: "ЭМОЦИЙ",
  T: "МАТЕРИИ",
};

const useViewportWidth = () => {
  const [width, setWidth] = useState(() => (typeof window === "undefined" ? 1280 : window.innerWidth));

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return width;
};

const useElementWidth = () => {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const update = () => setWidth(el.getBoundingClientRect().width);
    update();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", update);
      return () => window.removeEventListener("resize", update);
    }

    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, width];
};

const OrbitCard = ({ type, style, expanded, muted, onSelect }) => {
  const color = type.code === "T2" ? "#747480" : NEUROTYPE_COLORS[type.code];
  const avatar = NEUROTYPE_AVATARS[type.code];

  return (
    <button
      type="button"
      data-testid={`portrait-${type.code}`}
      aria-label={`${expanded ? "Закрыть" : "Открыть"} описание нейротипа ${type.name}`}
      aria-expanded={expanded}
      className={`orbit-card ${expanded ? "orbit-card-expanded" : ""} ${muted ? "orbit-card-muted" : ""}`}
      onClick={(event) => {
        event.stopPropagation();
        onSelect();
      }}
      tabIndex={style.pointerEvents === "none" ? -1 : 0}
      style={{ ...style, "--card-color": color }}
    >
      <div className="orbit-card-shell" style={{ borderColor: color, boxShadow: `0 20px 54px rgba(0,0,0,0.58), inset 0 0 34px ${color}12` }}>
        <div className="orbit-card-portrait" style={{ "--portrait-color": color }}>
          <img
            src={avatar}
            alt=""
            aria-hidden="true"
            draggable="false"
            width="224"
            height="300"
          />
        </div>

        <div className="orbit-card-copy">
          <div className="orbit-card-code" style={{ color }}>{type.code}</div>
          <h3>{type.name}</h3>
          <div className="orbit-card-mode">
            МИР {expanded ? WORLD_LABELS[type.world] : type.world} · {type.mode.toUpperCase()}
          </div>
          <div className="orbit-card-profs">{type.profs}</div>
          {expanded && (
            <div className="orbit-card-details animate-in fade-in duration-200">
              <p>{type.desc}</p>
              <div className="orbit-card-facts">
                <div className="orbit-card-fact orbit-card-fact--strength">
                  <span>Сила</span>
                  <strong>{type.strength}</strong>
                </div>
                <div className="orbit-card-fact orbit-card-fact--risk">
                  <span>Риск</span>
                  <strong>{type.risk}</strong>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </button>
  );
};

export const NeurotypeGallery = () => {
  const ref = useRef(null);
  const [stageRef, stageWidth] = useElementWidth();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [centeringIndex, setCenteringIndex] = useState(null);
  const [angle, setAngle] = useState(0);
  const centeringFrameRef = useRef(null);
  const centeringTargetRef = useRef(null);
  const width = useViewportWidth();

  useEffect(() => () => cancelAnimationFrame(centeringFrameRef.current), []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); });
    }, { threshold: 0.08 });
    el.querySelectorAll(".reveal").forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, []);

  const isMobile = width < 768;
  const isIntermediate = width >= 768 && width <= 1100;
  const orbitWidth = stageWidth || width;
  const cardWidth = isMobile
    ? Math.min(Math.max(orbitWidth * 0.52, 184), 224)
    : isIntermediate
      ? Math.min(Math.max(orbitWidth * 0.4, 280), 330)
      : Math.min(Math.max(orbitWidth * 0.2, 232), 312);
  const cardGap = cardWidth * (isMobile ? 0.08 : 0.1);
  const minScale = isMobile ? 0.86 : 0.82;
  const maxVisibleOffset = orbitWidth / 2 / (cardWidth + cardGap) + 1.15;
  const fadeOffset = maxVisibleOffset + (isMobile ? 1.15 : 0.85);
  const verticalArc = isMobile ? 8 : 0;
  const visibilityThreshold = isMobile ? 0.1 : 0.03;
  const cycle = (angle / (Math.PI * 2)) * TYPES.length;

  const moveBy = (delta) => {
    const current = ((Math.round(cycle) % TYPES.length) + TYPES.length) % TYPES.length;
    centerCard((current + delta + TYPES.length) % TYPES.length, "none");
  };

  const centerCard = (index, activation = "none") => {
    if (centeringTargetRef.current !== null) return;

    const fullTurn = Math.PI * 2;
    const startAngle = angle;
    const baseAngle = (index / TYPES.length) * fullTurn;
    const nearestTurn = Math.round((startAngle - baseAngle) / fullTurn);
    const targetAngle = baseAngle + nearestTurn * fullTurn;
    const startedAt = performance.now();
    const duration = 420;

    centeringTargetRef.current = index;
    setCenteringIndex(index);
    if (activation === "none") {
      setSelectedIndex(null);
    }

    const move = (time) => {
      const progress = Math.min((time - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAngle(startAngle + (targetAngle - startAngle) * eased);

      if (progress < 1) {
        centeringFrameRef.current = requestAnimationFrame(move);
        return;
      }

      centeringTargetRef.current = null;
      setCenteringIndex(null);
      if (activation === "select") {
        setSelectedIndex(index);
      } else {
        setSelectedIndex(null);
      }
    };

    centeringFrameRef.current = requestAnimationFrame(move);
  };

  const getLensX = (offset) => {
    const direction = Math.sign(offset);
    const distance = Math.abs(offset);
    const curveDistance = Math.min(distance, maxVisibleOffset);
    const scaleDrop = 1 - minScale;
    const curvedWidth =
      (cardWidth + cardGap) * curveDistance
      - (cardWidth * scaleDrop * curveDistance * curveDistance) / (2 * maxVisibleOffset);
    const tailWidth = Math.max(0, distance - maxVisibleOffset) * (cardWidth * minScale + cardGap);
    return direction * (curvedWidth + tailWidth);
  };

  const cards = TYPES.map((type, index) => {
    let offset = index - cycle;
    while (offset > TYPES.length / 2) offset -= TYPES.length;
    while (offset < -TYPES.length / 2) offset += TYPES.length;

    const distance = Math.abs(offset);
    const depthProgress = Math.min(distance / maxVisibleOffset, 1);
    const depth = 1 - depthProgress * 2;
    const y = depthProgress * verticalArc;
    const scale = isMobile
      ? 1 - depthProgress * (1 - minScale)
      : 1 - depthProgress * (1 - minScale);
    const x = getLensX(offset);
    const fadeEdge = Math.max(0, Math.min(1, (fadeOffset - distance) / 0.9));
    const edgeVisibility = fadeEdge * fadeEdge * (3 - 2 * fadeEdge);
    const opacity = edgeVisibility * (0.44 + (1 - depthProgress) * 0.56);
    const centered = distance < 0.28;
    const expanded = centered && selectedIndex === index;
    const isCentering = centeringIndex === index;
    const focusedIndex = centeringIndex ?? selectedIndex;
    const compactSelected = expanded && selectedIndex === index && isMobile;
    const visible = expanded || edgeVisibility > visibilityThreshold;

    return {
      type,
      index,
      depth,
      centered,
      expanded,
      muted: !isMobile && focusedIndex !== null && focusedIndex !== index,
      style: {
        opacity: expanded || isCentering ? 1 : opacity,
        pointerEvents: centeringIndex === null && visible && (selectedIndex === null || selectedIndex === index)
          ? "auto"
          : "none",
        zIndex: expanded || isCentering ? 120 : Math.round((depth + 1) * 30),
        transform: compactSelected
          ? "translate(-50%, -50%) translate3d(0px, 0px, 0) rotateY(0deg) scale(1)"
          : `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0) rotateY(0deg) scale(${expanded ? 1 : scale})`,
      },
    };
  }).sort((a, b) => a.depth - b.depth);

  return (
    <section ref={ref} data-testid="section-neurotype-gallery" className="relative py-24 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />

      <div className="container-geniq relative z-10 mb-8 sm:mb-10">
        <div className="reveal text-[11px] uppercase tracking-[0.22em] text-white/45 mb-4">{homeSections.gallery.eyebrow}</div>
        <h2 className="reveal text-[32px] sm:text-[42px] lg:text-[48px] font-normal leading-[1.1] text-white mb-5">
          {homeSections.gallery.title} <span className="gradient-text">{homeSections.gallery.accent_title}</span>
        </h2>
        <div className="reveal space-y-5 text-body text-[15px] leading-[1.7]">
          <p>{homeSections.gallery.intro}</p>
          <p className="text-white/55 italic">
            <Link to="/system" className="text-[#B79BE0] hover:text-white transition-colors underline underline-offset-4">
              {homeSections.gallery.link_text}
            </Link>.
          </p>
          <h3 className="text-[24px] sm:text-[30px] font-medium pt-4"><span className="gradient-text">{homeSections.gallery.foundation_title}</span></h3>
          <p>{homeSections.gallery.foundation_text}</p>
          <div className="rounded-[24px] border border-[#764CB0]/35 bg-[#764CB0]/8 p-5 sm:p-7">
            <p className="text-[17px] sm:text-[20px] leading-[1.65] text-white/84">
              {homeSections.gallery.system_lead}
            </p>
            <p className="mt-4 border-l-2 border-[#B79BE0]/70 pl-4 text-[14px] sm:text-[15px] text-white/65">
              {homeSections.gallery.system_details}
            </p>
          </div>
          <p>{homeSections.gallery.author_note}</p>
          <h3 className="text-[24px] sm:text-[30px] font-medium pt-4"><span className="gradient-text">{homeSections.gallery.personal_title}</span></h3>
          <p>{homeSections.gallery.personal_text}</p>
          <p>{homeSections.gallery.personal_note}</p>
          <h3 className="gradient-text text-[24px] sm:text-[30px] font-medium pt-4">{homeSections.gallery.types_title}</h3>
          <p className="rounded-[24px] border border-white/10 bg-white/[0.025] p-5 sm:p-6 text-[16px] sm:text-[18px] leading-[1.7] text-white/76">
            {homeSections.gallery.types_text}
          </p>
        </div>
      </div>

      <div
        ref={stageRef}
        className="reveal relative orbit-stage"
        onClick={() => {
          setSelectedIndex(null);
        }}
      >
        <div className="orbit-track">
          {cards.map(({ type, index, style, expanded, centered, muted }) => (
            <OrbitCard
              key={type.code}
              type={type}
              style={style}
              expanded={expanded}
              muted={muted}
              onSelect={() => {
                if (!centered) {
                  centerCard(index, "select");
                  return;
                }

                setSelectedIndex((current) => {
                  return current === index ? null : index;
                });
              }}
            />
          ))}
        </div>

        <button type="button" className="orbit-nav orbit-nav-prev" aria-label="Предыдущий нейротип" onClick={(event) => { event.stopPropagation(); moveBy(-1); }}>‹</button>
        <button type="button" className="orbit-nav orbit-nav-next" aria-label="Следующий нейротип" onClick={(event) => { event.stopPropagation(); moveBy(1); }}>›</button>

        <div
          className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 pointer-events-none z-20"
          style={{ background: "linear-gradient(to right, #0C0A18, rgba(12, 10, 24, 0.82), transparent)" }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 pointer-events-none z-20"
          style={{ background: "linear-gradient(to left, #0C0A18, rgba(12, 10, 24, 0.82), transparent)" }}
        />
      </div>

      <div className="container-geniq mt-7 text-center reveal">
        <div className="text-white/40 text-[11px] uppercase tracking-[0.2em]">
          {selectedIndex !== null
            ? "Карусель остановлена · карточка раскрыта"
            : "Листайте стрелками · нажмите карточку, чтобы раскрыть"}
        </div>
      </div>
    </section>
  );
};

export default NeurotypeGallery;
