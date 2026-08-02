import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Briefcase, GraduationCap, Cpu, Star, Mic, ArrowUpRight } from "lucide-react";
import homeSections from "@/content/home-sections.json";

const PARTNER_ICONS = {
  briefcase: Briefcase,
  "graduation-cap": GraduationCap,
  cpu: Cpu,
  star: Star,
  mic: Mic,
};
const CONTENT = homeSections.partnership;
const PARTNERS = CONTENT.partners.map((partner) => ({
  ...partner,
  Icon: PARTNER_ICONS[partner.icon] || Briefcase,
}));

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
        <div className="partnership-layout grid lg:grid-cols-[minmax(0,1fr)_minmax(400px,0.9fr)] gap-10 lg:gap-14 items-center w-full">
          <div>
            <div className="reveal text-[11px] uppercase tracking-[0.22em] text-white/45 mb-4">{CONTENT.eyebrow}</div>
            <h2 className="reveal text-[32px] sm:text-[42px] lg:text-[48px] font-normal text-white leading-[1.1] mb-7">
              {CONTENT.title} <span className="gradient-text">{CONTENT.accent_title}</span>
            </h2>
            <div className="reveal space-y-4 text-body text-[15px] leading-[1.7] mb-7">
              <p className="text-white/85 whitespace-pre-line">{CONTENT.intro}</p>
              <p>{CONTENT.invitation_before} <span style={{ color: "#B79BE0" }}>{CONTENT.invitation_accent}</span></p>
              <p className="text-white/75">{CONTENT.description}</p>
            </div>
            <Link
              to="/partners"
              data-testid="partnership-cta"
              className="geniq-cta"
            >
              <span>{CONTENT.button}</span>
              <span className="arrow"><ArrowUpRight size={18} strokeWidth={1.6} /></span>
            </Link>
          </div>

          <div className="reveal relative w-full max-w-[560px] mx-auto lg:mr-0">
            <div
              className="absolute -inset-6 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(118,76,176,0.14), transparent 66%)" }}
            />
            <img
              src={CONTENT.image}
              alt={CONTENT.image_alt}
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
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/45 mb-5">{CONTENT.collaborations_title}</div>
            <div className="grid sm:grid-cols-2 xl:grid-cols-5 gap-3">
              {PARTNERS.map((p, i) => {
                const Icon = p.Icon;
                return (
                  <div key={i} data-testid={`partner-${i}`} className="geniq-card p-5 flex items-center gap-4 h-full">
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
