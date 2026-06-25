const fs = require("fs");
const { SESSIONS_FILE } = require("../config/paths");

function readSessions() {
    return JSON.parse(
        fs.readFileSync(
            SESSIONS_FILE,
            "utf8"
        )
    );
}

function writeSessions(sessions) {
    fs.writeFileSync(
        SESSIONS_FILE,
        JSON.stringify(sessions, null, 2)
    );
}

function findSessionById(sessionId) {
    const sessions = readSessions();

    return sessions[sessionId];
}

function insertSession(session) {

    const sessions = readSessions();

    sessions.push(session);

    writeSessions(sessions);

    return sessions;
}

function updateSessionById(
    sessionId,
    updatedSession
) {

    const sessions = readSessions();

    if (!sessions[sessionId]) {
        return null;
    }

    sessions[sessionId] = updatedSession;

    writeSessions(sessions);

    return sessions[sessionId];
}

function deleteSessionById(sessionId) {

    const sessions = readSessions();

    if (!sessions[sessionId]) {
        return false;
    }

    sessions.splice(sessionId, 1);

    writeSessions(sessions);

    return true;
}

module.exports = {
    readSessions,
    writeSessions,
    findSessionById,
    insertSession,
    updateSessionById,
    deleteSessionById
};