import React from 'react'
import './Footer.css';
import { AiFillTwitterCircle, AiFillInstagram } from "react-icons/ai";
import { FaFacebook, FaGithub } from "react-icons/fa";
import textLogo from '../../web/images/text_logo.png';

const Footer = () => {
    return (
        <footer>
            <img src={textLogo} alt="" id='text-logo'/>

            <div className="footer-nav">
                <ul className='footer-menu'>
                    <li>Product</li>
                    <li>Freatures</li>
                    <li>Pricing</li>
                    <li>Resources</li>
                </ul>

                <ul className='footer-icon'>
                    <li><AiFillTwitterCircle /></li>
                    <li><FaFacebook /></li>
                    <li><AiFillInstagram /></li>
                    <li><FaGithub /></li>
                </ul>
            </div>

            <hr />

            <p>&copy; Copyright 2024, All Rights Reserved by Dream Picker</p>
        </footer>
    )
}

export default Footer