# Quiet Request- By Divyansh Sethi

A simple Postman-like REST client built with React and Express.  
The application allows users to send HTTP requests, view responses in real time, and maintain a paginated history of past requests.

## Tech Stack

**Frontend**
- React (Vite)
- Zustand
- Tailwind CSS

**Backend**
- Node.js
- Express
- MikroORM
- SQLite

## Features

- Send HTTP requests using GET, POST, PUT, DELETE
- Live response rendering with status code and latency
- No page reloads (SPA behavior)
- Persistent request history using MikroORM
- Paginated history to handle large datasets efficiently
- Click on past requests to re-execute them

## How to Run

### Backend
```bash
cd server
npm install
npm run dev
server runs on http://localhost:4000

```

### Frontend
```bash
cd client
npm install
npm run dev
frontend runs on http://localhost:5173

```

### Pagination & Large Dataset Handling

-Request history is fetched using limit/offset pagination on the    backend.
-The frontend loads history page-by-page and only requests a bounded number of records at a time, ensuring scalability for large datasets.
