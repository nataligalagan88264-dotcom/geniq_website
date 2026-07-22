import React from "react";
import { Link } from "react-router-dom";
import { Send, Mail, Phone, Shield } from "lucide-react";
import { LEGAL, TELEGRAM_URL } from "@/lib/constants";

export const Footer = () => {
  return (
    <footer data-testid="site-footer" className="relative border-t border-white/5 mt-24">
      <div className="container-geniq py-12 sm:py-14">
        <div data-testid="footer-legal">
          <div className="grid md:grid-cols-12 gap-9 md:gap-12">
            <div className="md:col-span-7">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-white/45 mb-5">
                <Shield size={12} className="text-[#B79BE0]" />
                Юридическая информация
              </div>
              <div className="space-y-1.5 text-[12.5px] text-white/60 leading-relaxed">
                <div>{LEGAL.ip}</div>
                <div>ИНН: {LEGAL.inn}</div>
                <div>ОГРНИП: {LEGAL.ogrnip}</div>
              </div>
              <div className="mt-4">
                <Link className="nav-link text-[12.5px]" to="/privacy">Политика конфиденциальности</Link>
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="text-[11px] uppercase tracking-[0.22em] text-white/45 mb-5">Контактные данные</div>
              <ul className="flex flex-col gap-3 text-[13px] text-body">
                <li className="flex items-center gap-2.5">
                  <Mail size={13} className="text-white/40" />
                  <a href={`mailto:${LEGAL.email}`} className="hover:text-[#B79BE0] transition-colors">{LEGAL.email}</a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone size={13} className="text-white/40" />
                  <a href={`tel:${LEGAL.phone.replace(/\s/g, "")}`} className="hover:text-[#B79BE0] transition-colors">{LEGAL.phone}</a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Send size={13} className="text-white/40" />
                  <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-[#B79BE0] transition-colors">@natali_galagan</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 mt-9 pt-6 text-[11px] text-white/35 leading-relaxed">
            <div>© 2026 GENIQ. Вся информация защищена авторскими правами и является интеллектуальной собственностью Галаган Натальи Валентиновны.</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
