import React, { useEffect, useRef } from "react";
import CtaButton from "./CtaButton";
import faqItems from "@/content/faq.json";
import homeSections from "@/content/home-sections.json";

export const FAQ_ITEMS = faqItems.items;
const CONTENT = homeSections.faq;

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

export const FaqSection = ({ withCta = true }) => {
  const ref = useReveal();
  return (
    <section id="faq" ref={ref} data-testid="section-faq" className="relative py-28 overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />
      <div className="container-geniq relative z-10">
        <div className="reveal mb-10">
          <div className="text-[11px] uppercase tracking-[0.22em] text-white/45 mb-4">{CONTENT.eyebrow}</div>
          <h2 className="text-[32px] sm:text-[42px] lg:text-[48px] font-normal text-white leading-[1.1] mb-5">
            {CONTENT.title} <span className="gradient-text">{CONTENT.accent_title}</span>
          </h2>
          <p className="text-body text-[15px] sm:text-[16px] leading-[1.65] max-w-2xl">
            {CONTENT.description}
          </p>
        </div>
        <div className="space-y-3">
          {FAQ_ITEMS.map((f, i) => (
            <details key={i} data-testid={`faq-${i}`} className="reveal geniq-card group">
              <summary className="faq-summary flex items-start justify-between gap-4 p-6 list-none [&::-webkit-details-marker]:hidden">
                <h3 className="text-white text-[16px] font-medium leading-snug pr-4">{f.q}</h3>
                <span className="text-[#B79BE0] text-2xl leading-none transition-transform group-open:rotate-45 shrink-0">+</span>
              </summary>
              <div className="faq-answer text-body text-[14px] leading-[1.75] px-6 pb-6 pt-4 border-t border-white/5 whitespace-pre-line">{f.a}</div>
            </details>
          ))}
        </div>
        {withCta && (
          <div className="reveal mt-10 flex justify-center">
            <CtaButton testId="faq-cta">{CONTENT.button}</CtaButton>
          </div>
        )}
      </div>
    </section>
  );
};

export default FaqSection;
