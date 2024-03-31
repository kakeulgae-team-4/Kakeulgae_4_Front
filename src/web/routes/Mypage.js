import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import './Mypage.css';
import Header from '../components/Header';
import { UserContext } from '../components/AuthProvider';
import Filter from '../components/Filter';
import { auth } from "../routes/firebaseAuth";
import { defaultHeaders } from "../../config/clientConfig";

const Mypage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const [Image, setImage] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
  const [userData, setUserData] = useState({
    jobDetails: [],
    region2nds: [],
    careers: [],
    educations: [],
    workTypes: []
  });

  const fileInput = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user) {
          const email = user.email;
          const nickName = user.nickname;
          const phoneNumber = user.phoneNumber;
          setCurrentUser({ email, displayName: nickName, phoneNumber });
        } else {
          setCurrentUser(null);
        }
      } catch (error) {
        console.error('사용자 정보 불러오기 실패:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [user]);

  useEffect(() => {
    // 로컬 스토리지에서 데이터를 불러와서 상태로 설정합니다.
    const storedData = JSON.parse(localStorage.getItem('userData'));

    if (storedData) {
      setUserData({
        jobDetails: storedData.jobDetails || [],
        region2nds: storedData.region2nds || [],
        careers: storedData.careers || [],
        educations: storedData.educations || [],
        workTypes: storedData.workTypes || []
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('userData', JSON.stringify(userData));
  }, [userData]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData) {
      setUserData(storedData);
    }
  }, []);

  const onChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    } else {
      setImage("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result)
      }
    }
    reader.readAsDataURL(e.target.files[0])
  };

  const handleSaveKeywords = async (selectedKeywords) => {
    try {
      if (auth.currentUser) {
        const token = await auth.currentUser.getIdToken();
        defaultHeaders.Authorization = `Bearer ${token}`;
        const res = await axios.post(
            'http://localhost:8080/interest/create',
            {
              idToken: token,
              nickname: currentUser.displayName,
              email: currentUser.email,
              keywords: selectedKeywords,
              jobDetails: userData.jobDetails, // 상세직무 ID 리스트 전달
              region2ndIds: userData.region2nds, // 지역 ID 리스트 전달
              careerIds: userData.careers, // 경력 ID 리스트 전달
              educations: userData.educations, // 학력 ID 리스트 전달
              workTypeIds: userData.workTypes // 근무 형태 ID 리스트 전달
            },
            {
              headers: defaultHeaders
            }
        );
        console.log('관심 키워드 저장 완료:', res.data);

        // userData 상태 업데이트
        setUserData({
          ...userData,
          jobDetails: userData.jobDetails,
          region2nds: userData.region2nds,
          careers: userData.careers,
          educations: userData.educations,
          workTypes: userData.workTypes
        });

        // userData 상태가 완전히 업데이트된 후에 localStorage에 저장
        localStorage.setItem('userData', JSON.stringify(userData));
      }
    } catch (error) {
      console.error('관심 키워드 저장 실패:', error);
    }
  };

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
                <label className="file-btn" htmlFor="input-file">
                  사진 선택
                </label>
                <input type="file" id="input-file" style={{display:"none"}} onChange={onChange} ref={fileInput}/>
              </div>
              <div className="setting-box">
                <div className="mypage-nickname">
                  <p>닉네임</p>
                  <input type="text" defaultValue={user?.nickname}/>
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
                    <input type="text" />
                    <button className='save-btn'>저장</button>
                  </div>
                </div>
                <div className="mypage-alert">
                  <p id='alert-comment'>* 추천 공고 알림 서비스</p>
                  <div>
                    <p>알림 설정</p>
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <button className="mypage-btn">수정 완료</button>
          </div>
          <h2><span className="nickname">{user?.nickname}</span>님의 관심 키워드를 설정해보세요!</h2>
          {/* Filter 컴포넌트에서 handleSaveKeywords를 호출할 수 있도록 props로 전달 */}
          <Filter handleSaveKeywords={handleSaveKeywords} />
        </div>
      </div>
  );
}

export default Mypage;
