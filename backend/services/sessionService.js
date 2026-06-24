const {
    readSessions,
    writeSessions,
    findSessionById
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

    const sessions = getSessions();

    sessions.push(session);

    saveSessions(sessions);

    return {
        totalSessions: sessions.length,
        savedSession: session
    };
}

function updateExistingSession(sessionId, updatedSession) {

    const sessions = getSessions();

    if (!sessions[sessionId]) {
        return null;
    }

    sessions[sessionId] = updatedSession;

    saveSessions(sessions);

    return sessions[sessionId];
}

function removeSession(sessionId) {

    const sessions = getSessions();

    if (!sessions[sessionId]) {
        return false;
    }

    sessions.splice(sessionId, 1);

    saveSessions(sessions);

    return true;
}

module.exports = {
    getSessions,
    saveSessions,
    getSessionById,
    addSession,
    updateExistingSession,
    removeSession
};