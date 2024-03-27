import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../components/AuthProvider';
import { defaultHeaders } from '../../config/clientConfig';
import './RegisterForm.css';

const RegisterForm =  ({ setRegisterFormOpen }) => { 
  const { setUser } = useContext(UserContext); // UserContext에서 setUser를 가져옴
  
  const handleSubmit = async (event) => { // form을 submit할 때 실행되는 함수
    event.preventDefault(); // 기본 이벤트를 막음
    const res =  await fetch('http://localhost:8080/api/v1/auth/register/google', {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify({
        idToken: event.target.idToken.value,
        nickname: event.target.nickname.value,
        email: event.target.email.value,
      }),
    });
    const user = await res.json();
    console.log(`post /users ${JSON.stringify(user)}`);
    setRegisterFormOpen(false);
    setUser(user);
  };

  return (
    <div className='register-container'>
      <form onSubmit={handleSubmit} className='register-form'>
        <h3>구글 로그인</h3>
        <input type='hidden' name='idToken' value={localStorage.getItem('idToken')} />
        <div className="nickname-form">
          <p>닉네임</p>
          <input className='nickname' type='text' name='nickname' placeholder='사용할 닉네임을 입력해주세요.'/>
        </div>
        <div className="email-form">
          <p>이메일</p>
          <input className='email' type='email' name='email' placeholder='알림 받을 이메일을 입력해주세요.'/>
        </div>
        <button className='register-btn'>가입하기</button>
      </form>
    </div>
  );
}

export default RegisterForm;
