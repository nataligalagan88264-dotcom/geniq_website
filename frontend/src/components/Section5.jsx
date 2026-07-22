import React, { useEffect, useRef } from "react";

const useReveal = () => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const els = el.querySelectorAll(".reveal");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); });
    }, { threshold: 0.2 });
    els.forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, []);
  return ref;
};

export const Section5 = () => {
  const ref = useReveal();
  return (
    <section ref={ref} data-testid="section-final-bridge" className="relative py-24">
      <div className="container-geniq">
        <div className="reveal geniq-glass rounded-[32px] p-10 sm:p-14 lg:p-20 text-center relative overflow-hidden">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
               style={{ background: "radial-gradient(circle, rgba(118,76,176,0.18), transparent 60%)" }} />
          <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
               style={{ background: "radial-gradient(circle, rgba(96,128,241,0.10), transparent 60%)" }} />

          <div className="text-[11px] uppercase tracking-[0.24em] text-white/45 mb-6 relative z-10">Главная мысль</div>
          <h2 className="text-[28px] sm:text-[36px] lg:text-[44px] leading-[1.22] font-normal text-white max-w-[820px] mx-auto relative z-10">
            Всё это — про одно: <span className="gradient-text">собрать новую версию себя</span>. Не другого человека — а <span className="gradient-text">себя, наконец понятого</span>.
          </h2>
        </div>
      </div>
    </section>
  );
};

export default Section5;
