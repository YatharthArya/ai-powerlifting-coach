const {
    getSessions,
    getSessionById,
    addSession,
    updateExistingSession,
    removeSession
} = require("../services/sessionService");

const {
    successResponse,
    errorResponse
} = require("../utils/responseHelper");

function testController(req, res) {

    successResponse(
        res,
        "Controller working successfully!"
    );

}


function getAllSessions(req, res) {

    const sessions = getSessions();

    successResponse(
        res,
        "Sessions fetched successfully!",
        {
            totalSessions: sessions.length,
            sessions: sessions
        }
    );

}


function createSession(req, res) {

    const session = req.body;

    const result = addSession(session);

    successResponse(
        res,
        "Session saved successfully!",
        {
            totalSessions: result.totalSessions,
            savedSession: result.savedSession
        }
    );

}

function updateSession(req, res) {

    const sessionId = req.sessionId;

    const updatedSession = updateExistingSession(
        sessionId,
        req.body
    );

    if (!updatedSession) {

        return errorResponse(
            res,
            404,
            "Session not found"
        );

    }

    successResponse(
        res,
        "Session updated successfully!",
        {
            updatedSession
        }
    );

}

function getSessionByIdController(req, res) {

    const sessionId = req.sessionId;

    const session = getSessionById(sessionId);

    if (!session) {

        return errorResponse(
            res,
            404,
            "Session not found"
        );

    }

    successResponse(
        res,
        "Session fetched successfully!",
        {
            sessionId,
            session
        }
    );

}

function deleteSession(req, res) {

    const sessionId = req.sessionId;

    const deleted = removeSession(sessionId);

    if (!deleted) {

        return errorResponse(
            res,
            404,
            "Session not found"
        );

    }

    successResponse(
        res,
        "Session deleted successfully!"
    );

}

module.exports = {
    testController,
    getAllSessions,
    createSession,
    updateSession,
    getSessionByIdController,
    deleteSession
};