# Development Log

## Day 1 - Project Initialization

- Created project repository.
- Initialized Git.
- Connected local repository to GitHub.
- Created initial README.
- Completed first commit and push.

## Day 2 - Backend Initialization

- Initialized Node.js backend using npm.
- Created package.json.
- Created first backend JavaScript file.
- Successfully executed first Node.js program.

## Day 3 - Express Server Setup

- Installed Express.js.
- Configured backend dependencies.
- Added .gitignore.
- Created first Express server.
- Successfully served content at http://localhost:3000.

## Day 4 - API Foundations

- Learned API concepts.
- Learned GET requests.
- Learned JSON responses.
- Added `/api/status` endpoint.
- Successfully returned JSON from the backend.

## Day 5 - Documentation Started

- Created architecture documentation.
- Created development log.
- Began maintaining project documentation alongside development.

# Day 6 Development Log

## Date

(17-06-2026)

## Objectives

* Learn route parameters (`req.params`)
* Learn query parameters (`req.query`)
* Implement session retrieval endpoint
* Implement search endpoint
* Add request validation
* Learn HTTP status codes
* Configure environment-based port handling

## Work Completed

### 1. Session Retrieval Endpoint

Added a GET endpoint using route parameters:

```javascript
app.get("/api/session/:id", (req, res) => {
    const sessionId = req.params.id;

    res.json({
        message: "Session retrieved successfully!",
        sessionId: sessionId
    });
});
```

Tested using:

```
/api/session/25
```

Response returned the requested session ID successfully.

---

### 2. Search Endpoint

Added a GET endpoint using query parameters:

```javascript
app.get("/api/search", (req, res) => {
    const exercise = req.query.exercise;

    res.json({
        message: "Search completed!",
        exercise: exercise
    });
});
```

Tested using:

```
/api/search?exercise=bench
/api/search?exercise=squat
/api/search?exercise=deadlift
```

All requests returned the correct exercise value.

---

### 3. Query Parameter Validation

Added validation to prevent empty search requests:

```javascript
if (!exercise) {
    return res.status(400).json({
        error: "Exercise query parameter is required"
    });
}
```

Tested using:

```
/api/search
```

Response:

```json
{
    "error": "Exercise query parameter is required"
}
```

---

### 4. HTTP Status Codes

Introduced HTTP 400 Bad Request responses for invalid client input.

Learned the purpose of:

```javascript
res.status(400)
```

and the importance of using:

```javascript
return
```

to stop further execution.

---

### 5. Environment Port Configuration

Replaced:

```javascript
const PORT = 3000;
```

with:

```javascript
const PORT = process.env.PORT || 3000;
```

to support future deployment environments.

---

## Concepts Learned

* Route Parameters (`req.params`)
* Query Parameters (`req.query`)
* Request Validation
* HTTP Status Codes
* Early Return Pattern
* Environment Variables
* API Testing Workflow

## Git Activity

Commit:

```bash
git commit -m "Add search validation and environment port support"
```

Commit Hash:

```text
367bac7
```

Successfully pushed to GitHub.

## Result

Day 6 completed successfully.

Current API Endpoints:

* GET /
* GET /api/status
* POST /api/session
* GET /api/session/:id
* GET /api/search

Repository status clean and synchronized with GitHub.
