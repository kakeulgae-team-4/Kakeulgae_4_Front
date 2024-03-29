import React from 'react';
import {useState, useEffect, useContext, useRef} from 'react';
import './Mypage.css';
import Header from '../components/Header';
import { auth } from './firebaseAuth';
import { UserContext } from '../components/AuthProvider';
import Filter from '../components/Filter';


const Mypage = () => {
    const [currentUser, setCurrentUser] = useState(null); // 사용자 정보를 저장할 상태 변수
    const [loading, setLoading] = useState(true); // 로딩 상태를 저장할 상태 변수
    const [error, setError] = useState(null); // 오류 정보를 저장할 상태 변수
    const { user } = useContext(UserContext);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         if (user) {
//           const email = user.email;
//           const nickName = user.nickname;
//           const phoneNumber = user.phoneNumber;
//           setCurrentUser({ email, displayName: nickName, phoneNumber });
//         } else {
//           setCurrentUser(null);
//         }
//       } catch (error) {
//         setError(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, [user]);
    const [Image, setImage] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
    const fileInput = useRef(null);

    const onChange = (e) => {
        if(e.target.files[0]){
            setImage(e.target.files[0])
        } else{ //업로드 취소할 시
            setImage("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
            return
        }
        //화면에 프로필 사진 표시
        const reader = new FileReader();
        reader.onload = () => {
            if(reader.readyState === 2){
                setImage(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }

return (
    <div className='mypage'>
        <Header />
        
        <div className="mypage-container">
            <h2><span className="nickname">{user?.nickname}</span>님의 계정 정보</h2>

            <div className="mypage-box">
                <h3>프로필 이미지</h3>
                
                <div className='mypage-box2'>
                    <div className='image-box'>
                        <img src={Image} alt="" className='profile-img'/>
                        <button className='image-btn'>변경</button>
                    </div>

                    <div className="setting-box">
                        <div className="mypage-nickname">
                            <p>닉네임</p>
                            <input type="text" />
                        </div>
                        <div className="mypage-email">
                            <p>이메일</p>
                            <div>
                                <input type="email" />
                                <select>
                                    <option value="" selected disabled hidden>선택하세요</option>
                                    <option value="0">naver.com</option>
                                    <option value="1">daum.net</option>
                                    <option value="2">gmail.com</option>
                                </select>
                                <button className='save-btn'>저장</button>
                            </div>
                        </div>
                        <div className="mypage-phone">
                            <p>휴대폰 번호</p>
                            <div>
                                <input type="text" />
                                <button className='save-btn'>저장</button>
                            </div>
                        </div>
                        <div className="mypage-alert">
                            <p id='alert-comment'>* 추천 공고 알림 서비스</p>
                            <div>
                                <p>알림 설정</p>
                                <label class="switch">
                                    <input type="checkbox" />
                                    <span class="slider round"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="mypage-btn">수정 완료</button>
            </div>

        <h2>{user?.nickname}님의 관심 키워드를 설정해보세요!</h2>
        <Filter />
        </div>

    </div>
);
}

export default Mypage;