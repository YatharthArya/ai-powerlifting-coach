function parseSessionId(req, res, next) {

    const sessionId = Number(req.params.id);

    if (Number.isNaN(sessionId)) {
        return res.status(400).json({
            success: false,
            error: "Invalid session ID"
        });
    }

    req.sessionId = sessionId;

    next();
}

module.exports = parseSessionId;