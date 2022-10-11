import React from 'react'
import { MdError, MdHome } from "react-icons/md"
import { Link } from 'react-router-dom'
const NotFound = () => {
    return (
        <section className='notFound'>

            <main>
                <div>
                    <MdError />
                    <h1>404</h1>
                </div>

                <p>Page Not Found, For Home Page click on the button aside</p>
                <Link to="/"> Home <MdHome /></Link>
            </main>

        </section>

    )
}

export default NotFound