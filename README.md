# GENIQ Website

Официальный сайт системы нейропрофилирования GENIQ: React-лендинг и SEO-страницы о системе, нейротипах, подходе и партнёрской программе.

## Технологии

- React 19 и React Router;
- Create React App + CRACO;
- Tailwind CSS и Radix UI;
- Framer Motion;
- Vercel для сборки и публикации.

## Структура проекта

```text
.
├── content-source/     # Исходные тексты из ТЗ
├── frontend/           # Рабочее React-приложение
│   ├── api/            # Serverless-функции Vercel
│   ├── public/         # Статические файлы, robots.txt и sitemap.xml
│   ├── scripts/        # Генерация HTML для SEO-страниц
│   └── src/            # Компоненты, страницы, контент и API-клиент
└── memory/             # Внутренняя документация проекта
```

Основная документация frontend находится в [`frontend/README.md`](./frontend/README.md). План подготовки к будущему backend, оплате, базе данных и AI-чату описан в [`frontend/ARCHITECTURE.md`](./frontend/ARCHITECTURE.md).

## Локальный запуск

Требования: Node.js 20+ и npm.

```bash
cd frontend
npm install --legacy-peer-deps
npm start
```

После запуска сайт доступен по адресу [http://localhost:3000](http://localhost:3000).

## Production-сборка

Из корня репозитория:

```bash
npm --prefix frontend run build
```

Команда собирает приложение в `frontend/build` и создаёт отдельные HTML-файлы с метаданными для индексируемых маршрутов.

Перед публикацией также следует выполнить:

```bash
git diff --check
npm --prefix frontend run build
```

## Переменные окружения

Публичные переменные перечислены в [`frontend/.env.example`](./frontend/.env.example).

```bash
cp frontend/.env.example frontend/.env.local
```

Секретные ключи нельзя добавлять в переменные с префиксом `REACT_APP_`: они попадают в клиентскую сборку. Секреты будущего backend и платёжной системы должны храниться только в защищённых переменных окружения серверной части или Vercel.

## Публикация на Vercel

Проект автоматически разворачивается после push в ветку `main` подключённого GitHub-репозитория.

При первом импорте в Vercel необходимо указать:

| Настройка | Значение |
| --- | --- |
| Framework Preset | Create React App |
| Root Directory | `frontend` |
| Install Command | `npm install --legacy-peer-deps` |
| Build Command | `npm run build` |
| Output Directory | `build` |

Остальные правила маршрутизации, заголовки и редиректы заданы в [`frontend/vercel.json`](./frontend/vercel.json).

## SEO

Проект содержит:

- уникальные title и description для основных страниц;
- canonical и Open Graph-разметку;
- JSON-LD для сайта, организации, автора, хлебных крошек и FAQ;
- `robots.txt`, `sitemap.xml` и web manifest;
- статические HTML-входы для SEO-маршрутов.

SEO-конфигурация страниц хранится в [`frontend/src/content/seo.json`](./frontend/src/content/seo.json).

## Основные маршруты

- `/` — главная;
- `/system` — о системе;
- `/neurotypes` — нейротипы;
- `/approach` — подход;
- `/partners` — партнёрам;
- `/blog` — блог;
- `/faq` — вопросы и ответы;
- `/privacy` — политика конфиденциальности.

## Правила работы

- Основная ветка публикации — `main`.
- Не добавляйте `.env`, токены, ключи и учётные данные в Git.
- Перед отправкой изменений проверяйте сборку и адаптивность сайта.
- После публикации проверяйте production-деплой Vercel, основные маршруты и отсутствие горизонтального скролла на мобильных устройствах.
