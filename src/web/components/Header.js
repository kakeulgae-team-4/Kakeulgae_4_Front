import {React, useState, useRef, useEffect } from 'react';
import './Header.css';
import textLogo from '../images/text_logo.png';
import { FaUser, FaBell } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { NavLink, useLocation } from 'react-router-dom';

const Header = ({ selectedMenu, setSelectedMenu }) => {
    // const[menu, setMenu] = useState(false); // 메뉴의 초기값을 false로 설정
    //     const toggleMenu = () => {
    //     setMenu(menu=>!menu); // on, off
    // }

    const name = '최혜빈';

    const location = useLocation();
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [activeMenu, setActiveMenu] = useState('');

    const menuItems = [
        { name: '관심공고', path: '/1' },
        { name: '채용공고', path: '/allrecruit' },
        { name: '즐겨찾기', path: '/2' },
        { name: '캘린더', path: '/calendar' },
        { name: '마이페이지', path: '/mypage' },
        { name: '알림함', path: '/3' },
        { name: '로그아웃', path: '/' },
    ];

    useEffect(() => {
        const currentMenu = menuItems.find(menu => location.pathname.includes(menu.path));
        setActiveMenu(currentMenu ? currentMenu.name : '메뉴');
    }, [location]);

    return (
        <header>
            <div className="logo">
                <a href="/"><img src={textLogo} alt="" /></a>
            </div>

            <div className="navbar">
                <ul>
                    <li><a href="">관심공고</a></li>
                    <li><a href="/allrecruit">채용공고</a></li>
                    <li><a href="">즐겨찾기</a></li>
                    <li><a href="/calendar">캘린더</a></li>
                </ul>
                
                <div className="user-info">
                    <p><a href="/">로그아웃</a></p>
                    <p className='myname'><FaUser /> {name}님</p>
                    <p className='bell-icon'><FaBell /></p>
                </div>
            </div>

            <div className="mini-nav" onClick={() => setDropdownVisible(!dropdownVisible)}>
                <div className='mini-content'>
                    {activeMenu}
                    <IoMdArrowDropdown />
                </div>
                {dropdownVisible && (
                    <ul className="dropdown">
                    {menuItems.map((item, index) => (
                        <li key={index}>
                        <NavLink to={item.path} onClick={() => setDropdownVisible(false)}>
                            {item.name}
                        </NavLink>
                        </li>
                    ))}
                    </ul>
                )}
            </div>

        </header>
    )
}

export default Header