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

# Day 7

## Features Added

- Added in-memory session storage using JavaScript arrays
- Updated POST /api/session to save workout sessions
- Added GET /api/sessions endpoint to return all stored sessions
- Updated GET /api/session/:id to return a specific session
- Added validation for invalid session IDs
- Implemented 404 responses for missing sessions

## Testing

Successfully tested:

POST /api/session
GET /api/sessions
GET /api/session/0
GET /api/session/1
GET /api/session/99

## Concepts Learned

- Arrays
- push()
- Route parameters
- parseInt()
- Array indexing
- 404 error handling
- REST API resource retrieval


# Day 8 Development Log

## Features Added

- Added PUT /api/session/:id endpoint for updating existing sessions
- Added DELETE /api/session/:id endpoint for removing sessions
- Added validation to prevent updates on non-existent sessions
- Added validation to prevent deletion of non-existent sessions
- Implemented session replacement using array indexing
- Implemented session removal using splice()

## Testing Performed

### Update Endpoint Testing

- Created workout sessions using POST /api/session
- Updated session 0 using PUT /api/session/0
- Verified updated values through GET /api/session/0
- Confirmed updated data persisted in the sessions array

### Delete Endpoint Testing

- Deleted session 0 using DELETE /api/session/0
- Verified successful deletion response
- Checked GET /api/sessions to confirm session removal
- Verified session count decreased correctly

### Error Handling Testing

- Requested invalid session IDs
- Verified 404 responses for missing sessions
- Confirmed API returned appropriate error messages

## Concepts Learned

### PUT Requests

- Used PUT requests to update existing resources
- Replaced session objects using array indexing

```javascript
sessions[sessionId] = req.body;
```

# Day 9

## Features Added

- Added dotenv package for environment variable management
- Created `.env` file for application configuration
- Configured application name using environment variables
- Added request counting middleware
- Added request logging middleware
- Implemented API usage monitoring through `/api/stats`
- Updated application version to 0.0.4
- Protected sensitive configuration files using `.gitignore`

## Learning Outcomes

### Environment Variables
- Learned how to install and configure dotenv
- Understood why sensitive information should not be hardcoded
- Learned how to access environment variables using `process.env`
- Implemented application configuration through `.env`

### Middleware
- Learned Express middleware execution flow
- Understood the role of the `next()` function
- Implemented custom middleware for request counting
- Implemented custom middleware for request logging

### API Monitoring
- Tracked total API requests during runtime
- Created a dedicated statistics endpoint
- Learned how middleware can be used for monitoring and analytics

## Routes Tested

### GET /api/status
Returned application status, version, and application name from environment variables.

### GET /api/stats
Returned total API requests processed by the server.

### Existing CRUD Routes Verification
- GET /api/sessions
- GET /api/session/:id
- POST /api/session
- PUT /api/session/:id
- DELETE /api/session/:id
- GET /api/search?exercise=value

All routes continued functioning correctly after middleware integration.

## Challenges Faced

### Environment Variable Setup
- Learned proper dotenv installation and configuration
- Verified environment variables loaded successfully during server startup

### Middleware Order
- Understood that middleware executes in the order it is registered
- Verified request counter increments before route execution

### Request Tracking Validation
- Confirmed browser requests, including favicon requests, are also counted
- Observed real-time request monitoring through terminal logs

## Result

Successfully implemented environment-based configuration and middleware-based request monitoring.

Backend now supports:
- Environment variable configuration
- Request counting
- Request logging
- API usage statistics
- Protected configuration management

Application version upgraded to **0.0.4** and all existing CRUD functionality remains operational.

# Day 10

## Features Added

- Created database folder for persistent storage
- Added sessions.json database file
- Implemented file-based session loading during server startup
- Added saveSessions() helper function
- Implemented automatic file updates for POST operations
- Implemented automatic file updates for PUT operations
- Implemented automatic file updates for DELETE operations
- Added persistent storage support using Node.js File System module (fs)

## File System Integration

### Reading Data

Loaded existing sessions from sessions.json during application startup.

```javascript
let sessions = JSON.parse(
    fs.readFileSync("../database/sessions.json", "utf8")
);
```

Purpose:
- Read stored session data from file
- Convert JSON data into JavaScript objects
- Load existing sessions automatically when the server starts

### Writing Data

Saved updated session data back to sessions.json whenever sessions are created, updated, or deleted.

```javascript
function saveSessions() {
    fs.writeFileSync(
        "../database/sessions.json",
        JSON.stringify(sessions, null, 2)
    );
}
```

Purpose:
- Convert JavaScript array into JSON format
- Save updated data permanently
- Ensure data persists after server restarts

## Testing Performed

### POST Persistence Testing

- Created workout session using POST /api/session
- Verified sessions.json updated correctly
- Restarted server
- Confirmed data loaded successfully from file

