import { apiClient } from "@/api/client";

/**
 * Only product identifiers and redirect URLs are sent from the browser.
 * Card data and payment confirmation must stay inside the payment provider/backend.
 */
export const paymentsApi = Object.freeze({
  createCheckout: (input, { idempotencyKey, ...options } = {}) =>
    apiClient.post("/v1/payments/checkout", input, {
      ...options,
      idempotencyKey,
    }),
  getOrder: (orderId, options) =>
    apiClient.get(`/v1/orders/${encodeURIComponent(orderId)}`, options),
});
