const DEFAULT_OAUTH_ORIGIN = "https://geniq-system.ru";

const getOAuthOrigin = () => {
  const configuredOrigin = process.env.GITHUB_OAUTH_ORIGIN || DEFAULT_OAUTH_ORIGIN;
  const origin = new URL(configuredOrigin);

  if (origin.protocol !== "https:") {
    throw new Error("GITHUB_OAUTH_ORIGIN must use HTTPS");
  }

  return origin.origin;
};

const getOAuthRedirectUri = () => `${getOAuthOrigin()}/api/callback`;

const setOAuthResponseHeaders = (res) => {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-Robots-Tag", "noindex, nofollow");
  res.setHeader("Referrer-Policy", "no-referrer");
};

const serializeForInlineScript = (value) =>
  JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");

module.exports = {
  getOAuthOrigin,
  getOAuthRedirectUri,
  serializeForInlineScript,
  setOAuthResponseHeaders,
};
