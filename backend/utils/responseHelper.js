function successResponse(
    res,
    message,
    data = {}
) {
    res.json({
        success: true,
        message,
        ...data
    });
}

function errorResponse(
    res,
    statusCode,
    message
) {
    res.status(statusCode).json({
        success: false,
        error: message
    });
}

module.exports = {
    successResponse,
    errorResponse
};