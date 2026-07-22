# GENIQ CMS

Панель управления после публикации открывается по адресу:

`https://frontend-ruddy-three-52.vercel.app/admin/`

CMS записывает изменения в закрытый репозиторий:

`yaroslavmilkevych/geniq-website`, ветка `main`.

## Бесплатная авторизация GitHub

1. В GitHub открыть `Settings → Developer settings → OAuth Apps → New OAuth App`.
2. Заполнить приложение:
   - `Application name`: `GENIQ CMS`
   - `Homepage URL`: `https://frontend-ruddy-three-52.vercel.app`
   - `Authorization callback URL`: `https://frontend-ruddy-three-52.vercel.app/api/callback`
3. Скопировать `Client ID` и создать `Client secret`.
4. В проекте Vercel `frontend` открыть `Settings → Environment Variables` и добавить для Production и Preview:
   - `GITHUB_CLIENT_ID`
   - `GITHUB_CLIENT_SECRET`
   Для Development эти значения не обязательны: локальный редактор использует `local_backend`.
5. Не добавлять `Client secret` в GitHub и не записывать его в `.env`, который попадёт в репозиторий.
6. Дать GitHub-аккаунту клиента роль collaborator с правом записи в `yaroslavmilkevych/geniq-website`.
7. Опубликовать файлы CMS и запустить новый production deployment.

После публикации из CMS изменения попадают в GitHub и запускают новую сборку Vercel.

## Локальная проверка редактора

Из папки `frontend` в отдельном терминале:

```bash
npx decap-server
```

Во втором терминале:

```bash
npm run start
```

Затем открыть `http://localhost:3000/admin/`.

Локальный режим использует `local_backend: true`, поэтому GitHub OAuth для него не нужен.
