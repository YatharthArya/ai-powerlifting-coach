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


# Day 12

## Features Added

- Implemented centralized error handling middleware
- Added test error endpoint
- Added custom error status code support
- Added centralized error logging
- Implemented Express error pipeline using next(error)

## Error Handling Middleware

Created centralized error handler:

```javascript
app.use((err, req, res, next) => {
    console.error("Error:", err.message);

    res.status(err.status || 500).json({
        error: err.message
    });
});
```

Purpose:
- Handle errors from all routes in one location
- Standardize error responses
- Reduce duplicate error-handling code

## Test Error Route

Created:

```javascript
app.get("/api/error", (req, res, next) => {
    next(new Error("Test error from Day 12"));
});
```

Purpose:
- Verify centralized error middleware functionality
- Learn Express error propagation

## Custom Status Code Route

Created:

```javascript
app.get("/api/notfound", (req, res, next) => {
    const error = new Error("Session not found");

    error.status = 404;

    next(error);
});
```

Purpose:
- Demonstrate custom status code handling
- Differentiate between 404 and 500 errors

## Testing Performed

### Error Middleware Test

Request:

```text
GET /api/error
```

Response:

```json
{
    "error": "Test error from Day 12"
}
```

Status:

```text
500 Internal Server Error
```

### Custom Status Code Test

Request:

```text
GET /api/notfound
```

Response:

```json
{
    "error": "Session not found"
}
```

Status:

```text
404 Not Found
```

### Terminal Verification

Verified error messages logged correctly:

```text
Error: Test error from Day 12
Error: Session not found
```

## Concepts Learned

- Error Middleware
- Centralized Error Handling
- next(error)
- Express Error Pipeline
- Custom HTTP Status Codes
- Error Logging
- Separation of Concerns

## Request Flow

Before Day 12:

```text
Request
↓
Route
↓
Error Response
```

After Day 12:

```text
Request
↓
Route
↓
next(error)
↓
Error Middleware
↓
Response
```

## Result

Successfully implemented centralized error handling.

The backend now supports:
- Centralized error processing
- Consistent error responses
- Custom status codes
- Error logging
- Improved maintainability


# Day 13

## Objective

Refactor the backend into a modular Express application by separating middleware and routes into dedicated folders.

---

## Features Added

### Middleware Folder

Created:

```text
backend/middleware
```

Purpose:

- Separate reusable middleware from server configuration
- Improve maintainability
- Reduce code clutter inside index.js

---

### Validation Middleware Module

Created:

```text
backend/middleware/validateSession.js
```

Moved:

```javascript
validateSession()
```

out of index.js and exported it using:

```javascript
module.exports = validateSession;
```

Imported into:

```javascript
index.js
```

using:

```javascript
const validateSession = require("./middleware/validateSession");
```

Successfully verified validation remained functional.

---

### Error Handler Module

Created:

```text
backend/middleware/errorHandler.js
```

Moved centralized error handling middleware out of index.js.

Created:

```javascript
function errorHandler(err, req, res, next)
```

Exported using:

```javascript
module.exports = errorHandler;
```

Imported into index.js and connected using:

```javascript
app.use(errorHandler);
```

Successfully verified:

```text
GET /api/error
GET /api/notfound
```

---

### Routes Folder

Created:

```text
backend/routes
```

Created:

```text
backend/routes/sessionRoutes.js
```

Purpose:

- Separate route definitions from server configuration
- Prepare for controller-based architecture

---

### Express Router

Created:

```javascript
const router = express.Router();
```

Added test endpoint:

```javascript
router.get("/test")
```

Mounted router in index.js using:

```javascript
app.use("/api", sessionRoutes);
```

Successfully verified:

```text
GET /api/test
```

---

### Sessions Route Migration

Moved:

```javascript
GET /api/sessions
```

from:

```text
index.js
```

to:

```text
sessionRoutes.js
```

Successfully verified route execution through router module.

---

### POST Route Migration

Moved:

```javascript
POST /api/session
```

from:

```text
index.js
```

