# ProjectHub

A full-stack project management application built with React and Node.js/Express.

## Features

- **Dashboard** — Overview with stats, activity feed, charts, and upcoming tasks
- **Projects** — Create, manage, and track projects with detailed views
- **Tasks** — Task management with filters, stats, and detailed task views
- **Team** — Team member management with roles and profiles
- **Messages** — Real-time messaging with conversations and contacts
- **Profile** — User profile with activity, stats, and notifications
- **Settings** — General, account, appearance, notification, and integration settings
- **Authentication** — Login and signup with JWT-based auth
- **Dark/Light Theme** — Toggle between themes

## Tech Stack

### Frontend
- **React 19** with Vite
- **React Router** for navigation
- **Tailwind CSS 4** for styling
- **Recharts** for data visualization

### Backend
- **Node.js** with Express 5
- **MongoDB** with Mongoose
- **JWT** for authentication
- **bcryptjs** for password hashing

## Project Structure

```
ProjectHub/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # React context providers
│   │   ├── pages/          # Page components
│   │   └── assets/         # Static assets
│   └── public/             # Public files
├── server/                 # Express backend
│   ├── config/             # Database configuration
│   ├── controllers/        # Route controllers
│   ├── middleware/          # Auth & error handling middleware
│   ├── models/             # Mongoose models
│   └── routes/             # API routes
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account or local MongoDB instance
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Vaibhav5860/projectHub.git
   cd projectHub
   ```

2. **Install all dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp server/.env.example server/.env
   ```
   Update `server/.env` with your MongoDB URI and JWT secret.

4. **Run the application**
   ```bash
   # Run both client and server concurrently
   npm run dev

   # Or run them separately
   npm run server    # Start backend on port 5000
   npm run client    # Start frontend on port 5173
   ```

## API Endpoints

| Method | Endpoint          | Description           |
| ------ | ----------------- | --------------------- |
| POST   | /api/auth/signup  | Register a new user   |
| POST   | /api/auth/login   | Login user            |
| GET    | /api/users        | Get users             |
| GET    | /api/projects     | Get all projects      |
| POST   | /api/projects     | Create a project      |
| GET    | /api/tasks        | Get all tasks         |
| POST   | /api/tasks        | Create a task         |
| GET    | /api/teams        | Get all teams         |
| POST   | /api/teams        | Create a team         |
| GET    | /api/messages     | Get messages          |
| POST   | /api/messages     | Send a message        |

## Environment Variables

| Variable     | Description                    | Default     |
| ------------ | ------------------------------ | ----------- |
| PORT         | Server port                    | 5000        |
| MONGO_URI    | MongoDB connection string      | —           |
| JWT_SECRET   | Secret key for JWT tokens      | —           |
| JWT_EXPIRE   | JWT token expiration           | 7d          |
| NODE_ENV     | Environment mode               | development |

## Scripts

| Command          | Description                          |
| ---------------- | ------------------------------------ |
| `npm run dev`    | Run client and server concurrently   |
| `npm run server` | Run server only (with nodemon)       |
| `npm run client` | Run client only (Vite dev server)    |
| `npm run build`  | Build client for production          |
| `npm start`      | Start server in production mode      |

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
