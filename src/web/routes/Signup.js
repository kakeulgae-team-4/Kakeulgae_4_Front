import React from 'react'
import './Signup.css';

const Signup = () => {
    return (
        <div className="signup-container">

            <form action="">
                <h1>GOAL KEEPER</h1>
                <p>회원가입</p>

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
            </form>
            
        </div>
    )
}

export default Signup