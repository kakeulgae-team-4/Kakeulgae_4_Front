import React from 'react';
import {useState, useContext, useEffect } from 'react';
import './Header.css';
import textLogo from '../images/text_logo.png';
import { FaUser, FaBell } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { NavLink, useLocation } from 'react-router-dom';
import { UserContext } from '../components/AuthProvider';
import {signOut} from "../routes/firebaseAuth";

const Header = () => {
    const { user }  = useContext(UserContext);

    const location = useLocation();
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [activeMenu, setActiveMenu] = useState('');

    const menuItems = [
        { name: '관심공고', path: '/preference' },
        { name: '채용공고', path: '/allrecruit' },
        { name: '즐겨찾기', path: '/bookmark' },
        { name: '캘린더', path: '/calendar' },
        { name: '마이페이지', path: '/mypage' },
        { name: '알림함', path: '/notification' },
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
                    <li><a href="/preference">관심공고</a></li>
                    <li><a href="/allrecruit">채용공고</a></li>
                    <li><a href="/bookmark">즐겨찾기</a></li>
                    <li><a href="/calendar">캘린더</a></li>
                </ul>
                
                <div className="user-info">
                    <p><a href="/" onClick={signOut}>로그아웃</a></p>
                    <a href="/mypage" className='myname'><FaUser /> {/*옵셔널 체이닝*/user?.nickname}님</a>
                    <a href='/notification' className='bell-icon'><FaBell /></a>
                </div>
            </div>

            <div className="mini-nav" onClick={() => setDropdownVisible(!dropdownVisible)}>
                <div className='mini-content'>
                    {activeMenu}
                    <IoMdArrowDropdown />
                </div>
                {dropdownVisible && (
                    <ul className="dropdown">
                    {menuItems.map((item, index) => {
                        // 로그아웃에 대한 특별 처리
                        if(item.name === '로그아웃') {
                            return (
                                <li key={index} onClick={signOut}>
                                    <a href="/" onClick={signOut}>{item.name}</a>
                                </li>
                            );
                        }
                        return(
                            <li key={index}>
                            <NavLink to={item.path} onClick={() => setDropdownVisible(false)}>
                                {item.name}
                            </NavLink>
                            </li>
                        );
                    })}
                    </ul>
                )}
            </div>

        </header>
    )
}

export default Header
