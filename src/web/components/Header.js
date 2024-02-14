import React from 'react';
import './Header.css';
import logo from '../images/bell_icon.png';
import Navbar from './Navbar';

const Header = () => {
    return (
        <header>
            <div className="logo">
                {/* <a href="/"><img src={logo} alt="" /></a> */}
                <h1>LOGO</h1>
            </div>
            <div className="menu-bar">
                <Navbar />
            </div>
        </header>
    )
}

export default Header