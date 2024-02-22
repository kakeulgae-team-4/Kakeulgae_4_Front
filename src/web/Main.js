import React from 'react'
import './Main.css';
import mainImg from '../web/images/logo1_1.png';
import logoImg from '../web/images/logo1.png';
import textLogo from '../web/images/text_logo.png';
import textLogo2 from '../web/images/text_logo2.png';
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import { useRef, useEffect, useState } from 'react';
import Join from './components/Join';
import Profile from './components/Profile';

import menu1 from '../web/images/menu1.jpg';
import menu2 from '../web/images/menu2.jpg';
import menu3 from '../web/images/menu3.png';
import menu4 from '../web/images/menu4.jpg';

import mem1 from '../web/images/mem1.jpg';
import mem2 from '../web/images/mem2.jpg';
import mem3 from '../web/images/mem3.png';
import mem4 from '../web/images/mem4.jpg';
import mem5 from '../web/images/mem5.png';
import mem6 from '../web/images/mem6.jpg';

const Main = () => {
    const move1 = useRef();  //특정 DOM을 가리킬 때 사용하는 Hook함수
    const moveScroll = () => {    
        move1.current.scrollIntoView({ behavior: 'smooth', block: 'start' });  
    };

    return (
        <div className="main-container">

            <div className="main-start">
                <img src={mainImg} alt="" className='img-logo'/>
                <img src={textLogo} alt="" className='text-logo'/>
                <p className='scrollBtn' onClick={moveScroll}><MdOutlineKeyboardDoubleArrowDown /></p>
            </div>

            {/* 로그인 이전 화면 */}
            <div ref={move1}>
                <Join />
            </div>

            {/* 로그인 이후 화면 */}
            <div>
                <Profile />
            </div>

            <div className="menu-container">
                <img src={logoImg} alt="" className='logo-img' />
                <ul className='menu-box'>
                    <li className='menu menu1'><a href="">
                        <img src={menu1} alt="" />
                        <div className='menu-info info1'>
                            <span className='menu-title'>관심공고</span>
                            <h3>관심 키워드 등록 후, 공고를 확인해보세요</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        </div>
                        <p className='menu-icon'>📌</p>
                    </a></li>
                    <li className='menu menu2'><a href="">
                        <div className='menu-info info2'>
                            <span className='menu-title'>전체공고</span>
                            <h3>IT 직무 전체 공고를 확인해보세요</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        </div>
                        <img src={menu2} alt="" />
                        <p className="menu-icon">📑</p>
                    </a></li>
                </ul>
                <ul className='menu-box'>
                    <li className='menu menu3'><a href="">
                        <img src={menu3} alt="" />
                        <div className='menu-info info3'>
                            <span className='menu-title'>즐겨찾기</span>
                            <h3>즐겨찾기 목록을 확인해보세요</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        </div>
                        <p className="menu-icon">⭐</p>
                    </a></li>
                    <li className='menu menu4'><a href="">
                        <div className='menu-info info4'>
                            <span className='menu-title'>캘린더</span>
                            <h3>캘린더로 일정을 한눈에 확인해보세요</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        </div>
                        <img src={menu4} alt="" />
                        <p className="menu-icon">📆</p>
                    </a></li>
                </ul>
            </div>

            <div className="info-container">
                <div>
                    <h1>About</h1>
                    <img src={textLogo2} alt="" />
                </div>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis optio et similique ratione quidem velit qui doloribus quasi quo beatae maxime officia eum nobis deserunt cum neque, soluta accusantium officiis! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur ratione qui odio aliquid cupiditate a magni asperiores impedit tempore nihil minima cum, laudantium et doloribus blanditiis minus fuga libero officiis?</p>
            </div>

            <div className="member-container">
                <ul className="member">
                    <li>
                        <img src={mem1} alt="" />
                        <h3>Jake Kwon</h3>
                        <p>developer</p>
                    </li>
                    <li>
                        <img src={mem2} alt="" />
                        <h3>Admit</h3>
                        <p>front-end</p>
                    </li>
                    <li>
                        <img src={mem3} alt=""/>
                        <h3>Def-heon</h3>
                        <p>developer</p>
                    </li>
                    <li>
                        <img src={mem4} alt="" />
                        <h3>Bini</h3>
                        <p>front-end</p>
                    </li>
                    <li>
                        <img src={mem5} alt="" />
                        <h3>Cherry-ni</h3>
                        <p>developer</p>
                    </li>
                    <li>
                        <img src={mem6} alt="" />
                        <h3>kt-brother</h3>
                        <p>crawling</p>
                    </li>
                </ul>
            </div>

        </div>
    )
}

export default Main