// Shared constants for GENIQ. Values are editable in Decap CMS.
import siteContent from "@/content/site.json";

export const FORM_URL = siteContent.links.form_url;
export const TELEGRAM_URL = siteContent.links.telegram_url;
export const TELEGRAM_HANDLE = siteContent.links.telegram_handle;
export const INSTAGRAM_URL = siteContent.links.instagram_url;
export const NATALI_PHOTO = siteContent.links.author_photo;
export const LEGAL = siteContent.legal;

/**
 * Neurotype color mapping — corrected per user feedback:
 *  - S1 Мыслитель = Синий
 *  - S2 Оратор    = Жёлтый
 *  - S3 Стратег   = Фиолетовый
 *  - T1 Систематик = Коричневый
 *  - T2 Координатор = Чёрный
 *  - T3 Оптимизатор = Оранжевый (эффективность)
 *  - E1 Эмпат     = Зелёный
 *  - E2 Артист    = Малиновый/розовый
 *  - E3 Драйвер   = Красно-оранжевый
 */
export const NEUROTYPE_COLORS = {
  S1: "#6080F1", // синий
  S2: "#F1D160", // жёлтый
  S3: "#B79BE0", // фиолетовый
  T1: "#9A6B4F", // коричневый
  T2: "#24242A", // чёрный
  T3: "#F0A060", // оранжевый
  E1: "#7EC8A0", // зелёный
  E2: "#D870C8", // малиновый
  E3: "#FF7A5C", // красно-оранжевый
};
