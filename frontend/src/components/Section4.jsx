import React, { useEffect, useRef, useState } from "react";
import { Eye, Box, ArrowUp, Battery, Target, Sparkles } from "lucide-react";

const APPS = [
  { id: "self", title: "Для понимания себя", text: "Увидеть, как вы устроены на глубоком уровне, и перестать считать свои особенности дефектом.", Icon: Eye },
  { id: "product", title: "Для создания своего продукта / бизнеса", text: "Понять, какой продукт вы можете создать, и собрать его на базе своих талантов и экспертизы.", Icon: Box },
  { id: "ceiling", title: "Пробить стеклянный потолок", text: "Увидеть, что годами держит вас на одном уровне дохода и роста, — и сдвинуться с места.", Icon: ArrowUp },
  { id: "energy", title: "Для энергии и ресурса", text: "Выйти из выгорания: понять, что вас истощает, а что восстанавливает — конкретную формулу ресурса.", Icon: Battery },
  { id: "focus", title: "Для фокуса и действия", text: "Перестать распыляться и начать доводить идеи до реализации, а не гаснуть на старте.", Icon: Target },
  { id: "shadow", title: "Выйти из тени", text: "Начать делиться знаниями и выйти к своей аудитории без саботажа.", Icon: Sparkles },
];

const useReveal = () => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const els = el.querySelectorAll(".reveal");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); });
    }, { threshold: 0.12 });
    els.forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, []);
  return ref;
};

const AppCard = ({ a }) => {
  const Icon = a.Icon;
  return (
    <div data-testid={`app-${a.id}`} className="reveal geniq-card geniq-card-spotlight p-6 cursor-default group">
      <div className="flex items-start mb-4">
        <div className="w-11 h-11 rounded-full border border-[#764CB0]/50 flex items-center justify-center bg-black/40 group-hover:border-[#B79BE0] transition-colors">
          <Icon size={18} strokeWidth={1.4} className="text-[#B79BE0]" />
        </div>
      </div>
      <h3 className="text-white text-[16px] font-medium mb-3 leading-snug">{a.title}</h3>
      <p className="text-body text-[13px] leading-[1.6]">{a.text}</p>
    </div>
  );
};

export const Section4 = () => {
  const ref = useReveal();
  return (
    <section ref={ref} data-testid="section-applications" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />
      <div className="container-geniq relative z-10">
        <div className="max-w-3xl mb-16">
          <div className="reveal text-[11px] uppercase tracking-[0.22em] text-white/45 mb-4">GENIQ · Сферы применения</div>
          <h2 className="reveal text-[32px] sm:text-[42px] lg:text-[48px] font-normal leading-[1.1] text-white mb-5">
            Для каких целей применима <span className="gradient-text">система</span>
          </h2>
        </div>

        {/* Layout: 3 cards | core | 3 cards */}
        <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-12 items-center">
          {/* Left column (cards 0-2) */}
          <div className="flex flex-col gap-5 relative">
            {APPS.slice(0, 3).map((a, i) => (
              <div key={a.id} className="relative">
                <AppCard a={a} />
                {/* connector to core - desktop only */}
                <div className="hidden lg:block absolute top-1/2 -right-12 w-12 h-px bg-gradient-to-r from-[#764CB0]/30 to-transparent" />
              </div>
            ))}
          </div>

          {/* Core */}
          <div className="hidden lg:flex items-center justify-center relative">
            <div className="orbit-ring spin-slow absolute" style={{ width: 220, height: 220 }} />
            <div className="orbit-ring spin-reverse absolute" style={{ width: 320, height: 320, opacity: 0.5 }} />
            <div className="absolute -inset-16 rounded-full" style={{ background: "radial-gradient(circle, rgba(118,76,176,0.25), transparent 60%)" }} />
            <div className="relative w-32 h-32 rounded-full border border-[#B79BE0]/60 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md">
              <span className="text-[10px] uppercase tracking-[0.22em] text-white/55">core</span>
              <span className="text-white text-[20px] font-semibold mt-1">GENIQ</span>
              <span className="absolute inset-0 rounded-full pulse-dot" style={{ boxShadow: "0 0 30px rgba(118,76,176,0.55)" }} />
            </div>
          </div>

          {/* Right column (cards 3-5) */}
          <div className="flex flex-col gap-5 relative">
            {APPS.slice(3, 6).map((a, i) => (
              <div key={a.id} className="relative">
                <AppCard a={a} />
                <div className="hidden lg:block absolute top-1/2 -left-12 w-12 h-px bg-gradient-to-l from-[#764CB0]/30 to-transparent" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section4;
