import React, { useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CtaButton from "@/components/CtaButton";
import { FORM_URL } from "@/lib/constants";

const STEPS = [
  { n: "01", title: "Глубинное интервью", text: "Сбор данных через структурированную беседу. Не тест — а живой разговор, где раскрывается ваша конфигурация." },
  { n: "02", title: "Сборка карты", text: "9 нейротипов раскладываются по 5 осям: CORE, DRIVE, ACTION, RECOVERY, SHADOW. Карта собирается под вас." },
  { n: "03", title: "Расшифровка параметров", text: "22-страничный персональный нейропрофиль. Каждый параметр — с описанием и рекомендацией." },
  { n: "04", title: "Стратегия и применение", text: "Карта переводится в стратегию под ваш запрос: ниша, действие, восстановление, отношения." },
];

const COMPARE = [
  {
    title: "Стандартные типологии (MBTI и др.)",
    items: ["Один тип на всю жизнь", "Без учёта индивидуальной истории", "Знание «уходит на полку»", "Описывает фасад дома"],
    bad: true,
  },
  {
    title: "GENIQ",
    items: ["Карта из 9 нейротипов под вас", "Учитывает опыт, среду, традиции", "Конкретный маршрут и стратегия", "Конструкция, планировка и инженерия"],
    bad: false,
  },
];

const FAQ = [
  {
    q: "На чём это основано — наука или эзотерика?",
    a: "Основа научная: современные исследования мозга, когнитивные науки и психология личности. Также — Юнг и системно-векторная психология, переложенные на современные реалии. В систему вошло только то, что давало стабильный, проверяемый результат.",
  },
  {
    q: "Это психотерапия?",
    a: "Нет. Мы не работаем с эмоциями и болью напрямую. Но люди часто находят в диагностике ответы, которые сами по себе снимают некоторые состояния — за счёт появившейся ясности. Если работаете с терапевтом — диагностика усиливает эту работу.",
  },
  {
    q: "Это даст практический результат?",
    a: "Да. Понимание себя — не финал, а инструмент. На выходе — карта и стратегия под ваш конкретный запрос: где сила, как действовать, что меняет результат. Применимо сразу к карьере, делу, отношениям.",
  },
  {
    q: "Я уже много про себя знаю. Что это добавит?",
    a: "Я не просто говорю, какой вы человек. Я отвечаю на вопрос «почему» — и что с этим делать здесь и сейчас. Работаю с теми, кто хочет узнать себя глубже — с исследователями и новаторами.",
  },
];

const useReveal = () => {
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); });
    }, { threshold: 0.08 });
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
};

