# Snippet Vault

A small service for storing useful snippets (links/notes/commands) with tags and search.

**Stack:** Next.js (App Router) + NestJS + MongoDB (Mongoose) + TypeScript

---

## Running locally

### Backend

1. Navigate to the `backend` folder
2. Create a `.env` file based on `.env.example`
3. Run:
```bash
npm install
npm run start:dev
```

Server will start at `http://localhost:3001`

### Frontend

1. Navigate to the `frontend` folder
2. Create a `.env` file based on `.env.example`
3. Run:
```bash
npm install
npm run dev
```

App will start at `http://localhost:3000` (or another available port)

---

## Environment variables

### Backend `.env`
```
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/SnippetVault?appName=SnippetVault
PORT=3001
```

### Frontend `.env`
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

---

## API endpoints

### Create a snippet
```
POST /snippets
Content-Type: application/json

{
  "title": "Snippet title",
  "content": "console.log('snippet content')",
  "tags": ["javascript"],
  "type": "command"
}
```

### Get list of snippets
```
GET /snippets?page=1&limit=10&q=title&tag=javascript
```

### Get snippet by id
```
GET /snippets/:id
```

### Update snippet
```
PUT /snippets/:id
Content-Type: application/json

{
  "title": "Updated title"
}
```

### Delete snippet
```
DELETE /snippets/:id
```

---

## Build and run in production mode

### Backend
```bash
cd backend
npm install
npm run build
npm run start:prod
```

### Frontend
```bash
cd frontend
npm install
npm run build
npm run start
```

---

## Deploy

- Frontend: https://snippet-vault-lilac-eta.vercel.app/
- Backend: https://snippet-vault-mg8j.onrender.com/

---

## What I would improve

- CORS is currently open for all origins. In production it should be restricted via the `FRONTEND_URL` environment variable
- Types are duplicated between frontend and backend. The better solution would be to extract them into a separate shared package within a monorepo
- `PUT` is used for partial updates instead of `PATCH`. Semantically `PATCH` would be more correct for partial updates