import React from 'react'
import { motion } from 'framer-motion'





const MenuCard = ({ itemNum, foodSrc, price, title, handler, delay = 0 }) => {




    return (
        <motion.div className="menuCard"
            initial={{
                x: "100%",
                opacity: 0,
            }}
            whileInView={{
                x: 0,
                opacity: 1,
            }}
            transition={{
                delay: delay,
            }}
        >
            <div>Items : {itemNum}</div>
            <main>
                <img src={foodSrc} alt={itemNum} />

                <h4>₹ {price}</h4>
                <p> {title}</p>
                <button onClick={() => handler(itemNum)}>Order Now</button>
            </main>
        </motion.div>
    )
}

export default MenuCard

