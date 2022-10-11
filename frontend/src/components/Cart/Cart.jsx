import React, { useEffect } from 'react'
import sandwichp from '../../assets/sandwich.jpg'
import ff from '../../assets/ff.jpg'
import pizzap from '../../assets/pizza.jpg'
import { Link } from "react-router-dom"
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from "react-redux"


const CartItem = ({ value, title, img, increment, decrement }) => (
    <motion.div className='cartItem'
        initial={{
            y: "100%",
            opacity: 0,
        }}
        whileInView={{
            y: "0",
            opacity: 1
        }}

        transition={{
            delay: 0.6
        }}

    >
        <div>
            <h4>{title}</h4>
        </div>
        <div>
            <img src={img} alt="item" />
        </div>
        <div>
            <button onClick={decrement}>-</button>
            <input type="number" readOnly value={value} />
            <button onClick={increment}>+</button>
        </div>
    </motion.div>
)
const Cart = () => {
    const {
        cartItems: {
            sandwich: {
                quantity: sandwich,

            },
            pizza: {
                quantity: pizza,

            },
            french_fries: {
                quantity: french_fries,

            },
        },
        subTotal,
        tax,
        shippingCharges,
        total,
    } = useSelector((state) => state.cart);
    const { cartItems: orderItems } = useSelector((state) => state.cart);

    const dispatch = useDispatch();
    const increment = (item) => {
        switch (item) {
            case 1:
                dispatch({
                    type: "sandwichIncrement",
                })
                dispatch({
                    type: "calculatePrice",
                })
                break;
            case 2:
                dispatch({
                    type: "pizzaIncrement",
                })
                dispatch({
                    type: "calculatePrice",
                })
                break;
            case 3:
                dispatch({
                    type: "french_friesIncrement",
                })
                dispatch({
                    type: "calculatePrice",
                })
                break;
            default:
                break;
        }
    };
    const decrement = (item) => {
        switch (item) {
            case 1:
                if (sandwich === 0) break;
                dispatch({
                    type: "sandwichDecrement",
                });
                dispatch({
                    type: "calculatePrice",
                });
                break;
            case 2:
                if (pizza === 0) break;
                dispatch({
                    type: "pizzaDecrement",
                });
                dispatch({
                    type: "calculatePrice",
                });
                break;
            case 3:
                if (french_fries === 0) break;
                dispatch({
                    type: "french_friesDecrement",
                });
                dispatch({
                    type: "calculatePrice",
                });
                break;
            default:
                if (sandwich === 0) break;
                dispatch({
                    type: "sandwichDecrement",
                });
                dispatch({
                    type: "calculatePrice",
                });
                break;
        }

    };

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(orderItems));
        localStorage.setItem("cartPrices", JSON.stringify({
            subTotal,
            tax,
            shippingCharges,
            total,
        }));
    }, [orderItems, subTotal, tax, shippingCharges, total])

    return (
        <section className='cart'>
            <main>
                <article className='cards'>
                    <CartItem title={"sandwich"} img={sandwichp} value={sandwich} increment={() => increment(1)} decrement={() => decrement(1)} />
                    <CartItem title={"pizza"} img={pizzap} value={pizza} increment={() => increment(2)} decrement={() => decrement(2)} />
                    <CartItem title={"french_fries"} img={ff} value={french_fries} increment={() => increment(3)} decrement={() => decrement(3)} />
                </article>
                <article className='bill'>
                    <motion.div
                        initial={{
                            x: "-100%"
                        }}
                        whileInView={{
                            x: "0"
                        }}
                    >
                        <h4>SubTotal</h4>
                        <p>₹ {subTotal}</p>
                    </motion.div>
                    <motion.div
                        initial={{
                            x: "100%",
                        }}
                        whileInView={{
                            x: "0"
                        }}

                        transition={{
                            delay: 0.4
                        }}
                    >
                        <h4>Tax</h4>
                        <p>₹ {tax}</p>
                    </motion.div>
                    <motion.div

                        initial={{
                            x: "-100%",
                        }}
                        whileInView={{
                            x: "0"
                        }}

                        transition={{
                            delay: 0.5
                        }}
                    >
                        <h4>Shippping Charges</h4>
                        <p>₹ {shippingCharges}</p>
                    </motion.div>
                    <motion.div
                        initial={{
                            x: "100%",
                        }}
                        whileInView={{
                            x: "0"
                        }}

                        transition={{
                            delay: 0.6
                        }}

                    >
                        <h4>Payable Amount :</h4>
                        <p>₹ {total}</p>
                    </motion.div>

                    <Link to="/shipping">Checkout</Link>
                </article>
            </main>
        </section>
    )
}

export default Cart;