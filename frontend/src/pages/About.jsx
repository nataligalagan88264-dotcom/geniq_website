import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight, Brain, Battery, ChevronsRight, Flower2, Eye,
  Layers, Sparkles,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CtaButton from "@/components/CtaButton";
import BasketSvg from "@/components/BasketSvg";
import EditableMedia from "@/components/EditableMedia";
import { FORM_URL } from "@/lib/constants";
import siteContent from "@/content/site.json";

const AXES = [
  {
    code: "CORE",
    title: "Ядро личности",
    subtitle: "Как вы воспринимаете мир, думаете и формируете ощущение «моё / не моё».",
    Icon: Brain,
    text: "CORE — главный фильтр, через который вы смотрите на реальность: что замечаете первым, как обрабатываете информацию, как принимаете решения. Здесь определяется когнитивный нейротип — пересечение мира восприятия и режима мышления.",
    params: [
      "Когнитивный нейротип — ваш базовый процессор: как вы воспринимаете и обрабатываете реальность. Один из 9 нейротипов.",
      "Тип анализа — через что к вам приходит понимание: логику, образ, мозаику или сенсорику.",
      "Тип памяти — как вы запоминаете, храните и извлекаете информацию.",
      "Интуитивная обработка — как работает ваша бессознательная система решений и насколько вы опираетесь на чутьё.",
      "Чувствительная зона тела — через какую телесную зону вы первой считываете реальность.",
      "Чувствительная зона мозга — какие нейросети включаются первыми.",
      "Реализация — в каких условиях вы раскрываетесь и через что воплощаете себя.",
    ],
  },
  {
    code: "DRIVE",
    title: "Мотивация",
    subtitle: "Что включает вас изнутри и откуда берётся энергия.",
    Icon: Battery,
    text: "У разных людей разное топливо. Заправлять ракету дровами бессмысленно — она не взлетит. Если мотивировать себя чужим топливом, энергия быстро уходит: внешне это похоже на лень, а на деле задача просто не подключена к настоящему источнику мотивации.",
    params: [
      "Драйверы — топливо мотивации на 3 уровнях: Опора (важно сейчас), Движение (тянет в будущем), Предназначение (глубинный смысл).",
      "Условия и механизм включения — что снаружи запускает вашу мотивацию и что при этом происходит внутри.",
      "Творчество / поток — занятия, после которых энергии становится больше, а не меньше.",
      "Целеполагание — на каком горизонте вам комфортно двигаться к цели и как он устроен.",
    ],
  },
  {
    code: "ACTION",
    title: "Стиль действия",
    subtitle: "Как вы превращаете потенциал в результат.",
    Icon: ChevronsRight,
    text: "Недостаточно понимать свой потенциал — важно знать, каким способом он лучше переводится в результат. Кто-то действует через план, кто-то через контакт, кто-то через импульс, кто-то через глубокое погружение.",
    params: [
      "Нейротип действия — каким способом вы сильнее всего достигаете результата.",
      "Профиль навыков — ведущие, поддерживающие навыки и навыки роста.",
      "Профиль действия — ритм (структура/поток), темп, формат (автономно/в команде), фокус.",
      "Среда реализации — условия, где ваше действие раскрывается.",
      "Сферы и форматы — где ваши навыки реально востребованы.",
      "Что усиливает и что мешает — условия силы и условия срыва.",
      "Правило реализации — короткая формула движения к цели.",
    ],
  },
  {
    code: "RECOVERY",
    title: "Восстановление и устойчивость",
    subtitle: "Как вы восстанавливаете энергию на уровне мышления, мотивации и действий.",
    Icon: Flower2,
    text: "Отдых «по умолчанию» часто не работает. У каждого свой ритм и режим активности. Если его знать, продуктивность растёт при меньших затратах ресурса. RECOVERY помогает выстроить жизнь так, чтобы энергия накапливалась, а не уходила в ноль.",
    params: [
      "Восстановление каждой оси — вашего CORE, DRIVE и ACTION.",
      "Индивидуальные способы отдыха.",
      "Хобби как источник энергии.",
      "Окружение, которое восстанавливает, а не истощает.",
      "Оптимальный ритм активности (биоритм).",
    ],
  },
  {
    code: "SHADOW",
    title: "Тень и слепые зоны",
    subtitle: "Теневая сторона мышления, мотивации и действий.",
    Icon: Eye,
    text: "Именно тень чаще всего управляет срывами, выгоранием и повторяющимися сценариями. Работа с SHADOW позволяет видеть корень проблемы, а не бороться с последствиями.",
    params: [
      "Нейротипы делегирования.",
      "Искажения мышления.",
      "Ложные мотивы и интроекты.",
      "Непринятые и травмированные части.",
      "Автоматические реакции в стрессе.",
    ],
  },
];

