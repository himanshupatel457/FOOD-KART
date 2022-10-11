export const errorMiddleware = (err, req, res, next) => {

    err.message = err.message || "internal Server Error"
    err.statusCode = err.statusCode || 500;

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
}




export const catchAsyncError = (passeFunction) => (req, res, next) => {

    Promise.resolve(passeFunction(req, res, next)).catch(next);
}