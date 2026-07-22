import React, { useEffect, useRef } from "react";
import { GraduationCap, ScrollText, Home, X } from "lucide-react";
import WardrobeSvg from "./WardrobeSvg";

const CARDS = [
  {
    id: "school",
    title: "Школа",
    text: "Учили быть удобным, покорным и не выделяться.",
    Icon: GraduationCap,
    accent: "#6080F1",
  },
  {
    id: "university",
    title: "Университет",
    text: "Учили профессии — но не рассказали, как в ней развиваться именно вам.",
    Icon: ScrollText,
    accent: "#F1D160",
  },
  {
    id: "family",
    title: "Семья",
    text: "Учили «как надо» — а не «как вам естественнее».",
    Icon: Home,
    accent: "#7EC8A0",
  },
];

const STATS = [
  { id: "s1", text: "Каждое утро миллионы людей просыпаются с одним вопросом:", highlight: "на правильном ли я пути?" },
  { id: "s2", text: "выбрали бы другую профессию, будь возможность начать заново. Superjob, 2025", highlight: "55% людей" },
  { id: "s3", text: "Многие ощущают в себе силу на большее, но годами", highlight: "держат идеи при себе" },
];

const useReveal = () => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const els = el.querySelectorAll(".reveal");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("in");
      });
    }, { threshold: 0.12 });
    els.forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, []);
  return ref;
};

export const Section2 = () => {
  const ref = useReveal();
  return (
    <section ref={ref} data-testid="section-wardrobe" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none"
           style={{ background: "radial-gradient(circle, rgba(118,76,176,0.10), transparent 60%)" }} />

      <div className="container-geniq relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* LEFT: text + cards */}
          <div className="lg:col-span-7">
            <h2 className="reveal text-[34px] sm:text-[42px] lg:text-[48px] font-medium leading-[1.08] text-white mb-10 max-w-[640px]">
              Где прячется наша уникальность
            </h2>

            <div className="reveal space-y-5 text-body text-[15.5px] leading-[1.7] max-w-[600px]">
              <p>
                Представьте: вам дали шкаф и сказали собрать — сотни деталей, крепежей, панелей.{" "}
                <span className="text-violet-strong" style={{ color: "#B79BE0" }}>И ни одной инструкции.</span>
              </p>
              <p>
                Вы собираете наугад: <span style={{ color: "#B79BE0" }}>что-то держится, что-то рассыпается</span>. И устаёте, потому что без схемы любая сборка превращается в борьбу.
              </p>
              <p>
                Именно это происходит, когда вы живёте <span style={{ color: "#B79BE0" }}>без понимания себя</span> и своих природных способностей.
              </p>
              <p>
                <span style={{ color: "#B79BE0" }}>Инструкцию к себе приходится собирать по крупицам</span> — потому что её никто не дал:
              </p>
            </div>

            {/* 3 cards */}
            <div className="grid sm:grid-cols-3 gap-4 mt-10">
              {CARDS.map((c) => {
                const Icon = c.Icon;
                return (
                  <div key={c.id} data-testid={`card-${c.id}`} className="reveal geniq-card geniq-card-spotlight p-6 relative overflow-hidden">
                    <div className="flex items-start justify-between mb-5">
                      <h3 className="text-white text-[17px] font-medium">{c.title}</h3>
                      <div className="w-10 h-10 rounded-full flex items-center justify-center border" style={{ borderColor: `${c.accent}80` }}>
                        <Icon size={18} strokeWidth={1.4} style={{ color: c.accent }} />
                      </div>
                    </div>
                    <p className="text-body text-[13.5px] leading-[1.55]">{c.text}</p>
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white pulse-dot" style={{ boxShadow: `0 0 14px ${c.accent}` }} />
                  </div>
                );
              })}
            </div>

            <p className="reveal mt-8 text-body text-[15px] max-w-[600px]">
              И вот вы, со всеми своими деталями, пытаетесь собрать себя <span style={{ color: "#B79BE0" }}>на ощупь и интуитивно</span>.
            </p>
          </div>

          {/* RIGHT: wardrobe illustration */}
          <div className="lg:col-span-5 reveal relative">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-10 right-10 w-[400px] h-[400px] rounded-full"
                   style={{ background: "radial-gradient(circle, rgba(118,76,176,0.12), transparent 60%)" }} />
            </div>
            <WardrobeSvg />
          </div>
        </div>

        {/* Statistics panel */}
        <div data-testid="stats-panel" className="reveal mt-20 geniq-glass rounded-[28px] p-7 sm:p-9 grid lg:grid-cols-4 gap-6 items-center">
          <div className="lg:col-span-1">
            <div className="text-white text-[18px] font-medium mb-3">Это не единичная история</div>
            <div className="h-px w-16 bg-gradient-to-r from-[#764CB0] to-transparent" />
            <div className="mt-3 w-2 h-2 rounded-full bg-[#B79BE0] pulse-dot" />
          </div>
          {STATS.map((s) => (
            <div key={s.id} data-testid={`stat-${s.id}`} className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-md border border-[#764CB0]/50 flex items-center justify-center shrink-0 bg-black/40">
                <X size={20} strokeWidth={1.4} className="text-[#B79BE0]" />
              </div>
              <p className="text-body text-[13px] leading-[1.55]">
                {s.id === "s1" && <>{s.text} <span style={{ color: "#B79BE0" }}>{s.highlight}</span></>}
                {s.id === "s2" && <><span style={{ color: "#B79BE0" }}>{s.highlight} </span>{s.text}</>}
                {s.id === "s3" && <>{s.text} <span style={{ color: "#B79BE0" }}>{s.highlight}</span>, не решаясь начать.</>}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section2;
