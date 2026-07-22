import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Briefcase, GraduationCap, Cpu, Star, Mic, ArrowUpRight } from "lucide-react";

const PARTNERS = [
  { Icon: Briefcase, label: "HR-агентства" },
  { Icon: GraduationCap, label: "Карьерные центры и продукты" },
  { Icon: Cpu, label: "Курсы по обучению навыкам работы с ИИ" },
  { Icon: Star, label: "Продюсерские центры" },
  { Icon: Mic, label: "Психологи и коучи с блогом" },
];

const useReveal = () => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); });
    }, { threshold: 0.1 });
    el.querySelectorAll(".reveal").forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, []);
  return ref;
};

export const PartnershipSection = () => {
  const ref = useReveal();
  return (
    <section ref={ref} data-testid="section-partnership" className="partnership-section relative py-28 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />
      <div className="absolute top-1/3 -left-32 w-[480px] h-[480px] rounded-full pointer-events-none"
           style={{ background: "radial-gradient(circle, rgba(118,76,176,0.12), transparent 60%)" }} />

      <div className="container-geniq relative z-10">
        <div className="partnership-layout grid lg:grid-cols-2 gap-12 items-start max-w-6xl">
          <div>
            <div className="reveal text-[11px] uppercase tracking-[0.22em] text-white/45 mb-4">Партнёрство</div>
            <h2 className="reveal text-[32px] sm:text-[42px] lg:text-[48px] font-normal text-white leading-[1.1] mb-7">
              Станьте партнёром <span className="gradient-text">GENIQ</span>
            </h2>
            <div className="reveal space-y-4 text-body text-[15px] leading-[1.7] mb-7">
              <p className="text-white/85">Вы ведёте свою практику в помогающей профессии?<br />Ваш продукт помогает людям освоить новую профессию или навык?<br />У вас есть свой блог о саморазвитии?</p>
              <p>Если да — нам точно есть о чём поговорить. <span style={{ color: "#B79BE0" }}>Давайте познакомимся поближе.</span></p>
              <p className="text-white/75">Я адаптирую диагностику GENIQ под ваш проект — так, чтобы ваши клиенты получили максимум пользы и конкретный результат. А вы — выделились на рынке и смогли предложить действительно уникальную услугу внутри своего продукта.</p>
            </div>
            <Link
              to="/partners"
              data-testid="partnership-cta"
              className="geniq-cta"
            >
              <span>Подробнее</span>
              <span className="arrow"><ArrowUpRight size={18} strokeWidth={1.6} /></span>
            </Link>
          </div>

          <div className="reveal">
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/45 mb-5">С кем получаются самые сильные коллаборации</div>
            <div className="grid gap-3">
              {PARTNERS.map((p, i) => {
                const Icon = p.Icon;
                return (
                  <div key={i} data-testid={`partner-${i}`} className="geniq-card p-5 flex items-center gap-5">
                    <div className="w-11 h-11 rounded-full border border-[#764CB0]/60 flex items-center justify-center bg-black/40 shrink-0">
                      <Icon size={18} strokeWidth={1.4} className="text-[#B79BE0]" />
                    </div>
                    <div className="text-white text-[15px] font-medium">{p.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnershipSection;
