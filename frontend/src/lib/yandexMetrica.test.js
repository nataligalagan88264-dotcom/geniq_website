import {
  getTrackedAction,
  getYandexMetricaCounterId,
  reachYandexGoal,
} from "./yandexMetrica";

describe("Yandex Metrica helpers", () => {
  afterEach(() => {
    delete window.ym;
    document.body.innerHTML = "";
  });

  test("accepts only a numeric counter ID", () => {
    expect(getYandexMetricaCounterId("12345678")).toBe(12345678);
    expect(getYandexMetricaCounterId(12345678)).toBe(12345678);
    expect(getYandexMetricaCounterId("")).toBeNull();
    expect(getYandexMetricaCounterId("counter-1")).toBeNull();
  });

  test("describes a CTA without collecting form or personal data", () => {
    window.history.replaceState({}, "", "/partners?source=test");
    document.body.innerHTML = `
      <a data-testid="partners-business-cta" data-ym-goal="partner_contact" href="https://t.me/example">
        Обсудить сотрудничество
      </a>
    `;

    const action = getTrackedAction(document.querySelector("a"));
    expect(action).toEqual({
      explicitGoal: "partner_contact",
      params: {
        button_id: "partners-business-cta",
        button_text: "Обсудить сотрудничество",
        page_path: "/partners?source=test",
      },
    });
  });

  test("sends a normalized reachGoal command", () => {
    window.ym = jest.fn();
    reachYandexGoal("12345678", "Test Start", { button_id: "hero-cta" });

    expect(window.ym).toHaveBeenCalledWith(
      12345678,
      "reachGoal",
      "test_start",
      { button_id: "hero-cta" },
    );
  });
});
