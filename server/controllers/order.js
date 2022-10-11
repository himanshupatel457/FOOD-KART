import { catchAsyncError } from "../middlewares/errorMiddleware.js"
import { Order } from "../models/Order.js"
import ErrorHandler from "../utils/ErrorHandler.js";
import { instance } from "../server.js"
import crypto from "crypto";
import { Payment } from "../models/Payment.js"
//PLACING COD ORDER

export const placeOrder = catchAsyncError(async (req, res, next) => {


    const {
        shippingInfo, orderItems, paymentMethod, itemsPrice, taxPrice, shippingCharges,totalAmount,

    } = req.body;

    const user = req.user._id;

    const orderOptions = {
        shippingInfo, orderItems, paymentMethod, itemsPrice, taxPrice, shippingCharges, user,totalAmount,
    };

    await Order.create(orderOptions);
    res.status(201).json({
        success: true,
        message: "Order Placed succefully via COD",
    })
})



//PLACE ONLINE ORDERS

export const placeOrderOnline = catchAsyncError(async (req, res, next) => {


    const {
        shippingInfo, orderItems, paymentMethod, itemsPrice, taxPrice, shippingCharges, totalAmount,

    } = req.body;

    const user = req.user._id;

    const orderOptions = {
        shippingInfo, orderItems, paymentMethod, itemsPrice, taxPrice, shippingCharges, user, totalAmount,
    };


    const options = {
        amount: Number(totalAmount) * 100,  // amount in the smallest currency unit
        currency: "INR",
    };
    const order = await instance.orders.create(options);

    res.status(201).json({
        success: true,
        order,
        orderOptions,
    });
});

//PAYMENT VERIFICATION

export const paymentVerification = catchAsyncError(async (req, res, next) => {

    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, orderOptions } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_API_SECRET).update(body).digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
        const payment = await Payment.create({
            razorpay_payment_id, razorpay_order_id, razorpay_signature,
        });

        await Order.create({
            ...orderOptions,paidAt: new Date(Date.now()), paymentInfo: payment._id
        });

        res.status(200).json({
            success: true,
            message: `Order placed Online Successfully. Payment ID:${payment._id}`,
        })
    }
    else {
        return next(new ErrorHandler("Payment failure", 400));
    }
})






//MYORDERS CONTEROLLER 

export const getMyOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find({
        user: req.user._id,
    }).populate("user", "name");
    res.status(200).json({
        success: true,
        orders,
    })
})




//get order details

export const getOrderDetails = catchAsyncError(async (req, res, next) => {

    const order = await Order.findById(req.params.id).populate("user", "name");


    if (!order) {
        return next(new ErrorHandler("Invalid Order id", 404));
    }

    res.status(200).json({
        success: true,
        order,
    })
});





//ADMIN CONTROLLERES 
//Get alll orders


//MYORDERS CONTEROLLER 

export const getAdminOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find({
        user: req.user._id,
    }).populate("user", "name");
    res.status(200).json({
        success: true,
        orders,
    })
})





export const processOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name");


    if (!order) {
        return next(new ErrorHandler("Invalid Order id", 404));
    }

    if (order.orderStatus === "Preparing") order.orderStatus = "Shipped";
    else if (order.orderStatus === "Shipped") {
        order.orderStatus = "Delivered";
        order.deliveredAt = new Date(Date.now());
    }
    else if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("Order already Delivered"), 400);
    }

    await order.save();
    res.status(200).json({
        success: true,
        message: "Status updated successfully"
    })

})






