const fs = require("fs");

function getSessions() {
    return JSON.parse(
        fs.readFileSync(
            "../database/sessions.json",
            "utf8"
        )
    );
}

function saveSessions(sessions) {
    fs.writeFileSync(
        "../database/sessions.json",
        JSON.stringify(sessions, null, 2)
    );
}

module.exports = {
    getSessions,
    saveSessions
};