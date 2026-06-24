const {
    getSessions,
    getSessionById,
    addSession,
    updateExistingSession,
    removeSession
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

    const session = req.body;

    const result = addSession(session);

    res.json({
        message: "Session saved successfully!",
        totalSessions: result.totalSessions,
        savedSession: result.savedSession
    });
}

function updateSession(req, res) {

    const sessionId = parseInt(req.params.id);

    const updatedSession = updateExistingSession(
        sessionId,
        req.body
    );

    if (!updatedSession) {
        return res.status(404).json({
            error: "Session not found"
        });
    }

    res.json({
        message: "Session updated successfully!",
        updatedSession: updatedSession
    });
}

function getSessionByIdController(req, res) {

    const sessionId = parseInt(req.params.id);
    const session = getSessionById(sessionId);

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

    const sessionId = parseInt(req.params.id);

    const deleted = removeSession(sessionId);

    if (!deleted) {
        return res.status(404).json({
            error: "Session not found"
        });
    }

    res.json({
        message: "Session deleted successfully!"
    });
}

module.exports = {
    testController,
    getAllSessions,
    createSession,
    updateSession,
    getSessionByIdController,
    deleteSession
};