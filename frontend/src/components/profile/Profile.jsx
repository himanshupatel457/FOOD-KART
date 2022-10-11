import React from 'react'
import { motion } from 'framer-motion'
// import me from '../../assets/17.jpg'
import { AiFillDashboard } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../redux/actions/userActions'
import Loader from '../layout/Loader'


const Profile = () => {

    const dispatch = useDispatch();
    const { loading, user } = useSelector(state => state.auth)
    const logoutHandler = () => {
        dispatch(logoutUser());

    }

    const options = {
        initial: {
            y: "-100%",
            opacity: 0
        },
        animate: {
            y: 0,
            opacity: 1
        }
    }
    return (
        <section className='profile'>
            {
                loading === false ?

                    <main>
                        <motion.img src={user.photo} {...options} />
                        <motion.h5 {...options} transition={{ delay: 0.6 }} >{user.name}</motion.h5>


                        {
                            user.role === "admin" &&
                            <motion.div {...options}

                                trasition={{ delay: 0.6 }}>
                                <Link to="/admin/dashboard"

                                    style={{
                                        borderRadius: 0,
                                    }}
                                >
                                    <AiFillDashboard />Dashboard</Link>
                            </motion.div>

                        }
                        <motion.div
                            initial={{
                                x: "-100vw",
                                opacity: 0
                            }}
                            animate={{
                                x: "0",
                                opacity: 1

                            }}
                            trasition={{ delay: 0.6 }}>
                            <Link to="/myorders">myorders</Link>
                        </motion.div>

                        <motion.button
                            initial={{
                                x: "100vw",
                                opacity: 0
                            }}
                            animate={{
                                x: "0",
                                opacity: 1

                            }}
                            trasition={{ delay: 0.6 }}

                            onClick={logoutHandler}
                        >Logout</motion.button>
                    </main> : <Loader />
            }


            {/* <motion.div {...options} trasition={{ delay: 0.6 }}>
                <Link to="/admin/dashboard">Dashboard</Link>
            </motion.div> */}

        </section>
    )
}

export default Profile