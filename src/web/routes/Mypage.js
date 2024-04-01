import React from 'react';
import {useState, useEffect, useContext, useRef} from 'react';
import './Mypage.css';
import Header from '../components/Header';
import { UserContext } from '../components/AuthProvider';
import Filter from '../components/Filter';
import axios from 'axios';


const Mypage = () => {
    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(true); // 로딩 상태를 저장할 상태 변수
    const [error, setError] = useState(null); // 오류 정보를 저장할 상태 변수

    const [Image, setImage] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
    useEffect(() => {
        setImage(user?.url);
    }, [user]);

    const fileInput = useRef(null);
    const onChange = (e) => {
        if(e.target.files[0]){
            const formData = new FormData();
            formData.append('profile', e.target.files[0]);
            axios.post('http://localhost:8080/api/v1/member/profile', formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('idToken')}`
                },
                data : formData
            })
            .then((res) => {
                // 서버 응답에서 새로운 프로필 이미지 URL을 가져와 상태를 업데이트
                setImage(res.data);
            })
        }
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
                        <label className="file-btn" for="input-file">
                        사진 선택
                        </label>
                        <input type="file" id="input-file" style={{display:"none"}} onChange={onChange} ref={fileInput}/>
                    </div>

                    <div className="setting-box">
                        <div className="mypage-nickname">
                            <p>닉네임</p>
                            <div>
                                <input type="text" defaultValue={user?.nickname}/>
                                <button className='save-btn'>저장</button>
                            </div>
                        </div>
                        <div className="mypage-email">
                            <p>이메일</p>
                            <div>
                                <input type="email" defaultValue={user?.email}/>
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
                                <input type="text" defaultValue={user?.phoneNumber}/>
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

        <h2><span className="nickname">{user?.nickname}</span>님의 관심 키워드를 설정해보세요!</h2>
        <Filter />
        </div>

    </div>
);
}

export default Mypage;