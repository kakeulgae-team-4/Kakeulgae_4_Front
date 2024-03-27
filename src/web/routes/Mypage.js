import React, {useState, useEffect, useContext} from 'react';
import './Mypage.css';
import Header from '../components/Header';
import { auth } from './firebaseAuth';
import { UserContext } from '../components/AuthProvider';


const Mypage = () => {
  const [currentUser, setCurrentUser] = useState(null); // 사용자 정보를 저장할 상태 변수
  const [loading, setLoading] = useState(true); // 로딩 상태를 저장할 상태 변수
  const [error, setError] = useState(null); // 오류 정보를 저장할 상태 변수
  const { user } = useContext(UserContext);

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
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    return null;
  }
  if (user) {
    return (
        <div className="mypage-container">
          <Header />
          <div className="max-w-6xl mx-auto p-6">
            <h1 className="info-title"> {user.nickname}님의 계정 정보</h1>
            <h2></h2>
            <div className="mypage">
              <div className="col-span-4">
                <div className="flex flex-col items-center">
                  <label htmlFor="profile-image">프로필 이미지</label>
                  {/*<img src={profileBasic} alt="Profile Image"*/}
                  {/*     className="rounded-full w-32 h-32 mb-4"/>*/}
                  <img src="https://source.unsplash.com/random/200x200?person"
                       alt="Profile Image"
                       className="rounded-full w-32 h-32 mb-4"/>
                  <button
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Change
                    Photo
                  </button>
                </div>
              </div>
              <div className="col-span-8">
                <div className="mb-6">
                  <label htmlFor="nickname" className="block text-gray-700 text-sm font-semibold mb-2">Name</label>
                  <div className="flex">
                    <h2>{user.nickname}</h2>
                    {/* <input type="text" id="nickname" value="" className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition rounded w-full px-4 py-2" /> */}
                    <button className="bg-blue-500 text-white px-4 py-2 rounded ml-2 hover:bg-blue-600 transition">Save</button>
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
                  <div className="flex">
                    <h2>{user.email}</h2>
                    {/* <input type="email" id="email" value="" className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition rounded w-full px-4 py-2" /> */}
                    <select className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition rounded ml-2 px-4 py-2">
                      <option>@gmail.com</option>
                      <option>@naver.com</option>
                    </select>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded ml-2 hover:bg-blue-600 transition">Verify</button>
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="phone" className="block text-gray-700 text-sm font-semibold mb-2">Phone Number</label>
                  <div className="flex">
                    <h2>{user.phoneNumber}</h2>
                    {/* <input type="tel" id="phone" value="" className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition rounded w-full px-4 py-2" /> */}
                    <button className="bg-blue-500 text-white px-4 py-2 rounded ml-2 hover:bg-blue-600 transition">Verify</button>
                  </div>
                </div>
                <div className="mb-6">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition w-full">Change Password</button>
                </div>
                <div className="flex items-center mb-6">
                  <input type="checkbox" id="email-notifications" className="rounded text-blue-500 focus:ring focus:ring-blue-200 transition mr-2" />
                  <label htmlFor="email-notifications" className="text-gray-700 text-sm font-semibold">Email Notifications</label>
                </div>
              </div>
            </div>
          </div>
          {/* 여기에 선택완료 버튼 아래에 주어진 HTML 코드를 넣어주세요 */}
          <div className='change-container'>
            <h1 className="text-2xl font-semibold mb-6">비밀번호 변경 페이지 입니다.</h1>
            <div className="mb-4">
              <label htmlFor="current-password" className="block text-lg font-medium mb-2">현재 비밀번호</label>
              <input type="password" id="current-password" className="w-full px-4 py-2 border rounded-md" placeholder="현재 비밀번호 입력칸 입니다" />
            </div>
            <div className="mb-4">
              <label htmlFor="new-password" className="block text-lg font-medium mb-2">새 비밀번호</label>
              <input type="password" id="new-password" className="w-full px-4 py-2 border rounded-md" placeholder="새 비밀번호 입력칸 입니다" />
            </div>
            <div className="mb-6">
              <label htmlFor="confirm-password" className="block text-lg font-medium mb-2">새 비밀번호 확인</label>
              <input type="password" id="confirm-password" className="w-full px-4 py-2 border rounded-md" placeholder="새 비밀번호를 한번 더 입력하여 동일한 비밀번호인지 확인합니다" />
            </div>
            <div className="mb-4">
              <label htmlFor="image-description" className="block text-lg font-medium mb-2">이미지 사진에 대한 설명 입력</label>
              <textarea id="image-description" rows="4" className="w-full px-4 py-2 border rounded-md" placeholder="이미지 사진에 대한 설명을 사용자가 작성해야합니다."></textarea>
            </div>
            <div className="mb-6">
              <img src="https://source.unsplash.com/random/400x200" alt="Random Unsplash Image" className="w-full h-auto rounded-md mb-2" />
              <p className="text-sm text-gray-500">글 아래에 이미지 사진이 나올것입니다</p>
            </div>
            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">수정완료</button>
          </div>
          <div className="container mx-auto px-4 py-8">
            {/* 주어진 HTML 코드 */}

            <div className='alarm'>
              <div className="mb-6">
                <h1 className="text-2xl font-bold mb-2">읽지 않은 알림 20개</h1>
                <p className="text-sm mb-4">내가 받은 알림 중 아직 읽지않은 알림의 갯수를 표시해줍니다.</p>
                <label htmlFor="mark-all-read" className="flex items-center cursor-pointer">
                  <input id="mark-all-read" type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
                  <span className="ml-2 text-sm">모두 읽음 표시</span>
                </label>
              </div>
              <div className="mb-6">
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300">확인</button>
              </div>
              <div className="mb-6">
                {/* Notifications List */}
                <div className="space-y-4" id="notification-list">
                  {/* Unread Notifications */}
                  <div className="notification-item flex items-center justify-between py-2">
                    <span className="notification-dot unread-dot"></span>
                    <span className="ml-4 flex-1">[현대자동차] 신입공채</span>
                    <span className="text-sm text-gray-500">1일전</span>
                  </div>
                  {/* ... more unread notifications */}
                  {/* Read Notifications */}
                  <div className="notification-item flex items-center justify-between py-2">
                    <span className="notification-dot read-dot"></span>
                    <span className="ml-4 flex-1">[티웨이] 신입공채</span>
                    <span className="text-sm text-gray-500">4일전</span>
                  </div>
                  {/* ... more read notifications */}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition duration-300">prev</button>
                <span className="text-sm">현재 페이지 표시</span>
                <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition duration-300">next</button>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default Mypage;