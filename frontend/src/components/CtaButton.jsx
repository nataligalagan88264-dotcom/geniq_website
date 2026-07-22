import React from "react";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TELEGRAM_URL } from "@/lib/constants";

/**
 * Unified pill-shaped CTA.
 * Props:
 *  - href: external link (opens in new tab)
 *  - to: internal route
 *  - onClick: handler
 *  - defaults to TELEGRAM_URL for "Пройти тест" buttons
 */
export const CtaButton = ({
  children = "Пройти тест",
  href,
  to,
  onClick,
  variant = "primary",
  testId,
  className = "",
}) => {
  const navigate = useNavigate();

  // Default: test button goes to Telegram
  const isTestButton = typeof children === "string" && children.toLowerCase().includes("тест");
  const effectiveHref = href ?? (isTestButton && !to && !onClick ? TELEGRAM_URL : null);

  const baseClasses = `geniq-cta ${variant === "ghost" ? "geniq-cta--ghost" : ""} ${variant === "soft" ? "geniq-cta--soft" : ""} ${className}`;
  const content = (
    <>
      <span>{children}</span>
      <span className="arrow"><ArrowUpRight size={18} strokeWidth={1.6} /></span>
    </>
  );

  if (effectiveHref) {
    return (
      <a
        data-testid={testId}
        href={effectiveHref}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClasses}
      >
        {content}
      </a>
    );
  }

  const handleClick = (e) => {
    if (onClick) return onClick(e);
    if (to) navigate(to);
  };

  return (
    <button data-testid={testId} onClick={handleClick} className={baseClasses}>
      {content}
    </button>
  );
};

export default CtaButton;
