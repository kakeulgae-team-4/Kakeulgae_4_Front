import React, { useState, useEffect } from 'react';
import './Filter.css';
import arrowUp from '../images/arrow-up.png';
import arrowDown from '../images/arrow-down.png';
import { auth } from "../routes/firebaseAuth";
import { defaultHeaders } from "../../config/clientConfig";
import axios from 'axios';


const categories = {
  직무: ["게임개발", "기술지원", "데이터분석가", "데이터엔지니어", "백엔드/서버개발"],
  근무지역: ["서울", "경기", "인천", "부산", "대구", "광주", "대전", "울산", "세종", "강원", "경남", "경북", "전남", "전북", "충남", "충북", "제주", "전국"],
  // 추가 카테고리 데이터를 여기에 입력
};

const Filter = () => {
  const [selectedCategory, setSelectedCategory] = useState('직무');
  const [items, setItems] = useState(categories[selectedCategory]);
  const [selectedItems, setSelectedItems] = useState({});
  const [user, setUser] = useState(null); // user 상태를 관리하기 위해 useState를 사용하여 user 변수와 setUser 함수를 생성
  const [registerFormOpen, setRegisterFormOpen] = useState(false); // registerFormOpen 상태를 관리하기 위해 useState를 사용하여 registerFormOpen 변수와 setRegisterFormOpen 함수를 생성
  const [categoriesData,setCategoriesData] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false); //토글
  const [currentView, setCurrentView] = useState(''); // 현재 보고 있는 뷰를 저장
  const [currentCategory, setCurrentCategory] = useState(null); // 현재 선택된 카테고리를 추적

   useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) { // 사용자가 로그인한 경우
        try {
          const token = await firebaseUser.getIdToken(); // 사용자의 토큰을 가져오기
          defaultHeaders.Authorization = `Bearer ${token}`; // defaultHeaders의 Authorization에 token을 넣어줌

          // 사용자 정보 요청 보내기
          const res = await axios.get("http://localhost:8080/api/v1/member/info", {
            headers: defaultHeaders
          });

          //카테고리 데이터 가져오기
          const categoriesData = await axios.get("http://localhost:8080/categories",{
            headers: defaultHeaders
          })

          if (res.status === 200) {
            const user = res.data; // 사용자 정보 가져오기
            const categories = categoriesData.data // 카테고리 데이터 가져오기

            setCategoriesData(categories) // 카테고리 데이터를 상태에 저장
            setUser(user); // 상태 업데이트
            localStorage.setItem("idToken", token); // 토큰 로컬 스토리지에 저장
          } else if (res.status === 401) {
            const data = res.data;
            if (data.code === -13000) {
              setRegisterFormOpen(true); // 등록 폼 열기
            }
          }
        } catch (error) {
          console.error("데이터를 불러오는데 실패했습니다", error);
        }
      } else {
        // 사용자가 로그인하지 않은 경우
        setUser(null); // 사용자 상태 초기화
        setCategoriesData(null);
        localStorage.removeItem("idToken"); // 토큰 로컬 스토리지에서 삭제
      }
    });

    // Cleanup 함수 - 컴포넌트가 언마운트될 때 실행
    return () => unsubscribe();

    console.log(categoriesData);
  }, [categoriesData]); // useEffect 종속성 배열은 비어 있음

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setItems(categories[category]);
  };

  // 확장/축소 버튼 클릭 핸들러
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // 뷰 변경 함수
  const handleChangeView = (view) => {
    setCurrentView(view);
    setIsExpanded(!isExpanded); // 버튼 클릭시 확장/축소 상태를 토글합니다.
  };

  const handleItemClick = (item) => {
    // 선택된 항목의 상태를 업데이트합니다.
    setSelectedItems(prevSelectedItems => ({
      ...prevSelectedItems,
      [item]: !prevSelectedItems[item], // 현재 상태를 반전시킵니다.
    }));
  };

  // 선택된 아이템들을 배열로 변환
  const selectedKeywords = Object.entries(selectedItems)
    .filter(([, isSelected]) => isSelected)
    .map(([item]) => item);

  // 선택된 아이템들을 초기화하는 함수
  const clearSelectedItems = () => {
    setSelectedItems({});
  };

  const clickCareer = () => {
    toggleExpand();
    handleChangeView('career');
    setCurrentCategory('career'); // 현재 카테고리를 'career'로 설정
  }

  const clickEducation = () => {
    toggleExpand();
    handleChangeView('education');
    setCurrentCategory('education');
  }

  const clickWorkType = () => {
    toggleExpand();
    handleChangeView('work_type');
    setCurrentCategory('work_type'); // 현재 카테고리를 'work_type'로 설정
  }

  return (
    <div className="filter-container">
      <div className="select-box">
        <div onClick={clickCareer}>
          <span>경력</span>
          <img src={isExpanded ? arrowDown : arrowUp} alt="toggle"/>
        </div>
        <div onClick={clickEducation}>
          <span>학력</span>
          <img src={isExpanded ? arrowDown : arrowUp} alt="toggle"/>
        </div>
        <div onClick={clickWorkType}>
          <span>근무형태</span>
          <img src={isExpanded ? arrowDown : arrowUp} alt="toggle"/>
        </div>
        {isExpanded && ( //multi-selector 보이기, 숨기기 토글
        <div className="multi-selector">

          <div className="item-list-box">
            {categoriesData && categoriesData[currentCategory] && categoriesData[currentCategory].map((item, index) => (
            <div key = {index} className="item">{item.type}</div>
            ))}
          </div>

          <div className="button-box">
            <button className="resetBtn">초기화</button>
            <button className="applyBtn">적용하기</button>
          </div>
        </div>
        )}
      </div>
      <div className="filter">
        <div className="category">
          {Object.keys(categories).map((category, index) => (
              <button
                  key={index}
                  className={selectedCategory === category ? 'active' : ''}
                  onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="items-1-depth">
          {categoriesData?.jobCategory?.map((item, index) => ( //categoriesData 객체가 존재하고 jobCategory 배열이 존재하면 로직실행
              <div key={index} className={`item ${selectedItems[item] ? 'selected' : ''}`}
                   onClick={() => handleItemClick(item)}>
                <span>{item}</span>
                <span className="checkmark">{selectedItems[item] ? '✓' : '+'}</span>
              </div>
          ))}
        </div>
        <div className="items-2-depth">
        </div>
      </div>
      <div className="selected-keywords">
        {selectedKeywords.map((keyword, index) => (
            <div key={index} className="keyword">
              #{keyword}
            </div>
        ))}
      </div>
      <div className="filter-btn-box">
        {selectedKeywords.length > 0 && ( // 선택된 키워드가 있을 때만 초기화 버튼 표시
            <button onClick={clearSelectedItems} className="clearBtn">초기화</button>
        )}
        <button className="applyBtn">적용하기</button>
      </div>

    </div>
  );
};

export default Filter;
