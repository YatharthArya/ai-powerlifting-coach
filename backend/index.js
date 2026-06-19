const express = require("express");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

let sessions = [];

app.get("/", (req, res) => {
    res.send("AI Powerlifting Coach Backend Running!");
});

// Add this new block ↓↓↓
app.get("/api/status", (req, res) => {
    res.json({
        status: "online",
        application: "AI Powerlifting Coach",
        version: "0.0.3"
    });
});

app.post("/api/session", (req, res) => {
    const session = req.body;

    sessions.push(session);

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

app.put("/api/session/:id", (req, res) => {
    const sessionId = parseInt(req.params.id);

    if (!sessions[sessionId]) {
        return res.status(404).json({
            error: "Session not found"
        });
    }

    sessions[sessionId] = req.body;

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