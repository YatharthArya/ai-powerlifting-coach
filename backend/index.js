require("dotenv").config();

const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const sessionRoutes = require("./routes/sessionRoutes");
const app = express();

const PORT = process.env.PORT || 3000;



let requestCount = 0;


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

app.get("/api/error", (req, res, next) => {
    next(new Error("Test error from Day 12"));
});

app.get("/api/notfound", (req, res, next) => {
    const error = new Error("Session not found");

    error.status = 404;

    next(error);
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

app.use("/api", sessionRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});