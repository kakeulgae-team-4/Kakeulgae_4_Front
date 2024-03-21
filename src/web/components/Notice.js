import React from 'react'
import './Notice.css';
import { IoClose } from "react-icons/io5";
import noticeImg from '../images/notice.png';

const Notice = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="notice-container">
            <p className='close' onClick={onClose}><span>
                <IoClose />
            </span></p>

            <img src={noticeImg} alt="" className='notice-img'/>

            <div className='notice-comment'>
                <p>회원만 이용할 수 있는 서비스입니다.</p>
                <p>로그인을 먼저 진행해 주세요.</p>
            </div>

            <div className='notice-btn'>
                <a href="/signin" className='in-btn'>sign in</a>
                <a href="/signup" className='up-btn'>sign up</a>
            </div>

        </div>
    )
}

export default Notice;