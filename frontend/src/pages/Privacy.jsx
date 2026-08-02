import React, { useEffect } from "react";
import { Shield, Mail, Phone, Send } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LEGAL } from "@/lib/constants";
import privacyContent from "@/content/privacy.json";

const fillLegal = (text) => Object.entries(LEGAL).reduce(
  (result, [key, value]) => result.replaceAll(`{${key}}`, value),
  text,
);

export default function Privacy() {
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); });
    }, { threshold: 0.08 });
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div data-testid="privacy-page" className="min-h-screen relative">
      <Header />
      <main className="pt-52 sm:pt-56 pb-24 container-geniq relative">
        <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />

        {/* Hero */}
        <div className="mb-16 reveal">
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-white/45 mb-5">
            <Shield size={14} className="text-[#B79BE0]" />
            {privacyContent.hero.eyebrow}
          </div>
          <h1 className="text-[36px] sm:text-[48px] lg:text-[56px] font-normal text-white leading-[1.08] mb-6">
            {privacyContent.hero.title} <span className="gradient-text">{privacyContent.hero.accent_title}</span>
          </h1>
          <p className="text-body text-[15px] leading-[1.7] max-w-[640px]">
            {privacyContent.hero.description}
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-3">
          {privacyContent.sections.map((section) => (
            <details key={section.number} data-testid={`privacy-${section.number}`} className="reveal geniq-card p-6 group cursor-pointer">
              <summary className="flex items-start justify-between gap-4 list-none [&::-webkit-details-marker]:hidden">
                <div className="flex items-baseline gap-4">
                  <span className="text-[#B79BE0] text-[13px] font-medium min-w-[24px]">{section.number}.</span>
                  <h3 className="text-white text-[15.5px] font-medium leading-snug pr-4">{section.title}</h3>
                </div>
                <span className="text-[#B79BE0] text-2xl leading-none transition-transform group-open:rotate-45 shrink-0">+</span>
              </summary>
              <div className="text-body text-[14px] leading-[1.75] mt-4 pt-4 border-t border-white/5 space-y-3">
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{fillLegal(paragraph)}</p>)}
                {section.bullets.length > 0 && (
                  <ul className="space-y-1.5 list-none mt-3">
                    {section.bullets.map((bullet) => <li key={bullet}>· {fillLegal(bullet)}</li>)}
                  </ul>
                )}
              </div>
            </details>
          ))}
        </div>

        {/* Contacts block */}
        <section className="reveal mt-16">
          <div className="geniq-glass rounded-[28px] p-8 sm:p-10">
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/45 mb-4">{privacyContent.contacts_title}</div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <div className="text-white text-[16px] font-medium mb-3">{LEGAL.ip}</div>
                <div className="text-body text-[13.5px] space-y-1">
                  <div>ИНН: <span className="text-white">{LEGAL.inn}</span></div>
                  <div>ОГРНИП: <span className="text-white">{LEGAL.ogrnip}</span></div>
                </div>
              </div>
              <div className="space-y-3 text-[13.5px]">
                <div className="flex items-center gap-3">
                  <Mail size={14} className="text-[#B79BE0]" />
                  <a href={`mailto:${LEGAL.email}`} className="text-white/85 hover:text-white">{LEGAL.email}</a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={14} className="text-[#B79BE0]" />
                  <a href={`tel:${LEGAL.phone.replace(/\s/g, "")}`} className="text-white/85 hover:text-white">{LEGAL.phone}</a>
                </div>
                <div className="flex items-center gap-3">
                  <Send size={14} className="text-[#B79BE0]" />
                  <span className="text-white/85">{LEGAL.site}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
