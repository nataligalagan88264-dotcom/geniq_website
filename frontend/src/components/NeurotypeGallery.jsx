import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { NEUROTYPE_COLORS } from "@/lib/constants";

/**
 * Neurotype gallery — circular 3D carousel.
 */

const TYPES = [
  { code: "S1", name: "Мыслитель", world: "S", mode: "Генеративный", profs: "учёный · исследователь · философ · методолог", desc: "Глубокое, концептуальное мышление. Раскрывается в исследовании и разработке идей.", strength: "Видеть суть", risk: "Уйти в бесконечное обдумывание" },
  { code: "S2", name: "Оратор", world: "S", mode: "Коммуникативный", profs: "преподаватель · спикер · блогер · эксперт", desc: "Ясно объясняет сложное, влияет через речь. Раскрывается в обучении, выступлениях, контенте.", strength: "Обучение и выступления", risk: "Распыление" },
  { code: "S3", name: "Стратег", world: "S", mode: "Управленческий", profs: "стратег · консультант · аналитик · архитектор систем", desc: "Системное, стратегическое мышление, видит закономерности. Раскрывается в сложных решениях.", strength: "Сложные решения", risk: "Гиперконтроль" },
  { code: "T1", name: "Систематик", world: "T", mode: "Генеративный", profs: "инженер · мастер · специалист · технолог", desc: "Точность, стабильность, внимание к деталям. Раскрывается в процессах и системной работе.", strength: "Процессы и системная работа", risk: "Застревание" },
  { code: "T2", name: "Координатор", world: "T", mode: "Коммуникативный", profs: "менеджер проектов · координатор · организатор", desc: "Организует процессы, гибкий, практичный. Раскрывается в управлении и командах.", strength: "Управление и команды", risk: "Потеря глубины" },
  { code: "T3", name: "Оптимизатор", world: "T", mode: "Управленческий", profs: "управленец · операционный директор · оптимизатор бизнеса", desc: "Эффективность, практическая стратегия. Раскрывается в бизнесе и оптимизации.", strength: "Бизнес и оптимизация", risk: "Жёсткость и перегрев" },
  { code: "E1", name: "Эмпат", world: "E", mode: "Генеративный", profs: "психолог · коуч · терапевт · помогающие профессии", desc: "Высокая чувствительность и эмпатия. Раскрывается в помощи и работе с состояниями.", strength: "Помощь и работа с состояниями", risk: "Перегруз чужими эмоциями" },
  { code: "E2", name: "Артист", world: "E", mode: "Коммуникативный", profs: "актёр · ведущий · артист · креатор · медиа", desc: "Выразительность, харизма, живой контакт. Раскрывается на сцене, в медиа, контенте.", strength: "Сцена, медиа и контент", risk: "Нестабильность" },
  { code: "E3", name: "Драйвер", world: "E", mode: "Управленческий", profs: "предприниматель · лидер · продюсер · основатель", desc: "Энергия, напор, влияние. Раскрывается в лидерстве и запуске.", strength: "Лидерство и запуск", risk: "Давление и выгорание" },
];

