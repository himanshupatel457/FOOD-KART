import { catchAsyncError } from "../middlewares/errorMiddleware.js";
import { User } from "../models/User.js"
import { Order } from "../models/Order.js";

export const myProfile = (req, res, next) => {
    res.status(200).json({
        success: true,
        user: req.user,
    });
}


//GET TOKEN
export const logout = (req, res, next) => {

    req.session.destroy((err) => {
        if (err) {
            return next(err);
        }
        else {
            res.clearCookie("connect.sid", {
                secure: process.env.NODE_ENV === "development" ? false : true,
                httpOnly: process.env.NODE_ENV === "development" ? false : true,
                sameSite: process.env.NODE_ENV === "development" ? false : "none",
            })
        }
        res.status(200).json({
            message: "logged Out",
        });
    })
}




//ADMIN ROUTES

//Get all users

export const getAllUsers = catchAsyncError(async (req, res, next) => {

    const users = await User.find({});

    res.status(200).json({
        success: true,
        users,
    });

});




//GET STATS

export const getStats = catchAsyncError(async (req, res, next) => {


    const userCount = await User.countDocuments();

    const orders = await Order.find({});

    const preparingOrders = orders.filter(i => i.orderStatus === "Preparing");
    const shippedOrders = orders.filter(i => i.orderStatus === "Shipped");
    const deliveredOrders = orders.filter(i => i.orderStatus === "Delivered");

    let totalIncome = 0;
    orders.forEach((i) => {
        totalIncome += i.totalAmount;
    });

    res.status(200).json({
        success: true,
        userCount,
        ordersCount: {
            total: orders.length,
            preparing: preparingOrders.length,
            shipped: shippedOrders.length,
            delivered: deliveredOrders.length,
        },
        totalIncome,
    })

})