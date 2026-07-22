import React, { useState, useEffect, useRef } from "react";
import {
  Hexagon, ChevronsRight, Flame, Flower2, Sparkles,
  Brain, FlaskConical, Database, Sun, Heart, Activity, MessageCircleHeart,
  Plus, X,
} from "lucide-react";
import { TELEGRAM_URL } from "@/lib/constants";

/* ---------- Data ---------- */

const AXES_DATA = {
  CORE: {
    code: "CORE",
    sub: "ваше мировосприятие",
    full: "Ваше мировосприятие",
    Icon: Hexagon,
    color: "#B79BE0",
    size: { rx: 110, ry: 100 },
    pos: { x: 280, y: 145 },
    desc: "Здесь живут ваши принципы, убеждения и фильтр реальности.",
    params: [
      { label: "Когнитивный нейротип", description: "Ваш базовый процессор: как вы воспринимаете и обрабатываете реальность.", parts: ["1 из 9 нейротипов"], Icon: Brain },
      { label: "Чувствительная зона тела", description: "Через какую телесную зону вы первой считываете реальность.", Icon: Heart },
      { label: "Чувствительная зона мозга", description: "Какие нейросети включаются первыми.", Icon: Activity },
      { label: "Тип памяти", description: "Как вы запоминаете, храните и извлекаете информацию.", Icon: Database },
      { label: "Интуитивная обработка", description: "Как работает ваша бессознательная система решений и насколько вы опираетесь на чутьё.", Icon: Sun },
      { label: "Тип анализа", description: "Через что к вам приходит понимание.", parts: ["Логика", "Образ", "Мозаика", "Сенсорика"], Icon: FlaskConical },
      { label: "Реализация", description: "В каких условиях вы раскрываетесь и через что воплощаете себя.", Icon: MessageCircleHeart },
    ],
  },
  ACTION: {
    code: "ACTION",
    sub: "ваши сильные навыки",
    full: "Ваши сильные навыки",
    Icon: ChevronsRight,
    color: "#B79BE0",
    size: { rx: 88, ry: 78 },
    pos: { x: 165, y: 410 },
    desc: "Поведение, темп, стиль действия — то, что даёт реальный результат.",
    params: [
      { label: "Нейротип действия", description: "Каким способом вы сильнее всего достигаете результата.", Icon: Brain },
      { label: "Профиль навыков", description: "Какие навыки формируют ваш способ действия.", parts: ["Ведущие навыки", "Поддерживающие навыки", "Навыки роста"], Icon: FlaskConical },
      { label: "Профиль действия", description: "Как именно устроен ваш рабочий способ движения к результату.", parts: ["Ритм: структура / поток", "Темп", "Формат: автономно / в команде", "Фокус"], Icon: Activity },
      { label: "Среда реализации", description: "Условия, где ваше действие раскрывается.", Icon: Sun },
      { label: "Сферы и форматы", description: "Где ваши навыки реально востребованы.", Icon: Database },
      { label: "Что усиливает и что мешает", description: "Условия силы и условия срыва.", Icon: Heart },
      { label: "Правило реализации", description: "Короткая формула движения к цели.", Icon: MessageCircleHeart },
    ],
  },
  DRIVE: {
    code: "DRIVE",
    sub: "что вами движет",
    full: "Что вами движет",
    Icon: Flame,
    color: "#B79BE0",
    size: { rx: 88, ry: 78 },
    pos: { x: 395, y: 410 },
    desc: "Источник энергии и мотивации.",
    params: [
      { label: "Драйверы", description: "Топливо мотивации на 3 уровнях.", parts: ["Опора — важно сейчас", "Движение — тянет в будущем", "Предназначение — глубинный смысл"], Icon: Sun },
      { label: "Условия и механизм включения", description: "Что снаружи запускает вашу мотивацию и что при этом происходит внутри.", Icon: Brain },
      { label: "Творчество / поток", description: "Занятия, после которых энергии становится больше, а не меньше.", Icon: Sparkles },
      { label: "Целеполагание", description: "На каком горизонте вам комфортно двигаться к цели и как он устроен.", Icon: Activity },
    ],
  },
  RECOVERY: {
    code: "RECOVERY",
    sub: "как вы восстанавливаетесь",
    full: "Как восстанавливаетесь",
    Icon: Flower2,
    color: "#B79BE0",
    size: { rx: 110, ry: 95 },
    pos: { x: 280, y: 685 },
    desc: "Ресурс и условия отдыха.",
    params: [
      { label: "Восстановление каждой оси", description: "Как восстанавливать энергию на уровне мышления, мотивации и действий.", parts: ["CORE", "DRIVE", "ACTION"], Icon: Heart },
      { label: "Индивидуальные способы отдыха", description: "Какие способы отдыха подходят именно вашей конфигурации.", Icon: Sun },
      { label: "Хобби как источник энергии", description: "Какие занятия помогают энергии накапливаться, а не уходить в ноль.", Icon: Sparkles },
      { label: "Окружение", description: "Какое окружение восстанавливает, а не истощает.", Icon: MessageCircleHeart },
      { label: "Оптимальный ритм активности", description: "Ваш индивидуальный биоритм.", Icon: Activity },
    ],
  },
  SHADOW: {
    code: "SHADOW",
    sub: "что скрыто и сдерживает",
    full: "Что скрыто и сдерживает",
    Icon: Hexagon,
    color: "#B79BE0",
    size: { rx: 100, ry: 86 },
    pos: { x: 280, y: 945 },
    desc: "Теневые паттерны и слепые зоны.",
    params: [
      { label: "Нейротипы делегирования", description: "Какие задачи лучше передавать другим нейротипам.", Icon: Brain },
      { label: "Искажения мышления", description: "Какие мыслительные искажения влияют на ваши решения.", Icon: FlaskConical },
      { label: "Ложные мотивы и интроекты", description: "Какие чужие установки могут восприниматься как собственные мотивы.", Icon: Activity },
      { label: "Непринятые и травмированные части", description: "Какие части себя вы подавляете, избегаете или пока не умеете использовать.", Icon: Heart },
      { label: "Автоматические реакции в стрессе", description: "Какие повторяющиеся сценарии включаются в напряжении.", Icon: Hexagon },
    ],
  },
};

