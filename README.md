# Smart Notes

Smart Notes is a full-stack note management app built with React, Express, and MongoDB. It supports user authentication, note creation, note details, editing, deletion, search, filtering, pagination, pinned notes, categories, tags, and status tracking.

## Demo

<video src="./demo.mp4" controls width="100%" title="Smart Notes demo"></video>

If the video preview is not available in your Markdown viewer, open [demo.mp4](./demo.mp4).

## Project Structure

```text
.
  README.md
  demo.mp4
  backend/                         Express API, auth, validation, and MongoDB models
  frontend/
    smart-notes-workspace/         React + Vite frontend
```

## Tech Stack

Frontend:

- React 19
- Vite
- React Router
- Redux Toolkit
- TanStack React Query
- Tailwind CSS
- Axios
- React Hook Form
- Zod
- Lucide React

Backend:

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcrypt
- Zod

## Features

- Register, log in, and load the current user profile
- Create, read, update, and delete notes
- Search and filter notes
- Paginate note results
- Mark notes as pinned
- Organize notes by category, tags, and status
- Protect API routes with JWT authentication

## Prerequisites

- Node.js
- npm
- MongoDB connection string

## Quick Start

### 1. Start the Backend

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run the API:

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

### 2. Start the Frontend

Open a second terminal:

```bash
cd frontend/smart-notes-workspace
npm install
npm run dev
```

The frontend usually runs on:

```text
http://localhost:5173
```

## Available Scripts

Backend scripts:

| Command | Description |
| --- | --- |
| `npm run dev` | Start backend with nodemon |
| `npm start` | Start backend with Node |

Frontend scripts:

| Command | Description |
| --- | --- |
| `npm run dev` | Start frontend development server |
| `npm run build` | Build frontend for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## API Overview

Auth:

- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`
- `PUT /auth/me`

Notes:

- `POST /notes`
- `GET /notes`
- `GET /notes/:id`
- `PATCH /notes/:id`
- `DELETE /notes/:id`

Protected routes require:

```http
Authorization: Bearer <token>
```

## Note Model

```json
{
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
```

Allowed statuses:

- `Todo`
- `In Progress`
- `Done`

Allowed categories:

- `General`
- `Programming`
- `Work`
- `Study`
- `Personal`
- `Ideas`

## Documentation

- Postman API documentation: https://documenter.getpostman.com/view/48604520/2sBY4HU4Dv
- Backend API details: [backend/README.md](./backend/README.md)
- Frontend details: [frontend/smart-notes-workspace/README.md](./frontend/smart-notes-workspace/README.md)

## Production Build

```bash
cd frontend/smart-notes-workspace
npm run build
```

The build output is created in `frontend/smart-notes-workspace/dist/`.
