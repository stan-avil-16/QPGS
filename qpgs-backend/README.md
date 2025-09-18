# QPGS Backend

Node.js/Express API with MongoDB for managing users, subjects, questions, and generating papers.

## Setup

1. Create a `.env` file with:

```
MONGO_URI=mongodb://localhost:27017/qpgs
JWT_SECRET=change_me
PORT=5000
```

2. Install dependencies:

```
npm install
```

3. Run the server:

```
node server.js
```

Optionally add a start script in `package.json`:

```json
{
  "scripts": {
    "start": "node server.js"
  }
}
```

## Project layout

- `config/db.js` — MongoDB connection
- `models/` — Mongoose models
- `routes/` — Express routers
- `server.js` — App entry

## API base URL

`http://localhost:5000`
