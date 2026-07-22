import React, { useEffect, useRef } from "react";
import { NATALI_PHOTO } from "@/lib/constants";

const useReveal = () => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); });
    }, { threshold: 0.1 });
    el.querySelectorAll(".reveal").forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, []);
  return ref;
};

export const AuthorSection = () => {
  const ref = useReveal();
  return (
    <section ref={ref} data-testid="section-author" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />
      <div className="container-geniq relative z-10">
        <div className="grid lg:grid-cols-[2fr_3fr] gap-10 lg:gap-16 items-center max-w-6xl">
          <div className="reveal">
            <div className="aspect-[3/4] rounded-3xl border border-[#764CB0]/40 relative overflow-hidden">
              <img src={NATALI_PHOTO} alt="Натали Галаган" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/15 pointer-events-none" />
              <div className="absolute inset-3 rounded-2xl border border-white/10 pointer-events-none" />
              <div className="absolute left-0 right-0 bottom-0 p-6 z-10">
                <div className="text-[10px] uppercase tracking-[0.22em] text-[#B79BE0] mb-2">Автор</div>
                <div className="text-white text-[20px] font-medium">Натали Галаган</div>
                <div className="text-white/60 text-[12px] mt-1">Психодиагност · Нейрокоуч</div>
                <div className="mt-4 w-10 h-px bg-[#B79BE0]/60" />
                <div className="text-white/55 text-[11px] mt-3 uppercase tracking-[0.18em]">700+ часов консультаций</div>
              </div>
            </div>
          </div>

          <div>
            <div className="reveal text-[11px] uppercase tracking-[0.22em] text-white/45 mb-5">Об авторе</div>
            <h2 className="reveal text-[32px] sm:text-[40px] lg:text-[44px] font-normal text-white leading-[1.1] mb-8">
              Натали Галаган, <span className="gradient-text">автор системы</span> GENIQ
            </h2>
            <div className="reveal space-y-4 text-body text-[15px] leading-[1.72] max-w-[640px]">
              <p><strong className="font-medium text-white">Меня зовут Натали Галаган, автор системы GENIQ.</strong> Профессионально — психодиагност и нейрокоуч. По жизни — новатор и исследователь природных талантов и способностей человека.</p>
              <p>За 3 года я прошла путь от маркетинга до собственной диагностической системы. Не по учебнику и не «мягкой интеграцией» — наживую, выбрав себя главным экспериментом своей жизни.</p>
              <p>Я дважды начинала с нуля: два переезда в другую страну, и каждый раз всё заново. Ушла из профессии продуктового стратега и высокого дохода в полную неизвестность — с выгоранием, апатией, подорванным здоровьем и проблемами в отношениях.</p>
              <p>И впервые честно спросила себя: чего я вообще хочу? И на что способна?</p>
              <p>Ответ я искала больше 10 лет. Изучала человеческую психику от НЛП до нейропрофилирования, прошла десятки подходов — научных, эзотерических, духовных — исследуя даже природу предназначения, души и тела. И оставляла только то, что давало результат. Так появилась GENIQ.</p>
              <p>За системой — больше 700 часов консультаций. Каждая карта личности индивидуальна, и путь с каждым человеком — свой. Каждый продвигался в своём запросе и по дороге открывал свою настоящую ценность. А итог называли одинаково: спокойствие и тихая уверенность вместо суеты и режима выживания.</p>
              <p>Я не обещаю, что GENIQ мгновенно изменит вашу жизнь и завтра вы заработаете миллионы и будете жить в нескончаемом счастье. Так это не работает.</p>
              <p>Я помогаю собрать разрозненные факты о вас в систему, а потом — в стратегию. Ответить, кто вы по природе и на что способны. Внедрить это в жизнь и сделать первые шаги к цели. А дальше путь — ваш.</p>
              <p>Поэтому вместо продаж и убеждений я просто покажу, что говорят обо мне и системе сами клиенты. И вы решите, доверить ли мне свой запрос.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthorSection;
