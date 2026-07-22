# GENIQ: подготовка к backend

Frontend остаётся самостоятельным статическим приложением на Vercel. Будущий backend подключается через `REACT_APP_API_URL`, поэтому визуальные страницы и текущие внешние формы продолжают работать, пока API не создан.

## Уже подготовлено

- `src/config/env.js` — единая точка публичной конфигурации.
- `src/api/client.js` — HTTP-клиент с таймаутом, отменой запросов, cookies, Bearer-токеном, нормализованными ошибками и idempotency key.
- `src/api/diagnostics.js` — граница для диагностических сессий и результатов.
- `src/api/payments.js` — граница для checkout и заказов.
- `src/api/chat.js` — граница для диалогов, истории и потоковых ответов.
- `src/domain/contracts.js` — стабильные идентификаторы продуктов и статусы основных сущностей.

Эти модули пока не импортируются страницами: отсутствие backend не влияет на текущий сайт.

## Предлагаемый контур

```text
React / Vercel
      |
      v
api.geniq-system.ru
  |-- authentication
  |-- diagnostic calculations
  |-- checkout + payment webhooks
  |-- AI chat orchestration
  `-- PostgreSQL
```

Минимальные таблицы: `users`, `diagnostic_sessions`, `diagnostic_results`, `products`, `orders`, `payments`, `conversations`, `messages`, `usage_events`, `audit_log`.

## Правила безопасности

1. `REACT_APP_*` всегда попадает в браузер. Там допустимы только публичные значения.
2. Ключи платёжной системы, базы данных и нейросети хранятся только на backend.
3. Frontend никогда не принимает данные карты. Backend создаёт hosted checkout, а оплату подтверждает подписанный webhook.
4. Результаты диагностики и история чата доступны только после серверной проверки пользователя.
5. Для платёжных и других повторяемых команд используется `Idempotency-Key`.
6. Медицинские и персональные данные должны иметь отдельные сроки хранения, журнал доступа и процедуру удаления.

## Подключение backend

1. Скопировать `.env.example` в `.env.local`.
2. Указать `REACT_APP_API_URL=https://api.geniq-system.ru`.
3. Подключить провайдер авторизации через `setAccessTokenProvider`.
4. Заменять внешние ссылки на API-вызовы по одному пользовательскому сценарию, сохраняя fallback до завершения миграции.
5. Зафиксировать OpenAPI-схему на backend и синхронизировать её с путями в `src/api`.

API должен возвращать ошибки в едином виде:

```json
{
  "code": "machine_readable_code",
  "message": "Понятное пользователю сообщение",
  "details": {}
}
```

Для чата endpoint `messages:stream` должен отдавать потоковый `Response`; конкретный протокол (SSE или NDJSON) выбирается при реализации backend.
