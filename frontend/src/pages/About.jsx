import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight, Brain, Battery, ChevronsRight, Flower2, Eye,
  Layers, Sparkles,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CtaButton from "@/components/CtaButton";
import BasketSvg from "@/components/BasketSvg";
import EditableMedia from "@/components/EditableMedia";
import siteContent from "@/content/site.json";
import aboutContent from "@/content/about.json";
import { NEUROTYPE_COLORS } from "@/lib/constants";

const AXIS_ICONS = {
  brain: Brain,
  battery: Battery,
  "chevrons-right": ChevronsRight,
  flower: Flower2,
  eye: Eye,
};
const WORLD_ICONS = { brain: Brain, sparkles: Sparkles, layers: Layers };
const AXES = aboutContent.axes.map((axis) => ({ ...axis, Icon: AXIS_ICONS[axis.icon] }));
const WORLDS = aboutContent.worlds.map((world) => ({ ...world, Icon: WORLD_ICONS[world.icon] }));
const MODES = aboutContent.modes;
const MATRIX = aboutContent.matrix.rows.map((row) => [row.world, row.mode_1, row.mode_2, row.mode_3]);
const NEUROTYPES = Object.fromEntries(aboutContent.matrix.neurotypes.map((item) => [item.code, item]));

const getNeurotypeDisplayColor = (code) => (
  code === "T2" ? "#A7A6AD" : NEUROTYPE_COLORS[code]
);

const useReveal = () => {
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); });
    }, { threshold: 0.1 });
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
};

