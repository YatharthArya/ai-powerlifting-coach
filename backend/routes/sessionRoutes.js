const express = require("express");

const router = express.Router();

const validateSession = require("../middleware/validateSession");

const parseSessionId = require("../middleware/parseSessionId");

const {
    testController,
    getAllSessions,
    createSession,
    updateSession,
    getSessionByIdController,
    deleteSession
} = require("../controllers/sessionController");


router.get("/test", testController);

router.get("/sessions", getAllSessions);

router.get(
    "/session/:id",
    parseSessionId,
    getSessionByIdController
);

router.post(
    "/session",
    validateSession,
    createSession
);

router.put(
    "/session/:id",
    parseSessionId,
    validateSession,
    updateSession
);

router.delete(
    "/session/:id",
    parseSessionId,
    deleteSession
);



module.exports = router;