import React, { useEffect, useRef } from "react";
import { NATALI_PHOTO } from "@/lib/constants";
import authorContent from "@/content/author.json";

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

export const AuthorSection = () => {
  const ref = useReveal();
  return (
    <section ref={ref} data-testid="section-author" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />
      <div className="container-geniq relative z-10">
        <div className="grid lg:grid-cols-[minmax(0,1.35fr)_minmax(340px,0.85fr)] gap-10 lg:gap-x-16 lg:gap-y-8 items-start">
          <div className="lg:col-span-2">
            <div className="reveal text-[11px] uppercase tracking-[0.22em] text-white/45 mb-5">{authorContent.eyebrow}</div>
            <h2 className="reveal text-[32px] sm:text-[40px] lg:text-[44px] font-normal text-white leading-[1.1]">
              {authorContent.title} <span className="gradient-text">{authorContent.accent_title}</span> {authorContent.title_suffix}
            </h2>
          </div>

          <div className="reveal w-full max-w-[480px] mx-auto lg:col-start-2 lg:row-start-2 lg:mt-4 lg:ml-auto lg:mr-0">
            <div className="aspect-[3/4] rounded-3xl border border-[#764CB0]/40 relative overflow-hidden">
              <img src={NATALI_PHOTO} alt={authorContent.card.alt} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/15 pointer-events-none" />
              <div className="absolute inset-3 rounded-2xl border border-white/10 pointer-events-none" />
              <div className="absolute left-0 right-0 bottom-0 p-6 z-10">
                <div className="text-[10px] uppercase tracking-[0.22em] text-[#B79BE0] mb-2">{authorContent.card.eyebrow}</div>
                <div className="text-white text-[20px] font-medium">{authorContent.card.name}</div>
                <div className="text-white/60 text-[12px] mt-1">{authorContent.card.role}</div>
                <div className="mt-4 w-10 h-px bg-[#B79BE0]/60" />
                <div className="text-white/55 text-[11px] mt-3 uppercase tracking-[0.18em]">{authorContent.card.proof}</div>
              </div>
            </div>
          </div>

          <div className="reveal lg:col-start-1 lg:row-start-2 space-y-5 text-body text-[15px] leading-[1.72]">
            {authorContent.paragraphs.slice(0, 6).map((paragraph, index) => (
              <p key={index} className={paragraph.variant === "quote" ? "border-l border-[#B79BE0]/60 pl-5 text-[#C8ADEE] text-[18px] sm:text-[20px] leading-[1.55]" : ""}>
                {paragraph.variant === "lead" ? <strong className="font-medium text-white">{paragraph.text}</strong> : paragraph.text}
              </p>
            ))}
          </div>

          <div className="reveal lg:col-span-2 space-y-4 text-body text-[15px] leading-[1.72]">
            {authorContent.paragraphs.slice(6).map((paragraph, index) => (
              <p key={index} className={paragraph.variant === "proof" ? "author-proof-highlight" : paragraph.variant === "transition" ? "author-reviews-transition" : ""}>{paragraph.text}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthorSection;
