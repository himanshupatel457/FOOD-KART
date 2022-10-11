import React from 'react'
import { FaOpencart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { RiFindReplaceFill } from "react-icons/ri"
import Sponsers from "../../assets/17.jpg"

const About = () => {
    return (
        <section className='About'>
            <main>
                <h1>About Us</h1>
                <article>
                    <h4>FOOD-KART <FaOpencart /></h4>
                    <p> We serve good Taste . A plateform with all dishes around the world . Serving across in 18 Nations Now in India</p>
                    <p>We hope we will be serving our customers as that's our utmost priority. Wanna Explore Menu Hit this button </p>


                    <Link to="/"><RiFindReplaceFill /></Link>
                </article>
                <div>
                    <h2>
                        Our Sponsers
                    </h2>
                    <article>
                        <div>
                            <img src={Sponsers} alt="sponsers" />
                            <h3>Himanshu here and no one else ;)</h3>
                        </div>
                    </article>
                </div>
            </main>
        </section>
    )
}

export default About