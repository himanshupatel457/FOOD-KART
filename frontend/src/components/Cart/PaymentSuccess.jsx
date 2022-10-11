import { motion } from 'framer-motion'
import React from 'react'
import { Link } from 'react-router-dom'


const PaymentSuccess = () => {
    return (
        <section className='paymentSuccess'>
            <main>

                <motion.h1
                
                whileTap={{scale :1.2}}
                
                >
                    Order Confirmed
                </motion.h1>
                <p>Congratulations , Your Order has been placed Successfully !</p>
                <motion.p
                whileHover={{scale :2}}
                ><Link to='/myorders'>Track Orders</Link></motion.p>
            </main>
        </section>
    )
}

export default PaymentSuccess