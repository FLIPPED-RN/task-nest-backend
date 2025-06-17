# 🎼 Compositions API — Dockerized NestJS Backend

REST API для управления авторами и музыкальными композициями. Построен с использованием [NestJS](https://nestjs.com/), [PostgreSQL](https://www.postgresql.org/) и контейнеризирован с помощью Docker Compose.

---

## 🚀 Возможности

- Полный CRUD для авторов и композиций
- Поиск, фильтрация, сортировка, пагинация
- Swagger UI (автогенерация API-документации)
- Поддержка конфигурации через `.env`
- Быстрый запуск в Docker-окружении

---

## ⚙️ Системные требования

- Docker + Docker Compose
- (опционально) Node.js 18+ и npm для локального запуска без Docker

---

## 📄 .env

Создайте `.env` в корне проекта:

```env
PORT=5000
DB_HOST=db           # обязательно "db" внутри docker-compose
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=oc_taskdb

docker compose up --build

# Остановить контейнеры
docker compose down

# Логи приложения
docker compose logs -f app

# Проверить соединение с API
curl http://localhost:5000/authors



GET	/authors	Список авторов
GET	/compositions	Список композиций
GET	/authors/:id	Один автор
GET	/compositions/:id	Одна композиция
POST	/authors	Создание автора
POST	/compositions	Создание композиции
PUT	/authors/:id	Обновление автора
PUT	/compositions/:id	Обновление композиции
DELETE	/authors/:id	Удаление автора
DELETE	/compositions/:id	Удаление композиции