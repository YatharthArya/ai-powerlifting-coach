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

