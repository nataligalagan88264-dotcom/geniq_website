import React, { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CtaButton from "@/components/CtaButton";
import { FaqSection } from "@/components/FaqSection";

export default function Faq() {
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); });
    }, { threshold: 0.08 });
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div data-testid="faq-page" className="min-h-screen relative">
      <Header />
      <main className="pt-52 sm:pt-56 pb-12 container-geniq relative">
        <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />

        <div className="max-w-3xl mb-12 reveal">
          <div className="text-[11px] uppercase tracking-[0.22em] text-white/45 mb-5">GENIQ · FAQ</div>
          <h1 className="text-[40px] sm:text-[56px] lg:text-[64px] font-normal text-white leading-[1.05] mb-7">
            Частые <span className="gradient-text">вопросы</span>
          </h1>
          <p className="text-body text-[16px] leading-[1.7] max-w-[640px]">
            Ответы на самые частые вопросы про диагностику, нейротипы, подход и работу с GENIQ.
          </p>
        </div>
      </main>

      <FaqSection withCta={false} />

      <div className="container-geniq pb-24">
        <div className="geniq-glass rounded-[32px] p-10 sm:p-14 text-center reveal">
          <h2 className="text-[26px] sm:text-[32px] font-normal text-white mb-6">
            Остались вопросы? <span className="gradient-text">Начните с теста</span>
          </h2>
          <div className="flex justify-center">
            <CtaButton testId="faq-page-cta">Пройти тест</CtaButton>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
