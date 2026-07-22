import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logoMark from "@/assets/logo_b_alpha_crop.png";
import CtaButton from "./CtaButton";
import siteContent from "@/content/site.json";

const NAV = siteContent.navigation;

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.localStorage.removeItem("geniq-day-readable");
    document.body.classList.remove("geniq-day-readable");
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname, location.hash]);

  const isNavActive = (item) => {
    if (item.to === "/#services") {
      return location.pathname === "/" && location.hash === "#services";
    }
    return location.pathname === item.to;
  };

  return (
    <header
      data-testid="site-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "backdrop-blur-xl border-b border-white/5" : ""
      }`}
      style={{
        height: 84,
        backgroundColor: scrolled ? "rgba(12, 10, 24, 0.9)" : "#0C0A18",
      }}
    >
      <div className="container-geniq h-full flex items-center justify-between">
        {/* Logo + tagline */}
        <Link to="/" data-testid="logo-link" className="brand-logo-link group">
          <img src={logoMark} alt="GENIQ" className="brand-logo-image" />
          <span className="brand-logo-divider" aria-hidden="true" />
          <span className="brand-logo-tagline">
            {siteContent.brand.tagline_lines.map((line, index) => (
              <React.Fragment key={line}>
                {line}
                {index < siteContent.brand.tagline_lines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden xl:flex items-center gap-7">
          {NAV.map((item) => {
            const active = isNavActive(item);
            return (
              <Link
                key={item.to}
                to={item.to}
                data-testid={`nav-${item.to.replace("/", "")}`}
                className={`nav-link${active ? " nav-link--active" : ""}`}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden xl:flex items-center">
          <CtaButton testId="header-cta">Пройти тест</CtaButton>
        </div>

        {/* Mobile burger */}
        <button
          data-testid="mobile-menu-toggle"
          onClick={() => setOpen(!open)}
          className="xl:hidden text-white/80 p-2"
          aria-label="menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div
          data-testid="mobile-menu"
          className="xl:hidden absolute top-full left-0 right-0 backdrop-blur-xl border-t border-white/5"
          style={{ backgroundColor: "rgba(12, 10, 24, 0.97)" }}
        >
          <div className="container-geniq py-6 flex flex-col gap-4">
            {NAV.map((item) => {
              const active = isNavActive(item);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`nav-link text-base py-2${active ? " nav-link--active" : ""}`}
                  aria-current={active ? "page" : undefined}
                  data-testid={`mobile-nav-${item.to.replace("/", "")}`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-2">
              <CtaButton testId="mobile-header-cta">Пройти тест</CtaButton>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
