import React, {useContext} from 'react'
import './Main.css';
import mainImg from '../web/images/logo1_1.png';
import logoImg from '../web/images/logo1.png';
import textLogo from '../web/images/text_logo.png';
import textLogo2 from '../web/images/text_logo2.png';
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import { useRef, useEffect, useState } from 'react';
import Join from './components/Join';
import Profile from './components/Profile';
import Notice from './components/Notice';

import mem1 from '../web/images/mem1.jpg';
import mem2 from '../web/images/mem2.jpg';
import mem3 from '../web/images/mem3.png';
import mem4 from '../web/images/mem4.jpg';
import mem5 from '../web/images/mem5.png';
import mem6 from '../web/images/mem6.jpg';

import { useNavigate } from 'react-router-dom';
import { UserContext } from './components/AuthProvider';

const Main = () => {
    const { user }  = useContext(UserContext);
    const move1 = useRef();  //특정 DOM을 가리킬 때 사용하는 Hook함수
    const moveScroll = () => {    
        move1.current.scrollIntoView({ behavior: 'smooth', block: 'start' });  
    };

    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 표시 여부 관리
    
    const navigate = useNavigate();
    function handleMenuClick(path) {
        if (!user) {
            // 로그인하지 않았다면 모달을 표시
            setIsModalOpen(true);
        } else {
            // 로그인을 했다면 해당 메뉴 경로로 이동
            navigate(path);
        }
    }

    return (
        <div className="main-container">

            <div className="main-start">
                <img src={mainImg} alt="" className='img-logo'/>
                <img src={textLogo} alt="" className='text-logo'/>
                <p className='scrollBtn' onClick={moveScroll}><MdOutlineKeyboardDoubleArrowDown /></p>
            </div>

            { user ?
                <div ref={move1}>
                    <Profile/>
                </div> :
                <div ref={move1}>
                    <Join />
                </div>
            }

            <div className="menu-container">
                <nav>
                    <div className='menu-box menu-box1' onClick={() => handleMenuClick('/preference')}>
                        <h3>관심공고</h3>
                        <p>관심 키워드 등록 후, 공고를 확인해보세요</p>
                        <div><span>📌</span></div>
                    </div>
                    <div className='menu-box menu-box2' onClick={() => handleMenuClick('/allrecruit')}>
                        <h3>전체공고</h3>
                        <p>IT 직무 전체 공고를 확인해보세요</p>
                        <div><span>📑</span></div>
                    </div>
                    <div className='menu-box menu-box3' onClick={() => handleMenuClick('/bookmark')}>
                        <h3>즐겨찾기</h3>
                        <p>즐겨찾기 목록을 확인해보세요</p>
                        <div><span>⭐</span></div>
                    </div>
                    <div className='menu-box menu-box4' onClick={() => handleMenuClick('/calendar')}>
                        <h3>캘린더</h3>
                        <p>캘린더로 일정을 한눈에 확인해보세요</p>
                        <div><span>📆</span></div>
                    </div>
                    <Notice isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
                </nav>
            </div>

            <div className="info-container">
                <div className='info-title'>
                    <h1>About</h1>
                    <img src={textLogo2} alt="" />
                </div>
                
                <div className='info-content'>
                    <img src={logoImg} alt=""/>
                    <p>
                        <b>IT's GOAL KEEPER</b>는 IT 계열 직무를 희망하고 있는 취업 준비생들을 위해 여러 취업 사이트를 취합하여 <span>IT 계열 채용 모집 공고를 한 눈에 볼 수 있도록 제공</span>해주는 플랫폼입니다. 관심 키워드를 설정하면 관심 공고만 따로 확인할 수 있고 즐겨찾기를 등록하여 해당 공고글에 대한 알림을 지속적으로 받을 수 있습니다. 채용 공고를 놓치지 않고 확인할 수 있도록 메일 알림과 사이트 내 알림을 보내줌으로써 관심 공고 확인을 보다 쉽게 접할 수 있습니다.
                    </p>
                </div>
            </div>

            <div className="member-container">
                <ul className="member">
                    <li>
                        <a href="https://github.com/KIJ9801"><img src={mem1} alt="" /></a>
                        <h3>Jake Kwon</h3>
                        <p>developer</p>
                    </li>
                    <li>
                        <a href="https://github.com/inyujeongsang"><img src={mem2} alt="" /></a>
                        <h3>Admit</h3>
                        <p>developer</p>
                    </li>
                    <li>
                        <a href="https://github.com/uiheonn"><img src={mem3} alt=""/></a>
                        <h3>Def-heon</h3>
                        <p>developer</p>
                    </li>
                    <li>
                        <a href="https://github.com/ChoiHyebin"><img src={mem4} alt="" /></a>
                        <h3>Bini</h3>
                        <p>developer</p>
                    </li>
                    <li>
                        <a href="https://github.com/lin-chae"><img src={mem5} alt="" /></a>
                        <h3>Cherry-ni</h3>
                        <p>developer</p>
                    </li>
                    <li>
                        <a href="https://github.com/koosco"><img src={mem6} alt="" /></a>
                        <h3>kt-brother</h3>
                        <p>developer</p>
                    </li>
                </ul>
            </div>

        </div>
    )
}

export default Main