to:

```text
sessionRoutes.js
```

Connected existing validation middleware inside router.

Successfully verified:

- Valid session creation
- Validation middleware execution
- Route handling through Express Router

---

## Concepts Learned

- Express Router
- Route Modularization
- Middleware Modularization
- Module Exports
- Module Imports
- Separation of Concerns
- Express Application Structure

---

## Architecture Evolution

Before:

```text
index.js
 ├── Routes
 ├── Middleware
 ├── Validation
 ├── Error Handling
 └── Server Startup
```

After:

```text
backend
│
├── middleware
│   ├── validateSession.js
│   └── errorHandler.js
│
├── routes
│   └── sessionRoutes.js
│
└── index.js
```

---

## Result

Successfully refactored the application into a modular Express architecture.

The backend now uses dedicated middleware and route modules, making the codebase cleaner, easier to maintain, and closer to production-level Express project structure.


# Day 14

## Objective

Introduce Controllers and separate business logic from routing logic.

---

## Features Added

### Controllers Folder

Created:

```text
backend/controllers/sessionController.js
```

Purpose:

- Move business logic out of route files
- Improve maintainability
- Follow professional Express architecture

---

### Test Controller

Created:

```javascript
function testController(req, res) {
    res.json({
        message: "Controller working successfully!"
    });
}
```

Connected route:

```javascript
router.get("/test", testController);
```

Successfully verified controller execution.

---

### GET All Sessions Controller

Created:

```javascript
function getAllSessions(req, res)
```

Responsibilities:

- Read sessions.json
- Return all stored sessions
- Return total session count

Connected route:

```javascript
router.get("/sessions", getAllSessions);
```

---

### Create Session Controller

Created:

```javascript
function createSession(req, res)
```

Responsibilities:

- Read sessions.json
- Add new session
- Save updated file
- Return success response

Connected route:

```javascript
router.post(
    "/session",
    validateSession,
    createSession
);
```

Validation middleware remained functional.

---

### Update Session Controller

Created:

```javascript
function updateSession(req, res)
```

Responsibilities:

- Find session by ID
- Validate existence
- Update session
- Save file
- Return updated data

Connected route:

```javascript
router.put(
    "/session/:id",
    validateSession,
    updateSession
);
```

---

### Get Session By ID Controller

Created:

```javascript
function getSessionById(req, res)
```

Responsibilities:

- Find session by ID
- Return session data
- Return 404 if missing

Connected route:

```javascript
router.get(
    "/session/:id",
    getSessionById
);
```

---

### Delete Session Controller

Created:

```javascript
function deleteSession(req, res)
```

Responsibilities:

- Find session by ID
- Remove session
- Save file
- Return success response

Connected route:

```javascript
router.delete(
    "/session/:id",
    deleteSession
);
```

---

## Concepts Learned

- Controllers
- Separation of Concerns
- Route Layer
- Controller Layer
- File Persistence
- CRUD Architecture
- Modular Backend Design

---

## Architecture Evolution

Before:

```text
index.js
 └── Routes + Logic + Storage
```

After:

```text
index.js
    ↓
sessionRoutes.js
    ↓
sessionController.js
    ↓
sessions.json
```

---

## Result

Successfully separated business logic from route definitions.

Backend now follows a cleaner and more scalable Express architecture.


# Day 15

## Objective

Introduce a Service Layer and move all file operations out of controllers.

---

## Features Added

### Services Folder

Created:

```text
backend/services
```

Created:

```text
backend/services/sessionService.js
```

Purpose:

- Centralize database/file operations
- Remove file system logic from controllers
- Improve separation of concerns

---

### Session Service

Created:

```javascript
function getSessions()
```

Responsibilities:

- Read sessions.json
- Parse JSON data
- Return session array

Implementation:

```javascript
function getSessions() {
    return JSON.parse(
        fs.readFileSync(
            "../database/sessions.json",
            "utf8"
        )
    );
}
```

---

### Save Sessions Service

Created:

```javascript
function saveSessions(sessions)
```

Responsibilities:

