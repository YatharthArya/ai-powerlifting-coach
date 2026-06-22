const express = require("express");

const router = express.Router();

const validateSession = require("../middleware/validateSession");

const {
    testController,
    getAllSessions,
    createSession,
    updateSession,
    getSessionById,
    deleteSession
} = require("../controllers/sessionController");


router.get("/test", testController);

router.get("/sessions", getAllSessions);

router.get(
    "/session/:id",
    getSessionById
);

router.post(
    "/session",
    validateSession,
    createSession
);

router.put(
    "/session/:id",
    validateSession,
    updateSession
);

router.delete(
    "/session/:id",
    deleteSession
);



module.exports = router;