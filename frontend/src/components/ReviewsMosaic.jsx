import React, { useEffect, useRef } from "react";
import { Play, Quote, Send } from "lucide-react";

const REVIEWS = [
  {
    name: "Иван",
    avatar: "/uploads/reviews/ivan-avatar.jpg",
    avatarPosition: "50% 34%",
    role: "Руководитель нотариальной палаты, ведущий игр «Мафия» и «Компас»",
    handle: "@innuendo_travel",
    handleUrl: "https://t.me/innuendo_travel",
    neurotype: "Стратег",
    request: "Понять себя на глубоком уровне и научиться удерживать фокус на важном, не распыляясь.",
    quote: "История про «зеркало эмоций» буквально поставила многое на свои места.",
    paragraphs: [
      "Я пришёл, чтобы лучше понять себя и получить чёткий план для своей реализации — идей было много.",
      "Больше всего удивили новые детали про мои сильные стороны, особенно про Драйвера и историю с «зеркалом эмоций». В какой-то момент я просто увидел, как это проявляется в моей жизни и в жизни моих близких.",
      "После встречи я сразу начал учитывать эти знания при подготовке игр «Мафия» и в работе со своими сотрудниками.",
    ],
  },
  {
    name: "Владимир",
    avatar: "/uploads/reviews/vladimir-avatar.jpg",
    avatarPosition: "50% 32%",
    role: "Мастер по работе с подсознанием",
    handle: "@magi_money",
    handleUrl: "https://t.me/magi_money",
    neurotype: "Драйвер",
    quote: "Мы как будто были на одной волне. Многие вещи понимались буквально с полуслова.",
    paragraphs: [
      "Мне было очень интересно посмотреть на уже знакомые вещи под новым углом. Если СПЧ показывает структуру потенциалов, то GENIQ намного глубже раскрывает, как человек мыслит, принимает решения, реагирует эмоционально и как работает его тело.",
      "Особенно ценными для меня оказались очень практичные рекомендации: где я теряю энергию, как быстрее восстанавливаться и в каких условиях мой мозг работает лучше всего. Некоторые вещи я начал применять практически сразу и уже вижу первые результаты.",
      "И отдельно хочу сказать про тебя. Очень редко встречаются специалисты, которые умеют настолько глубоко разбираться в человеке и при этом сохранять такое человеческое тепло.",
    ],
  },
  {
    name: "Алина Г.",
    avatar: "/uploads/reviews/alina-g-avatar.jpg",
    avatarPosition: "48% 39%",
    role: "Аромадиагност и аромапрактик",
    handle: "@goosevaa",
    handleUrl: "https://t.me/goosevaa",
    neurotype: "Координатор",
    request: "Глубже понять свои таланты для создания собственного продукта.",
    quote: "После встречи я как будто прочитала инструкцию к самой себе.",
    paragraphs: [
      "Мне всегда интересно узнавать о себе что-то новое, но хотелось, чтобы это был именно научный взгляд, а не очередной поверхностный тест.",
      "После нашей встречи я стала намного лучше замечать свои привычные паттерны поведения, осознаннее подходить к выбору и отслеживать свои эмоции в моменте.",
      "Самым ценным для меня стал блок про особенности памяти. Сейчас учусь по-новому запоминать информацию и постепенно внедряю эти рекомендации в жизнь.",
      "Ещё один неожиданный результат — я пересмотрела свою работу, начала активно использовать ИИ для всей рутины и наконец увидела, что именно забирало у меня столько сил.",
    ],
  },
  {
    name: "Анна",
    avatar: "/uploads/reviews/anna-avatar.jpg",
    avatarPosition: "50% 32%",
    handle: "@AnnieSphene",
    handleUrl: "https://t.me/AnnieSphene",
    neurotype: "Стратег",
    request: "Проявленность в блоге: хочу не бояться быть собой на камеру и выходить на широкую аудиторию.",
    quote: "Я поняла, что дело не в количестве людей. Мне просто нужно найти свой формат проявленности.",
    paragraphs: [
      "Ты очень детально подошла к системе. Даже одна часть диагностики включает огромный объём информации. Очень понравилось, что всё продумано: запись на встречу, подробный документ, объяснения на разных уровнях — от особенностей мышления до того, какие отделы мозга отвечают за моё восприятие.",
      "Отдельно хочу отметить твою мягкость, готовность слушать и чуткость. После диагностики у меня появилось понимание, что мне не нужно бояться большой аудитории. Мне нужно искать свой способ общения с ней.",
    ],
  },
  {
    name: "Алёна",
    avatar: "/uploads/reviews/alena-avatar.jpg",
    avatarPosition: "50% 28%",
    handle: "@alyamoure",
    handleUrl: "https://t.me/alyamoure",
    neurotype: "Стратег",
    request: "Понять, в каком направлении двигаться дальше, чтобы начать системно зарабатывать ×2 и не выгорать.",
    quote: "Я поняла, что мне не нужно пересобирать себя. Нужно просто научиться быть в ладу с собой.",
    paragraphs: [
      "Больше всего меня удивило, насколько точно система смогла считать меня через вопросы. Было ощущение, будто мою личность буквально просветили рентгеном. Некоторые моменты, связанные даже с психосоматикой, оказались настолько точными, что я не представляла, как это вообще можно определить.",
      "Но самое важное произошло после диагностики. Мне стало намного спокойнее. Я перестала считать себя ленивой и поняла, что мне не нужно постоянно себя переделывать. Нужно просто научиться слышать себя, не ругать и не пытаться жить против своей природы.",
    ],
  },
  {
    name: "Алина К.",
    role: "Духовный проводник, таролог",
    handle: "@alina_ksizar",
    handleUrl: "https://t.me/alina_ksizar",
    neurotype: "Стратег",
    request: "Снова увидеть смысл двигаться в сторону саморазвития и понять, какой путь точно мой.",
    video: "/uploads/reviews/alina-k-review.mp4",
    poster: "/uploads/reviews/alina-k-review-poster.jpg",
    videoLabel: "Видеоотзыв Алины К.",
  },
  {
    name: "Алина В.",
    role: "Юрист-консультант",
    handle: "@over_the_heaven",
    handleUrl: "https://t.me/over_the_heaven",
    neurotype: "Стратег",
    request: "Понять, как притянуть свою аудиторию и клиентов.",
    video: "/uploads/reviews/alina-v-telegram-review.mp4",
    poster: "/uploads/reviews/alina-v-review-poster.jpg",
    videoLabel: "Видеоотзыв Алины В.",
    circle: true,
  },
];

