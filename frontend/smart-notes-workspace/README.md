# Smart Notes Frontend

React frontend for the Smart Notes app. It provides authentication screens, a dashboard, note listing with search/filter/pagination, note creation, note details, and note editing UI.

## Tech Stack

- React 19
- Vite
- React Router
- Redux Toolkit and React Redux
- TanStack React Query
- Axios
- React Hook Form and Zod
- Tailwind CSS
- Lucide React icons

## Folder Structure

```text
src/
  app/                 Redux store setup
  components/          Shared, home, dashboard, and notes UI components
  context/             Theme context
  features/auth/       Auth Redux slice
  layouts/             Auth and dashboard layouts
  pages/               Route pages
  routing/             App routes and protected routes
  services/            API service functions
```

## Prerequisites

- Node.js
- npm
- Backend API running on `http://localhost:5000`

The API URL is currently hard-coded in `src/services/auth.js` and `src/services/notes.js`.

## Setup

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The Vite app usually runs on:

```text
http://localhost:5173
```

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Build the app for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## API Integration

The frontend calls these backend endpoints:

- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`
- `GET /notes`
- `GET /notes/:id`
- `POST /notes`
- `PATCH /notes/:id`
- `DELETE /notes/:id`

Protected requests send the JWT token in this header:

```http
Authorization: Bearer <token>
```

## Note Response Shape

Single note responses are expected to look like:

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

## Build

Create a production build:

```bash
npm run build
```

The output is generated in the `dist/` folder.
