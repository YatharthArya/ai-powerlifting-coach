function testController(req, res) {
    res.json({
        message: "Controller working successfully!"
    });
}

const fs = require("fs");

function getAllSessions(req, res) {

    const sessions = JSON.parse(
        fs.readFileSync("../database/sessions.json", "utf8")
    );

    res.json({
        totalSessions: sessions.length,
        sessions: sessions
    });
}

function createSession(req, res) {

    const sessions = JSON.parse(
        fs.readFileSync("../database/sessions.json", "utf8")
    );

    const session = req.body;

    sessions.push(session);

    fs.writeFileSync(
        "../database/sessions.json",
        JSON.stringify(sessions, null, 2)
    );

    res.json({
        message: "Session saved successfully!",
        totalSessions: sessions.length,
        savedSession: session
    });
}

function updateSession(req, res) {

    const sessions = JSON.parse(
        fs.readFileSync("../database/sessions.json", "utf8")
    );

    const sessionId = parseInt(req.params.id);

    if (!sessions[sessionId]) {
        return res.status(404).json({
            error: "Session not found"
        });
    }

    sessions[sessionId] = req.body;

    fs.writeFileSync(
        "../database/sessions.json",
        JSON.stringify(sessions, null, 2)
    );

    res.json({
        message: "Session updated successfully!",
        updatedSession: sessions[sessionId]
    });
}

function getSessionById(req, res) {

    const sessions = JSON.parse(
        fs.readFileSync("../database/sessions.json", "utf8")
    );

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
}

function deleteSession(req, res) {

    const sessions = JSON.parse(
        fs.readFileSync("../database/sessions.json", "utf8")
    );

    const sessionId = parseInt(req.params.id);

    const session = sessions[sessionId];

    if (!session) {
        return res.status(404).json({
            error: "Session not found"
        });
    }

    sessions.splice(sessionId, 1);

    fs.writeFileSync(
        "../database/sessions.json",
        JSON.stringify(sessions, null, 2)
    );

    res.json({
        message: "Session deleted successfully!"
    });
}

module.exports = {
    testController,
    getAllSessions,
    createSession,
    updateSession,
    getSessionById,
    deleteSession
};