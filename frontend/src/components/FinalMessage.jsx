import React, { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";

/**
 * Final message section — for readers who scrolled to the end.
 * Includes a live counter of time spent on the page.
 */
export const FinalMessage = () => {
  const [minutes, setMinutes] = useState(1);
  const startRef = useRef(Date.now());
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const tick = () => {
      const elapsed = Math.max(1, Math.round((Date.now() - startRef.current) / 60000));
      setMinutes(elapsed);
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setVisible(true); });
    }, { threshold: 0.25 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-testid="section-final-message"
      className="relative py-32 overflow-hidden"
    >
      <div className="absolute inset-0 dot-grid opacity-12 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
           style={{ background: "radial-gradient(circle, rgba(118,76,176,0.14), transparent 60%)" }} />

      <div className="container-geniq relative z-10 max-w-3xl text-center">
        <div className={`transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="text-[11px] uppercase tracking-[0.24em] text-white/45 mb-7">Послание дочитавшим</div>

          <p className="text-white/85 text-[20px] sm:text-[24px] leading-[1.5] mb-7 font-light">
            Вы дочитали до конца и уделили этому <span className="gradient-text font-medium">{minutes} {minutes === 1 ? "минуту" : minutes < 5 ? "минуты" : "минут"}</span> своего времени.
          </p>

          <p className="text-body text-[16px] leading-[1.7] mb-5">
            Значит, внутри есть вопросы, на которые сложно ответить самому.
          </p>

          <p className="text-body text-[15.5px] leading-[1.7] mb-5">
            Сейчас вы можете закрыть эту страницу, сказать себе «подумаю об этом позже» — и остаться в том же круге мыслей без действий.
          </p>

          <p className="text-body text-[15.5px] leading-[1.7] mb-10">
            А можете прийти ко мне на встречу-знакомство и приложить усилие к тому, чтобы ваш запрос обрёл форму. А возможно — и решение.
          </p>

          <button
            data-testid="back-to-top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group text-body text-[15.5px] leading-[1.7] mb-10 max-w-2xl mx-auto transition-colors hover:text-white"
          >
            Если выбираете второе — листайте вверх, к записи на встречу, и бронируйте место. Я найду для вас время.
            <ArrowUp size={14} className="inline-block ml-2 text-[#B79BE0] transition-transform group-hover:-translate-y-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FinalMessage;
