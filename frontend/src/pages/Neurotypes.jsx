import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Brain, Heart, Wrench, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CtaButton from "@/components/CtaButton";
import LensSvg from "@/components/LensSvg";
import EditableMedia from "@/components/EditableMedia";
import { FORM_URL, NEUROTYPE_COLORS } from "@/lib/constants";
import siteContent from "@/content/site.json";

const WORLDS = {
  S: {
    code: "S",
    title: "S — Мир смыслов",
    Icon: Brain,
    lead: "Мир S воспринимает реальность через идеи, закономерности, концепции и скрытые связи.",
    text: "Людям этого мира важно не просто действовать, а понимать: почему всё устроено именно так, как связаны элементы и какой смысл стоит за поверхностью. Мир S создаёт знания, объяснения, методологии и стратегии.",
    inside: "Внутри мира S: S1 создаёт знание, S2 передаёт знание, S3 управляет через знание.",
  },
  E: {
    code: "E",
    title: "E — Мир эмоций",
    Icon: Heart,
    lead: "Мир E воспринимает реальность через чувства, состояния, контакт, атмосферу и живой отклик.",
    text: "Людям этого мира важна не только информация, но и эмоциональная правда: что человек чувствует, есть ли контакт, есть ли подлинность. Мир E создаёт атмосферу, связь, выразительность и эмоциональный импульс.",
    inside: "Внутри мира E: E1 проживает, E2 выражает, E3 управляет эмоциональной энергией.",
  },
  T: {
    code: "T",
    title: "T — Мир материи",
    Icon: Wrench,
    lead: "Мир T воспринимает реальность через тело, практику, действие, устойчивость и конкретный результат.",
    text: "Людям этого мира важно не просто понять или почувствовать, а проверить: работает ли это, можно ли применить, выдерживает ли нагрузку. Мир T создаёт опору, структуру, качество, безопасность и осязаемый итог.",
    inside: "Внутри мира T: T1 создаёт устойчивые системы, T2 объединяет людей и пространство, T3 управляет ресурсом и результатом.",
  },
};

const MATRIX = [
  ["S — смыслы", "S1 Мыслитель", "S2 Оратор", "S3 Стратег"],
  ["E — эмоции", "E1 Эмпат", "E2 Артист", "E3 Драйвер"],
  ["T — материя", "T1 Систематик", "T2 Координатор", "T3 Оптимизатор"],
];

