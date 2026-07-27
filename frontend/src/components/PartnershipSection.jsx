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
    <section id="partnership" ref={ref} data-testid="section-partnership" className="partnership-section relative py-28 overflow-hidden scroll-mt-28">
      <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />
      <div className="absolute top-1/3 -left-32 w-[480px] h-[480px] rounded-full pointer-events-none"
           style={{ background: "radial-gradient(circle, rgba(118,76,176,0.12), transparent 60%)" }} />

      <div className="container-geniq relative z-10">
        <div className="partnership-layout grid lg:grid-cols-2 gap-10 lg:gap-12 items-center max-w-6xl">
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

          <div className="reveal relative w-full max-w-[540px] mx-auto">
            <div
              className="absolute -inset-6 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(118,76,176,0.14), transparent 66%)" }}
            />
            <img
              src="/uploads/partnership-handshake-dark.jpg"
              alt="Партнёрство и сотрудничество с GENIQ"
              loading="lazy"
              decoding="async"
              className="relative w-full aspect-square object-contain mix-blend-lighten"
              style={{
                WebkitMaskImage: "radial-gradient(ellipse 50% 44% at 50% 50%, #000 44%, rgba(0,0,0,0.88) 64%, transparent 100%)",
                maskImage: "radial-gradient(ellipse 50% 44% at 50% 50%, #000 44%, rgba(0,0,0,0.88) 64%, transparent 100%)",
              }}
            />
          </div>

          <div className="reveal lg:col-span-2 mt-2">
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/45 mb-5">С кем получаются самые сильные коллаборации</div>
            <div className="grid sm:grid-cols-2 xl:grid-cols-5 gap-3">
              {PARTNERS.map((p, i) => {
                const Icon = p.Icon;
                return (
                  <div key={i} data-testid={`partner-${i}`} className="geniq-card p-5 flex items-center xl:items-start gap-4">
                    <div className="w-11 h-11 rounded-full border border-[#764CB0]/60 flex items-center justify-center bg-black/40 shrink-0">
                      <Icon size={18} strokeWidth={1.4} className="text-[#B79BE0]" />
                    </div>
                    <div className="text-white text-[14px] leading-[1.45] font-medium">{p.label}</div>
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
