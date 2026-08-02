import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BatteryLow,
  Brain,
  Heart,
  MessageCircle,
  Siren,
  Sparkles,
  Star,
  Wrench,
  Zap,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CtaButton from "@/components/CtaButton";
import LensSvg from "@/components/LensSvg";
import EditableMedia from "@/components/EditableMedia";
import { NEUROTYPE_COLORS } from "@/lib/constants";
import { NEUROTYPE_AVATARS } from "@/lib/neurotypeAssets";
import siteContent from "@/content/site.json";
import neurotypesPage from "@/content/neurotypes-page.json";

const WORLD_ICONS = { brain: Brain, heart: Heart, wrench: Wrench };
const WORLDS = Object.fromEntries(neurotypesPage.worlds.map((world) => [world.code, { ...world, Icon: WORLD_ICONS[world.icon] }]));

const MATRIX = neurotypesPage.matrix.rows.map((row) => [row.world, row.mode_1, row.mode_2, row.mode_3]);
const NEUROTYPE_SUMMARIES = Object.fromEntries(
  neurotypesPage.summaries.map((item) => [item.code, item.text]),
);
const NEUROTYPES = neurotypesPage.neurotypes;

const useReveal = () => {
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); });
    }, { threshold: 0.08 });
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
};

const NeurotypeCard = ({ item, activeCode, setActiveCode }) => {
  const color = NEUROTYPE_COLORS[item.code] || "#B79BE0";
  const markerColor = item.code === "T2" ? "#747480" : color;
  const isOpen = activeCode === item.code;
  const avatar = NEUROTYPE_AVATARS[item.code];
  const headline = item.formula.charAt(0).toUpperCase() + item.formula.slice(1);
  const highlights = [
    { label: "Суперсила", text: item.superpower, Icon: Zap },
    { label: "Главная ценность", text: item.value, Icon: Star },
  ];
  const narratives = [
    ["Кто это", item.who],
    ["Таланты", item.talents],
    ["Как выглядит со стороны", item.look],
  ];
  const stateCards = [
    { label: "Заряжает", text: item.charge, Icon: Heart, tone: "charge" },
    { label: "Истощает", text: item.drain, Icon: BatteryLow, tone: "drain" },
    { label: "В стрессе", text: item.stress, Icon: Siren, tone: "stress" },
    { label: "Типичные вопросы", text: item.questions, Icon: MessageCircle, tone: "questions" },
  ];

  return (
    <details
      data-testid={`neurotype-${item.code}`}
      className="neurotype-accordion group animate-in fade-in duration-300"
      style={{ "--nt-color": markerColor }}
      open={isOpen}
    >
      <summary
        className="neurotype-accordion-summary list-none [&::-webkit-details-marker]:hidden cursor-pointer"
        onClick={(event) => {
          event.preventDefault();
          setActiveCode((current) => current === item.code ? null : item.code);
        }}
      >
        <div className="neurotype-accordion-heading">
          <span className="neurotype-accordion-code" style={{ borderColor: markerColor, color: markerColor }}>
            {item.code}
          </span>
          <div className="neurotype-accordion-title">
            <div>
              <h3>{item.name}</h3>
              <span>режим: {item.mode} · цвет: {item.colorName}</span>
            </div>
            <p className="neurotype-accordion-summary-lead">{NEUROTYPE_SUMMARIES[item.code]}</p>
            <p className="neurotype-accordion-summary-copy">{item.collapsed}</p>
          </div>
          <span className="neurotype-accordion-toggle" aria-hidden="true">
            <span />
            <span />
          </span>
        </div>
      </summary>

      <div className="neurotype-accordion-body animate-in fade-in">
        <div className="neurotype-accordion-avatar" style={{ "--portrait-color": color }}>
          <img
            src={avatar}
            alt={`Нейротип ${item.name}`}
            width="224"
            height="300"
            loading="lazy"
            draggable="false"
          />
        </div>

        <div className="neurotype-accordion-content">
          <p className="neurotype-accordion-formula">{headline}</p>

          <div className="neurotype-accordion-highlights">
            {highlights.map(({ label, text, Icon: HighlightIcon }) => (
              <div key={label}>
                <HighlightIcon aria-hidden="true" />
                <span>{label}</span>
                <p>{text}</p>
              </div>
            ))}
          </div>

          <div className="neurotype-accordion-narratives">
            {narratives.map(([label, text]) => (
              <div key={label}>
                <span>{label}</span>
                <p>{text}</p>
              </div>
            ))}
          </div>

          <div className="neurotype-accordion-states">
            {stateCards.map(({ label, text, Icon: StateIcon, tone }) => (
              <div key={label} className={`neurotype-state neurotype-state--${tone}`}>
                <StateIcon aria-hidden="true" />
                <span>{label}</span>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </details>
  );
};

export default function Neurotypes() {
  useReveal();
  const [activeWorld, setActiveWorld] = useState("S");
  const [activeType, setActiveType] = useState(null);
  const world = WORLDS[activeWorld];
  const Icon = world.Icon;
  const activeTypes = NEUROTYPES.filter((type) => type.world === activeWorld);

  return (
    <div data-testid="neurotypes-page" className="min-h-screen relative">
      <Header />
      <main className="pt-52 sm:pt-56 pb-24 container-geniq relative">
        <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />

        <section className="grid lg:grid-cols-[6fr_6fr] gap-8 lg:gap-10 items-center mb-20">
          <div className="reveal">
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/45 mb-5">{neurotypesPage.hero.eyebrow}</div>
            <h1 className="text-[40px] sm:text-[56px] lg:text-[64px] font-normal text-white leading-[1.05] mb-7">
              {neurotypesPage.hero.title} <span className="gradient-text">{neurotypesPage.hero.accent_title}</span>
            </h1>
            <div className="space-y-5 text-body text-[15.5px] sm:text-[16.5px] leading-[1.75] max-w-[780px]">
              <p className="text-white/88 text-[19px] sm:text-[22px] leading-[1.55]">{neurotypesPage.hero.lead}</p>
              {neurotypesPage.hero.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <blockquote className="rounded-[24px] border-l-2 border-[#B79BE0] bg-[#764CB0]/8 px-5 py-4 text-white/82 text-[18px] sm:text-[21px] leading-[1.55]">
                {neurotypesPage.hero.quote}
              </blockquote>
              <p>{neurotypesPage.hero.tool_text}</p>
              <div className="rounded-[28px] border border-[#764CB0]/40 bg-white/[0.025] p-5 sm:p-7">
                <p className="gradient-text text-[22px] sm:text-[30px] leading-[1.25]">{neurotypesPage.hero.formula}</p>
                <p className="mt-4 text-[14px] sm:text-[15.5px] leading-[1.7] text-white/62">{neurotypesPage.hero.formula_text}</p>
              </div>
              <p>
                Подробнее о том, как работает система — в разделе{" "}
                <Link to="/system" className="text-[#B79BE0] hover:text-white transition-colors underline underline-offset-4">
                  {neurotypesPage.hero.system_link_text}
                </Link>.
              </p>
            </div>
          </div>
          <div className="reveal relative min-h-[560px] sm:min-h-[680px] lg:min-h-[760px] flex items-center justify-center">
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(118,76,176,0.16), transparent 60%)" }}
            />
            {siteContent.media.neurotypes_animation ? (
              <EditableMedia
                src={siteContent.media.neurotypes_animation}
                alt={neurotypesPage.hero.media_alt}
                className="w-full h-full object-contain"
              />
            ) : (
              <LensSvg />
            )}
          </div>
        </section>

        <section className="mb-24 reveal">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles size={20} className="text-[#B79BE0]" strokeWidth={1.5} />
              <div className="text-[11px] uppercase tracking-[0.22em] text-white/45">{neurotypesPage.matrix.eyebrow}</div>
            </div>
            <h2 className="text-white text-[28px] sm:text-[36px] font-normal">
              {neurotypesPage.matrix.title} <span className="gradient-text">{neurotypesPage.matrix.accent_title}</span>
            </h2>
          </div>
          <div className="geniq-glass rounded-[28px] p-6 sm:p-8 overflow-x-auto overflow-y-hidden sm:overflow-visible">
            <table className="w-full min-w-[620px] text-left">
              <thead>
                <tr className="border-b border-white/10 text-white/50 text-[11px] uppercase tracking-[0.18em]">
                  <th className="py-3 pr-4">Мир</th>
                  <th className="py-3 px-4">Режим 1</th>
                  <th className="py-3 px-4">Режим 2</th>
                  <th className="py-3 pl-4">Режим 3</th>
                </tr>
              </thead>
              <tbody>
                {MATRIX.map((row) => (
                  <tr key={row[0]} className="border-b border-white/5">
                    {row.map((cell, index) => {
                      const code = index === 0 ? null : cell.split(" ")[0];
                      return (
                        <td
                          key={cell}
                          className={`py-4 text-[14px] ${index === 0 ? "text-[#B79BE0] pr-4" : "px-4"}`}
                          style={code ? { color: NEUROTYPE_COLORS[code] } : undefined}
                        >
                          {cell}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-24">
          <div className="reveal mb-8">
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/45 mb-4">{neurotypesPage.catalog.eyebrow}</div>
            <h2 className="text-[28px] sm:text-[36px] font-normal text-white leading-[1.15]">
              {neurotypesPage.catalog.title} <span className="gradient-text">{neurotypesPage.catalog.accent_title}</span>
            </h2>
          </div>

          <div className="reveal flex flex-wrap gap-2 mb-8">
            {Object.values(WORLDS).map((w) => (
              <button
                key={w.code}
                onClick={() => {
                  setActiveWorld(w.code);
                  setActiveType(null);
                }}
                data-testid={`world-tab-${w.code}`}
                className={`px-5 py-3 rounded-full border text-[12px] uppercase tracking-[0.18em] transition-all ${
                  activeWorld === w.code
                    ? "border-[#B79BE0] text-white bg-[#764CB0]/20"
                    : "border-white/10 text-white/55 hover:text-white"
                }`}
              >
                {w.title}
              </button>
            ))}
          </div>

          <div className="reveal geniq-glass rounded-[28px] p-7 sm:p-9 mb-8">
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-full border border-[#764CB0]/60 bg-black/40 flex items-center justify-center shrink-0">
                <Icon size={22} strokeWidth={1.4} className="text-[#B79BE0]" />
              </div>
              <div>
                <h3 className="text-white text-[24px] font-medium mb-3">{world.title}</h3>
                <p className="text-[#B79BE0] text-[15px] leading-[1.6] mb-3">{world.lead}</p>
                <p className="text-body text-[14.5px] leading-[1.75] mb-3">{world.text}</p>
                <p className="text-white/55 text-[13.5px] leading-[1.65]">{world.inside}</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            {activeTypes.map((type) => (
              <NeurotypeCard
                key={type.code}
                item={type}
                activeCode={activeType}
                setActiveCode={setActiveType}
              />
            ))}
          </div>
        </section>

        <section className="mb-24 reveal">
          <div className="geniq-glass rounded-[32px] p-8 sm:p-12">
            <h2 className="text-[26px] sm:text-[34px] font-normal text-white leading-[1.15] mb-6">
              {neurotypesPage.multiple.title} <span className="gradient-text">{neurotypesPage.multiple.accent_title}</span>
            </h2>
            <div className="space-y-4 text-body text-[15px] leading-[1.75]">
              {neurotypesPage.multiple.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
        </section>

        <section className="mb-24 reveal">
          <div className="geniq-glass rounded-[32px] p-10 sm:p-14 text-center relative overflow-hidden">
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
                 style={{ background: "radial-gradient(circle, rgba(118,76,176,0.18), transparent 60%)" }} />
            <h2 className="text-[26px] sm:text-[34px] font-normal text-white leading-[1.2] max-w-2xl mx-auto mb-7 relative z-10">
              {neurotypesPage.cta.title}
            </h2>
            <p className="text-body text-[15px] leading-[1.7] max-w-2xl mx-auto mb-8 relative z-10">
              {neurotypesPage.cta.text}
            </p>
            <div className="flex items-center justify-center relative z-10">
              <CtaButton testId="nt-test-cta">{neurotypesPage.cta.button}</CtaButton>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
