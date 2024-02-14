import React from 'react'
import './Main.css';
import mainImg from '../web/images/logo1_1.png';
import logoImg from '../web/images/logo1.png';
import textLogo from '../web/images/text_logo.png';
import profile from '../web/images/cute.jpg';
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import { useRef, useEffect, useState } from 'react';
import { TbHeartQuestion } from "react-icons/tb";
import { FaEarthAsia } from "react-icons/fa6";
import { BsFillBookmarkStarFill } from "react-icons/bs";
import { IoCalendarOutline } from "react-icons/io5";
import Join from './components/Join';

const Main = () => {
    const move1 = useRef();  //특정 DOM을 가리킬 때 사용하는 Hook함수
    const moveScroll = () => {    
        move1.current.scrollIntoView({ behavior: 'smooth', block: 'start' });  
    };

    return (
        <div className="main-container">

            <div className="main-start">
                <img src={mainImg} alt="" className='img-logo'/>
                {/* <h1>GOAL KEEPER</h1> */}
                <img src={textLogo} alt="" className='text-logo'/>
                <p className='scrollBtn' onClick={moveScroll}><MdOutlineKeyboardDoubleArrowDown /></p>
            </div>

            <div ref={move1}>
                <Join />
            </div>

            <div className="menu-container">
                <img src={logoImg} alt="" className='logo-img' />
                <ul className='main-menu'>
                    <li><a href=""><span className='menu-title'>관심공고</span></a></li>
                    <li><a href=""><span className='menu-title'>전체공고</span></a></li>
                </ul>
                <ul className='main-menu'>
                    <li><a href=""><span className='menu-title'>즐겨찾기</span></a></li>
                    <li><a href=""><span className='menu-title'>캘린더</span></a></li>
                </ul>
            </div>

            <div className="info-container">
                <div>
                    <h1>홈페이지 설명</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis optio et similique ratione quidem velit qui doloribus quasi quo beatae maxime officia eum nobis deserunt cum neque, soluta accusantium officiis! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur ratione qui odio aliquid cupiditate a magni asperiores impedit tempore nihil minima cum, laudantium et doloribus blanditiis minus fuga libero officiis?</p>
                </div>
            </div>

            <div className="member-container">
                <ul className="member">
                    <li>
                        <img src={profile} alt="" />
                        <h3>Jake Kwon</h3>
                        <p>developer</p>
                    </li>
                    <li>
                        <img src={profile} alt="" />
                        <h3>Admit</h3>
                        <p>front-end</p>
                    </li>
                    <li>
                        <img src={profile} alt="" />
                        <h3>Def-heon</h3>
                        <p>developer</p>
                    </li>
                </ul>
                <ul className="member">
                    <li>
                        <img src={profile} alt="" />
                        <h3>Bini</h3>
                        <p>front-end</p>
                    </li>
                    <li>
                        <img src={profile} alt="" />
                        <h3>Cherry-ni</h3>
                        <p>developer</p>
                    </li>
                    <li>
                        <img src={profile} alt="" />
                        <h3>koo - tae brother</h3>
                        <p>crawling</p>
                    </li>
                </ul>
            </div>

        </div>
    )
}

export default Main