import React from 'react';
import './Header.css';
import textLogo from '../images/text_logo.png';
import { FaUser, FaBell } from "react-icons/fa";

const Header = () => {
    const name = '최혜빈';

    return (
        <header>
            <div className="logo">
                <a href="/"><img src={textLogo} alt="" /></a>
            </div>

            <div className="navbar">
                <ul>
                    <li><a href="">관심공고</a></li>
                    <li><a href="">채용공고</a></li>
                    <li><a href="">즐겨찾기</a></li>
                    <li><a href="">캘린더</a></li>
                </ul>
                
                <div className="user-info">
                    <p><a href="/">로그아웃</a></p>
                    <p className='myname'><FaUser /> {name}님</p>
                    <p className='bell-icon'><FaBell /></p>
                </div>
            </div>
        </header>
    )
}

export default Header