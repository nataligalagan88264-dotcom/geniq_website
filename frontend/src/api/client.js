import { env, requireApiBaseUrl } from "@/config/env";

export class ApiError extends Error {
  constructor(message, { status = 0, code = "api_error", details = null } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

let accessTokenProvider = null;

/**
 * Auth can be connected later without coupling the API layer to a specific provider.
 * The token must be kept in memory by the future auth integration, not hardcoded here.
 */
export const setAccessTokenProvider = (provider) => {
  accessTokenProvider = typeof provider === "function" ? provider : null;
};

const buildUrl = (path) => {
  const baseUrl = requireApiBaseUrl();
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${normalizedPath}`;
};

const parseResponse = async (response) => {
  if (response.status === 204) return null;

  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) return response.json();
  return response.text();
};

const createRequestHeaders = async ({ body, headers, idempotencyKey }) => {
  const token = accessTokenProvider ? await accessTokenProvider() : null;
  const requestHeaders = new Headers(headers);

  requestHeaders.set("Accept", "application/json");
  if (body !== undefined && !(body instanceof FormData)) {
    requestHeaders.set("Content-Type", "application/json");
  }
  if (token) requestHeaders.set("Authorization", `Bearer ${token}`);
  if (idempotencyKey) requestHeaders.set("Idempotency-Key", idempotencyKey);

  return requestHeaders;
};

const request = async (
  path,
  {
    method = "GET",
    body,
    headers = {},
    signal,
    idempotencyKey,
    timeoutMs = env.apiTimeoutMs,
    rawResponse = false,
  } = {},
) => {
  const controller = new AbortController();
  const abortFromCaller = () => controller.abort(signal?.reason);
  if (signal) {
    if (signal.aborted) abortFromCaller();
    else signal.addEventListener("abort", abortFromCaller, { once: true });
  }

  const timeoutId = window.setTimeout(() => controller.abort("timeout"), timeoutMs);

  try {
    const response = await fetch(buildUrl(path), {
      method,
      headers: await createRequestHeaders({ body, headers, idempotencyKey }),
      body:
        body === undefined || body instanceof FormData
          ? body
          : JSON.stringify(body),
      credentials: "include",
      signal: controller.signal,
    });

    if (rawResponse && response.ok) return response;

    const payload = await parseResponse(response);
    if (!response.ok) {
      throw new ApiError(
        payload?.message || `GENIQ API request failed with status ${response.status}`,
        {
          status: response.status,
          code: payload?.code || "api_error",
          details: payload,
        },
      );
    }

    return payload;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    if (controller.signal.aborted) {
      throw new ApiError("GENIQ API request was cancelled or timed out", {
        code: "request_aborted",
      });
    }
    throw new ApiError("GENIQ API is unavailable", {
      code: "network_error",
      details: error,
    });
  } finally {
    window.clearTimeout(timeoutId);
    signal?.removeEventListener("abort", abortFromCaller);
  }
};

export const apiClient = Object.freeze({
  get: (path, options) => request(path, { ...options, method: "GET" }),
  post: (path, body, options) => request(path, { ...options, method: "POST", body }),
  patch: (path, body, options) => request(path, { ...options, method: "PATCH", body }),
  delete: (path, options) => request(path, { ...options, method: "DELETE" }),
  stream: (path, body, options) =>
    request(path, { ...options, method: "POST", body, rawResponse: true }),
});
