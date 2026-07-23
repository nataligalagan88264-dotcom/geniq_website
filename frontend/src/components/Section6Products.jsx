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

const DIAGNOSTIC_STAGES = [
  {
    title: "Встреча 1 — Диагностика 3 осей",
    what: "Живой разбор, не тест. Определяем, как вы мыслите, что вами движет и как действуете.",
    result: "Точную картину своего мышления, мотивации и сильных навыков.",
    impact: "Видите в своих особенностях не недостаток, а механизм и талант.",
  },
  {
    title: "Встреча 2 — Расшифровка вашей карты",
    what: "Разбираем вашу карту — вы находите объяснение своим особенностям и понимаете, как ими управлять.",
    result: "Нейропрофиль на 22 страницы и умение читать свою карту.",
    impact: "У вас на руках инструкция к себе, и я показываю, как её читать, чтобы использовать для своих целей в разные периоды жизни.",
  },
  {
    title: "Встреча 3 — Работа с вашим запросом",
    what: "Накладываем карту на вашу реальную задачу.",
    result: "Стратегию действий под вашу конфигурацию.",
    impact: "Уходит «много думаю — мало делаю», появляется конкретный следующий шаг.",
  },
];

const TRACKS = [
  {
    title: "Личный трек",
    meta: "7 встреч + чат · для тех, кто выгорел",
    paragraphs: [
      "Вы держитесь, делаете что должны, со стороны всё в порядке — а внутри давно тихо. Лень тут ни при чём: вы живёте на чужих настройках, без опоры на свою природу.",
    ],
    bullets: [
      "находим, что вас истощает и что на самом деле восстанавливает",
      "достаём из подсознания сценарии, что заставляют тащить и терпеть, и меняем их",
      "перестраиваем жизнь, тело и ритм под вашу природу, чтобы энергия копилась",
    ],
    result: "полную карту личности · формулу восстановления · новый ритм жизни · опору, на которую можно встать",
  },
  {
    title: "Профессиональный трек",
    meta: "9 встреч + 2 встречи с приглашёнными экспертами · упёрлись в потолок или чувствуете «не туда»",
    paragraphs: [
      "Должность, опыт, стабильность есть — а внутри всё чаще «и это всё?». Дело не в усталости: вы выросли из своей роли, а новую под себя пока не нашли.",
    ],
    bullets: [
      "находим ваше направление: где сила и в каких ролях она включается",
      "примеряете направления вживую и сужаете до одного",
      "собираем карту компетенций и резюме, которое продаёт вашу уникальность",
      "подключаются приглашённые эксперты",
      "в финале — стратегия: какие компании, какой формат, что спрашивать на собеседовании",
    ],
    result: "ваше направление · карты компетенций и развития · 2 диаграммы Венна (кто вы с 7 лет и где ваш Икигай) · готовое резюме · вопросы для собеседования · режим против выгорания",
  },
  {
    title: "Продуктовый трек",
    meta: "12–14 встреч + 2 встречи с приглашёнными экспертами · хочу запустить своё",
    paragraphs: [
      "Экспертиза, идеи, желание сделать своё есть — а запуск год за годом откладывается. Дисциплина тут ни при чём: вы строите вслепую, не зная, какой продукт ваш и кому он нужен.",
    ],
    bullets: [
      "находим продукт на пересечении вашей экспертизы, желания и реального спроса",
      "сразу проверяем на живых людях: интервью с аудиторией до всякой упаковки",
      "разбираем данные вместе, в том числе через нейросети",
      "позиционирование и упаковка через нейротипы + приглашённые эксперты",
      "стратегия выхода",
    ],
    result: "проверенную на людях гипотезу · полную стратегию продукта (позиционирование, аудитория, упаковка, воронка) · 2 диаграммы Венна · карту партнёров и найма",
  },
];

const TRACK_STAGES = [
  ["Полная карта личности", "Две диагностические сессии, собираем все 5 осей — включая RECOVERY (как вы по-настоящему восстанавливаетесь) и SHADOW (что годами держит вас на месте). Эти две раскрываются только в треке."],
  ["Трек, цель и план", "Выбираете направление, вместе утверждаем конечную цель и план работы под неё."],
  ["Три уровня: мышление, эмоции, действия", "Выстраиваем режим под вашу природу и проверяем собранную карту на ваших реальных задачах."],
  ["Работа с подсознанием", "Авторскими практиками, которые используют специалисты мирового уровня, находим сценарии, что снова и снова возвращают вас в одну точку, и меняем их в корне. Меняется сам способ, которым вы реагируете, решаете и действуете."],
  ["Распаковка талантов", "Достаём ваши сильные стороны и учимся усиливать их под конкретные задачи."],
];

