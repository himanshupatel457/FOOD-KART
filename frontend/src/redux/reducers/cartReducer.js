import { createReducer } from "@reduxjs/toolkit";


const initialState = {
    cartItems :localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) :
        {
            sandwich: {
                quantity: 0,
                price: 200,
            },
            pizza: {
                quantity: 0,
                price: 500,
            },
            french_fries: {
                quantity: 0,
                price: 1800,
            }
        },

    subTotal :localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartPrices")).subTotal : 0,
    tax :localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartPrices")).tax : 0,
    shippingCharges :localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartPrices")).shippingCharges : 0,
    total :localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartPrices")).total : 0,
    shippingInfo :localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")):{},
};

export const cartReducer = createReducer(initialState, {


    sandwichIncrement: (state) => {
        state.cartItems.sandwich.quantity += 1;
    },
    pizzaIncrement: (state) => {
        state.cartItems.pizza.quantity += 1;
    },
    french_friesIncrement: (state) => {
        state.cartItems.french_fries.quantity += 1;
    },


    sandwichDecrement: (state) => {
        state.cartItems.sandwich.quantity -= 1;
    },
    pizzaDecrement: (state) => {
        state.cartItems.pizza.quantity -= 1;
    },
    french_friesDecrement: (state) => {
        state.cartItems.french_fries.quantity -= 1;
    },






    calculatePrice: (state) => {
        state.subTotal = state.cartItems.sandwich.price * state.cartItems.sandwich.quantity +
            state.cartItems.pizza.price * state.cartItems.pizza.quantity +
            state.cartItems.french_fries.price * state.cartItems.french_fries.quantity;


        state.tax = state.subTotal * 0.18;
        state.shippingCharges = state.subTotal > 1000 ? 0 : 200;
        state.total = state.subTotal + state.tax + state.shippingCharges
    },


    emptyState: (state) => {
        state.cartItems = {
            sandwich: {
                quantity: 0,
                price: 200,
            },
            pizza: {
                quantity: 0,
                price: 500,
            },
            french_fries: {
                quantity: 0,
                price: 1800,
            }
        };
        state.subTotal = 0;
        state.tax = 0;
        state.shippingCharges = 0;
        state.total = 0;
    },

    addShippingInfo: (state, action) => {
        state.shippingInfo = {
            HouseNo: action.payload.HouseNo,
            state: action.payload.state, city: action.payload.city, country: action.payload.country,
            pinCode: action.payload.pinCode, phoneNo: action.payload.phoneNo
        };
    },
});



