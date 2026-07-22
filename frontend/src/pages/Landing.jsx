import React, { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Section2 from "@/components/Section2";
import Section3 from "@/components/Section3";
import Section4 from "@/components/Section4";
import Section5 from "@/components/Section5";
import Section6Products from "@/components/Section6Products";
import NeurotypeGallery from "@/components/NeurotypeGallery";
import CodeMapSection from "@/components/CodeMapSection";
import ReviewsMosaic from "@/components/ReviewsMosaic";
import AuthorSection from "@/components/AuthorSection";
import PartnershipSection from "@/components/PartnershipSection";
import FaqSection from "@/components/FaqSection";
import FinalMessage from "@/components/FinalMessage";

export default function Landing() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); });
    }, { threshold: 0.1 });
    els.forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, []);

  return (
    <div data-testid="landing-page" className="relative">
      <Header />
      <main>
        {/* Block 1 — Hero */}
        <Hero />

        {/* Block 2 — Шкаф + статистика + переход + сферы применения + финальный мостик */}
        <Section2 />
        <Section3 />
        <Section4 />
        <Section5 />

        {/* Block 3 — Как работает система (9 нейротипов / marquee gallery) */}
        <NeurotypeGallery />

        {/* Block 3b — GENIQ Code Map (5 осей) */}
        <CodeMapSection />

        {/* Block 4 — Продукты */}
        <Section6Products />

        {/* Block 5 — Об авторе */}
        <AuthorSection />

        {/* Block 6 — Отзывы клиентов */}
        <ReviewsMosaic />

        {/* Block 7 — Партнёрство */}
        <PartnershipSection />

        {/* Block 8 — FAQ */}
        <FaqSection />

        {/* Block 9 — Послание дочитавшим */}
        <FinalMessage />
      </main>
      {/* Block 10 — Footer */}
      <Footer />
    </div>
  );
}
