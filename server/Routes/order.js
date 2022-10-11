import express from "express";
import { getAdminOrders, getMyOrders, getOrderDetails, paymentVerification, placeOrder, placeOrderOnline, processOrder } from "../controllers/order.js";
import { adminAuthorisation, isAuthenticated } from "../middlewares/Auth.js";

const router = express.Router();


router.post("/createorder", isAuthenticated, placeOrder);

//place order Online
router.post("/createorderonline", isAuthenticated, placeOrderOnline);

//verify payment
router.post("/paymentverification", isAuthenticated, paymentVerification);

//MY ORDERS
router.get("/myorders", isAuthenticated, getMyOrders)


//Get order Details

router.get("/order/:id", isAuthenticated, getOrderDetails)






//ADD ADMIN MIDDLEWARE

//Adding admin authorization middleware to detect valid admin

router.get("/admin/orders", isAuthenticated, adminAuthorisation, getAdminOrders)

//PROCESS ORDER ROUTE
router.get("/admin/order/:id", isAuthenticated, adminAuthorisation, processOrder)



export default router;