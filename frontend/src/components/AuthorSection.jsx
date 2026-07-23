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
              <p>Восемь лет в маркетинге, продуктовый стратег, хороший доход — а потом всё сломалось разом: переезд в другую страну, быт с нуля, тревожное расстройство и панические атаки, апатия, подорванное здоровье.</p>
              <p>Если вы сейчас где-то там же — я понимаю это состояние не по чужим рассказам.</p>
              <p>Тогда я перестала искать мотивацию и начала искать объяснение. Больше трёх лет проверяла на себе десятки подходов — от более научных (КПТ, гештальт и т. п.) до нейропрофилирования и системных типологий — и оставляла только то, что реально работало. Так собралась GENIQ — на стыке новых исследований мозга и самых результативных подходов в работе с потенциалами человека.</p>
              <p>И первым, что собрала система, стала я сама. Я увидела свою конструкцию целиком и поняла, куда иду и ради чего. Когда видишь систему, действуешь из спокойствия, а не наугад. Оказалось, любимое дело, понедельники без тревоги и доход, который растёт естественно, — не миф, а вопрос верных настроек.</p>
              <p>Сегодня GENIQ находит признание в психологическом сообществе и понемногу меняет само представление о человеческой гениальности. Мои наработки ломают привычные рамки — они дают увидеть человека изнутри, включая его духовную природу.</p>
              <p>За системой уже больше 700 часов консультаций и более 300 человек, прошедших диагностику, — и это только начало. Я работаю по принципу интенсива: за несколько встреч запускаю процессы, которые стояли годами, и именно это даёт клиентам явный результат.</p>
              <p>Я не обещаю миллионы завтра и нескончаемое счастье — так это не работает. Я помогаю собрать разрозненные факты о вас в систему, а систему в стратегию: понять, кто вы по природе и на что способны, и сделать первые шаги. Эту дорогу я прошла сама и знаю изнутри.</p>
              <p>Поэтому вместо продаж и убеждений я просто покажу, что говорят обо мне и системе сами клиенты. И вы решите, доверить ли мне свой запрос.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthorSection;