const SILHOUETTE_PATHS = [
  "M 70 40 C 55 35, 45 50, 45 75 C 45 90, 48 105, 52 115 C 50 120, 50 128, 55 135 L 55 145 C 50 148, 48 155, 52 162 L 58 170 C 58 175, 60 182, 65 188 C 67 192, 70 195, 70 200 L 70 215 C 60 220, 50 230, 45 245 L 45 280 L 175 280 L 175 260 C 175 245, 165 232, 150 225 C 140 220, 130 215, 125 208 C 122 200, 118 195, 115 188 C 115 178, 118 168, 122 158 C 128 145, 130 130, 128 115 C 132 105, 134 90, 130 75 C 126 55, 110 42, 90 40 Z",
  "M 75 35 C 55 30, 40 45, 38 70 C 36 85, 38 100, 42 112 C 38 118, 36 128, 40 138 L 45 150 C 40 156, 38 165, 42 175 L 50 185 C 50 192, 52 200, 58 205 L 65 215 C 55 222, 42 235, 38 250 C 36 260, 36 270, 38 280 L 175 280 L 175 258 C 175 245, 165 232, 152 225 C 142 220, 132 213, 128 205 C 125 198, 122 192, 120 185 C 122 175, 126 165, 130 155 C 134 145, 136 132, 134 120 C 138 110, 140 95, 138 80 C 134 55, 115 38, 95 36 Z",
  "M 78 38 C 60 36, 48 50, 46 72 C 44 88, 46 102, 50 114 C 48 120, 48 128, 52 135 L 55 145 C 50 150, 48 158, 52 165 L 60 175 C 60 182, 62 190, 68 195 L 72 208 C 62 215, 52 225, 48 240 L 48 280 L 175 280 L 175 258 C 175 245, 166 234, 152 226 C 142 220, 135 215, 130 208 C 126 200, 122 192, 120 185 C 122 175, 126 165, 130 155 C 134 145, 138 130, 136 115 C 140 105, 142 90, 138 78 C 132 55, 115 40, 95 38 Z",
];

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

