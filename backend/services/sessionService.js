const {
    readSessions,
    writeSessions,
    findSessionById,
    insertSession,
    updateSessionById,
    deleteSessionById
} = require("../repositories/sessionRepository");

function getSessions() {
    return readSessions();
}

function saveSessions(sessions) {
    writeSessions(sessions);
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
    saveSessions,
    getSessionById,
    addSession,
    updateExistingSession,
    removeSession
};