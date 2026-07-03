# Smart Notes Backend

Express and MongoDB API for user authentication and note management. The API supports JWT-protected routes, request validation, user-scoped notes, search, filtering, and pagination.

## Tech Stack

- Node.js
- Express
- MongoDB with Mongoose
- JSON Web Tokens
- bcrypt
- Zod
- CORS
- dotenv
- nodemon

## Prerequisites

- Node.js
- npm
- MongoDB connection string

## Setup

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the development server:

```bash
npm run dev
```

The API runs on:

```text
http://localhost:5000
```

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the API with nodemon |
| `npm start` | Start the API with Node |
| `npm test` | Placeholder test script |

## Authentication

Protected routes require a JWT token:

```http
Authorization: Bearer <token>
```

The token is returned from `POST /auth/login`.

## Health Check

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| `GET` | `/` | No | Check that the backend is running |

Success response:

```json
{
  "message": "Hello from the backend!"
}
```

## Auth Routes

Base path: `/auth`

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| `POST` | `/auth/register` | No | Register a new user |
| `POST` | `/auth/login` | No | Login and return a JWT token |
| `GET` | `/auth/me` | Yes | Get the current user |
| `PUT` | `/auth/me` | Yes | Update the current user's name |

### Register

```http
POST /auth/register
```

Request body:

```json
{
  "name": "Ahmed Faheem",
  "email": "ahmed@example.com",
  "password": "password123"
}
```

Success response:

```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "name": "Ahmed Faheem",
    "email": "ahmed@example.com"
  }
}
```

### Login

```http
POST /auth/login
```

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
  "success": true,
  "token": "jwt_token_here"
}
```

### Get Current User

```http
GET /auth/me
```

Success response:

```json
{
  "success": true,
  "user": {
    "_id": "user_id",
    "name": "Ahmed Faheem",
    "email": "ahmed@example.com",
    "createdAt": "2026-07-03T02:26:45.689Z",
    "updatedAt": "2026-07-03T02:26:45.689Z"
  }
}
```

### Update Current User

```http
PUT /auth/me
```

Request body:

```json
{
  "name": "Ahmed"
}
```

Success response:

```json
{
  "success": true,
  "user": {
    "_id": "user_id",
    "name": "Ahmed",
    "email": "ahmed@example.com"
  }
}
```

## Notes Routes

Base path: `/notes`

All notes routes require authentication.

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/notes` | Create a note |
| `GET` | `/notes` | Get notes for the current user |
| `GET` | `/notes/:id` | Get one note by id |
| `PATCH` | `/notes/:id` | Update one note |
| `DELETE` | `/notes/:id` | Delete one note |

### Note Fields

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `title` | String | Yes | Trimmed |
| `content` | String | Yes | Trimmed |
| `category` | String | No | Defaults to `General` |
| `tags` | String array | No | Defaults to `[]` |
| `status` | String | No | Defaults to `Todo` |
| `isPinned` | Boolean | No | Defaults to `false` |

Allowed categories:

- `General`
- `Programming`
- `Work`
- `Study`
- `Personal`
- `Ideas`

Allowed statuses:

- `Todo`
- `In Progress`
- `Done`

### Create Note

```http
POST /notes
```

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

Success response:

```json
{
  "success": true,
  "message": "Note created successfully",
  "note": {
    "_id": "note_id",
    "title": "Meeting notes",
    "content": "Discuss project scope",
    "category": "Work",
    "tags": ["meeting", "project"],
    "status": "Todo",
    "isPinned": false,
    "userId": "user_id",
    "createdAt": "2026-07-03T02:26:45.689Z",
    "updatedAt": "2026-07-03T02:26:45.689Z"
  }
}
```

### Get Notes

```http
GET /notes
```

Query parameters:

| Parameter | Description |
| --- | --- |
| `search` | Search by note title or content |
| `category` | Filter by category |
| `status` | Filter by status |
| `page` | Page number |
| `limit` | Number of notes per page |

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

### Get Note By Id

```http
GET /notes/:id
```

Success response:

```json
{
  "success": true,
  "note": {
    "_id": "6a471de5a7dd065797264ba1",
    "title": "test",
    "content": "test",
    "category": "Programming",
    "tags": [],
    "status": "Todo",
    "isPinned": false,
    "userId": "6a46ef8662985c21864826fd",
    "createdAt": "2026-07-03T02:26:45.689Z",
    "updatedAt": "2026-07-03T02:26:45.689Z",
    "__v": 0
  }
}
```

### Update Note

```http
PATCH /notes/:id
```

Request body:

```json
{
  "title": "Updated title",
  "status": "In Progress"
}
```

Success response:

```json
{
  "success": true,
  "note": {
    "_id": "note_id",
    "title": "Updated title",
    "status": "In Progress"
  }
}
```

### Delete Note

```http
DELETE /notes/:id
```

Success response:

```json
{
  "success": true,
  "message": "Note Deleted Successfully"
}
```

## Error Format

General errors:

```json
{
  "success": false,
  "message": "Error message here"
}
```

Validation errors:

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

## Notes

- Notes are scoped to the authenticated user.
- Note ids must be valid MongoDB ObjectIds.
- Passwords are hashed before saving users.
- The JWT payload stores the authenticated user's id.
