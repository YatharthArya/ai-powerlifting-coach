const express = require("express");

const router = express.Router();
const validateSession = require("../middleware/validateSession");

const fs = require("fs");

let sessions = JSON.parse(
    fs.readFileSync("../database/sessions.json", "utf8")
);

router.get("/test", (req, res) => {
    res.json({
        message: "Routes file working!"
    });
});

router.post("/session", validateSession, (req, res) => {
    const session = req.body;

    res.json({
        message: "POST route inside router working!",
        session: session
    });
});

router.get("/sessions", (req, res) => {
    res.json({
        totalSessions: sessions.length,
        sessions: sessions
    });
});

module.exports = router;