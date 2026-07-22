import React, { useEffect, useRef } from "react";
import CtaButton from "./CtaButton";
import faqItems from "@/content/faq.json";

export const FAQ_ITEMS = faqItems;

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
    <section ref={ref} data-testid="section-faq" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />
      <div className="container-geniq relative z-10">
        <div className="reveal max-w-3xl mb-10">
          <div className="text-[11px] uppercase tracking-[0.22em] text-white/45 mb-4">FAQ</div>
          <h2 className="text-[32px] sm:text-[42px] lg:text-[48px] font-normal text-white leading-[1.1] mb-5">
            Частые <span className="gradient-text">вопросы</span>
          </h2>
        </div>
        <div className="space-y-3 max-w-4xl">
          {FAQ_ITEMS.map((f, i) => (
            <details key={i} data-testid={`faq-${i}`} className="reveal geniq-card p-6 group cursor-pointer">
              <summary className="flex items-start justify-between gap-4 list-none [&::-webkit-details-marker]:hidden">
                <h3 className="text-white text-[16px] font-medium leading-snug pr-4">{f.q}</h3>
                <span className="text-[#B79BE0] text-2xl leading-none transition-transform group-open:rotate-45 shrink-0">+</span>
              </summary>
              <p className="text-body text-[14px] leading-[1.75] mt-4 pt-4 border-t border-white/5 whitespace-pre-line">{f.a}</p>
            </details>
          ))}
        </div>
        {withCta && (
          <div className="reveal mt-10 flex justify-center">
            <CtaButton testId="faq-cta">Пройти тест</CtaButton>
          </div>
        )}
      </div>
    </section>
  );
};

export default FaqSection;
