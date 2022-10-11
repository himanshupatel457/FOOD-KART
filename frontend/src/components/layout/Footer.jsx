import React from 'react'
import {AiFillMessage,AiFillInstagram,AiFillGithub,AiFillFacebook} from "react-icons/ai"
import { FaOpencart } from 'react-icons/fa'


const Footer = () => {
    return (
        <footer>
            <div>
                <h1>FOOD-KART <FaOpencart /></h1>
                <p>Aim to serve Good taste</p>

                <br/>
                <em>There is always a corner for imorovement. Please give Feedback<a href='https://mail.google.com'><AiFillMessage/></a></em><br/>
                <br/>
                <strong>Copyright © since 2022 . All rights Reserved™  ® Trademark registered [college project] </strong>
            </div>
            <aside>
                <h4>Our Handles</h4>
                <a target="_blank" href= " https://www.instagram.com "><AiFillInstagram/></a>
                <a target="_blank" href=" https://github.com/himanshupatel457"><AiFillGithub/></a>
                <a target="_blank" href=" https://www.facebook.com/"><AiFillFacebook/></a>
            </aside>
        </footer>
    )
}

export default Footer