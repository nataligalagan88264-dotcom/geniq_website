import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import siteContent from "@/content/site.json";
import {
  getTrackedAction,
  getYandexMetricaCounterId,
  reachYandexGoal,
} from "@/lib/yandexMetrica";

const SCRIPT_ID = "yandex-metrica-tag";
const ACTION_SELECTOR = "[data-ym-goal], a[href], button, [role='button'], summary";

const initializeMetrica = (counterId) => {
  window.ym = window.ym || function yandexMetricaQueue(...args) {
    (window.ym.a = window.ym.a || []).push(args);
  };
  window.ym.l = window.ym.l || Date.now();

  if (!document.getElementById(SCRIPT_ID)) {
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.async = true;
    script.src = "https://mc.yandex.ru/metrika/tag.js";
    document.head.appendChild(script);
  }

  window.ym(counterId, "init", {
    accurateTrackBounce: true,
    clickmap: true,
    defer: true,
    trackLinks: true,
    webvisor: false,
  });
};

export default function YandexMetrica() {
  const location = useLocation();
  const counterId = getYandexMetricaCounterId(siteContent.analytics?.yandex_metrica_id);
  const previousUrlRef = useRef(document.referrer || undefined);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!counterId) return undefined;

    if (!window.__geniqMetricaCounterIds) window.__geniqMetricaCounterIds = new Set();
    if (!window.__geniqMetricaCounterIds.has(counterId)) {
      initializeMetrica(counterId);
      window.__geniqMetricaCounterIds.add(counterId);
    }
    initializedRef.current = true;

    const handleClick = (event) => {
      const element = event.target.closest?.(ACTION_SELECTOR);
      if (!element) return;

      const action = getTrackedAction(element);
      if (!action) return;

      reachYandexGoal(counterId, "button_click", action.params);
      if (action.explicitGoal && action.explicitGoal !== "button_click") {
        reachYandexGoal(counterId, action.explicitGoal, action.params);
      }
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [counterId]);

  useEffect(() => {
    if (!counterId || !initializedRef.current || typeof window.ym !== "function") return undefined;

    const currentUrl = window.location.href;
    const timerId = window.setTimeout(() => {
      window.ym(counterId, "hit", currentUrl, {
        referer: previousUrlRef.current,
        title: document.title,
      });
      previousUrlRef.current = currentUrl;
    }, 0);

    return () => window.clearTimeout(timerId);
  }, [counterId, location.pathname, location.search]);

  return null;
}
