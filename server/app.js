import express, { urlencoded } from "express"
import session from "express-session";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import { connectPassport } from "./utils/Provider.js";
import passport from "passport";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import cors from "cors";


const app = express();



export default app;

dotenv.config({
    path: "./config/config.env"
})

//MIDDLEWARE USAGE
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    cookie: {
        secure: process.env.NODE_ENV === "development" ? false : true,
        httpOnly: process.env.NODE_ENV === "development" ? false : true,
        sameSite: process.env.NODE_ENV === "development" ? false : "none",
    }
}));

//OTHERS
app.use(cors({
    credentials: true, //else cookies will not be send
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"]
}))
app.use(cookieParser());
app.use(express.json());
app.use(urlencoded({
    extended: true,
}))
app.use(passport.authenticate("session"));
app.use(passport.initialize());
app.use(passport.session());
app.enable("trust proxy");

connectPassport();

//USER ROUTES ARE TO BE IMPORTED HERE
import userRoute from "./Routes/user.js"

app.use("/api/v1", userRoute);

//ORDER ROUTES ARE HERE

import orderRoute from "./Routes/order.js"

app.use("/api/v1", orderRoute)




//ERROR MIDDLEWARE

app.use(errorMiddleware)