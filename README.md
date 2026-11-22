# dmitrakovich.github.io

Сайт-резюме Андрея Дмитраковича — https://dmitrakovich.github.io (RU) и https://dmitrakovich.github.io/en/ (EN).

Статический сайт на [Astro](https://astro.build): без фреймворков на клиенте, ~6 КБ JS (анимации), тёмная/светлая тема, адаптив, печатная версия для кнопки «Скачать PDF».

## Где менять содержимое

| Что | Файл |
|---|---|
| Опыт, навыки, проекты, «обо мне», рекомендация, образование (RU + EN) | `src/data/resume.ts` |
| Подписи интерфейса, заголовки секций, title/description | `src/i18n/ui.ts` |
| Фото | `public/avatar.jpg` |
| Сниппет кода в hero | `src/components/Hero.astro` |
| Цвета, шрифты, анимации, печать | `src/styles/global.css` |

Новое место работы — новый объект в начале массива `experience`. Даты в формате `'YYYY-MM'`, `end: null` — «по настоящее время»; длительность и «N+ лет» пересчитываются в браузере, так что не устаревают.

## Локально

С Node 22+:

```bash
npm ci
npm run dev       # http://localhost:4321
npm run build     # → dist/
```

Без Node (через Docker):

```bash
docker run --rm -it -p 4321:4321 -v "$PWD":/app -w /app -u $(id -u):$(id -g) -e HOME=/tmp node:22-alpine sh -c "npm ci && npx astro dev --host 0.0.0.0"
```

## Деплой

Push в `master` → GitHub Actions (`.github/workflows/deploy.yml`) собирает сайт и публикует на GitHub Pages.
Один раз в настройках репозитория: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
