import React from 'react'
import { motion } from "framer-motion"
import { FaOpencart } from 'react-icons/fa';
import Founder from './Founder';
import Menu from './Menu';


const Home = () => {
    return (
        <>
            <section className='home'>

                <div>
                    <motion.h1
                        initial={{
                            y: "-100",
                            opacity: 0,
                        }}
                        whileInView={{
                            y: 0,
                            opacity: 1,
                        }}
                    > FoodKart <span><FaOpencart /></span> </motion.h1>
                    <motion.p
                        initial={{
                            y: "100",
                            opacity: 0,
                        }}
                        whileInView={{
                            y: 0,
                            opacity: 1,
                        }}
                        transition={{
                            delay: 0.4,
                        }}
                    >Order - > Eat -> Repeat</motion.p>
                </div>

                <motion.a href="#menu"
                    initial={{
                        x: "-100",
                        opacity: 0,
                    }}
                    whileInView={{
                        x: 0,
                        opacity: 1,
                    }}
                >
                    MENU
                </motion.a>
            </section>


            <Founder />
            <Menu />
        </>
    )
}

export default Home



// time 00:57:33 HRS