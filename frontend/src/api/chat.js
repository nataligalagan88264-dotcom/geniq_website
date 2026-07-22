import { apiClient } from "@/api/client";

const conversationPath = (conversationId) =>
  `/v1/chat/conversations/${encodeURIComponent(conversationId)}`;

export const chatApi = Object.freeze({
  createConversation: (input = {}, options) =>
    apiClient.post("/v1/chat/conversations", input, options),
  getConversation: (conversationId, options) =>
    apiClient.get(conversationPath(conversationId), options),
  listMessages: (conversationId, options) =>
    apiClient.get(`${conversationPath(conversationId)}/messages`, options),
  streamMessage: (conversationId, input, options) =>
    apiClient.stream(`${conversationPath(conversationId)}/messages:stream`, input, options),
});
