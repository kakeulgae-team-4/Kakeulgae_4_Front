import {React, useState} from 'react';
import './Header.css';
import textLogo from '../images/text_logo.png';
import { FaUser, FaBell } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

const Header = () => {
    const[menu, setMenu] = useState(false); // 메뉴의 초기값을 false로 설정
    const toggleMenu = () => {
        setMenu(menu=>!menu); // on, off
    }

    const name = '최혜빈';

    return (
        <header>
            <div className="logo">
                <a href="/"><img src={textLogo} alt="" /></a>
            </div>


            <span className='navbar-icon' onClick={()=>{
                toggleMenu()
            }}>
                {
                    menu ? (
                        <span className='close-btn'>
                            <IoClose />
                        </span>
                    ) : (
                        <span className='menu-btn'>
                            <FiMenu />
                        </span>
                    )
                }
                <div className={menu ? "toggle-nav" : "hide-nav"}>
                    <ul>
                        <li><a href="">관심공고</a></li>
                        <li><a href="">채용공고</a></li>
                        <li><a href="">즐겨찾기</a></li>
                        <li><a href="">캘린더</a></li>
                        <li><a href="/mypage">마이페이지</a></li>
                        <li><a href="/">로그아웃</a></li>
                    </ul>
                </div>
            </span>

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