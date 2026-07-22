import React, { useEffect } from "react";
import { ArrowUpRight, Briefcase, GraduationCap, Cpu, Star, Users, BadgePercent, Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HandshakeSvg from "@/components/HandshakeSvg";
import EditableMedia from "@/components/EditableMedia";
import { FORM_URL } from "@/lib/constants";
import siteContent from "@/content/site.json";

const BUSINESS_DIRECTIONS = [
  {
    Icon: Briefcase,
    title: "HR-агентства",
    subtitle: "Скрининг ключевых позиций",
    pain: "Кандидат идеален на бумаге и на собеседовании — а через 3 месяца становится ясно, что в команду он не вписался или задачу не тянет. Резюме показывает опыт и навыки, но не то, как человек поведёт себя именно с этим руководителем и в этой команде. На ключевой роли цена такой ошибки — самая высокая.",
    points: [
      "Брифинг с нанимающим руководителем: какой человек нужен команде, продукту и позиции на самом деле, а не по формальным требованиям.",
      "Целевая карта нейротипов под эту роль в этом контексте.",
      "Кастомная анкета-тест под должность, команду, продукт и руководителя — сужает пул кандидатов без личной сессии с каждым (например, 10 → 3).",
      "Глубокая работа только с финалистами: фоновое участие в собеседовании или отдельный час диагностики.",
      "Заключение руководителю: кто подходит и почему, зоны риска, потенциал роста в компании, подход к мотивации и карта для адаптации нового сотрудника.",
    ],
    result: "Меньше ошибок найма и текучки в первые месяцы; параметр, которого нет у конкурентов, — основание держать более высокий чек за штучную экспертизу, а не за объём.",
  },
  {
    Icon: GraduationCap,
    title: "Карьерные центры",
    subtitle: "Навигация вместо ярлыка",
    pain: "Клиент приходит, не понимая, в чём его уникальность и чем он отличается от сотен таких же кандидатов. Чтобы выглядеть сильнее, люди дописывают опыт и придумывают кейсы — но на собеседовании это не держится, и человек всё равно сливается с общим потоком.",
    points: [
      "Человек понимает свою природу и описывает уникальность через прикладной язык, понятный работодателю, — вместо выдуманного опыта и несуществующих кейсов.",
      "Карта компетенций — архитектура его реальных талантов и способностей, а не ярлык «вы вот такой тип».",
      "Единый карьерный трек: куда идти, в какой среде и формате он раскроется, какие компании ему подходят.",
      "Диагностика встраивается в вашу программу как этап, а не отдельный продукт со стороны.",
    ],
    result: "Кандидаты центра заметно выделяются и быстрее получают офферы, клиент уходит с ответом «кто я и куда иду», а не с типом личности. За такой результат центр держит более высокий чек, отстраивается от конкурентов не ценой и получает рекомендации и повторные обращения.",
  },
  {
    Icon: Cpu,
    title: "Курсы по AI и навыкам",
    subtitle: "Диагностика на входе",
    pain: "Люди заходят на курс с желанием изменить точку, в которой они находятся. Но за этим запалом — неуверенность в следующем шаге, а часто уже и выгорание от текущих задач. Поэтому 40%+ гаснут, так и не дойдя до конца.",
    points: [
      "Где расходятся его таланты и среда, в которой он их реализует, — туда ли он вообще идёт.",
      "Истинную мотивацию — что реально им движет, чтобы он не саботировал собственный результат.",
      "В каком формате изучать материал, чтобы он усваивался лучше.",
      "Как усилить ключевые навыки и что добрать, — чтобы учиться прицельно, а не распыляться.",
      "Где точки выгорания и как беречь ресурс: карта помогает вовремя заметить и предупредить — больше энергии на обучение.",
    ],
    afterPoints: "Человек видит свой путь с первого дня и не гаснет на первом сомнении, а понятный следующий шаг после курса даёт основание вернуться за следующей ступенью.",
    result: "Выше доходимость и конверсия в запись, больше кейсов и отзывов, меньше возвратов.",
  },
  {
    Icon: Star,
    title: "Продюсерские центры",
    subtitle: "Позиционирование от природы, а не от шаблона",
    pain: "Талант яркий, но образ никак не сходится с ним самим: контент выходит натужным, аудитория не склеивается, а сам он выгорает, пытаясь быть кем-то другим. То, что «заходит» у других, на нём почему-то не работает.",
    points: [
      "Какое позиционирование органично именно этому человеку и какая аудитория к нему тянется сама.",
      "Как эту аудиторию превращать в клиентов — через его сильные стороны, а не через чужие приёмы.",
      "Какой продукт ему делать и кого нанимать в команду в первую очередь.",
      "Что и когда делегировать, чтобы не выгореть на старте.",
    ],
    result: "Образ, который не приходится тянуть на себе, аудитория, которая склеивается органично, и талант, который не гаснет через полгода, — управляемый актив, а не разовый всплеск.",
  },
];

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
    href={FORM_URL}
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
              <div className="text-[11px] uppercase tracking-[0.22em] text-white/45 mb-5">GENIQ · Партнёрство</div>
              <h1 className="text-[38px] sm:text-[50px] lg:text-[58px] xl:text-[64px] font-normal text-white leading-[1.06] mb-7 max-w-[1050px] break-words">
                Партнёрство с <span className="gradient-text">GENIQ</span>
              </h1>
              <p className="text-body text-[16px] sm:text-[17px] leading-[1.75] max-w-[760px] mb-8">
                2 формата сотрудничества — для тех, кто ведёт свою практику, и для компаний, которым нужно точное решение под конкретную задачу.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#partners-experts" className="geniq-cta"><span>Для экспертов</span></a>
                <a href="#partners-business" className="geniq-cta"><span>Для компаний</span></a>
              </div>
            </div>
            <div className="reveal relative">
              <div
                className="absolute -inset-6 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(118,76,176,0.16), transparent 60%)" }}
              />
              {siteContent.media.partners_animation ? (
                <EditableMedia
                  src={siteContent.media.partners_animation}
                  alt="Партнёрство с GENIQ"
                  className="w-full h-full object-contain"
                />
              ) : (
                <HandshakeSvg />
              )}
            </div>
          </div>
        </section>

        <section id="partners-experts" className="container-geniq relative z-10 pt-4 sm:pt-8 mb-24 sm:mb-28 scroll-mt-36">
          <div className="grid xl:grid-cols-[1.05fr_0.95fr] gap-8 sm:gap-10 xl:gap-14 items-start">
            <div className="reveal min-w-0 max-w-3xl">
              <div className="text-[11px] uppercase tracking-[0.22em] text-white/45 mb-4">Для экспертов</div>
              <h2 className="text-[30px] sm:text-[40px] lg:text-[44px] font-normal text-white leading-[1.12] mb-7 break-words">
                Для <span className="gradient-text">экспертов</span>
              </h2>
              <div className="space-y-5 text-body text-[15px] leading-[1.75]">
                <p>Вы ведёте практику в помогающей профессии, запускаете курс или ведёте блог о саморазвитии. И, скорее всего, знаете эти 2 ощущения.</p>
                <p>Клиент приходит за переменами — но до первого настоящего инсайта долгий путь, и по дороге он успевает остыть.</p>
                <p>А доход упирается в количество личных часов: расти дальше некуда, кроме как работать ещё больше.</p>
                <p className="text-white/82">Диагностика даёт клиенту конкретный результат уже на старте: он видит свою картину с первой встречи, остаётся с вами дольше и больше доверяет. А партнёрская модель добавляет доход, который не забирает ваше время.</p>
              </div>
            </div>

            <div className="reveal geniq-glass rounded-[30px] p-6 sm:p-8 lg:p-9 min-w-0 w-full max-w-3xl xl:max-w-none">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full border border-[#764CB0]/60 flex items-center justify-center bg-black/35">
                  <BadgePercent size={20} className="text-[#B79BE0]" strokeWidth={1.4} />
                </div>
                <div>
                  <div className="text-white text-[20px] font-medium">Партнёрская модель</div>
                  <div className="text-[#B79BE0] text-[14px]">Вознаграждение от 10 до 20%</div>
                </div>
              </div>
              <p className="text-body text-[14px] leading-[1.7] mb-6">
                Вы получаете персональный промокод. Клиент называет его при записи — и получает скидку на диагностику и карту своего ведущего нейротипа, которая не входит в базовый пакет.
              </p>
              <p className="text-body text-[14px] leading-[1.7] mb-6">
                Вознаграждение — от 10 до 20% в зависимости от продукта и персональных условий. Точные условия обсудим под ваш проект.
              </p>
              <p className="text-body text-[14px] leading-[1.7] mb-6">
                И то, что не про деньги: скидка 80% на диагностику для вас и вашей семьи, скидка 50% на треки и 2 часа личной работы со мной каждый месяц — на ваш запрос, продвижение проекта или разбор карт.
              </p>
              <div className="text-[11px] uppercase tracking-[0.18em] text-white/40 mb-4">Кому это подходит</div>
              <ul className="space-y-3 mb-7">
                {[
                  "Психологи и коучи",
                  "Авторы курсов",
                  "Ведущие блоги о саморазвитии",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-white/75 text-[13.5px] leading-[1.55]">
                    <Check size={16} className="text-[#B79BE0] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <FormButton testId="partners-experts-cta">Обсудить партнёрство</FormButton>
            </div>
          </div>
        </section>

        <section id="partners-business" className="container-geniq relative z-10 pt-4 sm:pt-8 scroll-mt-36">
          <div className="reveal max-w-4xl mb-12">
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/45 mb-4">Для компаний</div>
            <h2 className="text-[30px] sm:text-[40px] lg:text-[44px] font-normal text-white leading-[1.12] mb-6 break-words">
              Для <span className="gradient-text">компаний</span>
            </h2>
            <div className="space-y-4 text-body text-[15px] leading-[1.75]">
              <p>GENIQ для бизнеса работает иначе, чем оптовая диагностика или подписка. Методология та же, но фокус интерпретации, инструмент сбора данных и итоговый отчёт я собираю под вашу конкретную задачу и вашу аудиторию.</p>
              <p>Работаю с ограниченным числом проектов одновременно, чтобы каждый разбор оставался таким же точным, как для частного клиента.</p>
            </div>
          </div>

          <div className="reveal grid sm:grid-cols-2 xl:grid-cols-4 gap-3 mb-12">
            {[
              "Брифинг — ваша реальная задача, а не формальная анкета",
              "Адаптация инструмента (анкета, тест или личная сессия) под неё",
              "Сфокусированный отчёт под конкретное решение",
              "Ограниченное число слотов на волну",
            ].map((item, index) => (
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
                <h3 className="text-white text-[22px] font-medium">Условия обсуждаются после брифинга</h3>
              </div>
              <p className="text-body text-[14px] leading-[1.7]">Формат и объём каждого проекта обсуждаем индивидуально, после брифинга. Механики слишком разные по глубине, чтобы укладывать их в один прайс.</p>
            </div>
            <FormButton testId="partners-business-cta">Обсудить сотрудничество</FormButton>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
