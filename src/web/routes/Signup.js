import React from 'react'
import './Signup.css';
import text_logo from '../images/text_logo2.png';

const Signup = () => {
    return (
        <div className="signup-container">

            <div id='signup-form'>
                <img src={text_logo} alt="" className='signin_logo'/>
                <b>회원가입</b>

                <div className="signup-form">
                    <div className="name-form">
                        <p>닉네임</p>
                        <input type="text" placeholder='닉네임을 입력해 주세요.' />
                    </div>
                    <div className="id-form">
                        <p>이메일</p>
                        <input type="text" placeholder='이메일을 입력해 주세요.' />
                    </div>
                    <div className="pw-form">
                        <p>비밀번호</p>
                        <input type="password" placeholder='비밀번호를 입력해 주세요.' />
                    </div>
                    <div className="check-form">
                        <p>비밀번호 확인</p>
                        <input type="password" placeholder='비밀번호를 입력해 주세요.' />
                    </div>
                </div>

                <div className="next-btn"><button>다음</button></div>
            </div>
            
        </div>
    )
}

export default Signup