const OrbitCard = ({ type, index, style, expanded, muted, onActivate, onRelease, onSelect }) => {
  const color = NEUROTYPE_COLORS[type.code];
  const variant = SILHOUETTE_PATHS[type.code.charCodeAt(1) % 3];
  const grad = `orbit-grad-${type.code}-${index}`;
  const filterId = `orbit-glow-${type.code}-${index}`;

  return (
    <button
      type="button"
      data-testid={`portrait-${type.code}`}
      aria-label={`Открыть описание нейротипа ${type.name}`}
      className={`orbit-card ${expanded ? "orbit-card-expanded" : ""} ${muted ? "orbit-card-muted" : ""}`}
      onPointerEnter={onActivate}
      onClick={(event) => {
        event.stopPropagation();
        onSelect();
      }}
      onPointerLeave={onRelease}
      tabIndex={style.pointerEvents === "none" ? -1 : 0}
      style={{ ...style, "--card-color": color }}
    >
      <div
        className="absolute inset-0 overflow-hidden rounded-[20px] border transition-all duration-300"
        style={{
          borderColor: expanded ? color : "rgba(255,255,255,0.08)",
          background: "rgba(8, 8, 15, 0.96)",
          boxShadow: expanded
            ? `0 0 68px -14px ${color}cc, 0 28px 60px rgba(0,0,0,0.62), inset 0 0 38px ${color}1f`
            : `0 20px 54px rgba(0,0,0,0.58), inset 0 0 34px ${color}12`,
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(75% 74% at 50% 34%, ${color}70, transparent 70%),
              linear-gradient(180deg, rgba(255,255,255,0.03), rgba(0,0,0,0.34))
            `,
            opacity: expanded ? 0.9 : 0.74,
          }}
        />
        <div className="absolute inset-0 dot-grid opacity-12 pointer-events-none" />

        <svg
          viewBox="0 0 200 280"
          className={`absolute left-1/2 -translate-x-1/2 top-[12%] h-auto transition-all duration-300 ${expanded ? "w-[39%] max-w-[118px]" : "w-[42%] max-w-[104px]"}`}
        >
          <defs>
            <linearGradient id={grad} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={color} stopOpacity="0.95" />
              <stop offset="1" stopColor={color} stopOpacity="0.35" />
            </linearGradient>
            <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path d={variant} fill={`url(#${grad})`} opacity="0.9" />
          <path d={variant} fill="none" stroke="rgba(0,0,0,0.6)" strokeWidth="0.5" />
          <path d={variant} fill="none" stroke={color} strokeOpacity="0.7" strokeWidth="0.8" filter={`url(#${filterId})`} />
        </svg>

        <div className="absolute left-0 right-0 bottom-0 p-3.5 text-left sm:p-4">
          <div className="text-[9px] uppercase tracking-[0.24em] mb-1.5" style={{ color }}>{type.code}</div>
          <h3 className="text-white text-[15px] sm:text-[16px] font-medium leading-tight">{type.name}</h3>
          <div className="text-white/42 text-[9px] mt-1.5 uppercase tracking-[0.18em]">
            мир {type.world} · {type.mode.slice(0, 4).toLowerCase()}.
          </div>
          <div className="text-white/50 text-[9.5px] mt-2.5 leading-snug">{type.profs}</div>

          {expanded && (
            <div className="mt-3 pt-3 border-t border-white/10 animate-in fade-in duration-200">
              <p className="text-white/82 text-[10.5px] leading-[1.55]">{type.desc}</p>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <div>
                  <div className="text-[8px] uppercase tracking-[0.18em] text-[#7EC8A0]">Сила</div>
                  <div className="text-white/70 text-[9px] leading-tight mt-0.5">{type.strength}</div>
                </div>
                <div>
                  <div className="text-[8px] uppercase tracking-[0.18em] text-[#E78BB8]">Риск</div>
                  <div className="text-white/70 text-[9px] leading-tight mt-0.5">{type.risk}</div>
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
  const [paused, setPaused] = useState(false);
  const [stageHovered, setStageHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [centeringIndex, setCenteringIndex] = useState(null);
  const [angle, setAngle] = useState(0);
  const centeringFrameRef = useRef(null);
  const centeringTargetRef = useRef(null);
  const width = useViewportWidth();
  const isPaused = paused || stageHovered || selectedIndex !== null || centeringIndex !== null;

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

  useEffect(() => {
    if (isPaused) return undefined;
    let frame = 0;
    let last = performance.now();
    const rotate = (time) => {
      const delta = Math.min(time - last, 48);
      last = time;
      setAngle((value) => value + delta * 0.000224);
      frame = requestAnimationFrame(rotate);
    };
    frame = requestAnimationFrame(rotate);
    return () => cancelAnimationFrame(frame);
  }, [isPaused]);

  const isMobile = width < 768;
  const orbitWidth = stageWidth || width;
  const cardWidth = isMobile
    ? Math.min(Math.max(orbitWidth * 0.46, 148), 188)
    : Math.min(Math.max(orbitWidth * 0.105, 132), 176);
  const cardGap = cardWidth * (isMobile ? 0.06 : 0.28);
  const minScale = isMobile ? 0.84 : 0.8;
  const maxVisibleOffset = orbitWidth / 2 / (cardWidth + cardGap) + 1.15;
  const fadeOffset = maxVisibleOffset + (isMobile ? 1.15 : 0.85);
  const verticalArc = isMobile ? 8 : 0;
  const visibilityThreshold = isMobile ? 0.1 : 0.03;
  const cycle = (angle / (Math.PI * 2)) * TYPES.length;

  const centerCard = (index, selectAfterMove = false) => {
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
    setPaused(true);
    setHoveredIndex(null);

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
      if (selectAfterMove) {
        setHoveredIndex(null);
        setSelectedIndex(index);
      } else {
        setHoveredIndex(index);
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
    const expanded = centered && (hoveredIndex === index || selectedIndex === index);
    const isCentering = centeringIndex === index;
    const focusedIndex = centeringIndex ?? hoveredIndex ?? selectedIndex;
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
        pointerEvents: isMobile
          ? (centeringIndex === null && visible && (selectedIndex === null || selectedIndex === index) ? "auto" : "none")
          : (centeringIndex === null && visible && (hoveredIndex === null || hoveredIndex === index) ? "auto" : "none"),
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
        <div className="reveal text-[11px] uppercase tracking-[0.22em] text-white/45 mb-4">GENIQ · Принцип работы</div>
        <h2 className="reveal text-[32px] sm:text-[42px] lg:text-[48px] font-normal leading-[1.1] text-white mb-5 max-w-3xl">
          Как работает <span className="gradient-text">система GENIQ</span>
        </h2>
        <div className="reveal space-y-5 text-body text-[15px] leading-[1.7] max-w-4xl">
          <p>GENIQ рассматривает человека как целостную систему — не один ярлык, а сочетание. В её основе — <strong className="font-medium text-white/85">9 нейротипов</strong>.</p>
          <p className="text-white/55 italic">
            Как именно они складываются — подробнее на странице{" "}
            <Link to="/system" className="text-[#B79BE0] hover:text-white transition-colors underline underline-offset-4">
              «О системе»
            </Link>.
          </p>
          <h3 className="text-white text-[20px] sm:text-[22px] font-medium pt-4">На чём построена система</h3>
          <p>Мир меняется — и люди вместе с ним. Поэтому подход к пониманию своей уникальности и талантов важно собирать под современную реальность, а не подгонять себя под модели прошлого века.</p>
          <p>GENIQ — <strong className="font-medium text-white/85">система нейропрофилирования нового поколения</strong>. Она собрана на сегодняшних данных: современных исследованиях работы мозга, когнитивных науках и новом понимании природы талантов. И не внутри одного подхода или убеждения, а шире — на пересечении нейропсихологии, когнитивных наук и психологии личности.</p>
          <p>Часть опирается на признанные подходы. Но значительная часть — <strong className="font-medium text-white/85">авторские наработки Натали Галаган</strong>, проверенные на сотнях живых диагностик.</p>
          <h3 className="text-white text-[20px] sm:text-[22px] font-medium pt-4">Система под вас — а не вы под систему</h3>
          <p>GENIQ не подгоняет вас под 1 нейротип. Она делает обратное — собирает карту из 9 нейротипов под вашу индивидуальность.</p>
          <p>Это глубже, чем определить 1 тип личности без учёта индивидуальных особенностей. Поэтому работа всегда личная и не массовая.</p>
          <h3 className="text-white text-[20px] sm:text-[22px] font-medium pt-4">9 нейротипов</h3>
          <p>Нейротип — это врождённый способ воспринимать мир и действовать. Их 9, и все разные.</p>
          <p><strong className="font-medium text-white/85">Важно: в вас есть все 9 — но 1 ведущий.</strong> Он задаёт, как вы думаете, в чём ваша сила и где теряете энергию. Остальные дополняют картину.</p>
        </div>
      </div>

      <div
        ref={stageRef}
        className="reveal relative orbit-stage"
        onPointerEnter={(event) => {
          if (event.pointerType !== "mouse") return;
          setStageHovered(true);
        }}
        onPointerLeave={(event) => {
          if (event.pointerType !== "mouse") return;
          cancelAnimationFrame(centeringFrameRef.current);
          centeringTargetRef.current = null;
          setCenteringIndex(null);
          setHoveredIndex(null);
          setSelectedIndex(null);
          setPaused(false);
          setStageHovered(false);
        }}
        onClick={() => {
          setSelectedIndex(null);
          setHoveredIndex(null);
          setPaused(false);
        }}
      >
        <div className="orbit-track">
          {cards.map(({ type, index, style, expanded, centered, muted }) => (
            <OrbitCard
              key={type.code}
              type={type}
              index={index}
              style={style}
              expanded={expanded}
              muted={muted}
              onActivate={(event) => {
                if (event?.pointerType && event.pointerType !== "mouse") return;
                if (centered) {
                  setPaused(true);
                  setHoveredIndex(index);
                } else {
                  centerCard(index);
                }
              }}
              onRelease={(event) => {
                if (event?.pointerType && event.pointerType !== "mouse") return;
                if (centeringTargetRef.current === index) return;
                setHoveredIndex(null);
                setSelectedIndex(null);
                setPaused(false);
              }}
              onSelect={() => {
                if (!centered) {
                  if (isMobile) centerCard(index, true);
                  return;
                }

                setSelectedIndex((current) => {
                  if (current === index) {
                    setHoveredIndex(null);
                    setPaused(false);
                    return null;
                  }
                  setPaused(true);
                  setHoveredIndex(index);
                  return index;
                });
              }}
            />
          ))}
        </div>

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
          {selectedIndex !== null || hoveredIndex !== null
            ? "Карусель остановлена · карточка раскрыта"
            : stageHovered
              ? "Карусель остановлена · выберите карточку"
              : "9 нейротипов · 3 мира × 3 режима"}
        </div>
      </div>
    </section>
  );
};

export default NeurotypeGallery;
