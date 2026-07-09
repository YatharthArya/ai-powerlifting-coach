# AI Powerlifting Coach - Architecture

## Project Goal

Build an AI-assisted coaching operating system for structured powerlifting training analysis and decision making.

## Technology Stack

- Frontend: React (planned)
- Backend: Node.js + Express
- Database: PostgreSQL (planned)
- AI Layer: Python + OpenAI API (planned)

## Current Architecture

```
Browser
   ↓
Express Backend
   ↓
API Endpoints
   ↓
(PostgreSQL - Coming Soon)
```

## Current Backend Endpoints

| Method | Endpoint | Description |
|----------|-----------|-------------|
| GET | / | Backend health check |
| GET | /api/status | Returns backend status as JSON |

## Current Project Structure

```
AI-Powerlifting-Coach/
│
├── assets/
├── backend/
├── database/
├── docs/
├── frontend/
├── notes/
└── README.md
```

## Future Modules

- Training Session Storage
- Weekly Review Engine
- Rule-Based Coaching Engine
- AI Coaching Assistant
- Analytics Dashboard