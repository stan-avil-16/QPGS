# QPGS (Question Paper Generation System)

QPGS is a monorepo containing a Node.js/Express backend and a React frontend for managing questions, subjects, users, and generating question papers.

## Structure

- `qpgs-backend/` — Express + MongoDB API
- `qpgs-frontend/` — React app (Create React App)

## Quick start

### Prerequisites

- Node.js 18+
- npm 9+
- MongoDB (local or a connection string)

### Backend

1. Copy environment variables:
   - Create `qpgs-backend/.env` with your MongoDB connection and JWT secret.
2. Install and run:
   - `cd qpgs-backend`
   - `npm install`
   - `npm start` (or `node server.js` if start script not present)

The backend runs by default on `http://localhost:5000` (see `qpgs-backend/server.js`).

### Frontend

1. Install and run:
   - `cd qpgs-frontend`
   - `npm install`
   - `npm start`

The frontend runs on `http://localhost:3000`.

## Environment

Create a `.env` in `qpgs-backend` with at least:

```
MONGO_URI=mongodb://localhost:27017/qpgs
JWT_SECRET=change_me
PORT=5000
```

## Scripts

Typical commands:

- Backend: `npm start` (or `node server.js`)
- Frontend: `npm start`, `npm run build`

## Contributing

1. Create a feature branch
2. Commit with clear messages
3. Open a PR

## License

ISC


