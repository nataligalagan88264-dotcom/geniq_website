const fs = require("fs");
const path = require("path");

const seo = require("../src/content/seo.json");
const siteContent = require("../src/content/site.json");
const faqContent = require("../src/content/faq.json");

const buildDirectory = path.resolve(__dirname, "../build");
const templatePath = path.join(buildDirectory, "index.html");

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const pageUrl = (pathname) =>
  `${seo.site.url}${pathname === "/" ? "/" : pathname}`;
const absoluteUrl = (value) => new URL(value, `${seo.site.url}/`).toString();

const buildStructuredData = (pathname, page) => {
  const canonicalUrl = pageUrl(pathname);
  const organizationId = `${seo.site.url}/#organization`;
  const personId = `${seo.site.url}/#person`;
  const websiteId = `${seo.site.url}/#website`;
  const imageId = `${seo.site.url}/#primaryimage`;
  const webpageId = `${canonicalUrl}#webpage`;

  const graph = [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: seo.site.name,
      legalName: siteContent.legal.ip,
      url: seo.site.url,
      email: siteContent.legal.email,
      telephone: siteContent.legal.phone,
      logo: absoluteUrl("/favicon.svg"),
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
      name: seo.site.name,
      url: seo.site.url,
      inLanguage: seo.site.language,
      publisher: { "@id": organizationId },
    },
    {
      "@type": "ImageObject",
      "@id": imageId,
      url: seo.site.image,
      contentUrl: seo.site.image,
      width: seo.site.image_width,
      height: seo.site.image_height,
      caption: seo.site.image_alt,
      inLanguage: seo.site.language,
    },
    {
      "@type": "WebPage",
      "@id": webpageId,
      url: canonicalUrl,
      name: page.title,
      description: page.description,
      inLanguage: seo.site.language,
      isPartOf: { "@id": websiteId },
      about: { "@id": organizationId },
      primaryImageOfPage: { "@id": imageId },
      dateModified: seo.site.last_modified,
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
      mainEntity: faqContent.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
};

const replaceMeta = (html, attribute, key, content) => {
  const expression = new RegExp(
    `<meta\\s+${attribute}="${key}"\\s+content="[^"]*"\\s*\\/?>`,
    "i",
  );
  return html.replace(
    expression,
    `<meta ${attribute}="${key}" content="${escapeHtml(content)}" />`,
  );
};

const renderPage = (template, pathname, page) => {
  const canonicalUrl = pageUrl(pathname);
  let html = template;

  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(page.title)}</title>`);
  html = replaceMeta(html, "name", "description", page.description);
  html = replaceMeta(
    html,
    "name",
    "robots",
    "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  );
  html = replaceMeta(html, "property", "og:title", page.title);
  html = replaceMeta(html, "property", "og:description", page.description);
  html = replaceMeta(html, "property", "og:url", canonicalUrl);
  html = replaceMeta(html, "property", "og:image", seo.site.image);
  html = replaceMeta(html, "property", "og:image:alt", seo.site.image_alt);
  html = replaceMeta(html, "property", "og:image:width", seo.site.image_width);
  html = replaceMeta(html, "property", "og:image:height", seo.site.image_height);
  html = replaceMeta(html, "property", "og:image:type", seo.site.image_type);
  html = replaceMeta(html, "name", "twitter:title", page.title);
  html = replaceMeta(html, "name", "twitter:description", page.description);
  html = replaceMeta(html, "name", "twitter:image", seo.site.image);
  html = replaceMeta(html, "name", "twitter:image:alt", seo.site.image_alt);
  html = html.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?\s*>/i,
    `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`,
  );
  html = html.replace(
    /<link\s+rel="alternate"\s+hreflang="ru-RU"\s+href="[^"]*"\s*\/?\s*>/i,
    `<link rel="alternate" hreflang="ru-RU" href="${escapeHtml(canonicalUrl)}" />`,
  );
  html = html.replace(
    /<link\s+rel="alternate"\s+hreflang="x-default"\s+href="[^"]*"\s*\/?\s*>/i,
    `<link rel="alternate" hreflang="x-default" href="${escapeHtml(canonicalUrl)}" />`,
  );
  html = html.replace(
    /<script id="seo-jsonld" type="application\/ld\+json">[\s\S]*?<\/script>/i,
    `<script id="seo-jsonld" type="application/ld+json">${JSON.stringify(buildStructuredData(pathname, page))}</script>`,
  );

  return html;
};

const renderNotFoundPage = (template) => {
  const title = "Страница не найдена — GENIQ";
  const description = "Запрашиваемая страница не найдена. Перейдите на главную страницу GENIQ.";
  let html = template;

  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);
  html = replaceMeta(html, "name", "description", description);
  html = replaceMeta(html, "name", "robots", "noindex, follow");
  html = html.replace(
    /\s*<link\s+rel="canonical"\s+href="[^"]*"\s*\/?\s*>/i,
    "",
  );
  html = html.replace(
    /\s*<link\s+rel="alternate"\s+hreflang="ru-RU"\s+href="[^"]*"\s*\/?\s*>/i,
    "",
  );
  html = html.replace(
    /\s*<link\s+rel="alternate"\s+hreflang="x-default"\s+href="[^"]*"\s*\/?\s*>/i,
    "",
  );
  html = html.replace(
    /\s*<script id="seo-jsonld" type="application\/ld\+json">[\s\S]*?<\/script>/i,
    "",
  );

  return html;
};

if (!fs.existsSync(templatePath)) {
  throw new Error("SEO generation requires an existing CRA build/index.html");
}

const template = fs.readFileSync(templatePath, "utf8");

Object.entries(seo.pages).forEach(([pathname, page]) => {
  const html = renderPage(template, pathname, page);
  const outputPath =
    pathname === "/"
      ? templatePath
      : path.join(buildDirectory, pathname.slice(1), "index.html");

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, html);
});

const sitemapEntries = Object.entries(seo.pages)
  .map(([pathname, page]) => {
    const lastModified = page.last_modified || seo.site.last_modified;
    return [
      "  <url>",
      `    <loc>${escapeHtml(pageUrl(pathname))}</loc>`,
      `    <lastmod>${escapeHtml(lastModified)}</lastmod>`,
      `    <priority>${escapeHtml(page.priority)}</priority>`,
      "  </url>",
    ].join("\n");
  })
  .join("\n");
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  sitemapEntries,
  "</urlset>",
  "",
].join("\n");
fs.writeFileSync(path.join(buildDirectory, "sitemap.xml"), sitemap);
fs.writeFileSync(
  path.join(buildDirectory, "404.html"),
  renderNotFoundPage(template),
);

console.log(
  `Generated SEO entry HTML, sitemap and 404 page for ${Object.keys(seo.pages).length} routes.`,
);
