require("dotenv").config();

const express = require("express");

const errorHandler = require("./middleware/errorHandler");
const sessionRoutes = require("./routes/sessionRoutes");
const systemRoutes = require("./routes/systemRoutes");
const logger = require("./middleware/logger");

const app = express();

const PORT = process.env.PORT || 3000;



let requestCount = 0;


app.use(express.json());

app.use((req, res, next) => {
    requestCount++;

    req.requestCount = requestCount;

    console.log("Total Requests:", requestCount);

    next();
});

app.use(logger);

app.get("/", (req, res) => {
    res.send("AI Powerlifting Coach Backend Running!");
});

app.get("/api/error", (req, res, next) => {
    next(new Error("Test error from Day 12"));
});

app.get("/api/notfound", (req, res, next) => {
    const error = new Error("Session not found");

    error.status = 404;

    next(error);
});

app.use("/api", systemRoutes);
app.use("/api", sessionRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});