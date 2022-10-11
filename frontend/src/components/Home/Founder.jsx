
import React from 'react'
import { motion } from 'framer-motion'
const Founder = () => {
    return (
        <section className='founder'>
            <motion.div
                initial={{ opacity: 0.9 }}
                whileTap={{ skew: -100 }}
                style={{ x: 0 }}
            >
                <motion.h3
                    initial={{
                        x: "-100",
                        opacity: 0,
                    }}
                    whileInView={{
                        x: 0,
                        opacity: 1,
                    }}
                >Hi there !</motion.h3>

                <motion.p
                    initial={{
                        x: "100",
                        opacity: 0,
                    }}
                    whileInView={{
                        x: 0,
                        opacity: 1,
                    }}
                >This is developed by a crazy developer who wishes to serve good taste</motion.p>
            </motion.div>
        </section>
    )
}

export default Founder


