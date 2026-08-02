import React, { useEffect, useRef } from "react";
import { Sparkles, Compass, Map, ArrowUpRight } from "lucide-react";
import { FORM_URL } from "@/lib/constants";
import homeContent from "@/content/home.json";

const PRODUCT_ICONS = { compass: Compass, sparkles: Sparkles, map: Map };
const PRODUCT_CONTENT = homeContent.products;
const PRODUCTS = PRODUCT_CONTENT.items.map((product) => ({
  ...product,
  Icon: PRODUCT_ICONS[product.icon] || Compass,
}));

const useReveal = () => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const els = el.querySelectorAll(".reveal");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); });
    }, { threshold: 0.08 });
    els.forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, []);
  return ref;
};

export const Section6Products = () => {
  const ref = useReveal();
  return (
    <section id="services" ref={ref} data-testid="section-products" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />
      <div className="absolute top-1/4 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
           style={{ background: "radial-gradient(circle, rgba(118,76,176,0.12), transparent 60%)" }} />

      <div className="container-geniq relative z-10">
        <div className="mb-14">
          <div className="reveal text-[11px] uppercase tracking-[0.22em] text-white/45 mb-4">{PRODUCT_CONTENT.eyebrow}</div>
          <h2 className="reveal text-[32px] sm:text-[42px] lg:text-[48px] font-normal leading-[1.1] text-white mb-5">
            {PRODUCT_CONTENT.title} <span className="gradient-text">{PRODUCT_CONTENT.accent_title}</span>
          </h2>
          <p className="reveal text-body text-[16px] leading-[1.65] max-w-[640px]">
            {PRODUCT_CONTENT.description}
            <span className="block text-white/45 text-[13px] mt-2 italic">{PRODUCT_CONTENT.note}</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {PRODUCTS.map((p) => {
            const Icon = p.Icon;
            return (
              <div
                key={p.id}
                data-testid={`product-${p.id}`}
                className={`reveal geniq-card p-7 sm:p-9 relative overflow-hidden flex flex-col ${
                  p.featured ? "border-[#B79BE0]/70" : ""
                }`}
                style={p.featured ? { boxShadow: "0 0 64px -10px rgba(118,76,176,0.4)" } : {}}
              >
                {p.featured && (
                  <div className="absolute top-5 right-5 px-3 py-1 rounded-full border border-[#B79BE0]/60 bg-[#764CB0]/15 text-[10px] uppercase tracking-[0.18em] text-[#C9B0F0]">
                    {PRODUCT_CONTENT.recommended_label}
                  </div>
                )}

                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full border border-[#764CB0]/60 flex items-center justify-center bg-black/40 shrink-0">
                    <Icon size={20} strokeWidth={1.4} className="text-[#B79BE0]" />
                  </div>
                </div>

                <div className="mb-5">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-white/45 mb-2">{p.step}</div>
                  <h3 className="text-white text-[20px] sm:text-[22px] font-medium leading-snug mb-3">{p.title}</h3>
                  <p className="text-[#C9B0F0] text-[13px] leading-[1.55] italic mb-4">{p.intent}</p>
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-[28px] sm:text-[32px] font-medium gradient-text">{p.price}</span>
                  </div>
                  <div className="text-[12px] text-white/50">{p.duration}</div>
                </div>

                <p className="text-body text-[14px] leading-[1.6] mb-5">{p.description}</p>

                <ul className="space-y-2.5 mb-7 flex-1">
                  {p.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-3 text-[13.5px] text-white/75 leading-[1.5]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B79BE0] mt-2 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                {p.id === "diagnostics" && (
                  <details className="mb-6 rounded-2xl border border-white/10 bg-black/20 group">
                    <summary className="list-none [&::-webkit-details-marker]:hidden cursor-pointer px-5 py-4 flex items-center justify-between gap-4 text-white/80 text-[13px]">
                      <span>{PRODUCT_CONTENT.details_label}</span>
                      <span className="text-[#B79BE0] text-xl transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <div className="border-t border-white/8 p-5">
                      <p className="text-body text-[13.5px] leading-[1.7] mb-5">
                        {PRODUCT_CONTENT.diagnostics.intro}
                      </p>
                      <div className="space-y-3">
                        {PRODUCT_CONTENT.diagnostics.stages.map((stage) => (
                          <div key={stage.title} className="rounded-xl border border-white/8 bg-black/20 p-4">
                            <h4 className="text-white text-[14px] font-medium mb-2">{stage.title}</h4>
                            <div className="space-y-2 text-body text-[12.5px] leading-[1.65]">
                              <p><strong className="font-medium text-white/75">Что происходит:</strong> {stage.what}</p>
                              <p><strong className="font-medium text-white/75">Что получаете:</strong> {stage.result}</p>
                              <p><strong className="font-medium text-white/75">На что влияет:</strong> {stage.impact}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </details>
                )}

                {p.id === "tracks" && (
                  <details className="mb-6 rounded-2xl border border-white/10 bg-black/20 group">
                    <summary className="list-none [&::-webkit-details-marker]:hidden cursor-pointer px-5 py-4 flex items-center justify-between gap-4 text-white/80 text-[13px]">
                      <span>{PRODUCT_CONTENT.details_label}</span>
                      <span className="text-[#B79BE0] text-xl transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <div className="border-t border-white/8 p-5">
                      <div className="space-y-4 text-body text-[13.5px] leading-[1.7] mb-5">
                        <p>{PRODUCT_CONTENT.tracks.intro}</p>
                        <ol className="space-y-3 list-decimal list-inside">
                          {PRODUCT_CONTENT.tracks.stages.map((stage) => (
                            <li key={stage.title}><strong className="font-medium text-white/85">{stage.title}.</strong> {stage.text}</li>
                          ))}
                        </ol>
                        <p className="text-white/75"><strong className="font-medium">Итог:</strong> {PRODUCT_CONTENT.tracks.result}</p>
                      </div>
                      <div className="space-y-3">
                        {PRODUCT_CONTENT.tracks.directions.map((track) => (
                          <details key={track.title} className="rounded-xl border border-white/8 bg-black/20 group/track">
                            <summary className="list-none [&::-webkit-details-marker]:hidden cursor-pointer p-4 flex justify-between gap-4">
                              <div>
                                <h4 className="text-white text-[14px] font-medium">{track.title}</h4>
                                <p className="text-[#B79BE0] text-[11.5px] leading-[1.5] mt-1">{track.meta}</p>
                              </div>
                              <span className="text-[#B79BE0] transition-transform group-open/track:rotate-45">+</span>
                            </summary>
                            <div className="px-4 pb-4 text-body text-[12.5px] leading-[1.65]">
                              <div className="space-y-3">
                                {track.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                              </div>
                              {track.bullets && <ul className="list-disc list-inside space-y-1.5 mt-3">{track.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
                              <p className="text-white/76 mt-3"><strong className="font-medium">Забираете:</strong> {track.result}</p>
                            </div>
                          </details>
                        ))}
                      </div>
                    </div>
                  </details>
                )}

                <a
                  href={FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`product-cta-${p.id}`}
                  className="geniq-cta self-start mt-auto"
                >
                  <span>{p.cta}</span>
                  <span className="arrow"><ArrowUpRight size={18} strokeWidth={1.6} /></span>
                </a>
              </div>
            );
          })}
        </div>

        <p className="reveal text-center text-white/45 text-[13px] mt-10 max-w-2xl mx-auto">
          {PRODUCT_CONTENT.footer_note}
        </p>

        <div data-testid="section-limitations" className="reveal mt-20">
          <div className="mb-10">
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/45 mb-4">{PRODUCT_CONTENT.limitations.eyebrow}</div>
            <h3 className="text-[28px] sm:text-[36px] font-normal text-white leading-[1.15] mb-4">
              {PRODUCT_CONTENT.limitations.title} <span className="gradient-text">{PRODUCT_CONTENT.limitations.accent_title}</span>
            </h3>
            <p className="text-body text-[15px] leading-[1.7]">
              {PRODUCT_CONTENT.limitations.description}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {PRODUCT_CONTENT.limitations.items.map((item, i) => (
              <div key={item.title} className="geniq-card p-6">
                <div className="text-[#B79BE0] text-[18px] font-medium mb-3">0{i + 1}</div>
                <h4 className="text-white text-[16px] font-medium leading-snug mb-3">{item.title}</h4>
                <p className="text-body text-[13px] leading-[1.65]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section6Products;