export default function Approach() {
  useReveal();

  return (
    <div data-testid="approach-page" className="min-h-screen relative">
      <Header />
      <main className="pt-52 sm:pt-56 pb-24 container-geniq relative">
        <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />

        {/* Hero */}
        <div className="max-w-3xl mb-20 reveal">
          <div className="text-[11px] uppercase tracking-[0.22em] text-white/45 mb-5">GENIQ · Approach</div>
          <h1 className="text-[40px] sm:text-[56px] lg:text-[64px] font-normal text-white leading-[1.05] mb-7">
            <span className="gradient-text">Подход</span> и методология
          </h1>
          <p className="text-body text-[17px] leading-[1.7] max-w-[680px]">
            GENIQ — это не тест и не типология. Это интеллектуальная диагностическая система: глубокое интервью + авторская модель + 22-страничный нейропрофиль. Работа всегда личная и не массовая.
          </p>
        </div>

        {/* Steps */}
        <section className="mb-24">
          <div className="reveal mb-10 max-w-3xl">
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/45 mb-4">How it works</div>
            <h2 className="text-[28px] sm:text-[36px] font-normal text-white leading-[1.15]">
              Как работает <span className="gradient-text">диагностика</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {STEPS.map((s, i) => (
              <div key={s.n} data-testid={`step-${s.n}`} className="reveal geniq-card p-6 relative">
                <div className="text-[#B79BE0] text-[36px] font-medium leading-none mb-4 opacity-50">{s.n}</div>
                <h3 className="text-white text-[16px] font-medium mb-3">{s.title}</h3>
                <p className="text-body text-[13px] leading-[1.6]">{s.text}</p>
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-[#764CB0]/30" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Compare */}
        <section className="mb-24">
          <div className="reveal mb-10 max-w-3xl">
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/45 mb-4">Comparison</div>
            <h2 className="text-[28px] sm:text-[36px] font-normal text-white leading-[1.15]">
              Чем GENIQ <span className="gradient-text">отличается</span> от MBTI и типологий
            </h2>
            <p className="text-body text-[15px] leading-[1.7] mt-4 max-w-2xl italic">
              MBTI — это фасад дома. GENIQ — его конструкция, планировка и инженерные системы.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {COMPARE.map((c, i) => (
              <div key={i} data-testid={`compare-${i}`} className={`geniq-card p-7 ${c.bad ? "opacity-65" : ""}`}>
                <div className={`text-[11px] uppercase tracking-[0.18em] mb-4 ${c.bad ? "text-white/40" : "text-[#B79BE0]"}`}>
                  {c.bad ? "Стандартный путь" : "Подход GENIQ"}
                </div>
                <h3 className="text-white text-[18px] font-medium mb-5">{c.title}</h3>
                <ul className="space-y-3">
                  {c.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-[13.5px] text-white/80 leading-[1.5]">
                      <span className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${c.bad ? "bg-white/30" : "bg-[#B79BE0]"}`} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Key principle */}
        <section className="mb-24 reveal">
          <div className="geniq-glass rounded-[32px] p-10 sm:p-14 max-w-4xl mx-auto text-center relative overflow-hidden">
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
                 style={{ background: "radial-gradient(circle, rgba(118,76,176,0.18), transparent 60%)" }} />
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/45 mb-5 relative z-10">Ключевой принцип</div>
            <h2 className="text-[24px] sm:text-[32px] font-normal text-white leading-[1.3] relative z-10 mb-5">
              <span className="gradient-text">Нет лучших и худших нейротипов.</span>
            </h2>
            <p className="text-body text-[15px] leading-[1.7] max-w-xl mx-auto relative z-10">
              Нейротип не определяет ваш интеллект, статус или успех. Он показывает одно: как вы устроены — как воспринимаете мир, как работаете и в каких условиях раскрываетесь.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-24">
          <div className="reveal mb-10 max-w-3xl">
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/45 mb-4">FAQ</div>
            <h2 className="text-[28px] sm:text-[36px] font-normal text-white leading-[1.15]">
              Частые <span className="gradient-text">вопросы</span>
            </h2>
          </div>
          <div className="space-y-3 max-w-4xl">
            {FAQ.map((f, i) => (
              <details key={i} data-testid={`faq-${i}`} className="reveal geniq-card p-6 group cursor-pointer">
                <summary className="flex items-start justify-between gap-4 list-none [&::-webkit-details-marker]:hidden">
                  <h3 className="text-white text-[16px] font-medium leading-snug pr-4">{f.q}</h3>
                  <span className="text-[#B79BE0] text-2xl leading-none transition-transform group-open:rotate-45 shrink-0">+</span>
                </summary>
                <p className="text-body text-[14px] leading-[1.7] mt-4 pt-4 border-t border-white/5">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="reveal">
          <div className="geniq-glass rounded-[32px] p-10 sm:p-14 text-center relative overflow-hidden">
            <h2 className="text-[26px] sm:text-[34px] font-normal text-white leading-[1.2] max-w-2xl mx-auto mb-8 relative z-10">
              Начните с <span className="gradient-text">бесплатного скрининга</span> — поймёте, ваш ли это путь
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-4 relative z-10">
              <a href={FORM_URL} target="_blank" rel="noopener noreferrer" data-testid="approach-form-cta" className="geniq-cta">
                <span>Записаться на скрининг</span>
                <span className="arrow"><ArrowUpRight size={18} strokeWidth={1.6} /></span>
              </a>
              <CtaButton testId="approach-test-cta" variant="ghost">Пройти тест</CtaButton>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