const WORLDS = [
  {
    code: "S",
    title: "Мир смыслов",
    text: "Вы воспринимаете реальность через идеи, концепции, закономерности и понимание. Вам важно знать, почему всё устроено именно так и как одно связано с другим.",
    function: "Создаёт знания, объяснения и смыслы.",
    neurotypes: "S1 Мыслитель · S2 Оратор · S3 Стратег",
    Icon: Brain,
  },
  {
    code: "E",
    title: "Мир эмоций",
    text: "Вы воспринимаете реальность через чувства, состояния, отношения и контакт. Вы считываете атмосферу, эмоциональную правду ситуации и живой отклик.",
    function: "Создаёт связь, переживание и вовлечение.",
    neurotypes: "E1 Эмпат · E2 Артист · E3 Драйвер",
    Icon: Sparkles,
  },
  {
    code: "T",
    title: "Мир материи",
    text: "Вы воспринимаете реальность через тело, действие, практику и конкретный результат. Вам важно проверить, сделать, увидеть итог и почувствовать устойчивость.",
    function: "Создаёт структуру, действие, надёжность и опору.",
    neurotypes: "T1 Систематик · T2 Координатор · T3 Оптимизатор",
    Icon: Layers,
  },
];

const MODES = [
  {
    code: "1",
    title: "Генеративный",
    action: "Создаёт",
    text: "Идеи созревают внутри. Нужны время, тишина и возможность собрать мысль самостоятельно.",
    function: "Создавать новое.",
    neurotypes: "T1 Систематик · S1 Мыслитель · E1 Эмпат",
  },
  {
    code: "2",
    title: "Коммуникативный",
    action: "Передаёт",
    text: "Мысль рождается в контакте. Нужны диалог, обмен и живая среда.",
    function: "Передавать, связывать и распространять.",
    neurotypes: "T2 Координатор · S2 Оратор · E2 Артист",
  },
  {
    code: "3",
    title: "Управленческий",
    action: "Управляет",
    text: "Человек видит систему целиком, мыслит масштабом, сценариями и последствиями.",
    function: "Организовывать, направлять и масштабировать.",
    neurotypes: "T3 Оптимизатор · S3 Стратег · E3 Драйвер",
  },
];

const MATRIX = [
  ["S — смыслы", "S1 Мыслитель", "S2 Оратор", "S3 Стратег"],
  ["E — эмоции", "E1 Эмпат", "E2 Артист", "E3 Драйвер"],
  ["T — материя", "T1 Систематик", "T2 Координатор", "T3 Оптимизатор"],
];

const setMeta = (name, content) => {
  let tag = document.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
};

const useReveal = () => {
  useEffect(() => {
    document.title = "О системе GENIQ — карта личности, нейротипы и внутренняя архитектура человека";
    setMeta("description", "GENIQ — авторская система диагностики: нейротип, мотивация, стиль действия, восстановление и теневые зоны. Узнайте, как устроена ваша конфигурация.");

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); });
    }, { threshold: 0.1 });
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
};

