import React, { useEffect } from "react";
import { Shield, Mail, Phone, Send } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LEGAL } from "@/lib/constants";

const SECTIONS = [
  {
    n: "1", title: "Общие положения",
    body: (
      <>
        <p>Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей сайта <span className="text-[#B79BE0]">{LEGAL.site}</span>. Политика разработана в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных».</p>
        <p>Оператором персональных данных является <span className="text-white">{LEGAL.ip}</span> (ИНН {LEGAL.inn}, ОГРНИП {LEGAL.ogrnip}) — далее Оператор.</p>
        <p>Используя Сайт и оставляя свои данные, пользователь подтверждает согласие с условиями настоящей Политики.</p>
      </>
    ),
  },
  {
    n: "2", title: "Основные понятия",
    body: (
      <ul className="space-y-2 list-none">
        <li><span className="text-white">Персональные данные</span> — любая информация, относящаяся к прямо или косвенно определённому физическому лицу.</li>
        <li><span className="text-white">Обработка персональных данных</span> — любое действие с персональными данными (сбор, запись, хранение, использование, передача, удаление и др.).</li>
        <li><span className="text-white">Пользователь</span> — лицо, посещающее Сайт и/или оставляющее заявку.</li>
      </ul>
    ),
  },
  {
    n: "3", title: "Какие данные обрабатываются",
    body: (
      <>
        <p>Оператор обрабатывает данные, которые пользователь предоставляет добровольно при заполнении форм, в мессенджерах или при оплате:</p>
        <ul className="space-y-1.5 list-none mt-3">
          <li>· имя</li>
          <li>· номер телефона</li>
          <li>· адрес электронной почты</li>
          <li>· ник в Telegram / мессенджерах (при наличии)</li>
          <li>· содержание запроса, которое пользователь сообщает добровольно</li>
          <li>· данные, автоматически передаваемые при использовании Сайта (IP-адрес, cookies, данные о браузере и устройстве, источник перехода)</li>
        </ul>
        <p className="mt-4"><span className="text-[#B79BE0]">Оператор не запрашивает и не хранит</span> данные банковских карт — оплата проводится через платёжный сервис Robokassa, который обрабатывает платёжные данные самостоятельно.</p>
      </>
    ),
  },
  {
    n: "4", title: "Цели обработки",
    body: (
      <ul className="space-y-1.5 list-none">
        <li>· связь с пользователем и ответ на заявку;</li>
        <li>· оказание услуг и исполнение договора (оферты);</li>
        <li>· проведение оплаты через платёжный сервис;</li>
        <li>· информирование о статусе услуги;</li>
        <li>· улучшение работы Сайта и качества услуг.</li>
      </ul>
    ),
  },
  {
    n: "5", title: "Правовые основания обработки",
    body: <p>Обработка осуществляется на основании: согласия пользователя; договора (оферты), стороной которого является пользователь; а также требований действующего законодательства РФ.</p>,
  },
  {
    n: "6", title: "Порядок и условия обработки",
    body: <p>Обработка осуществляется с использованием средств автоматизации и без них. Оператор принимает необходимые организационные и технические меры для защиты персональных данных от неправомерного доступа, изменения, распространения или уничтожения.</p>,
  },
  {
    n: "7", title: "Передача данных третьим лицам",
    body: (
      <>
        <p>Оператор не продаёт и не передаёт персональные данные третьим лицам, за исключением случаев, когда это необходимо для оказания услуг:</p>
        <ul className="space-y-1.5 list-none mt-3">
          <li>· платёжному сервису <span className="text-white">Robokassa</span> (ООО «Робокасса») — для проведения оплаты;</li>
          <li>· сервисам хостинга и аналитики Сайта — в обезличенном виде;</li>
          <li>· в случаях, предусмотренных законодательством РФ (по запросу уполномоченных органов).</li>
        </ul>
      </>
    ),
  },
  {
    n: "8", title: "Cookies",
    body: <p>Сайт использует cookies для корректной работы и аналитики. Пользователь может отключить cookies в настройках браузера; при этом отдельные функции Сайта могут работать некорректно.</p>,
  },
  {
    n: "9", title: "Сроки хранения",
    body: <p>Персональные данные хранятся не дольше, чем этого требуют цели обработки, или до отзыва согласия пользователем, если иной срок не установлен законодательством РФ.</p>,
  },
  {
    n: "10", title: "Права субъекта персональных данных",
    body: <p>Пользователь вправе: получать информацию об обработке своих данных; требовать их уточнения, блокирования или удаления; отозвать согласие на обработку. Для этого нужно направить запрос на электронную почту Оператора.</p>,
  },
  {
    n: "11", title: "Отзыв согласия",
    body: <p>Пользователь может в любой момент отозвать согласие на обработку персональных данных, направив обращение на e-mail: <a className="text-[#B79BE0]" href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>. После получения запроса Оператор прекращает обработку и удаляет данные, если их хранение более не требуется по закону.</p>,
  },
  {
    n: "12", title: "Изменения Политики",
    body: <p>Оператор вправе вносить изменения в настоящую Политику. Актуальная редакция размещается на Сайте. Продолжение использования Сайта означает согласие с обновлённой Политикой.</p>,
  },
];