const LINKS = [
  ["CORE", "ACTION"],
  ["CORE", "DRIVE"],
  ["ACTION", "RECOVERY"],
  ["DRIVE", "RECOVERY"],
  ["RECOVERY", "SHADOW"],
];

const SCHEMA_AXES_DATA = {
  CORE: { ...AXES_DATA.CORE, size: { rx: 112, ry: 112 }, pos: { x: 280, y: 128 } },
  ACTION: { ...AXES_DATA.ACTION, size: { rx: 88, ry: 88 }, pos: { x: 168, y: 400 } },
  DRIVE: { ...AXES_DATA.DRIVE, size: { rx: 88, ry: 88 }, pos: { x: 392, y: 400 } },
  RECOVERY: { ...AXES_DATA.RECOVERY, size: { rx: 112, ry: 112 }, pos: { x: 280, y: 710 } },
  SHADOW: { ...AXES_DATA.SHADOW, size: { rx: 94, ry: 94 }, pos: { x: 280, y: 1018 } },
};

/* ---------- Helpers ---------- */
const useReveal = () => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); });
    }, { threshold: 0.08 });
    el.querySelectorAll(".reveal").forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, []);
  return ref;
};

/* Edge intersection of an ellipse — used so connector lines start at the ring, not the centre. */
const edgePoint = (from, to) => {
  const dx = to.pos.x - from.pos.x;
  const dy = to.pos.y - from.pos.y;
  const angle = Math.atan2(dy, dx);
  const a = from.size.rx;
  const b = from.size.ry;
  // parametric ellipse edge in direction (cos, sin)
  const t = 1 / Math.sqrt((Math.cos(angle) / a) ** 2 + (Math.sin(angle) / b) ** 2);
  return { x: from.pos.x + Math.cos(angle) * t, y: from.pos.y + Math.sin(angle) * t };
};