export default function About() {
  useReveal();
  const [activeNeurotype, setActiveNeurotype] = useState("S1");

  return (
    <div data-testid="about-page" className="min-h-screen relative">
      <Header />
      <main className="pt-52 sm:pt-56 pb-24 container-geniq relative">
        <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />

        <section className="max-w-4xl mx-auto mb-20 reveal text-center">
          <div className="text-[11px] uppercase tracking-[0.22em] text-white/45 mb-5">{aboutContent.hero.eyebrow}</div>
          <h1 className="text-[40px] sm:text-[56px] lg:text-[64px] font-normal text-white leading-[1.05]">
            <span className="gradient-text">{aboutContent.hero.title}</span> {aboutContent.hero.title_suffix}
          </h1>
        </section>

        <section data-testid="section-basket-metaphor" className="mb-16 sm:mb-20 reveal">
          <div className="grid lg:grid-cols-[6.5fr_5.5fr] gap-8 lg:gap-10 items-start">
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-white/45 mb-5">{aboutContent.basket.eyebrow}</div>
              <h2 className="text-[28px] sm:text-[36px] font-normal text-white leading-[1.15] mb-6">
                {aboutContent.basket.title} <span className="gradient-text">{aboutContent.basket.accent_title}</span>
              </h2>
              <div className="space-y-5 text-body text-[15.5px] leading-[1.75]">
                {aboutContent.basket.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <div className="grid sm:grid-cols-3 gap-3 mt-8">
                {aboutContent.basket.cards.map((item, index) => (
                  <div key={item} className="rounded-2xl border border-white/8 bg-black/20 px-4 py-4">
                    <div className="text-[#B79BE0] text-[11px] tracking-[0.18em] mb-2">0{index + 1}</div>
                    <div className="text-white/85 text-[13px] leading-[1.45]">{item}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative lg:-mt-10 lg:-translate-x-5 min-h-[620px] flex items-start justify-center">
              <div
                className="absolute -inset-8 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(118,76,176,0.14), transparent 60%)" }}
              />
              {siteContent.media.about_animation ? (
                <EditableMedia
                  src={siteContent.media.about_animation}
                  alt={aboutContent.basket.media_alt}
                  className="w-full h-full object-contain"
                />
              ) : (
                <BasketSvg />
              )}
            </div>
          </div>
        </section>

        <section className="mb-24 reveal">
          <div className="mb-10">
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/45 mb-4">{aboutContent.main_idea.eyebrow}</div>
            <h2 className="text-[28px] sm:text-[36px] font-normal text-white leading-[1.15] mb-5">
              {aboutContent.main_idea.title} <span className="gradient-text">{aboutContent.main_idea.accent_title}</span>
            </h2>
            {aboutContent.main_idea.paragraphs.map((paragraph, index) => <p key={paragraph} className={`text-body text-[15.5px] leading-[1.75] ${index ? "mt-4" : ""}`}>{paragraph}</p>)}
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {aboutContent.main_idea.points.map((item, i) => (
              <div key={item} className="geniq-card p-5 flex items-center gap-4">
                <span className="text-[#B79BE0] text-[15px] font-medium">0{i + 1}</span>
                <span className="text-white/85 text-[15px]">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-body text-[15.5px] leading-[1.75] mt-8">
            {aboutContent.main_idea.conclusion}
          </p>
        </section>

        <section className="mb-20 reveal">
          <div className="geniq-glass rounded-[28px] px-6 py-8 sm:px-10 sm:py-10 w-full">
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/45 mb-4">{aboutContent.main_formula.eyebrow}</div>
            <p className="text-white text-[25px] sm:text-[38px] leading-[1.15] font-normal">
              <span className="gradient-text">{aboutContent.main_formula.accent}</span> {aboutContent.main_formula.suffix}
            </p>
            <p className="text-body text-[15px] leading-[1.7] mt-5 max-w-2xl">
              {aboutContent.main_formula.text}
            </p>
          </div>
        </section>

        <section className="mb-24">
          <div className="reveal max-w-5xl mx-auto mb-12 text-center">
            <h2 className="text-[32px] sm:text-[42px] lg:text-[48px] font-normal leading-[1.15]">
              {aboutContent.axes_intro.question}
            </h2>
          </div>
          <div className="reveal mb-10">
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/45 mb-4">{aboutContent.axes_intro.eyebrow}</div>
            <h2 className="text-[28px] sm:text-[36px] font-normal text-white leading-[1.15] mb-5">
              {aboutContent.axes_intro.title} <span className="gradient-text">{aboutContent.axes_intro.accent_title}</span>
            </h2>
            <p className="text-body text-[15.5px] leading-[1.75]">
              {aboutContent.axes_intro.description}
            </p>
          </div>
          <div className="space-y-4">
            {AXES.map((axis) => {
              const Icon = axis.Icon;
              return (
                <details key={axis.code} className="reveal geniq-card p-6 group">
                  <summary className="list-none [&::-webkit-details-marker]:hidden cursor-pointer">
                    <div className="flex items-start gap-5">
                      <div className="w-12 h-12 rounded-full border border-[#764CB0]/60 bg-black/40 flex items-center justify-center shrink-0">
                        <Icon size={19} strokeWidth={1.4} className="text-[#B79BE0]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-baseline gap-3 mb-2">
                          <h3 className="text-white text-[20px] font-medium">{axis.code}</h3>
                          <span className="text-[#B79BE0] text-[15px]">{axis.title}</span>
                        </div>
                        <p className="text-white text-[15px] leading-[1.5] mb-2">{axis.question}</p>
                        <p className="text-white/65 text-[14px] leading-[1.6]">{axis.subtitle}</p>
                      </div>
                      <span className="text-[#B79BE0] text-2xl leading-none transition-transform group-open:rotate-45">+</span>
                    </div>
                  </summary>
                  <div className="mt-5 pt-5 border-t border-white/5 grid lg:grid-cols-[2fr_3fr] gap-6">
                    <p className="text-body text-[14px] leading-[1.75]">{axis.text}</p>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {axis.params.map((param) => (
                        <div key={param} className="rounded-xl border border-white/8 bg-black/25 px-4 py-3 text-white/72 text-[13px]">
                          {param}
                        </div>
                      ))}
                    </div>
                  </div>
                </details>
              );
            })}
          </div>
        </section>

        <section className="mb-24">
          <div className="reveal max-w-4xl mx-auto mb-12 text-center">
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/45 mb-4">{aboutContent.neurotype_intro.eyebrow}</div>
            <h2 className="text-[28px] sm:text-[36px] font-normal text-white leading-[1.15] mb-5">
              {aboutContent.neurotype_intro.title} <span className="gradient-text">{aboutContent.neurotype_intro.accent_title}</span>
            </h2>
            <div className="space-y-4 text-body text-[15px] leading-[1.75] max-w-3xl mx-auto">
              {aboutContent.neurotype_intro.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p>
                <Link to="/neurotypes" className="text-[#B79BE0] hover:text-white transition-colors underline underline-offset-4">
                  {aboutContent.neurotype_intro.catalog_text}
                </Link>
              </p>
            </div>
          </div>

          <div className="reveal geniq-glass rounded-[28px] px-6 py-7 sm:px-10 sm:py-9 mb-12 max-w-5xl mx-auto text-center">
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/45 mb-4">{aboutContent.neurotype_intro.formula_eyebrow}</div>
            <p className="text-white text-[26px] sm:text-[38px] leading-[1.15]">
              <span className="gradient-text">{aboutContent.neurotype_intro.formula}</span>
            </p>
            <p className="text-body text-[14.5px] leading-[1.7] mt-4 max-w-3xl mx-auto">
              {aboutContent.neurotype_intro.formula_text}
            </p>
          </div>

          <div className="reveal mb-12">
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/45 mb-5">3 мира восприятия</div>
            <div className="grid md:grid-cols-3 gap-4">
              {WORLDS.map(({ code, title, text, function: worldFunction, neurotypes, Icon }) => (
                <article key={code} className="geniq-card min-h-[400px] p-7 sm:p-8 flex flex-col relative overflow-hidden">
                  <div
                    className="absolute -right-16 -bottom-20 w-52 h-52 rounded-full pointer-events-none"
                    style={{ background: "radial-gradient(circle, rgba(118,76,176,0.22), transparent 68%)" }}
                  />
                  <div className="flex items-start justify-between gap-4 mb-7 relative z-10">
                    <div className="w-12 h-12 rounded-full border border-[#764CB0]/55 bg-black/30 flex items-center justify-center">
                      <Icon size={19} className="text-[#B79BE0]" strokeWidth={1.4} />
                    </div>
                    <span className="text-[34px] font-light text-[#B79BE0]/35">{code}</span>
                  </div>
                  <h3 className="text-white text-[21px] font-medium mb-4 relative z-10">{title}</h3>
                  <p className="text-body text-[14px] leading-[1.7] mb-6 relative z-10">{text}</p>
                  <div className="mt-auto pt-5 border-t border-white/8 space-y-5 relative z-10">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.2em] text-white/38 mb-2">Функция мира</div>
                      <p className="text-white/80 text-[13.5px] leading-[1.6]">{worldFunction}</p>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.2em] text-white/38 mb-2">Нейротипы</div>
                      <p className="text-[#B79BE0] text-[12.5px] leading-[1.6]">{neurotypes}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="reveal">
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/45 mb-5">3 режима мышления</div>
            <div className="grid md:grid-cols-3 gap-4">
              {MODES.map(({ code, title, action, text, function: modeFunction, neurotypes }) => (
                <article key={code} className="geniq-card min-h-[380px] p-7 sm:p-8 flex flex-col relative overflow-hidden">
                  <div
                    className="absolute -right-16 -bottom-20 w-52 h-52 rounded-full pointer-events-none"
                    style={{ background: "radial-gradient(circle, rgba(118,76,176,0.2), transparent 68%)" }}
                  />
                  <div className="text-[10px] uppercase tracking-[0.2em] text-white/38 mb-4 relative z-10">Режим {code}</div>
                  <h3 className="text-white text-[21px] font-medium mb-2 relative z-10">{title}</h3>
                  <div className="text-[#B79BE0] text-[14px] mb-6 relative z-10">{action}</div>
                  <p className="text-body text-[14px] leading-[1.7] mb-6 relative z-10">{text}</p>
                  <div className="mt-auto pt-5 border-t border-white/8 space-y-5 relative z-10">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.2em] text-white/38 mb-2">Функция режима</div>
                      <p className="text-white/80 text-[13.5px] leading-[1.6]">{modeFunction}</p>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.2em] text-white/38 mb-2">Нейротипы</div>
                      <p className="text-[#B79BE0] text-[12.5px] leading-[1.6]">{neurotypes}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-24 reveal">
          <div className="geniq-glass rounded-[32px] p-8 sm:p-12">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles size={20} className="text-[#B79BE0]" strokeWidth={1.5} />
              <h2 className="text-white text-[26px] sm:text-[34px] font-normal">{aboutContent.matrix.title}</h2>
            </div>
            <div className="overflow-x-auto overflow-y-hidden sm:overflow-visible">
              <table className="w-full min-w-[620px] text-left">
                <thead>
                  <tr className="border-b border-white/10 text-white/45 text-[11px] uppercase tracking-[0.18em]">
                    <th className="py-3 pr-4">Мир</th>
                    <th className="py-3 px-4">Режим 1</th>
                    <th className="py-3 px-4">Режим 2</th>
                    <th className="py-3 pl-4">Режим 3</th>
                  </tr>
                </thead>
                <tbody>
                  {MATRIX.map((row) => (
                    <tr key={row[0]} className="border-b border-white/5">
                      {row.map((cell, i) => (
                        <td key={cell} className={`py-3 text-[14px] ${i === 0 ? "text-[#B79BE0] pr-4" : "px-2 sm:px-4"}`}>
                          {i === 0 ? cell : (
                            <button
                              type="button"
                              aria-pressed={activeNeurotype === cell}
                              onMouseEnter={() => setActiveNeurotype(cell)}
                              onFocus={() => setActiveNeurotype(cell)}
                              onClick={() => setActiveNeurotype(cell)}
                              className="w-full min-h-11 rounded-xl border px-3 py-2.5 text-left transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                              style={{
                                color: getNeurotypeDisplayColor(cell),
                                borderColor: activeNeurotype === cell ? `${getNeurotypeDisplayColor(cell)}A6` : `${getNeurotypeDisplayColor(cell)}42`,
                                background: activeNeurotype === cell ? `${getNeurotypeDisplayColor(cell)}18` : `${getNeurotypeDisplayColor(cell)}08`,
                                boxShadow: activeNeurotype === cell ? `0 0 24px ${getNeurotypeDisplayColor(cell)}1F` : "none",
                                textShadow: cell === "T2" ? "0 0 10px rgba(167,166,173,0.28)" : `0 0 12px ${NEUROTYPE_COLORS[cell]}24`,
                              }}
                            >
                              <span className="mr-1.5 text-[11px] tracking-[0.12em]">
                                {cell}
                              </span>
                              <span className="font-medium">{NEUROTYPES[cell].name}</span>
                            </button>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-5 text-center text-white/42 text-[12px] sm:text-[13px] leading-[1.6]">
              {aboutContent.matrix.hint}
            </p>
            <div
              aria-live="polite"
              className="mt-6 min-h-[116px] rounded-[22px] border px-5 py-5 sm:px-7 sm:py-6 transition-colors duration-200"
              style={{
                borderColor: `${getNeurotypeDisplayColor(activeNeurotype)}70`,
                background: `${getNeurotypeDisplayColor(activeNeurotype)}0D`,
              }}
            >
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-3">
                <span
                  className="text-[13px] tracking-[0.16em]"
                  style={{ color: getNeurotypeDisplayColor(activeNeurotype) }}
                >
                  {activeNeurotype}
                </span>
                <h3
                  className="text-[20px] sm:text-[23px] font-medium"
                  style={{ color: getNeurotypeDisplayColor(activeNeurotype) }}
                >
                  {NEUROTYPES[activeNeurotype].name}
                </h3>
              </div>
              <p className="text-white/76 text-[14px] sm:text-[16px] leading-[1.65]">
                {NEUROTYPES[activeNeurotype].role}
              </p>
            </div>
            <p className="text-white/88 text-[21px] sm:text-[28px] leading-[1.45] max-w-4xl mt-9 text-center mx-auto">
              <span className="text-[#B79BE0]">{aboutContent.matrix.conclusion}</span>
              <span className="block mt-2">{aboutContent.matrix.conclusion_suffix}</span>
            </p>
          </div>
        </section>

        <section className="mb-24 reveal">
          <div>
            <h2 className="text-[28px] sm:text-[36px] font-normal text-white leading-[1.15] mb-5">
              {aboutContent.multiple.title} <span className="gradient-text">{aboutContent.multiple.accent_title}</span>
            </h2>
            <div className="space-y-4 text-body text-[15px] leading-[1.75]">
              <p>{aboutContent.multiple.paragraphs[0]}</p>
              <blockquote className="my-7 border-l-2 border-[#B79BE0] pl-5 text-white text-[20px] sm:text-[25px] leading-[1.4]">
                {aboutContent.multiple.quote}
              </blockquote>
              {aboutContent.multiple.paragraphs.slice(1).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
        </section>

        <section className="mb-24 reveal">
          <div className="geniq-glass rounded-[32px] p-8 sm:p-12">
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/45 mb-4">{aboutContent.diagnostics.eyebrow}</div>
            <h2 className="text-[28px] sm:text-[36px] font-normal text-white leading-[1.15] mb-6">
              {aboutContent.diagnostics.title} <span className="gradient-text">{aboutContent.diagnostics.accent_title}</span>
            </h2>
            <div className="space-y-4 text-body text-[15px] leading-[1.75]">
              {aboutContent.diagnostics.paragraphs.map((paragraph, index) => <p key={paragraph} className={index ? "text-white/78" : ""}>{paragraph}</p>)}
            </div>
          </div>
        </section>

        <section className="mb-8 reveal">
          <div className="geniq-glass rounded-[32px] p-8 sm:p-12">
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/45 mb-4">{aboutContent.catalog_cta.eyebrow}</div>
            <h2 className="text-[26px] sm:text-[34px] font-normal text-white leading-[1.2] mb-5">
              {aboutContent.catalog_cta.title}
            </h2>
            <p className="text-body text-[15px] leading-[1.7] max-w-3xl mb-7">
              {aboutContent.catalog_cta.text}
            </p>
            <div className="flex items-center">
              <Link to="/neurotypes" className="geniq-cta geniq-cta--ghost">
                <span>{aboutContent.catalog_cta.button}</span>
                <span className="arrow"><ArrowUpRight size={18} strokeWidth={1.6} /></span>
              </Link>
            </div>
          </div>
        </section>

        <section className="reveal">
          <div className="geniq-glass rounded-[32px] p-10 sm:p-14 text-center relative overflow-hidden">
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
                 style={{ background: "radial-gradient(circle, rgba(118,76,176,0.18), transparent 60%)" }} />
            <h2 className="text-[26px] sm:text-[34px] font-normal text-white leading-[1.2] max-w-2xl mx-auto mb-7 relative z-10">
              {aboutContent.final_cta.title} <span className="gradient-text">{aboutContent.final_cta.accent_title}</span> {aboutContent.final_cta.title_suffix}
            </h2>
            <p className="text-body text-[15px] leading-[1.7] max-w-2xl mx-auto mb-8 relative z-10">
              {aboutContent.final_cta.text}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 relative z-10">
              <CtaButton testId="about-test-cta">{aboutContent.final_cta.button}</CtaButton>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
