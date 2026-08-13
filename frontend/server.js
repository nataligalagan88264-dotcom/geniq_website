const express = require("express");
const fs = require("fs");
const path = require("path");
const authHandler = require("./api/auth");
const callbackHandler = require("./api/callback");

const app = express();
const buildDirectory = path.join(__dirname, "build");
const port = Number(process.env.GENIQ_PORT) || 8080;

app.disable("x-powered-by");
app.set("trust proxy", 1);

const applyCommonHeaders = (res) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=(), usb=()"
  );
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
};

app.use((_req, res, next) => {
  applyCommonHeaders(res);
  next();
});

app.get("/health", (_req, res) => {
  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({ status: "ok" });
});

app.get("/api/auth", authHandler);
app.get("/api/callback", callbackHandler);

app.use("/admin", (_req, res, next) => {
  res.setHeader("X-Robots-Tag", "noindex, nofollow");
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Cross-Origin-Opener-Policy", "unsafe-none");
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self' https://github.com; script-src 'self' 'unsafe-eval' https://unpkg.com; style-src 'self' 'unsafe-inline'; font-src 'self' data: https:; img-src 'self' data: blob: https:; media-src 'self' blob: https:; connect-src 'self' blob: https://api.github.com https://github.com; worker-src 'self' blob:; upgrade-insecure-requests"
  );
  next();
});

app.get("/admin/config.yml", (req, res, next) => {
  const configPath = path.join(buildDirectory, "admin", "config.yml");

  fs.readFile(configPath, "utf8", (error, config) => {
    if (error) return next(error);

    const configuredOrigin = process.env.GITHUB_OAUTH_ORIGIN;
    const requestOrigin = `${req.protocol}://${req.get("host")}`;
    const cmsOrigin = configuredOrigin
      ? new URL(configuredOrigin).origin
      : requestOrigin;
    const runtimeConfig = config.replace(
      /^\s*base_url:\s*.*$/m,
      `  base_url: ${cmsOrigin}`
    );

    res.type("text/yaml").send(runtimeConfig);
  });
});

app.get("/admin", (_req, res) => {
  res.sendFile(path.join(buildDirectory, "admin", "index.html"));
});

app.use(
  express.static(buildDirectory, {
    index: false,
    setHeaders: (res, filePath) => {
      if (filePath.includes(`${path.sep}static${path.sep}`)) {
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      } else if (filePath.includes(`${path.sep}models${path.sep}`)) {
        res.setHeader(
          "Cache-Control",
          "public, max-age=2592000, stale-while-revalidate=86400"
        );
      }
    },
  })
);

app.get("*", (req, res) => {
  const relativePath = decodeURIComponent(req.path).replace(/^\/+|\/+$/g, "");
  const pagePath = relativePath
    ? path.join(buildDirectory, relativePath, "index.html")
    : path.join(buildDirectory, "index.html");

  if (pagePath.startsWith(buildDirectory) && fs.existsSync(pagePath)) {
    return res.sendFile(pagePath);
  }

  return res.status(404).sendFile(path.join(buildDirectory, "404.html"));
});

app.use((error, _req, res, _next) => {
  console.error(error);
  if (res.headersSent) return;
  res.status(500).send("Internal Server Error");
});

if (require.main === module) {
  app.listen(port, "0.0.0.0", () => {
    console.log(`GENIQ server is listening on port ${port}`);
  });
}

module.exports = app;
