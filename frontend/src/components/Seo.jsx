import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import seoContent from "@/content/seo.json";
import siteContent from "@/content/site.json";
import faqItems from "@/content/faq.json";

const SITE_URL = seoContent.site.url;
const SEO = seoContent.pages;
const absoluteUrl = (value) => new URL(value, `${SITE_URL}/`).toString();

const setMeta = (selector, attributes) => {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
};

const setLink = (selector, attributes) => {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("link");
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
};

const pageUrl = (pathname) => `${SITE_URL}${pathname === "/" ? "" : pathname}`;

const buildStructuredData = (pathname, page, canonicalUrl) => {
  const organizationId = `${SITE_URL}/#organization`;
  const personId = `${SITE_URL}/#person`;
  const websiteId = `${SITE_URL}/#website`;
  const graph = [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: seoContent.site.name,
      legalName: siteContent.legal.ip,
      url: SITE_URL,
      email: siteContent.legal.email,
      telephone: siteContent.legal.phone,
      founder: { "@id": personId },
      sameAs: [siteContent.links.telegram_url, siteContent.links.instagram_url],
    },
    {
      "@type": "Person",
      "@id": personId,
      name: "Натали Галаган",
      jobTitle: "Психодиагност и нейрокоуч",
      image: absoluteUrl(siteContent.links.author_photo),
      worksFor: { "@id": organizationId },
      sameAs: [siteContent.links.telegram_url, siteContent.links.instagram_url],
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      name: seoContent.site.name,
      url: SITE_URL,
      inLanguage: seoContent.site.language,
      publisher: { "@id": organizationId },
    },
    {
      "@type": "WebPage",
      "@id": `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: page.title,
      description: page.description,
      inLanguage: seoContent.site.language,
      isPartOf: { "@id": websiteId },
      about: { "@id": organizationId },
      breadcrumb: { "@id": `${canonicalUrl}#breadcrumb` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${canonicalUrl}#breadcrumb`,
      itemListElement: page.breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: pageUrl(item.path),
      })),
    },
  ];

  if (pathname === "/faq") {
    graph.push({
      "@type": "FAQPage",
      "@id": `${canonicalUrl}#faq`,
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
};

export default function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const normalizedPathname = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
    const canonicalPath = normalizedPathname === "/about" ? "/system" : normalizedPathname;
    const page = SEO[canonicalPath] || SEO["/"];
    const isIndexable = Boolean(SEO[canonicalPath]);
    const canonicalUrl = pageUrl(isIndexable ? canonicalPath : "/");

    document.title = page.title;
    document.documentElement.lang = "ru";

    setMeta('meta[name="description"]', { name: "description", content: page.description });
    setMeta('meta[name="robots"]', {
      name: "robots",
      content: isIndexable ? "index, follow, max-image-preview:large" : "noindex, follow",
    });
    setMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
    setMeta('meta[property="og:locale"]', { property: "og:locale", content: "ru_RU" });
    setMeta('meta[property="og:site_name"]', { property: "og:site_name", content: "GENIQ" });
    setMeta('meta[property="og:title"]', { property: "og:title", content: page.title });
    setMeta('meta[property="og:description"]', { property: "og:description", content: page.description });
    setMeta('meta[property="og:url"]', { property: "og:url", content: canonicalUrl });
    setMeta('meta[property="og:image"]', { property: "og:image", content: seoContent.site.image });
    setMeta('meta[property="og:image:alt"]', { property: "og:image:alt", content: seoContent.site.image_alt });
    setMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    setMeta('meta[name="twitter:title"]', { name: "twitter:title", content: page.title });
    setMeta('meta[name="twitter:description"]', { name: "twitter:description", content: page.description });
    setMeta('meta[name="twitter:image"]', { name: "twitter:image", content: seoContent.site.image });
    setMeta('meta[name="twitter:image:alt"]', { name: "twitter:image:alt", content: seoContent.site.image_alt });

    setLink('link[rel="canonical"]', { rel: "canonical", href: canonicalUrl });
    setLink('link[rel="alternate"][hreflang="ru-RU"]', {
      rel: "alternate",
      hreflang: "ru-RU",
      href: canonicalUrl,
    });
    setLink('link[rel="alternate"][hreflang="x-default"]', {
      rel: "alternate",
      hreflang: "x-default",
      href: canonicalUrl,
    });

    let structuredData = document.head.querySelector('#seo-jsonld');
    if (!structuredData) {
      structuredData = document.createElement("script");
      structuredData.id = "seo-jsonld";
      structuredData.type = "application/ld+json";
      document.head.appendChild(structuredData);
    }
    structuredData.textContent = JSON.stringify(
      buildStructuredData(canonicalPath, page, canonicalUrl),
    );
  }, [pathname]);

  return null;
}