- Write updated session data
- Format JSON output
- Persist changes to disk

Implementation:

```javascript
function saveSessions(sessions) {
    fs.writeFileSync(
        "../database/sessions.json",
        JSON.stringify(sessions, null, 2)
    );
}
```

---

## Controller Refactoring

Controllers now use service functions instead of direct file operations.

Before:

```javascript
const sessions = JSON.parse(
    fs.readFileSync(...)
);
```

After:

```javascript
const sessions = getSessions();
```

---

### Updated Controllers

Refactored:

```javascript
getAllSessions()
createSession()
updateSession()
getSessionById()
deleteSession()
```

to use:

```javascript
getSessions()
saveSessions()
```

---

## File System Removal

Removed:

```javascript
const fs = require("fs");
```

from:

```text
sessionController.js
```

Controllers no longer access files directly.

---

## Testing Performed

### GET Sessions

Verified:

```text
GET /api/sessions
```

Returned stored session data successfully.

---

### POST Session

Verified:

```text
POST /api/session
```

Created and persisted new sessions.

---

### PUT Session

Verified:

```text
PUT /api/session/:id
```

Updated session data correctly.

---

### DELETE Session

Verified:

```text
DELETE /api/session/:id
```

Removed session and persisted changes.

---

## Concepts Learned

- Service Layer
- Separation of Concerns
- Business Logic Isolation
- File Service Pattern
- Controller-Service Architecture
- Backend Scalability Principles

---

## Architecture Evolution

Before:

```text
Routes
   ↓
Controllers
   ├─ HTTP Logic
   ├─ Read File
   └─ Write File
```

After:

```text
Routes
   ↓
Controllers
   └─ HTTP Logic

Services
   ├─ Read File
   └─ Write File

Database
```

---

## Result

Successfully introduced a Service Layer.

Controllers now focus only on request handling and responses.

All file operations are centralized inside the service layer, making the application cleaner, more maintainable, and closer to production backend architecture.


# Day 16

## Objective

Introduce a Repository Layer and continue moving business logic from controllers into services.

---

## Features Added

### Repository Layer

Created:

```text
backend/repositories/sessionRepository.js
```

Purpose:

- Isolate data access logic
- Separate file operations from business logic
- Prepare for future database migration

---

### Session Repository

Created:

```javascript
readSessions()
```

Responsibilities:

- Read sessions.json
- Parse JSON data
- Return session collection

Created:

```javascript
writeSessions()
```

Responsibilities:

- Persist updated session data
- Format JSON output

---

### Find Session By ID Repository Function

Created:

```javascript
findSessionById(sessionId)
```

Responsibilities:

- Retrieve a session by index
- Centralize session lookup logic

---

## Service Layer Refactoring

Updated:

```text
sessionService.js
```

to use repository functions instead of direct file access.

---

### Get Session By ID Service

Created:

```javascript
getSessionById(sessionId)
```

Responsibilities:

- Retrieve session through repository layer

---

### Add Session Service

Created:

```javascript
addSession(session)
```

Responsibilities:

- Retrieve existing sessions
- Add new session
- Save updated data
- Return result object

---

### Update Session Service

Created:

```javascript
updateExistingSession(
    sessionId,
    updatedSession
)
```

Responsibilities:

- Validate session existence
- Update session
- Persist changes
- Return updated session

---

### Remove Session Service

Created:

```javascript
removeSession(sessionId)
```

Responsibilities:

- Validate session existence
- Delete session
- Persist changes
- Return operation status

---

## Controller Refactoring

Controllers now delegate operations to services.

Before:

```javascript
Controller
 ├─ Read Data
 ├─ Update Data
 ├─ Delete Data
 └─ Save Data
```

After:

```javascript
Controller
 ├─ Request Handling
 ├─ Response Handling
 └─ Error Responses
```

Business operations moved to services.

---

## Testing Performed

### GET Session

Verified:

```text
GET /api/session/0
```

Returned correct session.

---

### Invalid GET

Verified:

```text
GET /api/session/99
```

