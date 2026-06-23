const {
    getSessions,
    saveSessions
} = require("../services/sessionService");

function testController(req, res) {
    res.json({
        message: "Controller working successfully!"
    });
}


function getAllSessions(req, res) {

    const sessions = getSessions();

    res.json({
        totalSessions: sessions.length,
        sessions: sessions
    });
}

function createSession(req, res) {

    const sessions = getSessions();

    const session = req.body;

    sessions.push(session);

    saveSessions(sessions);

    res.json({
        message: "Session saved successfully!",
        totalSessions: sessions.length,
        savedSession: session
    });
}

function updateSession(req, res) {

    const sessions = getSessions();

    const sessionId = parseInt(req.params.id);

    if (!sessions[sessionId]) {
        return res.status(404).json({
            error: "Session not found"
        });
    }

    sessions[sessionId] = req.body;

    saveSessions(sessions);

    res.json({
        message: "Session updated successfully!",
        updatedSession: sessions[sessionId]
    });
}

function getSessionById(req, res) {

    const sessions = getSessions();

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

    const sessions = getSessions();

    const sessionId = parseInt(req.params.id);

    const session = sessions[sessionId];

    if (!session) {
        return res.status(404).json({
            error: "Session not found"
        });
    }

    sessions.splice(sessionId, 1);

    saveSessions(sessions);

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