# Backend API

This backend is an Express + MongoDB API for user authentication and note management.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the backend folder with at least:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

3. Start the server:

```bash
npm run dev
```

The API runs on `http://localhost:<PORT>`.

## Authentication

Most note routes require a JWT in the request header:

```http
Authorization: Bearer <token>
```

You get the token from the login endpoint.

## API Endpoints

### Health

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| GET | / | No | Basic health check |

### Auth Routes

Base path: `/auth`

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| POST | /auth/register | No | Register a new user |
| POST | /auth/login | No | Login and return a JWT token |
| POST | /auth/me | Yes | Get the current authenticated user |

#### POST /auth/register

Request body:

```json
{
  "name": "Ahmed Faheem",
  "email": "ahmed@example.com",
  "password": "password123"
}
```

Validation rules:

- name: at least 3 characters
- email: valid email
- password: at least 8 characters

Success response:

```json
{
  "sucess": true,
  "message": "User registered successfully",
  "user": {
    "name": "Ahmed Faheem",
    "email": "ahmed@example.com"
  }
}
```

#### POST /auth/login

Request body:

```json
{
  "email": "ahmed@example.com",
  "password": "password123"
}
```

Success response:

```json
{
  "sucess": true,
  "token": "jwt_token_here"
}
```

#### POST /auth/me

Headers:

```http
Authorization: Bearer <token>
```

Success response:

```json
{
  "sucess": true,
  "user": {
    "_id": "...",
    "name": "Ahmed Faheem",
    "email": "ahmed@example.com"
  }
}
```

### Notes Routes

Base path: `/notes`

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| POST | /notes | Yes | Create a new note |
| GET | /notes | Yes | Get all notes for the current user |
| GET | /notes/:id | Yes | Get a single note by id |
| PATCH | /notes/:id | Yes | Update a note |
| DELETE | /notes/:id | Yes | Delete a note |

#### POST /notes

Request body:

```json
{
  "title": "Meeting notes",
  "content": "Discuss project scope",
  "category": "Work",
  "tags": ["meeting", "project"],
  "status": "Todo",
  "isPinned": false
}
```

Required fields:

- title
- content

Optional fields:

- category
- tags
- status: Todo, In Progress, Done
- isPinned

Success response:

```json
{
  "success": true,
  "message": "Note created successfully",
  "note": {}
}
```

#### GET /notes

Query parameters:

- search: search by title or content
- category: filter by category
- status: filter by status
- page: pagination page number
- limit: number of items per page

Example:

```http
GET /notes?search=meeting&category=Work&page=1&limit=10
```

Success response:

```json
{
  "success": true,
  "pagination": {
    "totalNotes": 12,
    "page": 1,
    "limit": 10,
    "totalPages": 2,
    "hasNextPage": true,
    "hasPrevPage": false
  },
  "notes": []
}
```

#### GET /notes/:id

Success response:

```json
{
  "success": true,
  "note": {}
}
```

#### PATCH /notes/:id

Request body:

```json
{
  "title": "Updated title"
}
```

At least one field is required.

Allowed fields:

- title
- content
- category
- tags
- status
- isPinned

Success response:

```json
{
  "success": true,
  "note": {}
}
```

#### DELETE /notes/:id

Success response:

```json
{
  "success": true,
  "message": "Note Deleted Successfully"
}
```

## Error Format

Validation and request errors return JSON responses such as:

```json
{
  "success": false,
  "message": "Error message here"
}
```

Validation middleware can also return field-level errors:

```json
{
  "success": false,
  "errors": [
    {
      "field": "email",
      "message": "Invalid email address"
    }
  ]
}
```