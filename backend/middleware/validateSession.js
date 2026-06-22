function validateSession(req, res, next) {
    const { exercise, weight, reps, rpe } = req.body;

    if (!exercise || exercise.trim() === "") {
        return res.status(400).json({
            error: "Exercise is required"
        });
    }

    if (!weight || weight <= 0) {
        return res.status(400).json({
            error: "Weight must be greater than 0"
        });
    }

    if (!reps || reps <= 0) {
        return res.status(400).json({
            error: "Reps must be greater than 0"
        });
    }

    if (!rpe || rpe < 1 || rpe > 10) {
        return res.status(400).json({
            error: "RPE must be between 1 and 10"
        });
    }

    next();
}
module.exports = validateSession;