Returned:

```json
{
    "error": "Session not found"
}
```

---

### POST Session

Verified:

```text
POST /api/session
```

Created and persisted session successfully.

---

### PUT Session

Verified:

```text
PUT /api/session/:id
```

Updated session successfully.

---

### DELETE Session

Verified:

```text
DELETE /api/session/:id
```

Deleted session successfully.

---

## Concepts Learned

- Repository Pattern
- Data Access Layer
- Controller-Service-Repository Architecture
- Business Logic Separation
- Database Abstraction
- Scalable Backend Design

---

## Architecture Evolution

Before:

```text
Routes
   ↓
Controllers
   ↓
Services
   ↓
sessions.json
```

After:

```text
Routes
   ↓
Controllers
   ↓
Services
   ↓
Repositories
   ↓
sessions.json
```

---

## Result

Successfully introduced a Repository Layer.

Controllers now focus on HTTP concerns.

Services contain business logic.

Repositories contain data access logic.

The backend is now structured similarly to production-grade backend applications and is prepared for future migration to a real database.

# Day 17

## Objective

Move CRUD data manipulation operations from the Service Layer into the Repository Layer.

---

## Features Added

### Insert Session Repository Function

Created:

```javascript
insertSession(session)
```

Responsibilities:

- Read stored sessions
- Insert new session
- Persist updated data
- Return updated collection

---

### Update Session Repository Function

Created:

```javascript
updateSessionById(
    sessionId,
    updatedSession
)
```

Responsibilities:

- Validate session existence
- Update session data
- Persist changes
- Return updated session

---

### Delete Session Repository Function

Created:

```javascript
deleteSessionById(sessionId)
```

Responsibilities:

- Validate session existence
- Remove session
- Persist changes
- Return operation status

---

## Service Layer Refactoring

Refactored:

```javascript
addSession()
```

to use:

```javascript
insertSession()
```

from the repository.

---

Refactored:

```javascript
updateExistingSession()
```

to use:

```javascript
updateSessionById()
```

from the repository.

---

Refactored:

```javascript
removeSession()
```

to use:

```javascript
deleteSessionById()
```

from the repository.

---

## Testing Performed

### POST Session

Verified:

```text
POST /api/session
```

Successfully created and persisted session data.

---

### PUT Session

Verified:

```text
PUT /api/session/:id
```

Successfully updated existing session.

---

### Invalid PUT

Verified:

```text
PUT /api/session/99
```

Returned:

```json
{
    "error": "Session not found"
}
```

---

### DELETE Session

Verified:

```text
DELETE /api/session/:id
```

Successfully removed session.

---

### Invalid DELETE

Verified:

```text
DELETE /api/session/99
```

Returned:

```json
{
    "error": "Session not found"
}
```

---

## Concepts Learned

- Repository Pattern
- CRUD Repository Design
- Data Access Layer
- Layered Backend Architecture
- Separation of Concerns
- Scalable Backend Design

---

## Architecture Evolution

Before:

```text
Routes
   ↓
Controllers
   ↓
Services
   ↓
Repositories
   ↓
sessions.json
```

Service layer still performed some data manipulation.

After:

```text
Routes
   ↓
Controllers
   ↓
Services
   ↓
Repositories
   ↓
sessions.json
```

Repository layer now owns CRUD operations.

Services delegate storage operations to repositories.

---

## Result

Successfully centralized CRUD data access logic inside the Repository Layer.

Application architecture now more closely resembles production-grade backend systems and is better prepared for future database migration.

# Day 18 – Repository Layer Refactor

## Objective
Move all database access responsibilities from Service Layer into Repository Layer.

## Changes Made

### Repository Layer

Added dedicated repository functions:

- readSessions()
- writeSessions()
- findSessionById()
- insertSession()
- updateSessionById()
- deleteSessionById()

Repository is now the only layer allowed to interact with sessions.json.

### Service Layer

Refactored Service Layer to call Repository functions instead of directly reading or writing files.

Implemented:

