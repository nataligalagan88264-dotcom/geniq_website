import React, { useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CtaButton from "@/components/CtaButton";
import { FORM_URL } from "@/lib/constants";
import approachContent from "@/content/approach.json";

const STEPS = approachContent.steps_section.items;
const COMPARE = approachContent.comparison.items;
const FAQ = approachContent.faq_section.items;

const useReveal = () => {
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); });
    }, { threshold: 0.08 });
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
};

export default function Approach() {
  useReveal();

  return (
    <div data-testid="approach-page" className="min-h-screen relative">
      <Header />
      <main className="pt-52 sm:pt-56 pb-24 container-geniq relative">
        <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />

        {/* Hero */}
        <div className="mb-20 reveal">
          <div className="text-[11px] uppercase tracking-[0.22em] text-white/45 mb-5">{approachContent.hero.eyebrow}</div>
          <h1 className="text-[40px] sm:text-[56px] lg:text-[64px] font-normal text-white leading-[1.05] mb-7">
            <span className="gradient-text">{approachContent.hero.title}</span> {approachContent.hero.title_suffix}
          </h1>
          <p className="text-body text-[17px] leading-[1.7] max-w-[680px]">
            {approachContent.hero.description}
          </p>
        </div>

        {/* Steps */}
        <section className="mb-24">
          <div className="reveal mb-10">
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/45 mb-4">{approachContent.steps_section.eyebrow}</div>
            <h2 className="text-[28px] sm:text-[36px] font-normal text-white leading-[1.15]">
              {approachContent.steps_section.title} <span className="gradient-text">{approachContent.steps_section.accent_title}</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {STEPS.map((s, i) => (
              <div key={s.n} data-testid={`step-${s.n}`} className="reveal geniq-card p-6 relative">
                <div className="text-[#B79BE0] text-[36px] font-medium leading-none mb-4 opacity-50">{s.n}</div>
                <h3 className="text-white text-[16px] font-medium mb-3">{s.title}</h3>
                <p className="text-body text-[13px] leading-[1.6]">{s.text}</p>
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-[#764CB0]/30" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Compare */}
        <section className="mb-24">
          <div className="reveal mb-10">
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/45 mb-4">{approachContent.comparison.eyebrow}</div>
            <h2 className="text-[28px] sm:text-[36px] font-normal text-white leading-[1.15]">
              {approachContent.comparison.title} <span className="gradient-text">{approachContent.comparison.accent_title}</span> {approachContent.comparison.title_suffix}
            </h2>
            <p className="text-body text-[15px] leading-[1.7] mt-4 max-w-2xl italic">
              {approachContent.comparison.metaphor}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {COMPARE.map((c, i) => (
              <div key={i} data-testid={`compare-${i}`} className={`geniq-card p-7 ${c.muted ? "opacity-65" : ""}`}>
                <div className={`text-[11px] uppercase tracking-[0.18em] mb-4 ${c.muted ? "text-white/40" : "text-[#B79BE0]"}`}>
                  {c.label}
                </div>
                <h3 className="text-white text-[18px] font-medium mb-5">{c.title}</h3>
                <ul className="space-y-3">
                  {c.points.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-[13.5px] text-white/80 leading-[1.5]">
                      <span className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${c.muted ? "bg-white/30" : "bg-[#B79BE0]"}`} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Key principle */}
        <section className="mb-24 reveal">
          <div className="geniq-glass rounded-[32px] p-10 sm:p-14 max-w-4xl mx-auto text-center relative overflow-hidden">
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
                 style={{ background: "radial-gradient(circle, rgba(118,76,176,0.18), transparent 60%)" }} />
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/45 mb-5 relative z-10">{approachContent.principle.eyebrow}</div>
            <h2 className="text-[24px] sm:text-[32px] font-normal text-white leading-[1.3] relative z-10 mb-5">
              <span className="gradient-text">{approachContent.principle.title}</span>
            </h2>
            <p className="text-body text-[15px] leading-[1.7] max-w-xl mx-auto relative z-10">
              {approachContent.principle.text}
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-24">
          <div className="reveal mb-10">
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/45 mb-4">{approachContent.faq_section.eyebrow}</div>
            <h2 className="text-[28px] sm:text-[36px] font-normal text-white leading-[1.15]">
              {approachContent.faq_section.title} <span className="gradient-text">{approachContent.faq_section.accent_title}</span>
            </h2>
          </div>
          <div className="space-y-3">
            {FAQ.map((f, i) => (
              <details key={i} data-testid={`faq-${i}`} className="reveal geniq-card p-6 group cursor-pointer">
                <summary className="flex items-start justify-between gap-4 list-none [&::-webkit-details-marker]:hidden">
                  <h3 className="text-white text-[16px] font-medium leading-snug pr-4">{f.q}</h3>
                  <span className="text-[#B79BE0] text-2xl leading-none transition-transform group-open:rotate-45 shrink-0">+</span>
                </summary>
                <p className="text-body text-[14px] leading-[1.7] mt-4 pt-4 border-t border-white/5">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="reveal">
          <div className="geniq-glass rounded-[32px] p-10 sm:p-14 text-center relative overflow-hidden">
            <h2 className="text-[26px] sm:text-[34px] font-normal text-white leading-[1.2] max-w-2xl mx-auto mb-8 relative z-10">
              {approachContent.cta.title} <span className="gradient-text">{approachContent.cta.accent_title}</span> {approachContent.cta.title_suffix}
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-4 relative z-10">
              <a href={FORM_URL} target="_blank" rel="noopener noreferrer" data-testid="approach-form-cta" className="geniq-cta">
                <span>{approachContent.cta.primary_button}</span>
                <span className="arrow"><ArrowUpRight size={18} strokeWidth={1.6} /></span>
              </a>
              <CtaButton testId="approach-test-cta" variant="ghost">{approachContent.cta.secondary_button}</CtaButton>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
