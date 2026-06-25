const express = require("express");

const router = express.Router();

router.get("/status", (req, res) => {
    res.json({
        status: "online",
        application: process.env.APP_NAME,
        version: "0.0.4"
    });
});

router.get("/stats", (req, res) => {
    res.json({
        totalRequests: req.requestCount
    });
});

router.get("/search", (req, res) => {

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

module.exports = router;