### PUT Persistence Testing

- Updated existing session using PUT /api/session/:id
- Verified updated values were written to sessions.json
- Restarted server
- Confirmed updated data persisted correctly

### DELETE Persistence Testing

- Deleted existing session using DELETE /api/session/:id
- Verified session removal from sessions.json
- Restarted server
- Confirmed deleted session remained removed

### Startup Data Loading Test

Verified that existing data was automatically loaded during server startup.

Terminal Output:

```text
Loaded Sessions:
[
  {
    exercise: 'Bench Press',
    weight: 105,
    reps: 5,
    rpe: 8
  }
]
```

## Concepts Learned

### Node.js File System Module

```javascript
const fs = require("fs");
```

Used for reading and writing files.

### JSON.parse()

Converts JSON text into JavaScript objects.

```javascript
JSON.parse(jsonData);
```

### JSON.stringify()

Converts JavaScript objects into JSON text.

```javascript
JSON.stringify(data, null, 2);
```

### readFileSync()

Reads file content synchronously.

```javascript
fs.readFileSync(path, "utf8");
```

### writeFileSync()

Writes data to a file synchronously.

```javascript
fs.writeFileSync(path, data);
```

### Persistent Storage

Learned how to store data permanently outside application memory.

Before Day 10:

```text
Server Restart
↓
All Data Lost
```

After Day 10:

```text
Server Restart
↓
sessions.json Loaded
↓
Data Restored
```

## Result

Successfully migrated session storage from memory-only storage to persistent file-based storage.

The backend now:
- Loads session data from file during startup
- Saves new sessions automatically
- Saves updated sessions automatically
- Saves deleted session changes automatically
- Preserves data across server restarts

This is the first implementation of persistent storage and serves as a foundation before moving to database systems such as MongoDB.


# Day 11

## Features Added

- Created reusable validation middleware
- Added exercise validation
- Added weight validation
- Added reps validation
- Added RPE validation
- Applied validation middleware to POST endpoint
- Applied validation middleware to PUT endpoint
- Added input protection before data reaches storage

## Validation Middleware

Created reusable middleware:

```javascript
function validateSession(req, res, next) {
    const { exercise, weight, reps, rpe } = req.body;

    if (!exercise || exercise.trim() === "") {
        return res.status(400).json({
            error: "Exercise is required"
        });
    }

    if (!weight || weight <= 0) {
        return res.status(400).json({
            error: "Weight must be greater than 0"
        });
    }

    if (!reps || reps <= 0) {
        return res.status(400).json({
            error: "Reps must be greater than 0"
        });
    }

    if (!rpe || rpe < 1 || rpe > 10) {
        return res.status(400).json({
            error: "RPE must be between 1 and 10"
        });
    }

    next();
}
```

## Middleware Integration

Applied middleware to:

### POST Endpoint

```javascript
app.post("/api/session", validateSession, ...)
```

### PUT Endpoint

```javascript
app.put("/api/session/:id", validateSession, ...)
```

## Testing Performed

### Exercise Validation

Input:

```json
{
    "exercise": "",
    "weight": 140,
    "reps": 5,
    "rpe": 8
}
```

Result:

```json
{
    "error": "Exercise is required"
}
```

### Weight Validation

Input:

```json
{
    "exercise": "Bench Press",
    "weight": -100,
    "reps": 5,
    "rpe": 8
}
```

Result:

```json
{
    "error": "Weight must be greater than 0"
}
```

### Reps Validation

Input:

```json
{
    "exercise": "Bench Press",
    "weight": 100,
    "reps": 0,
    "rpe": 8
}
```

Result:

```json
{
    "error": "Reps must be greater than 0"
}
```

### RPE Validation

Input:

```json
{
    "exercise": "Bench Press",
    "weight": 100,
    "reps": 5,
    "rpe": 15
}
```

Result:

```json
{
    "error": "RPE must be between 1 and 10"
}
```

### Valid Session Test

Input:

```json
{
    "exercise": "Squat",
    "weight": 140,
    "reps": 5,
    "rpe": 8
}
```

Result:

Session saved successfully.

### PUT Validation Test

Verified validation middleware also prevents invalid updates and allows valid updates.

## Concepts Learned

- Validation Middleware
- Reusable Middleware
- Input Validation
- Business Rules
- Middleware Chaining
- Request Filtering
- Data Integrity
- API Protection

## Request Flow

Before Day 11:

```text
Request
↓
Route Handler
↓
Database/File Storage
```

After Day 11:

```text
Request
↓
Validation Middleware
↓
Route Handler
↓
Database/File Storage
```

## Result

Successfully implemented reusable validation middleware.

The backend now prevents invalid session data from being stored and ensures data consistency across both creation and update operations.