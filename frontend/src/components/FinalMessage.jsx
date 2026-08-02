import React, { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import homeSections from "@/content/home-sections.json";

const CONTENT = homeSections.final_message;

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
          <div className="text-[11px] uppercase tracking-[0.24em] text-white/45 mb-7">{CONTENT.eyebrow}</div>

          <p className="text-white/85 text-[20px] sm:text-[24px] leading-[1.5] mb-7 font-light">
            {CONTENT.time_before} <span className="gradient-text font-medium">{minutes} {minutes === 1 ? "минуту" : minutes < 5 ? "минуты" : "минут"}</span> {CONTENT.time_after}
          </p>

          <p className="text-body text-[16px] leading-[1.7] mb-5">
            {CONTENT.intro}
          </p>

          <p className="text-white/82 text-[20px] sm:text-[25px] leading-[1.55] mb-5">
            {CONTENT.choice_one_before} <span className="text-[#B79BE0]">{CONTENT.choice_one_accent}</span> {CONTENT.choice_one_after}
          </p>

          <p className="text-white/82 text-[20px] sm:text-[25px] leading-[1.55] mb-9">
            {CONTENT.choice_two_before} <span className="text-[#B79BE0]">{CONTENT.choice_two_accent}</span>{CONTENT.choice_two_after}
          </p>

          <div className="max-w-[860px] mx-auto mb-10">
            <img
              src={CONTENT.image}
              alt={CONTENT.image_alt}
              loading="lazy"
              decoding="async"
              className="w-full aspect-[3/2] object-contain"
            />
            <div className="grid grid-cols-2 gap-4 sm:gap-10 -mt-2 sm:-mt-4">
              <p className="text-[13px] sm:text-[16px] leading-[1.45] text-white/55">{CONTENT.left_caption}</p>
              <p className="text-[13px] sm:text-[16px] leading-[1.45] text-white/88">{CONTENT.right_caption}</p>
            </div>
          </div>

          <button
            data-testid="back-to-top"
            onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth", block: "start" })}
            className="group text-body text-[15.5px] leading-[1.7] mb-10 max-w-2xl mx-auto transition-colors hover:text-white"
          >
            {CONTENT.back_to_top}
            <ArrowUp size={32} className="inline-block ml-2 text-[#B79BE0] transition-transform group-hover:-translate-y-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FinalMessage;
