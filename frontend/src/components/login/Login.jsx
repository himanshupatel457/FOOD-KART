
import React from 'react'
import {FcGoogle} from "react-icons/fc"
import { motion } from 'framer-motion'
import { server } from '../../redux/store'


const Login = () => {

   const  loginHandler =()=>{
    window.open(`${server}/googlelogin`,"_self")
   }



    return (
        <section className='login'>
        <motion.button
        initial={{
            y:"-100%",
            opacity:0,    
        }}

        whileInView={{
            y:0,
            opacity:1,
        }}

        transition={{delay:0.4}}


        onClick={
            loginHandler
        }
        >
            Login Using Google
            <FcGoogle/>
        </motion.button>
        </section>
    )
}

export default Login