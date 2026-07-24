import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { NEUROTYPE_COLORS } from "@/lib/constants";
import { NEUROTYPE_AVATARS } from "@/lib/neurotypeAssets";

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

const OrbitCard = ({ type, style, expanded, muted, onActivate, onRelease, onSelect }) => {
  const color = NEUROTYPE_COLORS[type.code];
  const avatar = NEUROTYPE_AVATARS[type.code];

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
          <div className="orbit-card-mode">МИР {type.world} · {type.mode.toUpperCase()}</div>
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
    ? Math.min(Math.max(orbitWidth * 0.52, 184), 224)
    : Math.min(Math.max(orbitWidth * 0.2, 232), 312);
  const cardGap = cardWidth * (isMobile ? 0.08 : 0.1);
  const minScale = isMobile ? 0.86 : 0.82;
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
