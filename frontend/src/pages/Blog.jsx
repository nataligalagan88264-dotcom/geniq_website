import React, { useEffect } from "react";
import { BookOpen, Brain, Compass, Sparkles, Heart, Layers } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CtaButton from "@/components/CtaButton";
import blogContent from "@/content/blog.json";

const ICONS = { book: BookOpen, brain: Brain, compass: Compass, sparkles: Sparkles, heart: Heart, layers: Layers };
const CATEGORIES = blogContent.categories.map((category) => ({
  ...category,
  Icon: ICONS[category.icon] || BookOpen,
}));
const TEASERS = blogContent.articles;

export default function Blog() {
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); });
    }, { threshold: 0.08 });
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div data-testid="blog-page" className="min-h-screen relative">
      <Header />
      <main className="pt-52 sm:pt-56 pb-24 container-geniq relative">
        <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />

        {/* Hero */}
        <div className="max-w-3xl mb-20 reveal">
          <div className="text-[11px] uppercase tracking-[0.22em] text-white/45 mb-5">{blogContent.hero.eyebrow}</div>
          <h1 className="text-[40px] sm:text-[56px] lg:text-[64px] font-normal text-white leading-[1.05] mb-7">
            <span className="gradient-text">{blogContent.hero.title}</span> {blogContent.hero.title_suffix}
          </h1>
          <p className="text-body text-[17px] leading-[1.7] max-w-[680px]">
            {blogContent.hero.description}
          </p>
        </div>

        {/* Status */}
        <section className="mb-16 reveal">
          <div className="geniq-glass rounded-[28px] p-8 sm:p-10 max-w-3xl relative overflow-hidden">
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full bg-[#764CB0]/15 border border-[#B79BE0]/50 flex items-center justify-center shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-[#B79BE0] pulse-dot" />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-[#B79BE0] mb-2">{blogContent.status.eyebrow}</div>
                <h2 className="text-white text-[22px] sm:text-[26px] font-medium leading-snug mb-3">
                  {blogContent.status.title}
                </h2>
                <p className="text-body text-[14px] leading-[1.65] max-w-xl">
                  {blogContent.status.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Categories preview */}
        <section className="mb-20">
          <div className="reveal mb-8 max-w-3xl">
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/45 mb-3">Coming categories</div>
            <h2 className="text-[24px] sm:text-[30px] font-normal text-white leading-[1.15]">
              О чём будет <span className="gradient-text">блог</span>
            </h2>
          </div>
          <div className="blog-category-grid grid grid-cols-2 md:grid-cols-3 gap-4">
            {CATEGORIES.map((c) => {
              const Icon = c.Icon;
              return (
                <div key={c.id} data-testid={`category-${c.id}`} className="blog-category-card reveal geniq-card p-4 sm:p-5 flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 rounded-full border border-[#764CB0]/50 flex items-center justify-center bg-black/40 shrink-0">
                    <Icon size={16} strokeWidth={1.4} className="text-[#B79BE0]" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-white text-[14px] font-medium leading-tight">{c.name}</div>
                    <div className="text-white/40 text-[11px] mt-1">~{c.count} статей</div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Article teasers */}
        <section className="mb-24">
          <div className="reveal mb-8 max-w-3xl">
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/45 mb-3">Coming soon</div>
            <h2 className="text-[24px] sm:text-[30px] font-normal text-white leading-[1.15]">
              Первые <span className="gradient-text">статьи</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {TEASERS.map((t, i) => (
              <article key={i} data-testid={`teaser-${i}`} className="reveal geniq-card p-7 flex flex-col">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-[#B79BE0]">{t.category}</span>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-white/35 px-2 py-1 rounded-full border border-white/10">{t.date}</span>
                </div>
                {t.image && <img src={t.image} alt="" className="w-full aspect-video object-cover rounded-xl mb-5" />}
                <h3 className="text-white text-[17px] font-medium leading-[1.3] mb-4">
                  {t.url ? <a href={t.url}>{t.title}</a> : t.title}
                </h3>
                <p className="text-body text-[13.5px] leading-[1.65] flex-1">{t.excerpt}</p>
                <div className="mt-5 h-px w-full bg-gradient-to-r from-[#764CB0]/30 to-transparent" />
              </article>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="reveal">
          <div className="geniq-glass rounded-[32px] p-10 sm:p-14 text-center relative overflow-hidden">
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
                 style={{ background: "radial-gradient(circle, rgba(118,76,176,0.18), transparent 60%)" }} />
            <h2 className="text-[26px] sm:text-[34px] font-normal text-white leading-[1.2] max-w-2xl mx-auto mb-8 relative z-10">
              {blogContent.cta.title} <span className="gradient-text">{blogContent.cta.accent_title}</span>
            </h2>
            <div className="flex justify-center relative z-10">
              <CtaButton testId="blog-test-cta">{blogContent.cta.button}</CtaButton>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
