import ErrorHandler from "../utils/ErrorHandler.js";






export const isAuthenticated = (req, res, next) => {
    const token = req.cookies["connect.sid"];
    // console.log(token);


    if (!token) {
        return next(new ErrorHandler("NOT LOGGED IN", 401));
    }
    next();
}







//ADMIN AUTH

export const adminAuthorisation = (req, res, next) => {
    if (req.user.role !== "admin") {
        return next(new ErrorHandler("Only Admin Allowed", 405));
    }
    next();
}