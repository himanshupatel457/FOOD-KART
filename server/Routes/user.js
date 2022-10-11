import express from "express";
import passport from "passport";

import { getAllUsers, getStats, logout, myProfile } from "../controllers/user.js";
import { adminAuthorisation, isAuthenticated } from "../middlewares/Auth.js";


const router = express.Router();

router.get("/googlelogin", passport.authenticate("google", {
    scope: ["profile"],
}))



router.get("/login", passport.authenticate("google", {
    successRedirect: process.env.FRONTEND_URL,
}));



//to see profile
router.get("/me", isAuthenticated, myProfile);
router.get("/logout", logout);


//ADMIN ROUTE

router.get("/admin/users", isAuthenticated, adminAuthorisation, getAllUsers);

//GET STATS

router.get("/admin/stats", isAuthenticated, adminAuthorisation, getStats)
export default router;