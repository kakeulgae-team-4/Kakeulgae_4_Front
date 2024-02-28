import React from 'react';
import './Mypage.css'; // 외부 CSS 파일을 불러옵니다.
import Header from '../components/Header';

const Mypage = () => {
    return (
        <div className="mypage-container">
            <Header />
            <div className="max-w-6xl mx-auto p-6">
                <h1 className="info-title">권익재님 계정 정보</h1>
                <div className="mypage">
                    <div className="col-span-4">
                        <div className="flex flex-col items-center">
                            <label htmlFor="profile-image">프로필 이미지</label>
                            <img src="https://source.unsplash.com/random/200x200?person" alt="Profile Image" className="rounded-full w-32 h-32 mb-4" />
                            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Change Photo</button>
                        </div>
                    </div>
                    <div className="col-span-8">
                        <div className="mb-6">
                            <label htmlFor="nickname" className="block text-gray-700 text-sm font-semibold mb-2">Nickname</label>
                            <div className="flex">
                                <input type="text" id="nickname" value="Jake" className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition rounded w-full px-4 py-2" />
                                <button className="bg-blue-500 text-white px-4 py-2 rounded ml-2 hover:bg-blue-600 transition">Save</button>
                            </div>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
                            <div className="flex">
                                <input type="email" id="email" value="ijkk9801@naver.com" className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition rounded w-full px-4 py-2" />
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
                                <input type="tel" id="phone" value="010-0000-0000" className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition rounded w-full px-4 py-2" />
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
            {/* 선택완료 버튼 아래에 주어진 HTML 코드 */}
            <body className="bg-gray-50 p-8">
                <div className="keyword-container">
                    <h1 className="text-2xl font-bold mb-6">권익재님의 관심 키워드를 설정해보세요!</h1>
                    <p className="mb-4">선택한 카테고리는 공고 알림 서비스에 이용됩니다.</p>
                    
                    <div className="grid grid-cols-4 gap-4 mb-6">
                        <div className="space-y-2">
                            <h2 className="font-semibold">직무</h2>
                            <div>
                                <input type="checkbox" id="backend" className="hidden category-checkbox" />
                                <label htmlFor="backend" className="cursor-pointer px-4 py-2 border rounded">백엔드</label>
                            </div>
                            <p className="text-sm">직무 관련 여러 카테고리를 선택할 수 있게 됩니다 백엔드,프론트엔드 등</p>
                        </div>
                        <div className="space-y-2">
                            <h2 className="font-semibold">근무지역</h2>
                            <div>
                                <input type="checkbox" id="seoul" className="hidden category-checkbox" />
                                <label htmlFor="seoul" className="cursor-pointer px-4 py-2 border rounded">서울</label>
                            </div>
                            <p className="text-sm">근무지역 관련 여러 카테고리를 선택할 수 있게 됩니다 서울,경기 등</p>
                        </div>
                        <div className="space-y-2">
                            <h2 className="font-semibold">경력</h2>
                            <div>
                                <input type="checkbox" id="oneToThreeYears" className="hidden category-checkbox" />
                                <label htmlFor="oneToThreeYears" className="cursor-pointer px-4 py-2 border rounded">1~3년</label>
                            </div>
                            <p className="text-sm">경력 관련 여러 카테고리를 선택할 수 있게 됩니다 신입,경력 등</p>
                        </div>
                        <div className="space-y-2">
                            <h2 className="font-semibold">학력</h2>
                            <div>
                                <input type="checkbox" id="bachelor" className="hidden category-checkbox" />
                                <label htmlFor="bachelor" className="cursor-pointer px-4 py-2 border rounded">대졸</label>
                            </div>
                            <p className="text-sm">학력 관련 여러 카테고리를 선택할 수 있게 됩니다 고졸,대졸 등</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4 mb-6">
                        <div className="space-y-2">
                            <h2 className="font-semibold">기업형태</h2>
                            <div>
                                <input type="checkbox" id="largeCompany" className="hidden category-checkbox" />
                                <label htmlFor="largeCompany" className="cursor-pointer px-4 py-2 border rounded">대기업</label>
                            </div>
                            <p className="text-sm">기업형태 관련 여러 카테고리를 선택할 수 있게 됩니다 중소,대기업 등</p>
                        </div>
                        <div className="space-y-2">
                            <h2 className="font-semibold">고용형태</h2>
                            <div>
                                <input type="checkbox" id="fullTime" className="hidden category-checkbox" />
                                <label htmlFor="fullTime" className="cursor-pointer px-4 py-2 border rounded">정규직</label>
                            </div>
                            <p className="text-sm">고용형태 관련 여러 카테고리를 선택할 수 있게 됩니다 계약직, 정규직 등</p>
                        </div>
                        <div className="space-y-2">
                            <h2 className="font-semibold">인턴</h2>
                            <div>
                                <input type="checkbox" id="internship" className="hidden category-checkbox" />
                                <label htmlFor="internship" className="cursor-pointer px-4 py-2 border rounded">채용형 인턴쉽</label>
                            </div>
                            <p className="text-sm">인턴 관련 여러 카테고리를 선택할 수 있게 됩니다 채용형 인턴 등</p>
                        </div>
                        <div className="space-y-2">
                            <h2 className="font-semibold">복리후생</h2>
                            <div>
                                <input type="checkbox" id="benefits" className="hidden category-checkbox" />
                                <label htmlFor="benefits" className="cursor-pointer px-4 py-2 border rounded">회사 내규에 따름</label>
                            </div>
                            <p className="text-sm">복지 관련 여러 카테고리를 선택할 수 있게 됩니다 경조사비 지원 등</p>
                        </div>
                    </div>

                    <button className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">선택완료</button>
                    
                </div>
                
            </body>
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
        </div>
    );
}

export default Mypage;
