# Инструкция по установке и запуску сервиса управления заметками

Данный проект представляет собой сервис управления текстовыми заметками (CRUD) на базе NestJS. В сервисе **не реализована проверка паролей** при аутентификации. Пользователи аутентифицируются только по `username`.

----------

## Установка и запуск

### 1. Клонирование репозитория

```bash
git clone <URL_репозитория>
cd <название_папки_проекта>

```

### 2. Установка зависимостей

```bash
npm install

```

### 3. Настройка окружения

Подготовьте файл `.env` в корне проекта, если его нет:

```bash
cp .env.dist .env

```

Если файл уже есть, проверьте, что все переменные установлены.

### 4. Сборка и запуск

#### Режим разработки

```bash
npm run start:dev

```

Приложение будет доступно по адресу [http://localhost:3000](http://localhost:3000).

#### Режим продакшн

```bash
npm run build
npm run start:prod

```

### 5. Посев данных (seed)

Для добавления тестовых пользователей (`admin` и `demo`) выполните:

```bash
npm run seed

```

После выполнения команды в базе данных будут созданы:

-   Пользователь `admin` с ролью `super-admin`
-   Пользователь `demo` с ролью `user`

----------

## Эндпоинты и примеры запросов (cURL)

### 6.1. Аутентификация и получение токена

#### Эндпоинт:

`POST /auth/login`

#### Пример запроса:

```bash
TOKEN=$(curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin"}' \
  | jq -r .access_token)

echo $TOKEN

```

Вывод команды `echo $TOKEN` покажет ваш токен. Этот токен используется для авторизации в последующих запросах.

----------

### 6.2. CRUD для заметок

#### 6.2.1. Создание анонимной заметки

Эндпоинт: `POST /notes/anonymous`

```bash
curl -X POST http://localhost:3000/notes/anonymous \
  -H "Content-Type: application/json" \
  -H "api_key: ANONYMOUS_API_KEY" \
  -d '{
    "title": "Anonymous Note",
    "text": "This is an anonymous note."
  }' | jq .

```

#### 6.2.2. Создание заметки авторизованным пользователем

Эндпоинт: `POST /notes`

```bash
curl -X POST http://localhost:3000/notes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title": "User Note",
    "text": "This is a note created by an authenticated user."
  }' | jq .

```

----------

### 6.3. Получение заметок

#### 6.3.1. Получение всех заметок

Эндпоинт: `GET /notes`

Без авторизации:

```bash
curl -X GET http://localhost:3000/notes | jq .

```

С авторизацией:

```bash
curl -X GET http://localhost:3000/notes \
  -H "Authorization: Bearer $TOKEN" | jq .

```

#### 6.3.2. Получение заметки по ID

Эндпоинт: `GET /notes/:id`

Без авторизации:

```bash
curl -X GET http://localhost:3000/notes/1 | jq .

```

С авторизацией:

```bash
curl -X GET http://localhost:3000/notes/1 \
  -H "Authorization: Bearer $TOKEN" | jq .

```

----------

### 6.4. Обновление заметки

Эндпоинт: `PATCH /notes/:id`

```bash
curl -X PATCH http://localhost:3000/notes/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title": "Updated Note Title",
    "text": "Updated note content."
  }' | jq .

```

----------

### 6.5. Удаление заметки

Эндпоинт: `DELETE /notes/:id`

```bash
curl -X DELETE http://localhost:3000/notes/1 \
  -H "Authorization: Bearer $TOKEN" | jq .

```

----------

### 6.6. Получение информации о текущем пользователе

Эндпоинт: `GET /users/me`

```bash
curl -X GET http://localhost:3000/users/me \
  -H "Authorization: Bearer $TOKEN" | jq .

```

Пример ответа:

```json
{
  "id": 1,
  "username": "admin",
  "role": "super-admin",
  "notesCount": 3
}

```

----------

### 6.7. Загрузка файлов

Эндпоинт: `POST /files/upload`

```bash
curl -X POST http://localhost:3000/files/upload \
  -F "file=@/path/to/your/file.pdf" | jq .

```

Пример ответа:

```json
{
  "filePath": "uploads/abc123-file.pdf"
}

```