const NEUROTYPES = [
  {
    code: "S1",
    name: "Мыслитель",
    world: "S",
    mode: "генеративный",
    colorName: "синий",
    formula: "рождает знание там, где другие видят только отдельные факты.",
    collapsed: "Человек глубинных идей, тишины и внутренней сборки смысла. Видит связи между явлениями, которые другим кажутся несвязанными.",
    who: "Мыслитель — человек глубинных идей и внутренних открытий. Думает медленно, нелинейно и многослойно. Снаружи может казаться, что ничего не происходит, но внутри идёт сложная интеллектуальная работа.",
    value: "глубина и смысловая точность.",
    talents: "создаёт знание там, где другие описывают факты; находит связи между несвязанным; формулирует то, что все чувствовали, но не могли выразить; уходит в тему до дна; одной фразой меняет всё обсуждение.",
    look: "делает паузы перед ответом; говорит мало, но точно; выпадает из быстрых шумных обсуждений; любит интеллектуальную тишину; не любит, когда его торопят с выводом.",
    questions: "«В чём здесь суть?» · «Почему это устроено именно так?» · «Что стоит за этим явлением?» · «Можно мне подумать?»",
    charge: "тишина, интеллектуальная задача без жёсткого дедлайна, время на размышление.",
    drain: "давление «быстро», поверхностные разговоры, многозадачность, обесценивание идеи.",
    superpower: "соединяет несвязанное и рождает новое знание.",
    stress: "уходит в молчание и внутреннюю изоляцию. Снаружи это выглядит как холод, внутри — как защита.",
  },
  {
    code: "S2",
    name: "Оратор",
    world: "S",
    mode: "коммуникативный",
    colorName: "жёлтый",
    formula: "переводит сложное на живой язык, чтобы люди начали понимать и двигаться.",
    collapsed: "Человек живого слова, диалога и объяснения. Его мысль рождается в контакте и становится точной через проговаривание.",
    who: "Оратор — человек живого слова и атмосферы. Думает через диалог. Лучшие инсайты приходят не до разговора, а прямо в процессе обмена.",
    value: "ясность и живой обмен.",
    talents: "переводит сложное на понятный язык; создаёт атмосферу одной репликой; находит точную формулировку в диалоге; сглаживает напряжение; делает среду теплее и живее.",
    look: "думает вслух; оживает в разговоре; быстро подбирает слова и аналогии; чувствует реакцию собеседника; плохо переносит холодную тишину и отсутствие отклика.",
    questions: "«Давай обсудим?» · «Как тебе эта мысль?» · «Понятно объясняю?» · «Я сейчас проговорю и пойму.»",
    charge: "живой диалог, интересные люди, идеи в движении, тёплый отклик.",
    drain: "изолированная работа, холодные пространства, отсутствие реакции, запрет на выражение.",
    superpower: "делает сложное понятным и живым.",
    stress: "уходит в иронию или дистанцию. Если совсем плохо — замолкает, что для него нетипично.",
  },
  {
    code: "S3",
    name: "Стратег",
    world: "S",
    mode: "управленческий",
    colorName: "фиолетовый",
    formula: "видит партию, а не один ход.",
    collapsed: "Человек скрытых механизмов, сценариев и системного влияния. Видит, что происходит между строк, и прогнозирует развитие на несколько шагов вперёд.",
    who: "Стратег управляет реальностью через понимание её скрытых механизмов. Наблюдает, собирает информацию, выстраивает внутреннюю модель и только потом действует.",
    value: "контроль через понимание системы.",
    talents: "видит скрытые механизмы; прогнозирует на несколько шагов вперёд; читает мотивы и интересы людей; строит стратегию там, где другие реагируют; сохраняет спокойствие в сложных ситуациях.",
    look: "наблюдает, прежде чем действовать; задаёт точные, иногда неудобные вопросы; замечает подтексты; редко говорит всё, что думает; держит дистанцию, пока не доверяет.",
    questions: "«Кому это выгодно?» · «Что здесь не сказано?» · «Какая настоящая цель?» · «Какие будут последствия?»",
    charge: "стратегические задачи, сложность, информация, автономия, влияние на систему.",
    drain: "хаос без логики, микроменеджмент, давление раскрыть карты, давление на скорость.",
    superpower: "прогнозирует развитие событий там, где другие видят только текущий момент.",
    stress: "уходит в гиперконтроль и дистанцию. Снаружи холод, внутри — сканирование угроз.",
  },
  {
    code: "E1",
    name: "Эмпат",
    world: "E",
    mode: "генеративный",
    colorName: "зелёный",
    formula: "понимает человека на уровне, который тот сам в себе ещё не видит.",
    collapsed: "Человек тонкого чувствования, глубины и подлинного контакта. Считывает эмоциональную правду ситуации раньше, чем она становится очевидной.",
    who: "Эмпат — один из самых тонко чувствующих нейротипов. Для него чувства не фон, а сама ткань происходящего. Там, где другие видят событие, он проживает состояние.",
    value: "подлинность и глубокий контакт.",
    talents: "понимает человека глубже, чем тот сам себя осознаёт; создаёт ощущение безопасности без лишних слов; мгновенно считывает эмоциональную правду; умеет быть рядом так, что другому становится легче.",
    look: "тонко считывает эмоции; замечает изменения в настроении; реагирует на тон, паузу и атмосферу; быстро устаёт от эмоционального шума; после тяжёлого общения нуждается в одиночестве.",
    questions: "«Ты точно в порядке?» · «Что ты сейчас чувствуешь?» · «Почему здесь такая тяжёлая атмосфера?» · «Мне нужно побыть одной.»",
    charge: "глубокий контакт, искренние разговоры, красота, тишина, уединение, ощущение нужности.",
    drain: "эмоциональный шум, поверхностные связи, подстраивание, чужие состояния, которые не отпускают.",
    superpower: "видит эмоциональную правду человека раньше, чем она названа словами.",
    stress: "перегружается чужими состояниями и уходит в панцирь: холод, дистанцию, иронию.",
  },
  {
    code: "E2",
    name: "Артист",
    world: "E",
    mode: "коммуникативный",
    colorName: "розовый",
    formula: "зажигает пространство и объединяет людей вокруг общего переживания.",
    collapsed: "Человек яркого выражения, красоты и живого отклика. Меняет пространство своим состоянием и делает эмоции видимыми.",
    who: "Артист — один из самых ярких и социально чувствительных нейротипов. Для него чувства — не то, что прячут внутри, а то, чем хочется делиться.",
    value: "отклик и живое выражение.",
    talents: "зажигает пространство; объединяет людей вокруг общего переживания; создаёт праздник из ничего; заражает своим состоянием; мгновенно считывает и отражает эмоции аудитории.",
    look: "ярко проявляет эмоции; оживляет пространство; любит красоту и атмосферу; нуждается в реакции и внимании; в стрессе прячет боль за маской веселья.",
    questions: "«Как тебе?» · «Тебе понравилось?» · «Почему ты никак не реагируешь?» · «Мне важно, чтобы меня увидели.»",
    charge: "живое общение, внимание, новые впечатления, творчество, ощущение «меня видят и любят».",
    drain: "одиночество, однообразие, игнор, эмоциональный холод.",
    superpower: "делает пространство живым и эмоционально заряженным.",
    stress: "становится громче и ярче или надевает маску веселья, чтобы спрятать боль.",
  },
  {
    code: "E3",
    name: "Драйвер",
    world: "E",
    mode: "управленческий",
    colorName: "красный",
    formula: "превращает напряжение в действие, а действие — в прорыв.",
    collapsed: "Человек мощной энергии, движения и влияния. Там, где другие зависают, он берёт ответственность и пробивает путь.",
    who: "Драйвер — один из самых энергетически мощных нейротипов. Превращает страх, давление и хаос в движение. Спокойствие без цели для него часто ощущается как потеря энергии.",
    value: "влияние и движение.",
    talents: "мобилизует энергию вокруг себя; превращает давление в прорыв; запускает то, что другие только обсуждали; видит возможность там, где другие видят угрозу.",
    look: "говорит энергично и уверенно; быстро переводит напряжение в действие; берёт лидерство в кризисе; не выносит подвешенных состояний; усталость скрывает до последнего.",
    questions: "«Что мы делаем дальше?» · «Кто берёт ответственность?» · «Почему стоим?» · «Когда начинаем?»",
    charge: "высокие ставки, движение, влияние на реальность, рост, сложные цели.",
    drain: "вынужденная пассивность, потеря влияния, подвешенные состояния, ощущение, что он не решает.",
    superpower: "запускает движение там, где система стоит.",
    stress: "усиливает давление и берёт всё под жёсткий контроль. Скрытая усталость проявляется только на пределе.",
  },
  {
    code: "T1",
    name: "Систематик",
    world: "T",
    mode: "генеративный",
    colorName: "коричневый",
    formula: "делает реальность надёжной и заставляет систему работать без сбоев.",
    collapsed: "Человек качества, логики и устойчивых систем. Видит слабое место раньше, чем оно превращается в проблему.",
    who: "Систематик — человек, которому важно понять, как устроена любая система: разобрать, собрать, проверить и заставить работать надёжно.",
    value: "качество и честность.",
    talents: "создаёт работающие системы там, где другие создают хаос; видит уязвимость раньше, чем она даёт сбой; доводит до конца то, от чего другие устают; удерживает стандарт качества без напоминаний.",
    look: "спокойный, собранный, не суетится; задаёт уточняющие вопросы; проверяет факты и слабые места; говорит прямо; не любит пустые обещания; может казаться строгим и требовательным.",
    questions: "«Как это работает?» · «Где слабое место?» · «Почему именно так?» · «Это точно проверено?»",
    charge: "мастерство, завершённость, автономная работа, порядок из хаоса, признание качества.",
    drain: "спешка, изменение правил на ходу, бессмысленная суета, среда «сделаем потом».",
    superpower: "видит, где система даст сбой, раньше чем сбой случился.",
    stress: "замирает или ужесточает контроль над собой, процессами и людьми.",
  },
  {
    code: "T2",
    name: "Координатор",
    world: "T",
    mode: "коммуникативный",
    colorName: "чёрный",
    formula: "создаёт безопасность, удерживает людей и ставит каждого на своё место.",
    collapsed: "Человек опоры, движения и практической заботы. Считывает людей и пространство телом, быстро понимая, где безопасно, а где нет.",
    who: "Координатор — живой телесный навигатор. Его психика включается через движение, физическое присутствие и контакт с людьми.",
    value: "надёжность и безопасность своих.",
    talents: "мгновенно считывает людей и среду; ставит каждого на своё место в команде; создаёт ощущение безопасности; делает руками быстрее, чем объясняет словами; держит команду живой в кризис.",
    look: "быстро включается, когда нужна помощь; предпочитает сделать сам; считывает, кому можно доверять; часто держит на себе команду или близкий круг; защищает своих резко и без лишних слов.",
    questions: "«Ты в порядке?» · «Кто с нами?» · «Можно ли ему доверять?» · «Что нужно сделать прямо сейчас?»",
    charge: "движение, природа, физический труд, команда, где он нужен, ощущение «мои в безопасности».",
    drain: "долгая неподвижность, чужое пространство, использование без отдачи, вклад без признания.",
    superpower: "считывает потенциал человека и ставит каждого на своё место в системе.",
    stress: "молчит и держит до последнего. Когда граница перейдена — становится холодно жёстким.",
  },
  {
    code: "T3",
    name: "Оптимизатор",
    world: "T",
    mode: "управленческий",
    colorName: "оранжевый",
    formula: "превращает ресурс в результат самым коротким рабочим путём.",
    collapsed: "Человек результата, движения и эффективности. Видит, где теряется ресурс, и быстро находит путь к росту.",
    who: "Оптимизатор видит концепцию целиком без лишнего погружения в детали. Выстраивает путь так, чтобы меньше усилий давали больше результата.",
    value: "результат и эффективность.",
    talents: "видит структуру ситуации, пока другие разбираются; находит кратчайший путь к результату; запускает движение там, где система застряла; распределяет людей и ресурсы точно.",
    look: "быстро схватывает суть и отсекает лишнее; переводит разговор в действия; не терпит бюрократию; видит, где теряется ресурс; быстро теряет интерес без роста; не выносит микроменеджмент.",
    questions: "«Для чего это?» · «Какой выхлоп?» · «Какой следующий шаг?» · «Где точка роста?»",
    charge: "масштаб задачи, автономия, движение, рост, работающие решения.",
    drain: "микроменеджмент, медленные системы, бюрократия, работа в деталях без горизонта.",
    superpower: "запускает движение там, где система застряла.",
    stress: "усиливает давление и берёт всё под жёсткий контроль. Сложно признаёт усталость.",
  },
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
    document.title = "Нейротипы GENIQ — 9 типов мышления, восприятия и реализации";
    setMeta("description", "В системе GENIQ 9 нейротипов: Мыслитель, Оратор, Стратег, Эмпат, Артист, Драйвер, Систематик, Координатор и Оптимизатор. Узнайте свой через 3 мира восприятия — S, E, T.");

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); });
    }, { threshold: 0.08 });
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
};

