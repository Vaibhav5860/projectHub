# ProjectHub

ProjectHub is a full-stack project management platform for teams that need project tracking, task execution, team collaboration, and real-time messaging in one place.

## What You Get

- Multi-role dashboards for admin, manager, and developer workflows
- Project lifecycle management (create, track, update, delete)
- Task management with filtering, status control, and analytics views
- Team management with member assignment and role-aware actions
- Real-time chat via Socket.IO (conversations + project-based chat)
- Activity feed and weekly activity stats
- JWT authentication and protected API routes
- Profile, notifications, and settings modules

## Tech Stack

### Frontend (client)
- React 19 + Vite
- React Router
- Axios
- Tailwind CSS 4
- Recharts
- Socket.IO Client

### Backend (server)
- Node.js + Express 5
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- Socket.IO

## Repository Structure

```text
ProjectHub/
|-- client/                 # Vite + React app
|   |-- src/
|   |   |-- components/     # UI and feature components
|   |   |-- context/        # Global app state providers
|   |   |-- pages/          # Route pages
|   |   |-- services/       # API and socket clients
|   |   `-- assets/
|   `-- public/
|-- server/                 # Express API + Socket.IO server
|   |-- config/
|   |-- controllers/
|   |-- middleware/
|   |-- models/
|   |-- routes/
|   `-- server.js
|-- LICENSE
`-- README.md
```

## Local Development Setup

### Prerequisites

- Node.js 18+ (Node.js 20+ recommended)
- npm 9+
- MongoDB Atlas cluster or local MongoDB instance

### 1) Clone

```bash
git clone https://github.com/Vaibhav5860/projectHub.git
cd projectHub
```

### 2) Install Dependencies

Install in each app folder:

```bash
cd server && npm install
cd ../client && npm install
```

### 3) Configure Environment Variables

Create env files from examples.

Windows PowerShell:

```powershell
Copy-Item server/.env.example server/.env
Copy-Item client/.env.example client/.env
```

macOS/Linux:

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

#### Required server env (`server/.env`)

| Variable | Description | Example |
| --- | --- | --- |
| `PORT` | API server port | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Secret for signing JWT | `super-secret-key` |
| `JWT_EXPIRE` | Token expiration | `7d` |
| `NODE_ENV` | Runtime mode | `development` |
| `CLIENT_URL` | Allowed frontend origin for CORS | `http://localhost:5173` |

#### Required client env (`client/.env`)

| Variable | Description | Example |
| --- | --- | --- |
| `VITE_API_URL` | Backend API base URL | `http://localhost:5000/api` |

### 4) Run the Apps

Open two terminals from the repository root.

Terminal 1 (API):

```bash
cd server
npm run dev
```

Terminal 2 (frontend):

```bash
cd client
npm run dev
```

Local URLs:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- Health check: http://localhost:5000/

## Scripts

### Server (`server/package.json`)

| Script | Command | Purpose |
| --- | --- | --- |
| `npm run dev` | `nodemon server.js` | Start API in development mode |
| `npm start` | `node server.js` | Start API in production mode |

### Client (`client/package.json`)

| Script | Command | Purpose |
| --- | --- | --- |
| `npm run dev` | `vite` | Start frontend dev server |
| `npm run build` | `vite build` | Build production frontend bundle |
| `npm run preview` | `vite preview` | Preview built frontend locally |
| `npm run lint` | `eslint .` | Run lint checks |

## API Overview

Base URL: `/api`

### Auth
- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me` (protected)
- `PUT /auth/password` (protected)
- `DELETE /auth/account` (protected)

### Users
- `GET /users` (protected)
- `GET /users/:id` (protected)
- `PUT /users/:id` (protected)
- `DELETE /users/:id` (admin only)

### Projects
- `GET /projects` (protected)
- `POST /projects` (admin, manager)
- `GET /projects/:id` (protected)
- `PUT /projects/:id` (admin, manager)
- `DELETE /projects/:id` (admin)

### Tasks
- `GET /tasks` (protected)
- `POST /tasks` (admin, manager)
- `GET /tasks/:id` (protected)
- `PUT /tasks/:id` (admin, manager, developer)
- `DELETE /tasks/:id` (admin, manager)

### Teams
- `GET /teams` (protected)
- `POST /teams` (admin, manager)
- `GET /teams/:id` (protected)
- `PUT /teams/:id` (admin, manager)
- `DELETE /teams/:id` (admin)
- `POST /teams/:id/members` (admin, manager)
- `DELETE /teams/:id/members/:memberId` (admin, manager)

### Messages
- `GET /messages/conversations` (protected)
- `POST /messages/conversations` (protected)
- `GET /messages/conversations/:id` (protected)
- `POST /messages/conversations/:id/messages` (protected)
- `GET /messages/project/:projectId` (protected)
- `POST /messages/project/:projectId/messages` (protected)

### Activities
- `GET /activities` (protected)
- `GET /activities/weekly` (protected)

## Realtime Events (Socket.IO)

Key emitted/listened events include:
- `user_online`
- `users_online`
- `join_conversation`
- `leave_conversation`
- `send_message`
- `receive_message`
- `typing`
- `user_typing`
- `stop_typing`
- `user_stop_typing`
- `data_changed`
- `data_updated`

## Deployment Notes

- Set `CLIENT_URL` in server env to your deployed frontend URL.
- Set `VITE_API_URL` in client env to your deployed backend URL including `/api`.
- Use `npm run build` inside `client` for production frontend artifacts.
- Run server with `npm start` in production.

## Troubleshooting

- If login succeeds but protected routes fail, verify `JWT_SECRET` and token expiry.
- If API calls fail from frontend, verify `VITE_API_URL` points to the correct backend URL.
- If Socket.IO does not connect, confirm backend origin allowlist (`CLIENT_URL`) includes frontend domain.
- If MongoDB connection fails, verify `MONGO_URI` credentials, IP allowlist, and cluster status.

## License

Licensed under the MIT License. See [LICENSE](LICENSE).
