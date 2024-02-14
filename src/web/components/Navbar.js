import React from 'react'
import './Navbar.css';
import { FiMenu } from "react-icons/fi";
import { FaUser, FaBell } from "react-icons/fa";

const Navbar = () => {
    return (
        <div className="navbar">
            <ul>
                <li><FiMenu /></li>
                <li>채용 공고</li>
                <li>즐겨찾기</li>
                <li>캘린더</li>
            </ul>
            
            <div className="user-info">
                <p>로그아웃</p>
                <p><FaUser />최혜빈님</p>
                <p><FaBell /></p>
            </div>
        </div>
    )
}

export default Navbar