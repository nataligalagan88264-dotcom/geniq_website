const fs = require("fs");
const path = require("path");

const seo = require("../src/content/seo.json");
const faq = require("../src/content/faq.json");

const buildDirectory = path.resolve(__dirname, "../build");
const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
const pageUrl = (pathname) =>
  `${seo.site.url}${pathname === "/" ? "/" : pathname}`;
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

assert(/^https:\/\//.test(seo.site.url), "SEO site URL must use HTTPS");
assert(/^https:\/\//.test(seo.site.image), "Open Graph image must use HTTPS");
assert(seo.site.image_width > 0, "Open Graph image width is required");
assert(seo.site.image_height > 0, "Open Graph image height is required");

const titles = new Set();
const descriptions = new Set();

Object.entries(seo.pages).forEach(([pathname, page]) => {
  assert(!titles.has(page.title), `Duplicate SEO title: ${page.title}`);
  assert(
    !descriptions.has(page.description),
    `Duplicate SEO description: ${page.description}`,
  );
  titles.add(page.title);
  descriptions.add(page.description);

  assert(
    page.title.length >= 30 && page.title.length <= 65,
    `SEO title length is outside 30–65 characters for ${pathname}`,
  );
  assert(
    page.description.length >= 100 && page.description.length <= 180,
    `SEO description length is outside 100–180 characters for ${pathname}`,
  );

  const htmlPath =
    pathname === "/"
      ? path.join(buildDirectory, "index.html")
      : path.join(buildDirectory, pathname.slice(1), "index.html");
  assert(fs.existsSync(htmlPath), `Missing generated HTML for ${pathname}`);

  const html = fs.readFileSync(htmlPath, "utf8");
  const canonical = pageUrl(pathname);
  assert(
    html.includes(`<title>${escapeHtml(page.title)}</title>`),
    `Incorrect title in generated HTML for ${pathname}`,
  );
  assert(
    html.includes(
      `<meta name="description" content="${escapeHtml(page.description)}" />`,
    ),
    `Incorrect description in generated HTML for ${pathname}`,
  );
  assert(
    html.includes(`<link rel="canonical" href="${canonical}" />`),
    `Incorrect canonical URL for ${pathname}`,
  );
  assert(
    html.includes("max-image-preview:large, max-snippet:-1, max-video-preview:-1"),
    `Incomplete robots directives for ${pathname}`,
  );

  const jsonLdMatch = html.match(
    /<script id="seo-jsonld" type="application\/ld\+json">([\s\S]*?)<\/script>/i,
  );
  assert(jsonLdMatch, `Missing JSON-LD for ${pathname}`);
  const jsonLd = JSON.parse(jsonLdMatch[1]);
  const graph = jsonLd["@graph"];
  assert(Array.isArray(graph), `Invalid JSON-LD graph for ${pathname}`);
  assert(
    graph.some((item) => item["@type"] === "WebPage" && item.url === canonical),
    `Missing WebPage schema for ${pathname}`,
  );
  assert(
    graph.some((item) => item["@type"] === "BreadcrumbList"),
    `Missing BreadcrumbList schema for ${pathname}`,
  );

  if (pathname === "/faq") {
    const faqSchema = graph.find((item) => item["@type"] === "FAQPage");
    assert(faqSchema, "Missing FAQPage schema");
    assert(
      faqSchema.mainEntity.length === faq.items.length,
      "FAQ schema does not match visible FAQ content",
    );
  }
});

const robots = fs.readFileSync(path.join(buildDirectory, "robots.txt"), "utf8");
assert(robots.includes("Disallow: /admin"), "robots.txt must block /admin");
assert(robots.includes("Disallow: /api/"), "robots.txt must block /api/");
assert(
  robots.includes(`Sitemap: ${seo.site.url}/sitemap.xml`),
  "robots.txt has an incorrect sitemap URL",
);

const sitemap = fs.readFileSync(path.join(buildDirectory, "sitemap.xml"), "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (match) => match[1],
);
const expectedUrls = Object.keys(seo.pages).map(pageUrl);
assert(
  JSON.stringify(sitemapUrls) === JSON.stringify(expectedUrls),
  "sitemap.xml routes do not match seo.json",
);
assert(
  (sitemap.match(/<lastmod>/g) || []).length === expectedUrls.length,
  "sitemap.xml must include lastmod for every route",
);

const notFoundPath = path.join(buildDirectory, "404.html");
assert(fs.existsSync(notFoundPath), "Missing generated 404.html");
const notFoundHtml = fs.readFileSync(notFoundPath, "utf8");
assert(
  notFoundHtml.includes('<meta name="robots" content="noindex, follow" />'),
  "404.html must be noindex",
);
assert(
  !notFoundHtml.includes('rel="canonical"'),
  "404.html must not contain a canonical URL",
);

const llmsPath = path.join(buildDirectory, "llms.txt");
assert(fs.existsSync(llmsPath), "Missing llms.txt");
const llms = fs.readFileSync(llmsPath, "utf8");
assert(/^#\s+\S+/m.test(llms), "llms.txt must contain an H1 heading");
assert(
  /\[[^\]]+\]\(https:\/\/[^)]+\)/.test(llms),
  "llms.txt must contain at least one HTTPS Markdown link",
);

console.log(`Validated technical SEO for ${expectedUrls.length} routes.`);
