import React from 'react'
import './Signin.css';
import { FcGoogle } from "react-icons/fc";

const Signin = () => {
    return (
        <div className="signin-container">

            <form action="">
                <h1>GOAL KEEPER</h1>
                <p>로그인</p>

                <div className="signin-form">
                    <div className="id-form">
                        <p>이메일</p>
                        <input type="text" />
                    </div>
                    <div className="pw-form">
                        <p>비밀번호</p>
                        <input type="password" />
                    </div>
                    
                    <ul>
                        <li><a href="">회원가입</a></li>
                        <li><a href="">아이디 찾기</a></li>
                        <li><a href="">비밀번호 찾기</a></li>
                    </ul>
                </div>

                <div className="signin-btn">
                    <button>로그인</button>
                    <button><FcGoogle className='g-icon' />구글로 로그인</button>
                </div>
            </form>

        </div>
    )
}

export default Signin