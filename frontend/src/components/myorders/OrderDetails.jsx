import React, { useEffect } from 'react'
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getOrderDetails } from '../../redux/actions/orderActions';
import Loader from '../layout/Loader';
const OrderDetails = () => {
    const params = useParams();

    const { order, loading } = useSelector((state) => state.orders);
    const dispatch = useDispatch();
    console.log(loading);
    useEffect(() => {
        dispatch(getOrderDetails(params.id))
    }, [params.id, dispatch]);





    return (

        <section className='orderDetails'>
            {
                loading===false && order !== undefined?<main>
                <h1>order Details</h1>
                <div>
                    <h1>shipping</h1>
                    <p>
                        <b>Address : </b>
                        {`${order.shippingInfo.HouseNo} ${order.shippingInfo.city} ${order.shippingInfo.state} ${order.shippingInfo.country} ${order.shippingInfo.pinCode} `}
                    </p>
                </div>
                <div>
                    <h1>contact</h1>
                    <p>
                        <b>Name : {order.user.name}</b>
                    </p>
                    <p>
                        <b>Phone : {order.shippingInfo.phoneNo} </b>
                    </p>
                </div>
                <div>
                    <h1>Status</h1>
                    <p>
                        <b>Order Status :{order.orderStatus}</b>
                    </p>
                    <p>
                        <b>placed At : {order.createdAt.split("T")[0]}</b>
                    </p>
                    <p>
                        <b>Delivered At : </b>
                        {order.deliveredAt ? order.deliveredAt.split("T")[0]:"NA"}
                    </p>
                </div>
                <div>
                    <h1>Payment</h1>
                    <p>
                        <b>Mode of Payment : </b>
                        {order.paymentMethod}
                    </p>
                    <p>
                        <b>Payment Refrence ID : </b>
                        {order.paymentMethod==="Online"?`#${order.paymentInfo}`:"Not Aplicable"}
                    </p>
                    <p>
                        <b>Paid At : </b>
                        {"19/12/12"}
                    </p>
                </div>
                <div>
                    <h1>Amount</h1>
                    <p>
                        <b>Total Items : </b>
                        ₹ {order.itemsPrice}
                    </p>
                    <p>
                        <b>Shipping charges : </b>
                        ₹ {order.shippingCharges}
                    </p>
                    <p>
                        <b>Tax + GST + SGST : </b>
                        ₹ {order.taxPrice}
                    </p>
                    <p>
                        <b>Total Amount : </b>
                        ₹ {order.totalAmount}
                    </p>
                </div>

                <section>
                    <h1>Ordered Items</h1>
                    <div>
                        <h3>Sandwich</h3>
                        <div>
                            <span>{order.orderItems.sandwich.quantity} </span> x <span>{order.orderItems.sandwich.price} </span>
                        </div>
                    </div>
                    <div>
                        <h3>Pizza</h3>
                        <div>
                            <span>{order.orderItems.pizza.quantity} </span> x <span>{order.orderItems.pizza.price} </span>
                        </div>
                    </div>
                    <div>
                        <h3>French Fries</h3>
                        <div>
                            <span>{order.orderItems.french_fries.quantity} </span> x <span>{order.orderItems.french_fries.price} </span>
                        </div>
                    </div>
                    <div className='subtotal'>
                        <h3>subtotal</h3>
                        <div style={{
                            fontWeight: 600
                        }}> <span>₹ {order.itemsPrice} </span> </div>
                    </div>
                </section>

            </main>:<Loader/>
            }
        </section>
    )
}

export default OrderDetails