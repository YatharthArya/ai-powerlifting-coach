const fs = require("fs");

function readSessions() {
    return JSON.parse(
        fs.readFileSync(
            "../database/sessions.json",
            "utf8"
        )
    );
}

function writeSessions(sessions) {
    fs.writeFileSync(
        "../database/sessions.json",
        JSON.stringify(sessions, null, 2)
    );
}

function findSessionById(sessionId) {
    const sessions = readSessions();

    return sessions[sessionId];
}

module.exports = {
    readSessions,
    writeSessions,
    findSessionById
};