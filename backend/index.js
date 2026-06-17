const express = require("express");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

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
    console.log("Received session data:");
    console.log(req.body);

    res.json({
        message: "Session received successfully!",
        receivedData: req.body
    });
});

app.get("/api/session/:id", (req, res) => {
    const sessionId = req.params.id;

    res.json({
        message: "Session retrieved successfully!",
        sessionId: sessionId
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