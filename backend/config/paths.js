const path = require("path");

const SESSIONS_FILE = path.join(
    __dirname,
    "../../database/sessions.json"
);

module.exports = {
    SESSIONS_FILE
};