import React from 'react'
// import { IoFastFood } from "react-icons/io5"
import { Link } from 'react-router-dom'
import { FiShoppingCart, FiLogIn } from "react-icons/fi"
import { FaUser } from "react-icons/fa"
import { motion } from "framer-motion"
import { GiFoodTruck } from 'react-icons/gi';
const Header = ({isAuthenticated = false}) => {
    return (
        <nav>
            <motion.div
                initial={{ x: "-100%" }} whileInView={{ x: 2 }}
            >
                <GiFoodTruck />
            </motion.div>
            <motion.div
                initial={{ x: "100%" }} whileInView={{ x: -2 }}
            >
                <Link to="/"> Home </Link>
                <Link to="/contact"> Contact </Link>
                <Link to="/about"> About </Link>
                <Link to="/cart"> <FiShoppingCart /> </Link>
                <Link to={isAuthenticated ? "/me" : "/login"}>
                    {isAuthenticated ? <FaUser /> : <FiLogIn />}
                </Link>
            </motion.div>
        </nav>
    )
}

export default Header
