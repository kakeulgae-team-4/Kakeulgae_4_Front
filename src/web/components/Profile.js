import React from 'react'
import './Profile.css';
import profile from '../images/cute.jpg';
import { useAuth } from '../AuthProvider';


const Profile = () => {
    const name = '우루루파도';
    const email = 'injung940202@gmail.com';
    const bookmark = 13;
    const prefer = 159;

    const { setIsLogged } = useAuth();

    const handleLogout = () => {
      setIsLogged(false);
      // 로그아웃 후 추가적인 동작
    };

    return (
        <div className="profile-container">
            <div>
                <h1>Welcome, <span>{name}!</span></h1>
                <p>{email}</p>
            </div>

            <img src={profile} alt="" />

            <div className='profile-btn'>
                <a href="/mypage">My Page</a>
                <a href="/" onClick={handleLogout}>Log out</a>
            </div>

            <div className='profile-info'>
                <div>
                    <h3>즐겨찾기</h3>
                    <p><span>{bookmark}</span>건</p>
                </div>
                <div>
                    <h3>관심공고</h3>
                    <p><span>{prefer}</span>건</p>
                </div>
            </div>
        </div>
    )
}

export default Profile