- getSessions()
- getSessionById()
- addSession()
- updateExistingSession()
- removeSession()

Service Layer now contains business logic only.

### Controller Layer

No direct file access.

Controllers now:

- receive request
- call service functions
- return response

### Architecture Improvement

Before:

Controller → Service → File System

After:

Controller → Service → Repository → File System

This separation improves maintainability, scalability, and database migration readiness.

## Learning

Repository Layer manages data access.

Service Layer manages business logic.

Controller Layer manages HTTP requests and responses.

Keeping responsibilities separated makes large applications easier to maintain and extend.

Day 18 – Repository Pattern Refactoring

Objectives:
- Move data access logic from Service layer to Repository layer.
- Complete separation of Controller, Service, and Repository responsibilities.
- Remove stale in-memory session handling from index.js.

Completed:
- Created Repository functions:
  - readSessions()
  - writeSessions()
  - findSessionById()
  - insertSession()
  - updateSessionById()
  - deleteSessionById()
- Refactored Service layer to delegate data operations to Repository.
- Removed direct session CRUD logic from index.js.
- Removed stale in-memory sessions array usage.
- Verified all CRUD endpoints function correctly through Controller → Service → Repository architecture.

Bug Found:
- DELETE and other operations sometimes required server restart.
- Root cause: old CRUD routes in index.js used an in-memory sessions array while new routes used sessions.json through Repository.
- Fixed by removing old routes and forcing all requests through the new architecture.

Testing:
- GET ALL → Passed
- GET BY ID → Passed
- POST → Passed
- PUT → Passed
- DELETE → Passed
- Validation Errors → Passed
- 404 Handling → Passed

Key Learning:
Repository Pattern centralizes data access and prevents duplication. Mixing old routes with refactored architecture can create stale state bugs that are difficult to trace.

# Day 19

## Objective

Improve project organization by introducing centralized configuration and separating system-related routes from the main application file.

---

## Features Added

### Configuration Layer

Created:

```text
backend/config/paths.js
```

Added a centralized path configuration for the session database file.

```javascript
const path = require("path");

const SESSIONS_FILE = path.join(
    __dirname,
    "../../database/sessions.json"
);
```

Repository now imports this configuration instead of using hardcoded file paths.

---

### Repository Refactoring

Updated:

```text
sessionRepository.js
```

Replaced:

```javascript
"../database/sessions.json"
```

with:

```javascript
SESSIONS_FILE
```

This centralizes file path management and improves maintainability.

---

### System Routes

Created:

```text
backend/routes/systemRoutes.js
```

Moved the following endpoints from `index.js`:

- GET /api/status
- GET /api/stats
- GET /api/search

This keeps `index.js` focused on server configuration while grouping related endpoints into their own router.

---

### Request Count Middleware

Enhanced the request counter middleware.

Added:

```javascript
req.requestCount = requestCount;
```

This allows route handlers to access the current request count without relying on global variables.

---

### Logger Middleware

Created:

```text
backend/middleware/logger.js
```

Moved request logging middleware out of `index.js`.

Logger now records:

- HTTP Method
- Request URL
- Request Time

using a dedicated middleware module.

---

### Index.js Cleanup

Removed:

- Direct system routes
- Unused imports
- Inline logger middleware

`index.js` now focuses on:

- Express configuration
- Middleware registration
- Route registration
- Server startup

---

## Testing Performed

Verified:

### Status Endpoint

```
GET /api/status
```

Returned application status successfully.

---

### Statistics Endpoint

```
GET /api/stats
```

Returned total request count successfully.

---

### Search Endpoint

```
GET /api/search?exercise=bench
```

Returned expected search response.

---

### CRUD Regression Testing

Verified all CRUD operations after refactoring:

- GET Sessions
- GET Session by ID
- POST Session
- PUT Session
- DELETE Session

All endpoints functioned correctly without restarting the server.

---

## Bug Fixed

### Stale Session State

Observed:

- POST succeeded
- DELETE sometimes returned "Session not found"
- Restarting the server temporarily resolved the issue

Root Cause:

Old CRUD routes and an in-memory `sessions` array still existed in `index.js`, causing requests to bypass the new Repository Layer.

Resolution:

- Removed obsolete CRUD routes from `index.js`
- Removed in-memory session storage
- Ensured all CRUD operations pass through:

Routes → Controllers → Services → Repositories → sessions.json

---

## Concepts Learned

- Configuration Layer
- Path Management using `path.join()`
- Express Router Organization
- Modular Middleware
- Request Context (`req.requestCount`)
- Refactoring Legacy Code
- Eliminating Stale State Bugs
- Regression Testing after Refactoring

---

## Architecture Evolution

Before:

```
index.js
 ├── Server Setup
 ├── Middleware
 ├── System Routes
 ├── Session Routes
 └── CRUD Logic
```

After:

```
index.js
 ├── Server Setup
 ├── Middleware Registration
 └── Route Registration

systemRoutes.js
 ├── Status
 ├── Stats
 └── Search

sessionRoutes.js
 └── Session API

logger.js
 └── Request Logging

paths.js
 └── Centralized Configuration
```

---

## Result

Successfully modularized application configuration, middleware, and system routes while maintaining complete CRUD functionality.

The backend now follows a cleaner layered architecture and is better prepared for future enhancements such as authentication and database integration.


# Day 20 – Phase 1 Completion

## Objective
Complete the backend engineering foundation and perform the final architectural cleanup.

## Changes Made

- Created `parseSessionId` middleware to validate and parse route parameters.
- Removed duplicated `parseInt()` logic from all controllers.
- Controllers now receive `req.sessionId` from middleware.
- Standardized all controller responses using `successResponse()` and `errorResponse()`.
- Completed CRUD regression testing after refactoring.
- Verified middleware ordering for GET, PUT, and DELETE routes.
- Confirmed clean separation between Routes, Middleware, Controllers, Services, Repositories, and Database.

## Architecture Achieved

Routes
↓
Middleware
↓
Controllers
↓
Services
↓
Repositories
↓
Database

## Outcome

Phase 1 completed successfully.

The backend is now modular, maintainable, and ready for replacing the JSON data layer with a relational database in Phase 2.

# Phase 2 - Day 21

## Objective

Prepare the backend for PostgreSQL by establishing a successful database connection while preserving the existing layered architecture.

---

## Work Completed

### Project Management

* Reconstructed the complete project state after conversation history inconsistency.
* Created `PROJECT_STATE.md` to maintain a persistent snapshot of the current project status.

### PostgreSQL

* Verified PostgreSQL Server installation.
* Verified pgAdmin configuration.
* Fixed `psql` command by adding PostgreSQL to the system PATH.
* Created application database:

  * `powerlifting_coach`

### Backend

* Installed PostgreSQL Node.js driver (`pg`).
* Added database configuration module:

  * `backend/config/database.js`
* Configured PostgreSQL connection pool.
* Connected Express backend to PostgreSQL.
* Verified connectivity using:

```sql
SELECT NOW();
```

### Verification

Successfully started backend.

Output:

```
Server is running on http://localhost:5000
✅ PostgreSQL Connected Successfully!
```

---

## Files Created

```
PROJECT_STATE.md

backend/config/database.js
```

---

## Files Modified

```
backend/index.js

backend/package.json
```

(Dependency: pg)

---

## Architecture Status

Current backend architecture:

Client

↓

Routes

↓

Middleware

↓

Controllers

↓

Services

↓

Repositories

↓

PostgreSQL (Connection Ready)

---

## Key Decisions

* Continue using layered architecture.
* PostgreSQL access will remain inside the Repository layer.
* Use PostgreSQL Pool instead of Client.
* Delay `.env` refactoring until after connection verification.

---

## Day Result

✅ PostgreSQL successfully integrated with the backend.

Phase 2 infrastructure is now ready for relational database development.

---

## Next Day Preview

Phase 2 – Day 22

* Improve package.json scripts.
* Move database credentials to `.env`.
* Design relational database schema.
* Create the first production table.