const NeurotypeCard = ({ item, activeCode, setActiveCode }) => {
  const color = NEUROTYPE_COLORS[item.code] || "#B79BE0";
  const markerColor = item.code === "T2" ? "#454552" : color;
  const isOpen = activeCode === item.code;

  return (
    <details
      data-testid={`neurotype-${item.code}`}
      className="geniq-card p-5 group animate-in fade-in duration-300"
      style={{ "--nt-color": color }}
      open={isOpen}
    >
      <summary
        className="list-none [&::-webkit-details-marker]:hidden cursor-pointer"
        onClick={(event) => {
          event.preventDefault();
          setActiveCode((current) => current === item.code ? null : item.code);
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div
              className="w-14 h-14 rounded-full border-[2px] flex items-center justify-center shrink-0"
              style={{
                borderColor: markerColor,
                background: item.code === "T2" ? "rgba(15,15,24,0.92)" : `${color}12`,
                boxShadow: `0 0 18px ${markerColor}20, inset 0 0 18px ${markerColor}12`,
              }}
            >
              <div
                className="w-9 h-9 rounded-full border flex items-center justify-center text-white text-[14px] font-semibold"
                style={{
                  borderColor: item.code === "T2" ? "rgba(120,120,138,0.52)" : `${color}80`,
                  background: item.code === "T2" ? "rgba(25,25,36,0.94)" : "rgba(10,10,20,0.5)",
                  textShadow: `0 0 10px ${markerColor}`,
                }}
              >
                {item.code}
              </div>
            </div>
            <div>
              <div className="flex flex-wrap items-baseline gap-2 mb-1">
                <h3 className="text-white text-[18px] font-medium">{item.name}</h3>
                <span className="text-white/45 text-[12px]">режим: {item.mode} · цвет: {item.colorName}</span>
              </div>
              <p className="text-[#B79BE0] text-[13px] leading-[1.55] mb-2">Формула: {item.formula}</p>
              <p className="text-body text-[13.5px] leading-[1.6]">{item.collapsed}</p>
            </div>
          </div>
          <span className="text-[#B79BE0] text-2xl leading-none transition-transform group-open:rotate-45 shrink-0">+</span>
        </div>
      </summary>

      <div className="mt-5 pt-5 border-t border-white/5 grid lg:grid-cols-2 gap-4 animate-in fade-in">
        {[
          ["Кто это", item.who],
          ["Главная ценность", item.value],
          ["Таланты", item.talents],
          ["Как выглядит со стороны", item.look],
          ["Типичные вопросы", item.questions],
          ["Заряжает", item.charge],
          ["Истощает", item.drain],
          ["Суперсила", item.superpower],
          ["В стрессе", item.stress],
        ].map(([label, text]) => (
          <div key={label} className="rounded-2xl border border-white/8 bg-black/25 p-4">
            <div className="text-[10px] uppercase tracking-[0.18em] text-white/40 mb-2">{label}</div>
            <p className="text-white/76 text-[13px] leading-[1.65]">{text}</p>
          </div>
        ))}
      </div>
    </details>
  );
};

export default function Neurotypes() {
  useReveal();
  const [activeWorld, setActiveWorld] = useState("S");
  const [activeType, setActiveType] = useState(null);
  const world = WORLDS[activeWorld];
  const Icon = world.Icon;
  const activeTypes = NEUROTYPES.filter((type) => type.world === activeWorld);

  return (
    <div data-testid="neurotypes-page" className="min-h-screen relative">
      <Header />
      <main className="pt-52 sm:pt-56 pb-24 container-geniq relative">
        <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />

        <section className="grid lg:grid-cols-[6fr_6fr] gap-8 lg:gap-10 items-center mb-20">
          <div className="max-w-4xl reveal">
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/45 mb-5">GENIQ · Нейротипы</div>
            <h1 className="text-[40px] sm:text-[56px] lg:text-[64px] font-normal text-white leading-[1.05] mb-7">
              Нейротипы <span className="gradient-text">GENIQ</span>
            </h1>
            <div className="space-y-5 text-body text-[15.5px] sm:text-[16.5px] leading-[1.75] max-w-[780px]">
              <p>Представьте, что внутри у каждого человека есть все 9 нейротипов — как набор линз, через которые можно смотреть на свою жизнь.</p>
              <p>Снаружи мы делаем похожие вещи: думаем, принимаем решения, строим отношения, работаем, устаём, ищем своё место. Но внутри эти процессы запускаются по-разному — в зависимости от того, какую линзу вы используете в конкретный момент.</p>
              <p>Через одни линзы смотреть легко: они дают энергию, ясность и ощущение «я на своём месте». Через другие тяжело: приходится напрягаться, и даже простые задачи забирают слишком много сил. Это не значит, что с вами что-то не так. Это просто ваши слабые зоны — места, где нужны поддержка, обучение или делегирование.</p>
              <p>Если не знать, какие линзы у вас есть, можно годами жить «на чужих настройках»: заставлять себя быть быстрее, спокойнее, жёстче или рациональнее только потому, что так принято или у кого-то получилось.</p>
              <p>Нейротип — это не ярлык, а инструмент. Способ, которым ваш мозг воспринимает происходящее и выбирает действие.</p>
              <p><span style={{ color: "#B79BE0" }}>9 нейротипов = 3 мира восприятия × 3 режима мышления.</span> Мир показывает, через какую оптику вы смотрите. Режим — как ваш ум с этим работает. На пересечении рождаются нейротипы: не клетки, в которые вас помещают, а набор возможностей.</p>
              <p>
                Подробнее о том, как работает система — в разделе{" "}
                <Link to="/system" className="text-[#B79BE0] hover:text-white transition-colors underline underline-offset-4">
                  «О системе»
                </Link>.
              </p>
            </div>
          </div>
          <div className="reveal relative min-h-[560px] sm:min-h-[680px] lg:min-h-[760px] flex items-center justify-center">
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(118,76,176,0.16), transparent 60%)" }}
            />
            {siteContent.media.neurotypes_animation ? (
              <EditableMedia
                src={siteContent.media.neurotypes_animation}
                alt="Анимация нейротипов"
                className="w-full h-full object-contain"
              />
            ) : (
              <LensSvg />
            )}
          </div>
        </section>

        <section className="mb-24 reveal">
          <div className="mb-8 max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles size={20} className="text-[#B79BE0]" strokeWidth={1.5} />
              <div className="text-[11px] uppercase tracking-[0.22em] text-white/45">3 мира × 3 режима</div>
            </div>
            <h2 className="text-white text-[28px] sm:text-[36px] font-normal">
              Карта <span className="gradient-text">нейротипов</span>
            </h2>
          </div>
          <div className="geniq-glass rounded-[28px] p-6 sm:p-8 overflow-x-auto overflow-y-hidden sm:overflow-visible">
            <table className="w-full min-w-[620px] text-left">
              <thead>
                <tr className="border-b border-white/10 text-white/50 text-[11px] uppercase tracking-[0.18em]">
                  <th className="py-3 pr-4">Мир</th>
                  <th className="py-3 px-4">Режим 1</th>
                  <th className="py-3 px-4">Режим 2</th>
                  <th className="py-3 pl-4">Режим 3</th>
                </tr>
              </thead>
              <tbody>
                {MATRIX.map((row) => (
                  <tr key={row[0]} className="border-b border-white/5">
                    {row.map((cell, index) => (
                      <td key={cell} className={`py-4 text-[14px] ${index === 0 ? "text-[#B79BE0] pr-4" : "text-white/78 px-4"}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-24">
          <div className="reveal max-w-3xl mb-8">
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/45 mb-4">Интерактивный каталог</div>
            <h2 className="text-[28px] sm:text-[36px] font-normal text-white leading-[1.15]">
              Выберите <span className="gradient-text">мир восприятия</span>
            </h2>
          </div>

          <div className="reveal flex flex-wrap gap-2 mb-8">
            {Object.values(WORLDS).map((w) => (
              <button
                key={w.code}
                onClick={() => {
                  setActiveWorld(w.code);
                  setActiveType(null);
                }}
                data-testid={`world-tab-${w.code}`}
                className={`px-5 py-3 rounded-full border text-[12px] uppercase tracking-[0.18em] transition-all ${
                  activeWorld === w.code
                    ? "border-[#B79BE0] text-white bg-[#764CB0]/20"
                    : "border-white/10 text-white/55 hover:text-white"
                }`}
              >
                {w.title}
              </button>
            ))}
          </div>

          <div className="reveal geniq-glass rounded-[28px] p-7 sm:p-9 mb-8">
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-full border border-[#764CB0]/60 bg-black/40 flex items-center justify-center shrink-0">
                <Icon size={22} strokeWidth={1.4} className="text-[#B79BE0]" />
              </div>
              <div>
                <h3 className="text-white text-[24px] font-medium mb-3">{world.title}</h3>
                <p className="text-[#B79BE0] text-[15px] leading-[1.6] mb-3">{world.lead}</p>
                <p className="text-body text-[14.5px] leading-[1.75] mb-3">{world.text}</p>
                <p className="text-white/55 text-[13.5px] leading-[1.65]">{world.inside}</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            {activeTypes.map((type) => (
              <NeurotypeCard
                key={type.code}
                item={type}
                activeCode={activeType}
                setActiveCode={setActiveType}
              />
            ))}
          </div>
        </section>

        <section className="mb-24 reveal">
          <div className="geniq-glass rounded-[32px] p-8 sm:p-12 max-w-5xl">
            <h2 className="text-[26px] sm:text-[34px] font-normal text-white leading-[1.15] mb-6">
              Почему вы можете узнать себя <span className="gradient-text">в нескольких нейротипах</span>
            </h2>
            <div className="space-y-4 text-body text-[15px] leading-[1.75] max-w-4xl">
              <p>После чтения описаний может появиться ощущение: «Я и здесь, и здесь, и здесь». Это нормально.</p>
              <p>В GENIQ человек — это конфигурация. Один нейротип может быть ведущим, другой включаться в мотивации, третий быть инструментом действия, четвёртый отвечать за восстановление, пятый проявляться в тени.</p>
              <p>Эта страница не заменяет диагностику. Она даёт первое узнавание и язык для наблюдения за собой. Важно не просто найти похожее описание, а понять механизм: это ваша природа или адаптация, талант или компенсация, ресурс или защита, сила или привычный способ выживать.</p>
            </div>
          </div>
        </section>

        <section className="mb-24 reveal">
          <div className="geniq-glass rounded-[32px] p-10 sm:p-14 text-center relative overflow-hidden">
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
                 style={{ background: "radial-gradient(circle, rgba(118,76,176,0.18), transparent 60%)" }} />
            <h2 className="text-[26px] sm:text-[34px] font-normal text-white leading-[1.2] max-w-2xl mx-auto mb-7 relative z-10">
              Нейротип — только часть карты GENIQ.
            </h2>
            <p className="text-body text-[15px] leading-[1.7] max-w-2xl mx-auto mb-8 relative z-10">
              Чтобы понять всю конфигурацию, важно смотреть не только CORE, но и мотивацию, действие, восстановление и тень.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 relative z-10">
              <Link to="/system" className="geniq-cta geniq-cta--ghost">
                <span>О системе</span>
                <span className="arrow"><ArrowUpRight size={18} strokeWidth={1.6} /></span>
              </Link>
              <CtaButton testId="nt-test-cta">Пройти тест на ведущий нейротип</CtaButton>
              <a href={FORM_URL} target="_blank" rel="noopener noreferrer" data-testid="nt-form-cta" className="geniq-cta geniq-cta--ghost">
                <span>Пройти диагностику</span>
                <span className="arrow"><ArrowUpRight size={18} strokeWidth={1.6} /></span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
