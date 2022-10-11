import React, { useEffect } from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder, paymentVerification } from '../../redux/actions/orderActions';
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import { server } from '../../redux/store';

const ConfirmOrder = () => {


    const [paymentMethod, setPaymentMethod] = useState("");
    const [disableBtn, setDisableBtn] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems, subTotal, tax, shippingCharges, total, shippingInfo, } = useSelector((state) => state.cart);
    const { message, error } = useSelector((state) => state.order)



    const submitHandler = async (e) => {
        e.preventDefault();
        setDisableBtn(true);
        if (paymentMethod === "COD") {
            dispatch(createOrder(shippingInfo, cartItems, paymentMethod, subTotal, tax, shippingCharges, total))
        }
        else {
            //create Online Order
            const { data: { order, orderOptions } } = await axios.post(`${server}/createorderonline`, {
                shippingInfo, orderItems: cartItems, paymentMethod, itemsPrice: subTotal, taxPrice: tax, shippingCharges, totalAmount: total
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            //Razorpay
            const options = {
                key: "rzp_test_mDGU5bwIrxaYqj",
                amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                currency: "INR",
                name: "FOOD-KART",
                description: "sample test",
                order_id: order.id,
                handler: function (response) {
                    // alert(response.razorpay_payment_id);
                    // alert(response.razorpay_order_id);
                    // alert(response.razorpay_signature);

                    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
                    dispatch(paymentVerification(razorpay_payment_id, razorpay_order_id, razorpay_signature, orderOptions));
                },
                theme: {
                    "color": "#7a1527"
                }
            };
            const razorpay = new window.Razorpay(options);
            razorpay.open();
        }
    }

    useEffect(() => {
        if (message) {
            toast.success(message);
            dispatch({ type: "clearMessage" });
            dispatch({ type: "emptyState" });
            navigate("/paymentsuccess")
        }
        if (error) {
            toast.error(error);
            dispatch({ type: "clearError" });
            setDisableBtn(false);
        }
    }, [dispatch, message, navigate, error]);






    return (
        <section className='confirmOrder'>
            <main>
                <h1>Mode Of Payment</h1>
                <form onSubmit={submitHandler}>
                    <div>
                        <label>Pay on Delivery</label>
                        <input required type="radio" name='payment' onChange={() => setPaymentMethod("COD")} />
                    </div>
                    <div>
                        <label>Pay Now</label>
                        <input required type="radio" name='payment' onChange={() => setPaymentMethod("Online")} />
                    </div>

                    <button disabled={disableBtn} type='submit'>Confirm</button>
                </form>
            </main>
        </section>
    )
}

export default ConfirmOrder