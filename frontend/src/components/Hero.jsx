import React, { useEffect, useState } from "react";
import CtaButton from "./CtaButton";
import { Brain, Sparkles, Fingerprint, Battery, Eye } from "lucide-react";
import homeContent from "@/content/home.json";

const ICONS = { brain: Brain, sparkles: Sparkles, fingerprint: Fingerprint, battery: Battery, eye: Eye };
const HERO = homeContent.hero;
const AXES = HERO.axes.map((axis) => ({
  ...axis,
  sub: axis.subtitle,
  Icon: ICONS[axis.icon] || Brain,
}));

export const Hero = () => {
  const [active, setActive] = useState(0);

  // rotate active axis dot
  useEffect(() => {
    const t = setInterval(() => setActive((i) => (i + 1) % AXES.length), 4200);
    return () => clearInterval(t);
  }, []);

  return (
    <section data-testid="hero-section" className="relative min-h-screen pt-28 pb-12 overflow-hidden">
      {/* background dotted constellation */}
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 -left-40 w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle, rgba(96,128,241,0.10), transparent 60%)" }} />
      </div>

      <div className="container-geniq flex items-center relative z-10 min-h-0 lg:min-h-[68vh]">
        {/* LEFT: text */}
        <div className="max-w-[650px]">
          <div className="inline-flex items-center gap-2 mb-7 px-4 py-2 rounded-full border border-white/10 bg-black/40 backdrop-blur-sm reveal in">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B79BE0] pulse-dot" />
            <span className="text-[11px] uppercase tracking-[0.22em] text-white/60">{HERO.eyebrow}</span>
          </div>

          <h1 className="text-[44px] sm:text-[56px] lg:text-[64px] font-normal leading-[1.04] mb-7 reveal in">
            <span className="block text-white">{HERO.title}</span>
            <span className="block gradient-text">{HERO.accent_title}</span>
          </h1>

          <p className="text-body text-base sm:text-[17px] leading-[1.65] mb-10 max-w-[560px] reveal in" style={{ transitionDelay: '120ms' }}>
            {HERO.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 reveal in" style={{ transitionDelay: '200ms' }}>
            <CtaButton testId="hero-cta">{HERO.button}</CtaButton>
            <div className="hidden sm:flex items-center gap-3 text-white/50 text-xs uppercase tracking-[0.2em]">
              <span className="w-8 h-px bg-white/20" />
              {HERO.meta}
            </div>
          </div>
        </div>

      </div>

      {/* Background video layer */}
      <div className="hero-video-stage">
        <div className="absolute inset-0 hero-model-backdrop pointer-events-none" />
        <div className="absolute inset-0 hero-model-edge-mask pointer-events-none z-[2]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="orbit-ring spin-slow" style={{ width: 460, height: 460, opacity: 0.35 }} />
          <div className="orbit-ring spin-reverse" style={{ width: 560, height: 560, opacity: 0.22, position: 'absolute' }} />
          <div className="orbit-ring spin-slow" style={{ width: 660, height: 660, opacity: 0.12, position: 'absolute' }} />
        </div>
        <video
          data-testid="hero-head-video"
          className="hero-head-video absolute inset-0 w-full h-full"
          src={HERO.video}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
      </div>

      {/* Bottom 5-icon panel */}
      <div className="container-geniq relative z-10 mt-10">
        <div data-testid="axis-panel" className="geniq-glass rounded-[28px] p-6 sm:p-7 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-2 relative overflow-hidden">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full pointer-events-none"
               style={{ background: "radial-gradient(circle, rgba(118,76,176,0.10), transparent 60%)" }} />

          {AXES.map((a, idx) => {
            const Icon = a.Icon;
            const isActive = idx === active;
            return (
              <div
                key={a.id}
                data-testid={`axis-${a.id}`}
                onMouseEnter={() => setActive(idx)}
                className={`group relative flex items-center gap-4 px-3 py-3 cursor-default ${
                  idx < AXES.length - 1 ? "lg:border-r lg:border-white/5" : ""
                }`}
              >
                <div
                  className={`relative w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-500 ${
                    isActive
                      ? "border-[#B79BE0] bg-[#764CB0]/15"
                      : "border-white/10 bg-white/[0.02] group-hover:border-[#B79BE0]/60"
                  }`}
                >
                  <Icon size={20} strokeWidth={1.4} className={isActive ? "text-[#C9B0F0]" : "text-white/75"} />
                  {isActive && <span className="absolute inset-0 rounded-full" style={{ boxShadow: "0 0 22px rgba(118,76,176,0.55)" }} />}
                </div>
                <div className="min-w-0">
                  <div className="text-[14px] font-medium text-white leading-tight">{a.title}</div>
                  <div className="text-[11px] text-white/55 leading-snug">{a.sub}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Hero;
