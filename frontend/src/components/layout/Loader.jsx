import React from 'react'
import { GiFoodTruck, GiKnifeFork } from 'react-icons/gi'
import { motion } from 'framer-motion'


const Loader = () => {



    return (
        <div className='loader'>
            <GiFoodTruck />
            <div>
                <motion.p
                initial={{
                    opacity:0,
                }}
                animate={{
                    opacity:1,
                }}
// loop can be instead of reverse
                transition={{
                    ease:"linear",
                    repeat:"Infinity",
                    repeatType:"reverse"
                }}
                
                >COOKING...<GiKnifeFork /></motion.p>
            </div>
        </div>
    )
}

export default Loader