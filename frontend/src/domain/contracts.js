export const PRODUCT_IDS = Object.freeze({
  SCREENING: "screening",
  DIAGNOSTICS: "diagnostics",
  TRACKS: "tracks",
});

export const DIAGNOSTIC_SESSION_STATUS = Object.freeze({
  DRAFT: "draft",
  IN_PROGRESS: "in_progress",
  PROCESSING: "processing",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
});

export const ORDER_STATUS = Object.freeze({
  PENDING: "pending",
  PAID: "paid",
  CANCELLED: "cancelled",
  REFUNDED: "refunded",
});

export const CHAT_ROLE = Object.freeze({
  USER: "user",
  ASSISTANT: "assistant",
  SYSTEM: "system",
});
