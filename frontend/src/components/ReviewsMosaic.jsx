import React, { useEffect, useRef } from "react";
import { Quote, Send, Video, Play } from "lucide-react";

const FORMATS = ["quote", "telegram", "video-circle", "video", "quote", "telegram", "video-circle", "video", "quote", "telegram"];

const META = [
  { name: "Алина · 34", ctx: "психолог · S3", request: "приходила с выгоранием" },
  { name: "Михаил · 41", ctx: "предприниматель · E3", request: "запрос про продукт" },
  { name: "Дарья · 29", ctx: "методолог · S1", request: "поиск ниши" },
  { name: "Иван · 38", ctx: "ИТ-руководитель · T3", request: "перегруз и фокус" },
  { name: "Анна · 31", ctx: "коуч · E1", request: "выход из роли спасателя" },
  { name: "Сергей · 45", ctx: "архитектор · T1", request: "понять себя глубже" },
  { name: "Ольга · 27", ctx: "блогер · E2", request: "позиционирование" },
  { name: "Павел · 36", ctx: "стратег · S3", request: "сценарий развития" },
  { name: "Виктория · 33", ctx: "продюсер · T2", request: "команда и нагрузка" },
  { name: "Никита · 28", ctx: "дизайнер · S2", request: "путь реализации" },
];

const useReveal = () => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); });
    }, { threshold: 0.08 });
    el.querySelectorAll(".reveal").forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, []);
  return ref;
};

const FormatIcon = ({ type }) => {
  const map = {
    quote: { Icon: Quote, label: "Текстовая цитата" },
    telegram: { Icon: Send, label: "Telegram" },
    "video-circle": { Icon: Video, label: "Видео-кружок" },
    video: { Icon: Play, label: "Видео-отзыв" },
  };
  const { Icon, label } = map[type];
  return (
    <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/45">
      <Icon size={12} strokeWidth={1.4} className="text-[#B79BE0]" />
      {label}
    </div>
  );
};

const ReviewCard = ({ format, meta, idx }) => {
  return (
    <div data-testid={`review-${idx}`} className={`reveal geniq-card review-card-mosaic review-card-${format} p-5 sm:p-6 flex flex-col relative overflow-hidden`}>
      <div className="flex items-center justify-between mb-4">
        <FormatIcon type={format} />
        <span className="text-[10px] uppercase tracking-[0.18em] text-[#B79BE0]/70 px-2 py-1 rounded-full border border-[#B79BE0]/30">Скоро</span>
      </div>

      {/* Format-specific visual placeholder */}
      <div className="flex-1 flex items-center justify-center mb-4">
        {format === "quote" && (
          <div className="relative w-full">
            <Quote size={28} strokeWidth={1.2} className="text-[#B79BE0]/30 mb-2" />
            <div className="space-y-2">
              <div className="h-2 w-11/12 rounded bg-white/5" />
              <div className="h-2 w-10/12 rounded bg-white/5" />
              <div className="h-2 w-9/12 rounded bg-white/5" />
              <div className="h-2 w-7/12 rounded bg-white/5" />
            </div>
          </div>
        )}
        {format === "telegram" && (
          <div className="w-full bg-black/40 rounded-2xl border border-white/5 p-4 space-y-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-full bg-[#764CB0]/30 border border-[#B79BE0]/40 flex items-center justify-center">
                <Send size={11} className="text-[#B79BE0]" />
              </div>
              <div className="h-2 w-20 rounded bg-white/10" />
            </div>
            <div className="ml-9 space-y-1.5">
              <div className="h-2 w-full rounded bg-white/5" />
              <div className="h-2 w-10/12 rounded bg-white/5" />
              <div className="h-2 w-7/12 rounded bg-white/5" />
            </div>
          </div>
        )}
        {format === "video-circle" && (
          <div className="relative">
            <div className="w-24 h-24 rounded-full border-2 border-[#B79BE0]/40 bg-gradient-to-br from-[#764CB0]/30 to-black/40 flex items-center justify-center">
              <Play size={26} className="text-[#B79BE0] fill-[#B79BE0]/40" />
            </div>
            <span className="absolute inset-0 rounded-full pulse-dot" style={{ boxShadow: "0 0 22px rgba(118,76,176,0.45)" }} />
          </div>
        )}
        {format === "video" && (
          <div className="w-full aspect-video rounded-xl border border-white/8 bg-gradient-to-br from-[#1a0e2e] to-black/50 flex items-center justify-center relative">
            <Play size={32} className="text-white/80 fill-white/40" />
            <div className="absolute bottom-2 right-2 text-[10px] text-white/40 px-2 py-1 rounded bg-black/60">2:14</div>
          </div>
        )}
      </div>

      {/* Meta */}
      <div className="border-t border-white/5 pt-4">
        <div className="text-white text-[13px] font-medium">{meta.name}</div>
        <div className="text-white/45 text-[11px] mt-0.5">{meta.ctx} · {meta.request}</div>
      </div>
    </div>
  );
};

export const ReviewsMosaic = () => {
  const ref = useReveal();
  return (
    <section ref={ref} data-testid="section-reviews" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />
      <div className="container-geniq relative z-10">
        <div className="max-w-3xl mb-14">
          <div className="reveal text-[11px] uppercase tracking-[0.22em] text-white/45 mb-4">Отзывы · Мозаика</div>
          <h2 className="reveal text-[32px] sm:text-[42px] lg:text-[48px] font-normal leading-[1.1] text-white mb-5">
            Что говорят <span className="gradient-text">клиенты</span>
          </h2>
          <p className="reveal text-body text-[15px] leading-[1.7] max-w-[640px]">
            Не мои обещания, а слова людей, которые уже собрали свою карту. Реальные отзывы — как есть.
            <span className="block text-white/45 text-[12px] mt-2 italic">Бренд-принцип: наполняется только реальными отзывами. Заполняется в ближайшие недели.</span>
          </p>
        </div>

        <div className="reviews-masonry">
          {FORMATS.map((f, i) => (
            <div key={i} className="reviews-masonry-item">
              <ReviewCard format={f} meta={META[i]} idx={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsMosaic;
