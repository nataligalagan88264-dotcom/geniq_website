import { apiClient } from "@/api/client";

const sessionPath = (sessionId) =>
  `/v1/diagnostic-sessions/${encodeURIComponent(sessionId)}`;

export const diagnosticsApi = Object.freeze({
  createSession: (input, options) =>
    apiClient.post("/v1/diagnostic-sessions", input, options),
  getSession: (sessionId, options) => apiClient.get(sessionPath(sessionId), options),
  updateSession: (sessionId, input, options) =>
    apiClient.patch(sessionPath(sessionId), input, options),
  getResult: (sessionId, options) =>
    apiClient.get(`${sessionPath(sessionId)}/result`, options),
});
