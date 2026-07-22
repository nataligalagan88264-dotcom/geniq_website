import "@/App.css";
import "@/components/SpotlightCard.css";
import { useEffect, useLayoutEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Landing from "@/pages/Landing";
import About from "@/pages/About";
import Neurotypes from "@/pages/Neurotypes";
import Approach from "@/pages/Approach";
import Blog from "@/pages/Blog";
import Privacy from "@/pages/Privacy";
import Faq from "@/pages/Faq";
import Partners from "@/pages/Partners";
import Seo from "@/components/Seo";

const HashScroll = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      const resetId = window.setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }, 60);
      return () => window.clearTimeout(resetId);
    }

    let attempts = 0;
    let retryId;
    const scrollToTarget = () => {
      const id = decodeURIComponent(location.hash.slice(1));
      const target = document.getElementById(id);

      if (!target && attempts < 8) {
        attempts += 1;
        retryId = window.setTimeout(scrollToTarget, 80);
        return;
      }

      if (!target) return;
      const headerOffset = 140;
      const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior: "smooth" });
    };

    const scrollId = window.setTimeout(scrollToTarget, 0);
    return () => {
      window.clearTimeout(scrollId);
      window.clearTimeout(retryId);
    };
  }, [location.pathname, location.hash]);

  return null;
};

function App() {
  useEffect(() => {
    const previous = window.history.scrollRestoration;
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    return () => {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = previous;
      }
    };
  }, []);

  useEffect(() => {
    const ensureEdgeLayer = (card) => {
      if (!card) return;
      if (!card.querySelector(":scope > .edge-light")) {
        const edge = document.createElement("span");
        edge.className = "edge-light";
        edge.setAttribute("aria-hidden", "true");
        card.prepend(edge);
      }
    };

    const ensureSpotlightLayer = (card) => {
      if (!card) return;
      if (!card.querySelector(":scope > .spotlight-light")) {
        const spotlight = document.createElement("span");
        spotlight.className = "spotlight-light";
        spotlight.setAttribute("aria-hidden", "true");
        card.prepend(spotlight);
      }
    };

    const getCenterOfElement = (el) => {
      const { width, height } = el.getBoundingClientRect();
      return [width / 2, height / 2];
    };

    const getEdgeProximity = (el, x, y) => {
      const [cx, cy] = getCenterOfElement(el);
      const dx = x - cx;
      const dy = y - cy;
      let kx = Infinity;
      let ky = Infinity;
      if (dx !== 0) kx = cx / Math.abs(dx);
      if (dy !== 0) ky = cy / Math.abs(dy);
      return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
    };

    const getCursorAngle = (el, x, y) => {
      const [cx, cy] = getCenterOfElement(el);
      const dx = x - cx;
      const dy = y - cy;
      if (dx === 0 && dy === 0) return 0;
      const radians = Math.atan2(dy, dx);
      let degrees = radians * (180 / Math.PI) + 90;
      if (degrees < 0) degrees += 360;
      return degrees;
    };

    const handlePointerMove = (event) => {
      const card = event.target.closest?.(".geniq-card-spotlight, .card-spotlight, .border-glow-card");
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
      if (!card.style.getPropertyValue("--spotlight-color")) {
        card.style.setProperty("--spotlight-color", "rgba(183, 155, 224, 0.34)");
      }

      if (
        card.classList.contains("geniq-card-spotlight")
        || card.classList.contains("border-glow-card")
      ) {
        ensureEdgeLayer(card);
        if (card.classList.contains("geniq-card-spotlight")) {
          ensureSpotlightLayer(card);
        }
        const edge = getEdgeProximity(card, x, y);
        const angle = getCursorAngle(card, x, y);
        card.style.setProperty("--edge-proximity", `${(edge * 100).toFixed(3)}`);
        card.style.setProperty("--cursor-angle", `${angle.toFixed(3)}deg`);
      }
    };

    document.addEventListener("pointermove", handlePointerMove);
    return () => document.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Seo />
        <HashScroll />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/system" element={<About />} />
          <Route path="/about" element={<Navigate to="/system" replace />} />
          <Route path="/neurotypes" element={<Neurotypes />} />
          <Route path="/approach" element={<Approach />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