const useReveal = () => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("in");
      });
    }, { threshold: 0.08 });
    el.querySelectorAll(".reveal").forEach((node) => obs.observe(node));
    return () => obs.disconnect();
  }, []);

  return ref;
};

const ReviewVideo = ({ review }) => (
  <div className={review.circle ? "review-video-circle-wrap" : "review-video-portrait-wrap"}>
    <video
      className={review.circle ? "review-video-circle" : "review-video-portrait"}
      controls
      controlsList="nodownload"
      playsInline
      preload="metadata"
      poster={review.poster}
      aria-label={review.videoLabel}
    >
      <source src={review.video} type="video/mp4" />
      Ваш браузер не поддерживает воспроизведение видео.
    </video>
    {review.circle && (
      <span className="review-video-circle-glow" aria-hidden="true" />
    )}
  </div>
);

const ReviewCard = ({ review, idx }) => {
  const isVideo = Boolean(review.video);

  return (
    <article
      data-testid={`review-${idx}`}
      className={`reveal geniq-card review-card-mosaic review-card-real ${isVideo ? "review-card-with-video" : ""} p-5 sm:p-6`}
    >
      <div className="review-card-topline">
        <div className="review-format-label">
          {review.circle ? <Send size={13} /> : isVideo ? <Play size={13} /> : <Quote size={13} />}
          <span>{review.circle ? "Telegram-кружок" : isVideo ? "Видеоотзыв" : "Отзыв клиента"}</span>
        </div>
        <span className="review-neurotype">{review.neurotype}</span>
      </div>

      <header className="review-person">
        <div className="review-person-copy">
          <h3>{review.name}</h3>
          {review.role && <p>{review.role}</p>}
          {review.handle && (
            <a href={review.handleUrl} target="_blank" rel="noreferrer">
              {review.handle}
            </a>
          )}
        </div>
        {review.avatar && !isVideo && (
          <img
            className="review-avatar"
            src={review.avatar}
            alt=""
            width="76"
            height="76"
            loading="lazy"
            decoding="async"
            style={{ objectPosition: review.avatarPosition }}
          />
        )}
      </header>

      {isVideo && <ReviewVideo review={review} />}

      {review.request && (
        <div className="review-request">
          <span>Запрос</span>
          <p>{review.request}</p>
        </div>
      )}

      {review.quote && (
        <blockquote className="review-quote">
          <Quote size={20} aria-hidden="true" />
          <p>«{review.quote}»</p>
        </blockquote>
      )}

      {review.paragraphs && (
        <div className="review-copy">
          {review.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      )}
    </article>
  );
};

export const ReviewsMosaic = () => {
  const ref = useReveal();

  return (
    <section ref={ref} data-testid="section-reviews" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />
      <div className="container-geniq relative z-10">
        <div className="mb-14">
          <div className="reveal text-[11px] uppercase tracking-[0.22em] text-white/45 mb-4">Отзывы · Реальные истории</div>
          <h2 className="reveal text-[32px] sm:text-[42px] lg:text-[48px] font-normal leading-[1.1] text-white mb-5">
            Что говорят <span className="gradient-text">клиенты</span>
          </h2>
          <p className="reveal text-body text-[15px] leading-[1.7] max-w-[640px]">
            Не мои обещания, а слова людей, которые уже собрали свою карту: их запросы, открытия и первые изменения после диагностики.
          </p>
        </div>

        <div className="reviews-masonry">
          {REVIEWS.map((review, index) => (
            <div key={`${review.name}-${index}`} className="reviews-masonry-item">
              <ReviewCard review={review} idx={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsMosaic;