/* ---------- Axis node ---------- */
const AxisNode = ({ axis, active, hovered, onClick, onMouseEnter, onMouseLeave }) => {
  const { code, sub, Icon, color, size, pos } = axis;
  const isActive = active === code;
  const isHot = isActive || hovered === code;

  // Code text size proportional to oval
  const codeFs = Math.round(size.ry * 0.16);
  const subFs = Math.round(size.ry * 0.085);
  const iconSize = Math.round(size.ry * 0.34);

  return (
    <g
      data-testid={`axis-node-${code}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ cursor: "pointer", transition: "all 0.4s ease" }}
    >
      {/* Outer faint glow ring */}
      <ellipse
        cx={pos.x}
        cy={pos.y}
        rx={size.rx + 14}
        ry={size.ry + 14}
        fill="none"
        stroke={color}
        strokeOpacity={isHot ? 0.25 : 0.1}
        strokeWidth="0.8"
      />
      {/* Middle ring */}
      <ellipse
        cx={pos.x}
        cy={pos.y}
        rx={size.rx + 6}
        ry={size.ry + 6}
        fill="none"
        stroke={color}
        strokeOpacity={isHot ? 0.45 : 0.22}
        strokeWidth="0.6"
        strokeDasharray="2 4"
      />
      {/* Main ring */}
      <ellipse
        cx={pos.x}
        cy={pos.y}
        rx={size.rx}
        ry={size.ry}
        fill="rgba(8,6,18,0.55)"
        stroke={color}
        strokeOpacity={isHot ? 1 : 0.7}
        strokeWidth={isHot ? "2.2" : "1.4"}
        style={{ filter: isHot ? `drop-shadow(0 0 16px ${color})` : `drop-shadow(0 0 6px ${color}66)` }}
      />
      {/* Inner subtle glow */}
      <ellipse
        cx={pos.x}
        cy={pos.y}
        rx={size.rx * 0.65}
        ry={size.ry * 0.65}
        fill={`${color}1a`}
      />

      {/* Icon (foreign object so we can use lucide SVG component) */}
      <foreignObject
        x={pos.x - iconSize / 2}
        y={pos.y - size.ry * 0.55}
        width={iconSize}
        height={iconSize}
        style={{ pointerEvents: "none" }}
      >
        <div xmlns="http://www.w3.org/1999/xhtml" style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={iconSize - 2} strokeWidth={1.4} color={color} />
        </div>
      </foreignObject>

      {/* Code */}
      <text
        x={pos.x}
        y={pos.y + size.ry * 0.05}
        textAnchor="middle"
        fill="#ffffff"
        fontSize={codeFs}
        fontWeight="500"
        fontFamily="Montserrat"
        letterSpacing="2"
        style={{ pointerEvents: "none" }}
      >
        {code}
      </text>

      {/* Subtitle */}
      {sub.split(/\s+/).reduce((acc, word, i, arr) => {
        // simple two-line wrap if needed
        if (arr.length <= 3) acc.push(arr.join(" "));
        else if (i === 0) acc.push(arr.slice(0, Math.ceil(arr.length / 2)).join(" "));
        else if (i === Math.ceil(arr.length / 2)) acc.push(arr.slice(Math.ceil(arr.length / 2)).join(" "));
        return acc;
      }, []).filter((v, i, a) => a.indexOf(v) === i).map((line, idx) => (
        <text
          key={idx}
          x={pos.x}
          y={pos.y + size.ry * 0.28 + idx * (subFs + 2)}
          textAnchor="middle"
          fill="rgba(255,255,255,0.6)"
          fontSize={subFs}
          fontFamily="Montserrat"
          style={{ pointerEvents: "none" }}
        >
          {line}
        </text>
      ))}
    </g>
  );
};

/* ---------- Connector line ---------- */
const Connector = ({ from, to, active, hovered, axes = AXES_DATA }) => {
  const A = axes[from];
  const B = axes[to];
  const startA = edgePoint(A, B);
  const startB = edgePoint(B, A);
  const isHot = hovered === from || hovered === to || active === from || active === to;

  return (
    <g data-testid={`link-${from}-${to}`}>
      <line
        x1={startA.x}
        y1={startA.y}
        x2={startB.x}
        y2={startB.y}
        stroke="#B79BE0"
        strokeOpacity={isHot ? 0.85 : 0.32}
        strokeWidth={isHot ? "1.6" : "0.9"}
        style={{ transition: "all 0.4s ease", filter: isHot ? "drop-shadow(0 0 4px #B79BE0)" : "none" }}
      />
      {/* End-cap glowing dots */}
      <circle cx={startA.x} cy={startA.y} r="2.5" fill="#fff" opacity={isHot ? 1 : 0.7}>
        {isHot && <animate attributeName="r" values="2.5;4;2.5" dur="1.6s" repeatCount="indefinite" />}
      </circle>
      <circle cx={startB.x} cy={startB.y} r="2.5" fill="#fff" opacity={isHot ? 1 : 0.7}>
        {isHot && <animate attributeName="r" values="2.5;4;2.5" dur="1.6s" repeatCount="indefinite" />}
      </circle>
    </g>
  );
};

/* ---------- Right detail panel ---------- */
const DetailPanel = ({ axis }) => {
  const { code, full, params } = axis;

  return (
    <div data-testid="code-map-detail" className="geniq-glass rounded-[28px] p-7 sm:p-9 relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative w-12 h-12 rounded-full border border-[#B79BE0]/50 flex items-center justify-center bg-black/40">
          <div className="absolute inset-2 rounded-full border border-[#B79BE0]/40" />
          <div className="absolute inset-[14px] rounded-full bg-[#B79BE0]" />
        </div>
        <div className="flex items-baseline gap-3 flex-wrap">
          <span className="text-white text-[28px] font-medium tracking-wide">{code}</span>
          <span className="text-white/40 text-[20px]">·</span>
          <span className="text-[#B79BE0] text-[18px] sm:text-[20px]">{full}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-body text-[15px] leading-[1.7] mb-7">{axis.desc}</p>

      {/* FAQ-like parameter accordions */}
      <div className="rounded-2xl border border-white/8 bg-black/30 divide-y divide-white/5 mb-7 overflow-hidden">
        {params.map((p, i) => {
          const ParamIcon = p.Icon;
          return (
            <details
              key={p.label}
              data-testid={`param-${code}-${i}`}
              className="group"
            >
              <summary className="list-none [&::-webkit-details-marker]:hidden hover:bg-[#764CB0]/8 transition-colors cursor-pointer">
                <span className="flex items-center gap-4 px-5 py-4">
                  <ParamIcon size={16} strokeWidth={1.5} className="text-[#B79BE0]/80 shrink-0" />
                  <span className="flex-1 text-white/82 text-[13.5px] leading-snug">{p.label}</span>
                  <Plus
                    size={15}
                    strokeWidth={1.5}
                    className="text-[#B79BE0]/70 shrink-0 transition-transform duration-200 group-open:rotate-45"
                    aria-hidden="true"
                  />
                </span>
              </summary>
              <div className="mx-5 pb-4 pl-8 border-t border-white/5 pt-3">
                <p className="text-body text-[13px] leading-[1.7]">{p.description}</p>
                {p.parts?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {p.parts.map((part) => (
                      <span
                        key={part}
                        className="rounded-full border border-[#764CB0]/35 bg-[#764CB0]/10 px-3 py-1.5 text-[11px] leading-snug text-[#C9B0F0]"
                      >
                        {part}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </details>
          );
        })}
      </div>

      {/* CTA */}
      <div>
        <a
          href={TELEGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="code-map-test-cta"
          className="flex w-full items-center justify-center gap-2 h-12 rounded-full bg-[#764CB0] hover:bg-[#8A5DCC] transition-all text-white text-[13px] font-medium"
          style={{ boxShadow: "0 8px 30px -8px rgba(118,76,176,0.7)" }}
        >
          <Sparkles size={15} strokeWidth={1.7} />
          Пройти диагностику
        </a>
      </div>
    </div>
  );
};

const AxisPills = ({ active, setActive, setHovered, className = "" }) => (
  <div className={`flex flex-wrap gap-2 ${className}`}>
    {Object.values(AXES_DATA).map((a) => (
      <button
        key={a.code}
        data-testid={`axis-pill-${a.code}`}
        onClick={() => {
          setHovered(null);
          setActive(a.code);
        }}
        onPointerUp={(event) => {
          if (event.pointerType !== "mouse") {
            setHovered(null);
            setActive(a.code);
          }
        }}
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") setHovered(a.code);
        }}
        onPointerLeave={(event) => {
          if (event.pointerType === "mouse") setHovered(null);
        }}
        className={`touch-manipulation px-3 py-2 rounded-full text-[11px] uppercase tracking-[0.18em] border transition-all ${
          active === a.code
            ? "border-[#B79BE0] text-white bg-[#764CB0]/15"
            : "border-white/10 text-white/55 hover:text-white"
        }`}
      >
        {a.code}
      </button>
    ))}
  </div>
);

/* ---------- Main section ---------- */
export const CodeMapSection = () => {
  const ref = useReveal();
  const desktopSceneRef = useRef(null);
  const desktopOpenTimerRef = useRef(null);
  const desktopScrollCleanupRef = useRef(null);
  const [active, setActive] = useState("CORE");
  const [hovered, setHovered] = useState(null);
  const [desktopPinned, setDesktopPinned] = useState(null);
  const [desktopPanelPlacement, setDesktopPanelPlacement] = useState("center");
  const cur = AXES_DATA[active];
  const desktopCode = hovered || desktopPinned;

  // SVG dimensions chosen so all 5 ovals fit inside the user's working viewport
  const VB_W = 560;
  const VB_H = 1160;

  useEffect(() => () => {
    if (desktopOpenTimerRef.current) window.clearTimeout(desktopOpenTimerRef.current);
    if (desktopScrollCleanupRef.current) desktopScrollCleanupRef.current();
  }, []);

  useEffect(() => {
    const scene = desktopSceneRef.current;
    if (!scene) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || entry.intersectionRatio < 0.15) {
        setHovered(null);
        setDesktopPinned(null);
      }
    }, { threshold: [0, 0.15] });

    observer.observe(scene);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!desktopCode) return undefined;

    const openedAt = window.scrollY;
    const closeAfterLeavingAxis = () => {
      const section = ref.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrolledDown = window.scrollY > openedAt + 36;
      const scrolledUp = window.scrollY < openedAt - 80;
      const nextSectionIsVisible = rect.bottom <= window.innerHeight * 1.08;
      const codeMapIsAboveViewport = rect.bottom <= 110;
      const codeMapIsBelowViewport = rect.top >= window.innerHeight * 0.75;

      if (
        codeMapIsAboveViewport
        || (scrolledDown && nextSectionIsVisible)
        || (scrolledUp && codeMapIsBelowViewport)
      ) {
        setHovered(null);
        setDesktopPinned(null);
      }
    };

    window.addEventListener("scroll", closeAfterLeavingAxis, { passive: true });
    return () => window.removeEventListener("scroll", closeAfterLeavingAxis);
  }, [desktopCode, ref]);

  const handleDesktopAxisClick = (event, code) => {
    event.stopPropagation();
    setHovered(null);

    if (desktopOpenTimerRef.current) window.clearTimeout(desktopOpenTimerRef.current);
    if (desktopScrollCleanupRef.current) desktopScrollCleanupRef.current();
    if (desktopPinned === code) {
      setDesktopPinned(null);
      return;
    }

    const nodeRect = event.currentTarget.getBoundingClientRect();
    const nodeCenter = nodeRect.top + nodeRect.height / 2;
    setDesktopPanelPlacement(nodeCenter < window.innerHeight * 0.43 ? "top" : "center");
    const viewportCenter = (window.innerHeight + 84) / 2;
    const offset = nodeCenter - viewportCenter;

    if (Math.abs(offset) > window.innerHeight * 0.2) {
      setDesktopPinned(null);
      const finishOpening = () => {
        window.removeEventListener("scroll", waitForScrollEnd);
        if (desktopOpenTimerRef.current) window.clearTimeout(desktopOpenTimerRef.current);
        desktopScrollCleanupRef.current = null;
        setDesktopPinned(code);
      };
      const waitForScrollEnd = () => {
        if (desktopOpenTimerRef.current) window.clearTimeout(desktopOpenTimerRef.current);
        desktopOpenTimerRef.current = window.setTimeout(finishOpening, 140);
      };

      desktopScrollCleanupRef.current = () => {
        window.removeEventListener("scroll", waitForScrollEnd);
        if (desktopOpenTimerRef.current) window.clearTimeout(desktopOpenTimerRef.current);
        desktopScrollCleanupRef.current = null;
      };
      window.addEventListener("scroll", waitForScrollEnd, { passive: true });
      window.scrollBy({ top: offset, behavior: "smooth" });
      waitForScrollEnd();
      return;
    }

    setDesktopPinned(code);
  };

  const handleDesktopAxisHover = (event, code) => {
    const nodeRect = event.currentTarget.getBoundingClientRect();
    const nodeCenter = nodeRect.top + nodeRect.height / 2;
    setDesktopPanelPlacement(nodeCenter < window.innerHeight * 0.43 ? "top" : "center");
    setHovered(code);
  };

  return (
    <section ref={ref} data-testid="section-code-map" className="relative py-24 lg:py-16 overflow-visible">
      <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />
      <div className="absolute top-1/4 -right-32 w-[600px] h-[600px] rounded-full pointer-events-none"
           style={{ background: "radial-gradient(circle, rgba(118,76,176,0.18), transparent 60%)" }} />

      <div className="container-geniq relative z-10">
        <div className="reveal max-w-3xl mx-auto text-center mb-10 lg:mb-6">
          <h2 className="text-[40px] sm:text-[56px] lg:text-[64px] font-light leading-[1.02] text-white mb-5 lg:mb-4">
            5 осей <br className="sm:hidden" />GENIQ
          </h2>
          <div className="text-body text-[14.5px] lg:text-[14px] leading-[1.8] lg:leading-[1.65] max-w-2xl mx-auto space-y-3">
            <p className="text-white/82 text-[16px] sm:text-[17px]">
              «9 нейротипов — понятно. Но как это поможет собрать именно мою карту?»
            </p>
            <p>
              1 нейротип — это только ядро. Вы — не 1 тип, а то, как он проявляется в разных частях вашей жизни.
            </p>
            <p className="text-white/72">
              Эти части GENIQ и собирает в карту — через 5 осей.
            </p>
          </div>
        </div>

        {/* Mobile/tablet: keep the current compact controls and detail card */}
        <div className="lg:hidden relative mx-auto w-full">
          <AxisPills
            active={active}
            setActive={setActive}
            setHovered={setHovered}
            className="mb-4"
          />
          <DetailPanel axis={cur} />
        </div>

        {/* Desktop: tall scrollable schema; details appear only on interaction */}
        <div
          ref={desktopSceneRef}
          className="hidden lg:block relative w-screen h-[1170px]"
          style={{ marginLeft: "calc(50% - 50vw)" }}
          onClick={() => setDesktopPinned(null)}
        >
          <div className="relative h-full flex items-start justify-center overflow-hidden">
            <div className="reveal relative flex h-full w-full items-start justify-center">
              <svg
                viewBox={`0 0 ${VB_W} ${VB_H}`}
                className="h-[1150px] w-auto max-w-[94vw]"
                data-testid="code-map-svg"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <radialGradient id="cm-bg-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0" stopColor="#764CB0" stopOpacity="0.18" />
                    <stop offset="1" stopColor="#764CB0" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Background subtle dots */}
                {Array.from({ length: 40 }).map((_, i) => {
                  const x = (i * 137) % VB_W;
                  const y = (i * 211) % VB_H;
                  return <circle key={i} cx={x} cy={y} r="0.7" fill="rgba(183,155,224,0.18)" />;
                })}

                {/* Connectors (rendered before nodes so they sit behind) */}
                {LINKS.map(([a, b]) => (
                  <Connector key={`${a}-${b}`} from={a} to={b} active={desktopCode || ""} hovered={hovered} axes={SCHEMA_AXES_DATA} />
                ))}

                {/* Axes */}
                {Object.values(SCHEMA_AXES_DATA).map((a) => (
                  <AxisNode
                    key={a.code}
                    axis={a}
                    active={desktopCode || ""}
                    hovered={hovered}
                    onClick={(event) => handleDesktopAxisClick(event, a.code)}
                    onMouseEnter={(event) => handleDesktopAxisHover(event, a.code)}
                    onMouseLeave={() => setHovered(null)}
                  />
                ))}
              </svg>
            </div>

            {desktopCode && (
              <div
                className={`fixed right-4 xl:right-[2vw] z-40 w-[min(560px,44vw)] overflow-y-auto pr-1 animate-in fade-in slide-in-from-right-6 duration-300 ${
                  desktopPanelPlacement === "top"
                    ? "top-[104px] translate-y-0 max-h-[calc(100vh-124px)]"
                    : "top-[calc(50%+42px)] -translate-y-1/2 max-h-[calc(100vh-116px)]"
                }`}
                onClick={(event) => event.stopPropagation()}
                onMouseEnter={() => {
                  if (!desktopPinned && hovered) setHovered(hovered);
                }}
              >
                <button
                  type="button"
                  aria-label="Закрыть описание оси"
                  className="absolute right-4 top-4 z-30 w-9 h-9 rounded-full border border-white/10 bg-black/55 flex items-center justify-center text-white/60 hover:text-white hover:border-[#B79BE0]/55 transition-colors"
                  onClick={() => {
                    setHovered(null);
                    setDesktopPinned(null);
                  }}
                >
                  <X size={16} strokeWidth={1.5} />
                </button>
                <DetailPanel axis={AXES_DATA[desktopCode]} />
              </div>
            )}
          </div>
        </div>

        <div className="reveal max-w-4xl mx-auto text-center mt-8 lg:mt-4">
          <p className="text-body text-[15px] leading-[1.75]">
            Нет лучших и худших нейротипов. Нейротип не определяет ваш интеллект, статус или успех. Он показывает одно: как вы устроены — как воспринимаете мир, как работаете и в каких условиях раскрываетесь.
          </p>
          <p className="text-white/82 text-[17px] leading-[1.7] mt-6">
            Всё начинается с конкретных вопросов: какой ваш природный код? В чём вы уникальны?
          </p>
        </div>
      </div>
    </section>
  );
};

export default CodeMapSection;
