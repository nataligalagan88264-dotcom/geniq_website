# GENIQ — Premium dark-tech landing site

## Stack
- React 19 + React Router 7 + Tailwind + shadcn-ui + Three.js (vanilla)
- No backend. External: Google Forms (orders), Telegram bot (test entry)

## Routes
- `/` Landing — 9 blocks per main-page-content.md
- `/about` — Полная страница: foundation, 4 принципа, "Система под вас", автор-блок
- `/neurotypes` — Формула, 3 мира, 3 режима, 9 нейротипов с правильными цветами, CORE radial, 5 осей, манифест
- `/approach` — 4 шага, сравнение с MBTI, FAQ, ключевой принцип
- `/blog` — Заглушка с категориями
- `/faq` — Частые вопросы (новая страница)
- `/partners` — Партнёрство (новая страница)
- `/privacy` — Политика конфиденциальности (ФЗ-152)

## Landing block order (iteration 4)
1. Hero
2. Шкаф + статистика + переход + сферы применения + финальный мостик (Section2 + 3 + 4 + 5)
3. NeurotypeGallery (running marquee)
4. Section6Products
5. AuthorSection
6. ReviewsMosaic
7. PartnershipSection
8. FaqSection
9. FinalMessage
10. Footer

## Neurotype colors (corrected per user)
- S1 Мыслитель = Синий #6080F1
- S2 Оратор = Жёлтый #F1D160
- S3 Стратег = Фиолетовый #B79BE0
- T1 Систематик = Коралловый #E78BB8
- T2 Координатор = Бирюзовый #7EC8E0
- T3 Оптимизатор = Оранжевый #F0A060
- E1 Эмпат = Зелёный #7EC8A0
- E2 Артист = Малиновый #D870C8
- E3 Драйвер = Красно-оранжевый #FF7A5C

## Iterations
- Iter 1 (MVP): 100% (59 checks)
- Iter 2 (Products + full content pages): 100% (70 checks)
- Iter 3 (Reviews + Footer Legal + Real photo + Telegram + Portraits): 100%
- Iter 4 (Block reorder + Marquee + colors + animated wardrobe + FAQ/Partners pages): ~94% → 100% после фикса header NAV

## Animations
- Hero: Three.js neuro-head with mouse parallax
- Wardrobe: SVG floating drift + mouse parallax (--mx/--my CSS vars)
- NeurotypeGallery: 90s marquee scroll (pause on hover)
- Cards: reveal-on-scroll fade-up
- CTA buttons: arrow translate + glow on hover

## External
- Telegram: https://t.me/natali_galagan (test CTA)
- Google Form: https://docs.google.com/forms/d/e/1FAIpQLSdoeqjILTzC6vwNhv2WuXNFM_5zcGe_uTHUSG99WBqJUrgQcw/viewform

## Backlog
- Real reviews (10 cards) to replace placeholders
- Real blog articles
- Public Offer + Payment terms documents
- Real Telegram bot (currently natali_galagan handle)
- Backend (FastAPI + Mongo) if persistence becomes needed
