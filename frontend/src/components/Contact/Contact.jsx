import React from 'react'
import { motion } from "framer-motion"

const Contact = () => {
    return (
        <section className="contact">
            <motion.form

                initial={{
                    y: "100",
                    opacity: 0,
                }}
                whileInView={{
                    y: 0,
                    opacity: 1,
                }}
                transition={{ delay: 0.4 }}
            >
                <h1>Write Us Here</h1>
                <input type="text" placeholder="Name" />
                <input type="email" placeholder="email@[gmail/hotmail/..].com" />
                <textarea className='textArea' resize="none" placeholder='Type Your Mesage Here !'></textarea>
                <button type='submit'>Send</button>

            </motion.form>
        </section>
    )
}

export default Contact