const LIMITATIONS = [
  {
    title: "Острое психическое состояние",
    text: "GENIQ — не клиническая диагностика. При клинической депрессии, ОКР, шизофрении, а также при медикаментозном психиатрическом лечении и работе с психиатром сначала нужен профильный врач или психотерапевт. Совместная работа возможна, но только по согласованию с одним из этих специалистов.",
  },
  {
    title: "Неготовность разделить ответственность",
    text: "В работе с GENIQ ответственность разделена: со стороны системы — точная карта и инструменты, со стороны человека — включённость в процесс и действия. Без этой включённости даже самая точная диагностика останется красивым документом.",
  },
  {
    title: "Неготовность идти до конца",
    text: "Это не гадание и не мотивационная встряска. Это точечная работа, в которой приходится вытаскивать скелеты из шкафа. Она не всегда приятна: вы не всегда будете в ресурсе, а жизнь начнёт меняться — и это может пугать. Поэтому диагностика подойдёт тому, кто готов идти до конца.",
  },
];

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
        <div className="max-w-3xl mb-14">
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
                    Рекомендую
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

                <a
                  href={FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`product-cta-${p.id}`}
                  className="geniq-cta self-start"
                >
                  <span>{p.cta}</span>
                  <span className="arrow"><ArrowUpRight size={18} strokeWidth={1.6} /></span>
                </a>

                {p.id === "diagnostics" && (
                  <details className="mt-6 rounded-2xl border border-white/10 bg-black/20 group">
                    <summary className="list-none [&::-webkit-details-marker]:hidden cursor-pointer px-5 py-4 flex items-center justify-between gap-4 text-white/80 text-[13px]">
                      <span>Что внутри →</span>
                      <span className="text-[#B79BE0] text-xl transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <div className="border-t border-white/8 p-5">
                      <p className="text-body text-[13.5px] leading-[1.7] mb-5">
                        Это не сухой тест с вариантами ответов, а живая интерактивная диагностика — разговор, где я задаю вопросы, а вы отвечаете своими словами.
                      </p>
                      <div className="space-y-3">
                        {DIAGNOSTIC_STAGES.map((stage) => (
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
                  <details className="mt-6 rounded-2xl border border-white/10 bg-black/20 group">
                    <summary className="list-none [&::-webkit-details-marker]:hidden cursor-pointer px-5 py-4 flex items-center justify-between gap-4 text-white/80 text-[13px]">
                      <span>Что внутри →</span>
                      <span className="text-[#B79BE0] text-xl transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <div className="border-t border-white/8 p-5">
                      <div className="space-y-4 text-body text-[13.5px] leading-[1.7] mb-5">
                        <p>Здесь есть то, чего нет в диагностике: полная карта, работа с подсознанием и внедрение результата в вашу жизнь.</p>
                        <ol className="space-y-3 list-decimal list-inside">
                          {TRACK_STAGES.map(([title, text]) => (
                            <li key={title}><strong className="font-medium text-white/85">{title}.</strong> {text}</li>
                          ))}
                        </ol>
                        <p className="text-white/75"><strong className="font-medium">Итог:</strong> полная карта личности и новая версия себя — собранная, проверенная в деле, с видимым результатом.</p>
                      </div>
                      <div className="space-y-3">
                        {TRACKS.map((track) => (
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
              </div>
            );
          })}
        </div>

        <p className="reveal text-center text-white/45 text-[13px] mt-10 max-w-2xl mx-auto">
          Оплат на сайте нет. Вы оставляете заявку — я связываюсь сама. Без срочности: приходите, когда готовы.
        </p>

        <div data-testid="section-limitations" className="reveal mt-20">
          <div className="max-w-3xl mb-10">
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/45 mb-4">Важно</div>
            <h3 className="text-[28px] sm:text-[36px] font-normal text-white leading-[1.15] mb-4">
              Кому не подойдёт <span className="gradient-text">GENIQ</span>
            </h3>
            <p className="text-body text-[15px] leading-[1.7]">
              У любой системы есть свои ограничения. Прочитайте внимательно, чтобы сразу понять, ваш ли это инструмент.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {LIMITATIONS.map((item, i) => (
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
