import { configureStore } from "@reduxjs/toolkit"
import { adminReducer } from "./reducers/adminReducers";
import { cartReducer } from "./reducers/cartReducer";
import { orderReducer, ordersReducers } from "./reducers/orderReducer";
import { authReducer } from "./reducers/userReducers";

const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        order: orderReducer,
        orders: ordersReducers,
        admin: adminReducer,
    },
});


export default store;

export const server = "https://foodkart457.herokuapp.com/api/v1"