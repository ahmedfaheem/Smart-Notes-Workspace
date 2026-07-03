# Smart Notes

Full-stack note management app built with React, Express, and MongoDB. Users can register, log in, create notes, view notes, search and filter notes, paginate through results, and manage note details.

## Project Structure

```text
.
  backend/                         Express API and MongoDB models
  frontend/
    smart-notes-workspace/         React + Vite frontend
```

## Tech Stack

Frontend:

- React
- Vite
- React Router
- Redux Toolkit
- TanStack React Query
- Tailwind CSS
- Axios
- React Hook Form
- Zod

Backend:

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcrypt
- Zod

## Prerequisites

- Node.js
- npm
- MongoDB connection string

## Backend Setup

Go to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create `backend/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the API:

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

## Frontend Setup

Open a second terminal and go to the frontend folder:

```bash
cd frontend/smart-notes-workspace
```

Install dependencies:

```bash
npm install
```

Start the Vite dev server:

```bash
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

- Backend API details: `backend/README.md`
- Frontend details: `frontend/smart-notes-workspace/README.md`

## Build Frontend

```bash
cd frontend/smart-notes-workspace
npm run build
```

The build output is created in `frontend/smart-notes-workspace/dist/`.
