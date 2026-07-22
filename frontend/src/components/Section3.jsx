import React, { useEffect, useRef } from "react";

const useReveal = () => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const els = el.querySelectorAll(".reveal");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); });
    }, { threshold: 0.18 });
    els.forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, []);
  return ref;
};

export const Section3 = () => {
  const ref = useReveal();
  return (
    <section ref={ref} data-testid="section-bridge" className="relative py-32 overflow-hidden">
      {/* Orbit rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="orbit-ring spin-slow" style={{ width: 720, height: 720, opacity: 0.18 }} />
        <div className="orbit-ring spin-reverse" style={{ width: 920, height: 920, opacity: 0.12, position: 'absolute' }} />
        <div className="orbit-ring spin-slow" style={{ width: 1120, height: 1120, opacity: 0.07, position: 'absolute' }} />
      </div>

      {/* dotted constellation */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          [12, 22], [85, 30], [22, 70], [78, 78], [50, 12], [50, 90], [8, 50], [92, 50],
          [30, 35], [70, 65], [40, 80], [60, 20],
        ].map(([x, y], i) => (
          <span
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/35 pulse-dot"
            style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${i * 0.3}s` }}
          />
        ))}
      </div>

      <div className="container-geniq relative z-10 max-w-3xl text-center">
        <div className="reveal mb-7 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-black/40">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B79BE0]" />
          <span className="text-[10px] uppercase tracking-[0.22em] text-white/55">Переход</span>
        </div>

        <h2 className="reveal text-[30px] sm:text-[40px] lg:text-[46px] leading-[1.18] font-normal text-white mb-10">
          Но что, если собирать себя вслепую — <span className="gradient-text">больше не единственный вариант?</span>
        </h2>

        <p className="reveal text-body text-[16px] sm:text-[17px] leading-[1.72] max-w-[680px] mx-auto">
          <span style={{ color: "#B79BE0" }}>Путь не предопределён</span>. То, что вы решите сегодня,{" "}
          <span style={{ color: "#B79BE0" }}>задаёт направление на годы вперёд</span>. Чтобы эту схему не приходилось собирать вслепую, и была создана GENIQ — она показывает вашу{" "}
          <span style={{ color: "#B79BE0" }}>внутреннюю архитектуру</span> и превращает её в{" "}
          <span style={{ color: "#B79BE0" }}>конкретный маршрут</span>.
        </p>
      </div>
    </section>
  );
};

export default Section3;
