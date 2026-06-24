const {
    readSessions,
    findSessionById,
    insertSession,
    updateSessionById,
    deleteSessionById
} = require("../repositories/sessionRepository");

function getSessions() {
    return readSessions();
}

function getSessionById(sessionId) {
    return findSessionById(sessionId);
}

function addSession(session) {

    const sessions = insertSession(session);

    return {
        totalSessions: sessions.length,
        savedSession: session
    };
}

function updateExistingSession(
    sessionId,
    updatedSession
) {

    return updateSessionById(
        sessionId,
        updatedSession
    );
}

function removeSession(sessionId) {

    return deleteSessionById(sessionId);
}

module.exports = {
    getSessions,
    getSessionById,
    addSession,
    updateExistingSession,
    removeSession
};