export default function Privacy() {
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); });
    }, { threshold: 0.08 });
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div data-testid="privacy-page" className="min-h-screen relative">
      <Header />
      <main className="pt-52 sm:pt-56 pb-24 container-geniq relative">
        <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />

        {/* Hero */}
        <div className="max-w-3xl mb-16 reveal">
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-white/45 mb-5">
            <Shield size={14} className="text-[#B79BE0]" />
            GENIQ · Privacy policy
          </div>
          <h1 className="text-[36px] sm:text-[48px] lg:text-[56px] font-normal text-white leading-[1.08] mb-6">
            Политика <span className="gradient-text">конфиденциальности</span>
          </h1>
          <p className="text-body text-[15px] leading-[1.7] max-w-[640px]">
            Документ описывает, какие данные мы собираем, для чего используем и как защищаем. Составлен по требованиям ФЗ-152.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-3 max-w-4xl">
          {SECTIONS.map((s) => (
            <details key={s.n} data-testid={`privacy-${s.n}`} className="reveal geniq-card p-6 group cursor-pointer">
              <summary className="flex items-start justify-between gap-4 list-none [&::-webkit-details-marker]:hidden">
                <div className="flex items-baseline gap-4">
                  <span className="text-[#B79BE0] text-[13px] font-medium min-w-[24px]">{s.n}.</span>
                  <h3 className="text-white text-[15.5px] font-medium leading-snug pr-4">{s.title}</h3>
                </div>
                <span className="text-[#B79BE0] text-2xl leading-none transition-transform group-open:rotate-45 shrink-0">+</span>
              </summary>
              <div className="text-body text-[14px] leading-[1.75] mt-4 pt-4 border-t border-white/5 space-y-3">
                {s.body}
              </div>
            </details>
          ))}
        </div>

        {/* Contacts block */}
        <section className="reveal mt-16">
          <div className="geniq-glass rounded-[28px] p-8 sm:p-10 max-w-4xl">
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/45 mb-4">13 · Реквизиты и контакты Оператора</div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <div className="text-white text-[16px] font-medium mb-3">{LEGAL.ip}</div>
                <div className="text-body text-[13.5px] space-y-1">
                  <div>ИНН: <span className="text-white">{LEGAL.inn}</span></div>
                  <div>ОГРНИП: <span className="text-white">{LEGAL.ogrnip}</span></div>
                </div>
              </div>
              <div className="space-y-3 text-[13.5px]">
                <div className="flex items-center gap-3">
                  <Mail size={14} className="text-[#B79BE0]" />
                  <a href={`mailto:${LEGAL.email}`} className="text-white/85 hover:text-white">{LEGAL.email}</a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={14} className="text-[#B79BE0]" />
                  <a href={`tel:${LEGAL.phone.replace(/\s/g, "")}`} className="text-white/85 hover:text-white">{LEGAL.phone}</a>
                </div>
                <div className="flex items-center gap-3">
                  <Send size={14} className="text-[#B79BE0]" />
                  <span className="text-white/85">{LEGAL.site}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
