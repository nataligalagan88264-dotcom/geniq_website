const normalizeCounterId = (value) => {
  const normalized = String(value ?? "").trim();
  return /^\d+$/.test(normalized) ? Number(normalized) : null;
};

const normalizeGoalId = (value) => String(value ?? "")
  .trim()
  .toLowerCase()
  .replace(/[^a-z0-9_-]+/g, "_")
  .replace(/^_+|_+$/g, "")
  .slice(0, 64);

const cleanLabel = (value) => String(value ?? "")
  .replace(/\s+/g, " ")
  .trim()
  .slice(0, 160);

export const getYandexMetricaCounterId = (value) => normalizeCounterId(value);

export const reachYandexGoal = (counterId, goalId, params = {}) => {
  const normalizedCounterId = normalizeCounterId(counterId);
  const normalizedGoalId = normalizeGoalId(goalId);
  if (!normalizedCounterId || !normalizedGoalId || typeof window.ym !== "function") return;

  window.ym(normalizedCounterId, "reachGoal", normalizedGoalId, params);
};

export const getTrackedAction = (element) => {
  if (!element) return null;

  const explicitGoal = normalizeGoalId(element.dataset.ymGoal);
  const testId = cleanLabel(element.dataset.testid);
  const label = cleanLabel(
    element.dataset.ymLabel
    || element.getAttribute("aria-label")
    || element.textContent,
  );
  const href = element.getAttribute("href");

  let actionId = testId;
  if (!actionId && explicitGoal) actionId = explicitGoal;
  if (!actionId && href) {
    if (href.startsWith("mailto:")) actionId = "email_link";
    else if (href.startsWith("tel:")) actionId = "phone_link";
    else if (href.startsWith("#")) actionId = `anchor_${href.slice(1)}`;
    else actionId = `link_${label || "external"}`;
  }
  if (!actionId) actionId = `${element.tagName.toLowerCase()}_${label || "control"}`;

  return {
    explicitGoal,
    params: {
      button_id: normalizeGoalId(actionId) || "unknown",
      button_text: label || undefined,
      page_path: `${window.location.pathname}${window.location.search}`,
    },
  };
};
