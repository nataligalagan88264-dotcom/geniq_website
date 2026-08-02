import React, { useEffect } from "react";
import { ArrowUpRight, Briefcase, GraduationCap, Cpu, Star, Users, BadgePercent, Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TELEGRAM_URL } from "@/lib/constants";
import partnersContent from "@/content/partners.json";

const BUSINESS_ICONS = {
  briefcase: Briefcase,
  "graduation-cap": GraduationCap,
  cpu: Cpu,
  star: Star,
};
const BUSINESS_DIRECTIONS = partnersContent.business.directions.map((direction) => ({
  ...direction,
  Icon: BUSINESS_ICONS[direction.icon],
}));

const useReveal = () => {
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("in");
      });
    }, { threshold: 0.08 });
    document.querySelectorAll(".reveal").forEach((element) => obs.observe(element));
    return () => obs.disconnect();
  }, []);
};

const FormButton = ({ children, testId }) => (
  <a
    href={TELEGRAM_URL}
    target="_blank"
    rel="noopener noreferrer"
    data-testid={testId}
    className="geniq-cta"
  >
    <span>{children}</span>
    <span className="arrow"><ArrowUpRight size={18} strokeWidth={1.6} /></span>
  </a>
);

export default function Partners() {
  useReveal();

  return (
    <div data-testid="partners-page" className="min-h-screen relative overflow-x-hidden">
      <Header />
      <main className="pt-40 sm:pt-44 lg:pt-48 pb-24 relative">
        <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />

        <section className="container-geniq relative z-10 mb-20 sm:mb-24">
          <div className="grid lg:grid-cols-[7fr_5fr] gap-8 lg:gap-12 items-center">
            <div className="reveal">
              <div className="text-[11px] uppercase tracking-[0.22em] text-white/45 mb-5">{partnersContent.hero.eyebrow}</div>
              <h1 className="text-[38px] sm:text-[50px] lg:text-[58px] xl:text-[64px] font-normal text-white leading-[1.06] mb-7 max-w-[1050px] break-words">
                {partnersContent.hero.title} <span className="gradient-text">{partnersContent.hero.accent_title}</span>
              </h1>
              <p className="text-body text-[16px] sm:text-[17px] leading-[1.75] max-w-[760px] mb-8">
                {partnersContent.hero.description}
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#partners-experts" className="geniq-cta"><span>{partnersContent.hero.experts_button}</span></a>
                <a href="#partners-business" className="geniq-cta"><span>{partnersContent.hero.business_button}</span></a>
              </div>
            </div>
            <div className="reveal relative">
              <img
                src={partnersContent.hero.image}
                alt={partnersContent.hero.image_alt}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="relative w-full aspect-square object-contain mix-blend-lighten"
                style={{
                  WebkitMaskImage: "radial-gradient(ellipse 50% 44% at 50% 50%, #000 44%, rgba(0,0,0,0.88) 64%, transparent 100%)",
                  maskImage: "radial-gradient(ellipse 50% 44% at 50% 50%, #000 44%, rgba(0,0,0,0.88) 64%, transparent 100%)",
                }}
              />
            </div>
          </div>
        </section>

        <section id="partners-experts" className="container-geniq relative z-10 pt-4 sm:pt-8 mb-24 sm:mb-28 scroll-mt-36">
          <div className="grid xl:grid-cols-[1.05fr_0.95fr] gap-8 sm:gap-10 xl:gap-14 items-start">
            <div className="reveal min-w-0 max-w-3xl">
              <div className="text-[11px] uppercase tracking-[0.22em] text-white/45 mb-4">{partnersContent.experts.eyebrow}</div>
              <h2 className="text-[30px] sm:text-[40px] lg:text-[44px] font-normal text-white leading-[1.12] mb-7 break-words">
                {partnersContent.experts.title} <span className="gradient-text">{partnersContent.experts.accent_title}</span>
              </h2>
              <div className="space-y-5 text-body text-[15px] leading-[1.75]">
                {partnersContent.experts.paragraphs.map((paragraph, index) => <p key={paragraph} className={index === partnersContent.experts.paragraphs.length - 1 ? "text-white/82" : ""}>{paragraph}</p>)}
              </div>
            </div>

            <div className="reveal geniq-glass rounded-[30px] p-6 sm:p-8 lg:p-9 min-w-0 w-full max-w-3xl xl:max-w-none">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full border border-[#764CB0]/60 flex items-center justify-center bg-black/35">
                  <BadgePercent size={20} className="text-[#B79BE0]" strokeWidth={1.4} />
                </div>
                <div>
                  <div className="text-white text-[20px] font-medium">{partnersContent.experts.model_title}</div>
                  <div className="text-[#B79BE0] text-[14px]">{partnersContent.experts.model_subtitle}</div>
                </div>
              </div>
              {partnersContent.experts.model_paragraphs.map((paragraph) => <p key={paragraph} className="text-body text-[14px] leading-[1.7] mb-6">{paragraph}</p>)}
              <div className="text-[11px] uppercase tracking-[0.18em] text-white/40 mb-4">{partnersContent.experts.audience_title}</div>
              <ul className="space-y-3 mb-7">
                {partnersContent.experts.audience.map((item) => (
                  <li key={item} className="flex gap-3 text-white/75 text-[13.5px] leading-[1.55]">
                    <Check size={16} className="text-[#B79BE0] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <FormButton testId="partners-experts-cta">{partnersContent.experts.button}</FormButton>
            </div>
          </div>
        </section>

        <section id="partners-business" className="container-geniq relative z-10 pt-4 sm:pt-8 scroll-mt-36">
          <div className="reveal mb-12">
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/45 mb-4">{partnersContent.business.eyebrow}</div>
            <h2 className="text-[30px] sm:text-[40px] lg:text-[44px] font-normal text-white leading-[1.12] mb-6 break-words">
              {partnersContent.business.title} <span className="gradient-text">{partnersContent.business.accent_title}</span>
            </h2>
            <div className="space-y-4 text-body text-[15px] leading-[1.75]">
              {partnersContent.business.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>

          <div className="reveal grid sm:grid-cols-2 xl:grid-cols-4 gap-3 mb-12">
            {partnersContent.business.process.map((item, index) => (
              <div key={item} className="geniq-card p-5">
                <div className="text-[#B79BE0] text-[13px] mb-3">0{index + 1}</div>
                <p className="text-white/80 text-[14px] leading-[1.55]">{item}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-5 mb-12">
            {BUSINESS_DIRECTIONS.map(({ Icon, title, subtitle, pain, points, afterPoints, result }) => (
              <article key={title} className="reveal geniq-glass rounded-[30px] p-7 sm:p-9">
                <div className="grid xl:grid-cols-[0.75fr_1.25fr] gap-7 xl:gap-10">
                  <div className="min-w-0">
                    <div className="w-12 h-12 rounded-full border border-[#764CB0]/60 flex items-center justify-center bg-black/35 mb-5">
                      <Icon size={20} className="text-[#B79BE0]" strokeWidth={1.4} />
                    </div>
                    <h3 className="text-white text-[23px] font-medium mb-2">{title}</h3>
                    <p className="text-[#B79BE0] text-[14px] mb-5">{subtitle}</p>
                    <p className="text-body text-[14px] leading-[1.7]">{pain}</p>
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-4">Что даёт GENIQ</div>
                    <ul className="space-y-3 mb-6">
                      {points.map((point) => (
                        <li key={point} className="flex gap-3 text-white/76 text-[14px] leading-[1.6]">
                          <Check size={16} className="text-[#B79BE0] shrink-0 mt-1" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                    {afterPoints && (
                      <p className="text-body text-[14px] leading-[1.7] mb-6">{afterPoints}</p>
                    )}
                    <div className="rounded-2xl border border-[#764CB0]/35 bg-[#764CB0]/10 p-5">
                      <span className="text-white/45 text-[11px] uppercase tracking-[0.18em]">Итог</span>
                      <p className="text-white/82 text-[14px] leading-[1.65] mt-2">{result}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="reveal geniq-glass rounded-[30px] p-7 sm:p-9 lg:p-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-7">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-3">
                <Users size={19} className="text-[#B79BE0]" />
                <h3 className="text-white text-[22px] font-medium">{partnersContent.business.briefing_title}</h3>
              </div>
              <p className="text-body text-[14px] leading-[1.7]">{partnersContent.business.briefing_text}</p>
            </div>
            <FormButton testId="partners-business-cta">{partnersContent.business.button}</FormButton>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