export default function About() {
  useReveal();

  return (
    <div data-testid="about-page" className="min-h-screen relative">
      <Header />
      <main className="pt-52 sm:pt-56 pb-24 container-geniq relative">
        <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />

        <section className="max-w-4xl mb-20 reveal">
          <div className="text-[11px] uppercase tracking-[0.22em] text-white/45 mb-5">GENIQ · Система</div>
          <h1 className="text-[40px] sm:text-[56px] lg:text-[64px] font-normal text-white leading-[1.05] mb-7">
            <span className="gradient-text">О системе</span> GENIQ
          </h1>
          <div className="space-y-5 text-body text-[16px] sm:text-[17px] leading-[1.75] max-w-[780px]">
            <p>Вы когда-нибудь чувствовали, что живёте вполсилы? Цели понятные, инструменты рабочие, а внутри либо постоянное сопротивление, либо батарейка садится слишком быстро.</p>
            <p>Обычно это списывают на лень или нехватку мотивации. В GENIQ мы смотрим глубже: дело не в вас. Просто вы едете по чужой карте и на неподходящем топливе.</p>
            <p>Личность — не набор случайных черт, а точная архитектура. Если вы гоночная машина, а пашете на себе поле, как трактор, рано или поздно будет поломка. Не потому что вы плохой трактор — потому что вы не трактор.</p>
          </div>
        </section>

        <section data-testid="section-basket-metaphor" className="mb-16 sm:mb-20 reveal">
          <div className="grid lg:grid-cols-[6.5fr_5.5fr] gap-8 lg:gap-10 items-start">
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-white/45 mb-5">Метафора</div>
              <h2 className="text-[28px] sm:text-[36px] font-normal text-white leading-[1.15] mb-6">
                Метафора <span className="gradient-text">корзины</span>
              </h2>
              <div className="space-y-5 text-body text-[15.5px] leading-[1.75]">
                <p>
                  Представьте, что заглянули в чужую корзину в супермаркете. Там{" "}
                  <span style={{ color: "#B79BE0" }}>яйца, мука и молоко</span> — кажется,
                  человек собрался печь блины. Но добавьте{" "}
                  <span style={{ color: "#B79BE0" }}>сахар и яблоки</span>, и это уже пирог.
                </p>
                <p>
                  Пока вы не выложите на стол все ингредиенты, включая скрытые, и не поймёте,
                  как они работают в связке, вы не поймёте предназначение этой корзины.
                </p>
                <p>
                  Так и с человеком. Нужно увидеть все ваши части и проявления —{" "}
                  <span style={{ color: "#B79BE0" }}>даже те, которые вы в себе отрицаете</span>,
                  — и найти между ними взаимосвязь. Собрать пазл.
                </p>
                <p>
                  GENIQ — это способ выложить все ваши «продукты» на стол и{" "}
                  <span style={{ color: "#B79BE0" }}>расшифровать ваш индивидуальный код</span>.
                </p>
                <p>
                  Это не типология ради ярлыков. Система не отвечает на вопрос «кто вы» в отрыве от жизни. Она показывает, <strong className="font-medium text-white/85">как вы устроены</strong> и <strong className="font-medium text-white/85">что с этим делать на практике</strong>.
                </p>
              </div>
            </div>
            <div className="relative lg:-mt-10 lg:-translate-x-5 min-h-[620px] flex items-start justify-center">
              <div
                className="absolute -inset-8 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(118,76,176,0.14), transparent 60%)" }}
              />
              {siteContent.media.about_animation ? (
                <EditableMedia
                  src={siteContent.media.about_animation}
                  alt="Метафора корзины"
                  className="w-full h-full object-contain"
                />
              ) : (
                <BasketSvg />
              )}
            </div>
          </div>
        </section>

        <section className="mb-24 reveal">
          <div className="max-w-3xl mb-10">
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/45 mb-4">Главная идея</div>
            <h2 className="text-[28px] sm:text-[36px] font-normal text-white leading-[1.15] mb-5">
              Главная <span className="gradient-text">идея системы</span>
            </h2>
            <p className="text-body text-[15.5px] leading-[1.75]">
              Многие годами пытаются исправить в себе то, что на самом деле является частью их природы.
            </p>
            <p className="text-body text-[15.5px] leading-[1.75] mt-4">
              Кто-то считает себя медленным, хотя его сила — в глубоком анализе. Кто-то называет себя слишком чувствительным, хотя именно через чувствительность считывает людей и ситуации точнее других. Кто-то думает, что ему не хватает дисциплины, хотя проблема не в слабости, а в неподходящем способе действия. Кто-то выгорает не потому, что мало отдыхает, а потому что восстанавливается не своим способом.
            </p>
            <p className="text-body text-[15.5px] leading-[1.75] mt-4">
              GENIQ помогает отделить:
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4 max-w-5xl">
            {[
              "природу от адаптации",
              "талант от компенсации",
              "ресурс от привычки выживать",
              "настоящий способ действия от чужой модели успеха",
            ].map((item, i) => (
              <div key={item} className="geniq-card p-5 flex items-center gap-4">
                <span className="text-[#B79BE0] text-[15px] font-medium">0{i + 1}</span>
                <span className="text-white/85 text-[15px]">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-body text-[15.5px] leading-[1.75] max-w-3xl mt-8">
            Суть системы не в том, чтобы «починить» человека. Суть в том, чтобы понять его конфигурацию и выстроить жизнь так, чтобы она работала не через насилие над собой, а через точность.
          </p>
        </section>

        <section className="mb-24">
          <div className="reveal max-w-3xl mb-10">
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/45 mb-4">5 осей</div>
            <h2 className="text-[28px] sm:text-[36px] font-normal text-white leading-[1.15] mb-5">
              Из чего состоит <span className="gradient-text">GENIQ</span>
            </h2>
            <p className="text-body text-[15.5px] leading-[1.75]">
              Система состоит из 5 осей. Каждая показывает отдельный слой личности, и у каждой — свои параметры, которые раскрываются в диагностике. Ниже короткое описание; нажмите на ось, чтобы увидеть все её параметры.
            </p>
          </div>
          <div className="space-y-4">
            {AXES.map((axis) => {
              const Icon = axis.Icon;
              return (
                <details key={axis.code} className="reveal geniq-card p-6 group">
                  <summary className="list-none [&::-webkit-details-marker]:hidden cursor-pointer">
                    <div className="flex items-start gap-5">
                      <div className="w-12 h-12 rounded-full border border-[#764CB0]/60 bg-black/40 flex items-center justify-center shrink-0">
                        <Icon size={19} strokeWidth={1.4} className="text-[#B79BE0]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-baseline gap-3 mb-2">
                          <h3 className="text-white text-[20px] font-medium">{axis.code}</h3>
                          <span className="text-[#B79BE0] text-[15px]">{axis.title}</span>
                        </div>
                        <p className="text-white/65 text-[14px] leading-[1.6]">{axis.subtitle}</p>
                      </div>
                      <span className="text-[#B79BE0] text-2xl leading-none transition-transform group-open:rotate-45">+</span>
                    </div>
                  </summary>
                  <div className="mt-5 pt-5 border-t border-white/5 grid lg:grid-cols-[2fr_3fr] gap-6">
                    <p className="text-body text-[14px] leading-[1.75]">{axis.text}</p>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {axis.params.map((param) => (
                        <div key={param} className="rounded-xl border border-white/8 bg-black/25 px-4 py-3 text-white/72 text-[13px]">
                          {param}
                        </div>
                      ))}
                    </div>
                  </div>
                </details>
              );
            })}
          </div>
        </section>

        <section className="mb-24">
          <div className="reveal max-w-4xl mb-12">
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/45 mb-4">Нейротип</div>
            <h2 className="text-[28px] sm:text-[36px] font-normal text-white leading-[1.15] mb-5">
              Как устроен <span className="gradient-text">нейротип</span>
            </h2>
            <div className="space-y-4 text-body text-[15px] leading-[1.75]">
              <p>Нейротип в GENIQ — это не ярлык и не описание характера. Это базовый способ обработки реальности.</p>
              <p>Он показывает, как вы думаете, через что воспринимаете мир, как рождаются ваши идеи, где находится ваша природная сила, какая среда раскрывает вас лучше всего и почему в одних условиях вы оживаете, а в других быстро теряете ресурс.</p>
              <p>Нейротип складывается из 2 частей: мира восприятия и режима мышления.</p>
              <p>
                Подробное описание каждого из 9 нейротипов — в каталоге{" "}
                <Link to="/neurotypes" className="text-[#B79BE0] hover:text-white transition-colors underline underline-offset-4">
                  «Нейротипы»
                </Link>.
              </p>
            </div>
          </div>

          <div className="reveal mb-12">
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/45 mb-5">3 мира восприятия</div>
            <div className="grid md:grid-cols-3 gap-4">
              {WORLDS.map(({ code, title, text, function: worldFunction, neurotypes, Icon }) => (
                <article key={code} className="geniq-card min-h-[400px] p-7 sm:p-8 flex flex-col relative overflow-hidden">
                  <div
                    className="absolute -right-16 -bottom-20 w-52 h-52 rounded-full pointer-events-none"
                    style={{ background: "radial-gradient(circle, rgba(118,76,176,0.22), transparent 68%)" }}
                  />
                  <div className="flex items-start justify-between gap-4 mb-7 relative z-10">
                    <div className="w-12 h-12 rounded-full border border-[#764CB0]/55 bg-black/30 flex items-center justify-center">
                      <Icon size={19} className="text-[#B79BE0]" strokeWidth={1.4} />
                    </div>
                    <span className="text-[34px] font-light text-[#B79BE0]/35">{code}</span>
                  </div>
                  <h3 className="text-white text-[21px] font-medium mb-4 relative z-10">{title}</h3>
                  <p className="text-body text-[14px] leading-[1.7] mb-6 relative z-10">{text}</p>
                  <div className="mt-auto pt-5 border-t border-white/8 space-y-5 relative z-10">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.2em] text-white/38 mb-2">Функция мира</div>
                      <p className="text-white/80 text-[13.5px] leading-[1.6]">{worldFunction}</p>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.2em] text-white/38 mb-2">Нейротипы</div>
                      <p className="text-[#B79BE0] text-[12.5px] leading-[1.6]">{neurotypes}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="reveal">
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/45 mb-5">3 режима мышления</div>
            <div className="grid md:grid-cols-3 gap-4">
              {MODES.map(({ code, title, action, text, function: modeFunction, neurotypes }) => (
                <article key={code} className="geniq-card min-h-[380px] p-7 sm:p-8 flex flex-col relative overflow-hidden">
                  <div
                    className="absolute -right-16 -bottom-20 w-52 h-52 rounded-full pointer-events-none"
                    style={{ background: "radial-gradient(circle, rgba(118,76,176,0.2), transparent 68%)" }}
                  />
                  <div className="text-[10px] uppercase tracking-[0.2em] text-white/38 mb-4 relative z-10">Режим {code}</div>
                  <h3 className="text-white text-[21px] font-medium mb-2 relative z-10">{title}</h3>
                  <div className="text-[#B79BE0] text-[14px] mb-6 relative z-10">{action}</div>
                  <p className="text-body text-[14px] leading-[1.7] mb-6 relative z-10">{text}</p>
                  <div className="mt-auto pt-5 border-t border-white/8 space-y-5 relative z-10">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.2em] text-white/38 mb-2">Функция режима</div>
                      <p className="text-white/80 text-[13.5px] leading-[1.6]">{modeFunction}</p>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.2em] text-white/38 mb-2">Нейротипы</div>
                      <p className="text-[#B79BE0] text-[12.5px] leading-[1.6]">{neurotypes}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-24 reveal">
          <div className="geniq-glass rounded-[32px] p-8 sm:p-12">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles size={20} className="text-[#B79BE0]" strokeWidth={1.5} />
              <h2 className="text-white text-[26px] sm:text-[34px] font-normal">9 нейротипов GENIQ</h2>
            </div>
            <div className="overflow-x-auto overflow-y-hidden sm:overflow-visible">
              <table className="w-full min-w-[620px] text-left">
                <thead>
                  <tr className="border-b border-white/10 text-white/45 text-[11px] uppercase tracking-[0.18em]">
                    <th className="py-3 pr-4">Мир</th>
                    <th className="py-3 px-4">Режим 1</th>
                    <th className="py-3 px-4">Режим 2</th>
                    <th className="py-3 pl-4">Режим 3</th>
                  </tr>
                </thead>
                <tbody>
                  {MATRIX.map((row) => (
                    <tr key={row[0]} className="border-b border-white/5">
                      {row.map((cell, i) => (
                        <td key={cell} className={`py-4 text-[14px] ${i === 0 ? "text-[#B79BE0] pr-4" : "text-white/78 px-4"}`}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-body text-[14px] leading-[1.75] max-w-4xl mt-7">
              9 нейротипов нужны не для сравнения людей между собой. Все 9 функций нужны миру.
            </p>
            <p className="text-body text-[14px] leading-[1.75] max-w-4xl mt-4">
              Систематики делают реальность надёжной. Координаторы удерживают людей и пространство. Оптимизаторы запускают движение и результат. Мыслители создают глубину знания. Ораторы переводят смыслы на живой язык. Стратеги видят скрытые механизмы систем. Эмпаты возвращают контакт с внутренней правдой. Артисты оживляют пространство через выражение. Драйверы превращают напряжение в прорыв.
            </p>
          </div>
        </section>

        <section className="mb-24 reveal">
          <div className="max-w-4xl">
            <h2 className="text-[28px] sm:text-[36px] font-normal text-white leading-[1.15] mb-5">
              Почему вы можете узнавать себя <span className="gradient-text">в нескольких нейротипах</span>
            </h2>
            <div className="space-y-4 text-body text-[15px] leading-[1.75]">
              <p>Это нормально. Человек — не один нейротип, а конфигурация. Один нейротип может быть ведущим в CORE, другой проявляться в мотивации, третий в действиях, четвёртый в восстановлении, пятый в тени.</p>
              <p>Поэтому простое чтение описаний может путать. Вы узнаёте себя в Систематике, потому что любите порядок, но порядок может быть не природной силой, а способом держать тревогу. Узнаёте себя в Стратеге, потому что много анализируете, но анализ может быть не талантом, а защитой от действия. Узнаёте себя в Эмпате, потому что чувствуете людей, но чувствительность может быть и природной способностью, и следствием жизни в непредсказуемой среде.</p>
              <p>В диагностике важно не просто найти совпадение, а понять механизм. GENIQ отделяет природное от приобретённого, сильную сторону от компенсации, настоящий ресурс от привычного сценария, потенциал от защиты.</p>
            </div>
          </div>
        </section>

        <section className="mb-24 reveal">
          <div className="geniq-glass rounded-[32px] p-8 sm:p-12 max-w-5xl">
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/45 mb-4">Практическое применение</div>
            <h2 className="text-[28px] sm:text-[36px] font-normal text-white leading-[1.15] mb-6">
              Для чего нужна <span className="gradient-text">диагностика GENIQ</span>
            </h2>
            <div className="space-y-4 text-body text-[15px] leading-[1.75] max-w-4xl">
              <p>Диагностика нужна не для того, чтобы повесить на вас тип. Она нужна, чтобы собрать карту: как вы воспринимаете реальность, что вас включает, как вы действуете, где теряете энергию, как восстанавливаетесь, какие сценарии повторяете, где ваша сильная сторона, какая среда подходит вашей природе и какой следующий шаг будет действительно вашим.</p>
              <p className="text-white/78">GENIQ показывает не абстрактное описание личности, а практическую конфигурацию, с которой можно работать в профессии, отношениях, проектах, выборе среды и личной реализации.</p>
            </div>
          </div>
        </section>

        <section className="mb-8 reveal">
          <div className="geniq-glass rounded-[32px] p-8 sm:p-12 max-w-5xl">
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/45 mb-4">Переход к нейротипам</div>
            <h2 className="text-[26px] sm:text-[34px] font-normal text-white leading-[1.2] mb-5">
              Посмотрите все 9 базовых типов
            </h2>
            <p className="text-body text-[15px] leading-[1.7] max-w-3xl mb-7">
              Чтобы увидеть все 9 базовых типов, перейдите в каталог нейротипов. Он разделён на 3 мира: S — смыслы, E — эмоции, T — материя.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/neurotypes" className="geniq-cta geniq-cta--ghost">
                <span>Смотреть нейротипы</span>
                <span className="arrow"><ArrowUpRight size={18} strokeWidth={1.6} /></span>
              </Link>
              <a href={FORM_URL} target="_blank" rel="noopener noreferrer" data-testid="about-form-cta" className="geniq-cta geniq-cta--ghost">
                <span>Пройти диагностику</span>
                <span className="arrow"><ArrowUpRight size={18} strokeWidth={1.6} /></span>
              </a>
            </div>
          </div>
        </section>

        <section className="reveal">
          <div className="geniq-glass rounded-[32px] p-10 sm:p-14 text-center relative overflow-hidden">
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
                 style={{ background: "radial-gradient(circle, rgba(118,76,176,0.18), transparent 60%)" }} />
            <h2 className="text-[26px] sm:text-[34px] font-normal text-white leading-[1.2] max-w-2xl mx-auto mb-7 relative z-10">
              Вся карта собирается на диагностике. Но первый слой — ваш ведущий нейротип — можно узнать уже сейчас.
            </h2>
            <p className="text-body text-[15px] leading-[1.7] max-w-2xl mx-auto mb-8 relative z-10">
              Пройдите короткий тест: 5 минут, и вы увидите, через какой мир и режим вы воспринимаете реальность.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 relative z-10">
              <CtaButton testId="about-test-cta">Пройти тест</CtaButton>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
