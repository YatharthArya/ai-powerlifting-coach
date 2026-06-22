require("dotenv").config();

const express = require("express");
const fs = require("fs");
const app = express();

const PORT = process.env.PORT || 3000;

let sessions = JSON.parse(
    fs.readFileSync("../database/sessions.json", "utf8")
);

console.log("Loaded Sessions:");
console.log(sessions);

let requestCount = 0;

function saveSessions() {
    fs.writeFileSync(
        "../database/sessions.json",
        JSON.stringify(sessions, null, 2)
    );
}

app.use(express.json());

app.use((req, res, next) => {
    requestCount++;

    console.log("Total Requests:", requestCount);

    next();
});

app.use((req, res, next) => {
    console.log("----------");
    console.log("Method:", req.method);
    console.log("URL:", req.url);
    console.log("Time:", new Date().toLocaleString());

    next();
});

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

app.get("/", (req, res) => {
    res.send("AI Powerlifting Coach Backend Running!");
});

// Add this new block ↓↓↓
app.get("/api/status", (req, res) => {
    res.json({
        status: "online",
        application: process.env.APP_NAME,
        version: "0.0.4"
    });
});

app.get("/api/stats", (req, res) => {
    res.json({
        totalRequests: requestCount
    });
});

app.post("/api/session", validateSession, (req, res) => {
    const session = req.body;

    sessions.push(session);
    saveSessions();

    console.log("Current Sessions:");
    console.log(sessions);

    res.json({
        message: "Session saved successfully!",
        totalSessions: sessions.length,
        savedSession: session
    });
});

app.get("/api/sessions", (req, res) => {
    res.json({
        totalSessions: sessions.length,
        sessions: sessions
    });
});

app.get("/api/session/:id", (req, res) => {
    const sessionId = parseInt(req.params.id);

    const session = sessions[sessionId];

    if (!session) {
        return res.status(404).json({
            error: "Session not found"
        });
    }

    res.json({
        sessionId: sessionId,
        session: session
    });
});

app.put("/api/session/:id", validateSession, (req, res) => {
    const sessionId = parseInt(req.params.id);

    if (!sessions[sessionId]) {
        return res.status(404).json({
            error: "Session not found"
        });
    }

    sessions[sessionId] = req.body;
    saveSessions();

    res.json({
        message: "Session updated successfully!",
        updatedSession: sessions[sessionId]
    });
});

app.delete("/api/session/:id", (req, res) => {
    const sessionId = parseInt(req.params.id);

    const session = sessions[sessionId];

    if (!session) {
        return res.status(404).json({
            error: "Session not found"
        });
    }

    sessions.splice(sessionId, 1);
    saveSessions();

    res.json({
        message: "Session deleted successfully!"
    });
});

app.get("/api/search", (req, res) => {
    const exercise = req.query.exercise;

    if (!exercise) {
        return res.status(400).json({
            error: "Exercise query parameter is required"
        });
    }

    res.json({
        message: "Search completed!",
        exercise: exercise
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});