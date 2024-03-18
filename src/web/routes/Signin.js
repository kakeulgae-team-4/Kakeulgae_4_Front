import React from 'react'
import './Signin.css';
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthProvider';
import text_logo from '../images/text_logo2.png';

const Signin = () => {
    const navigate = useNavigate();
    const { setIsLogged } = useAuth();

    const handleLogin = () => {
        setIsLogged(true);
        navigate('/'); // 로그인 후 메인 페이지로 이동
    };

    return (
        <div className="signin-container">

            <form action="">
                <img src={text_logo} alt="" className='signin_logo'/>
                <b>로그인</b>

                <div className="signin-form">
                    <div className="id-form">
                        <p>이메일</p>
                        <input type="text" placeholder='이메일을 입력해 주세요.'/>
                    </div>
                    <div className="pw-form">
                        <p>비밀번호</p>
                        <input type="password" placeholder='비밀번호를 입력해 주세요.' />
                    </div>
                    
                    <ul>
                        <li><a href="/signup">회원가입</a></li>
                        <li><a href="">아이디 찾기</a></li>
                        <li><a href="">비밀번호 찾기</a></li>
                    </ul>
                </div>

                <div className="signin-btn">
                    <button onClick={handleLogin}>로그인</button>
                    <button><FcGoogle className='g-icon' />구글로 로그인</button>
                </div>
            </form>

        </div>
    )
}

export default Signin