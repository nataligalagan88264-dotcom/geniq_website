const normalizeUrl = (value) => String(value || "").trim().replace(/\/+$/, "");

const parsePositiveNumber = (value, fallback) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

const apiBaseUrl = normalizeUrl(process.env.REACT_APP_API_URL);

/**
 * Public build-time configuration.
 * CRA embeds REACT_APP_* values in the browser bundle, so secrets never belong here.
 */
export const env = Object.freeze({
  apiBaseUrl,
  apiTimeoutMs: parsePositiveNumber(process.env.REACT_APP_API_TIMEOUT_MS, 12_000),
  appEnv: process.env.REACT_APP_ENV || process.env.NODE_ENV || "development",
  isApiConfigured: Boolean(apiBaseUrl),
});

export const requireApiBaseUrl = () => {
  if (!env.apiBaseUrl) {
    throw new Error(
      "GENIQ API is not configured. Set REACT_APP_API_URL before enabling server features.",
    );
  }

  return env.apiBaseUrl;
};
