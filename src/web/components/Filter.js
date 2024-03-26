import React, { useState, useEffect } from 'react';
import './Filter.css';
import arrowUp from '../images/arrow-up.png';
import { auth } from "../routes/firebaseAuth";
import { defaultHeaders } from "../../config/clientConfig";

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

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setItems(categories[category]);
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

  return (
    <div className="filter-container">
      <div className="select-box">
        <div>
          <span>경력</span>
          <img src={arrowUp} alt=""/>
        </div>
        <div>
          <span>학력</span>
          <img src={arrowUp} alt=""/>
        </div>
        <div>
          <span>근무형태</span>
          <img src={arrowUp} alt=""/>
        </div>
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
          {items.map((item, index) => (
            <div key={index} className={`item ${selectedItems[item] ? 'selected' : ''}`}
                onClick={() => handleItemClick(item)}> {/* 항목 클릭 이벤트를 추가합니다. */}
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
        {selectedKeywords.length > 0 && ( // 선택된 키워드가 있을 때만 초기화 버튼 표시
          <button onClick={clearSelectedItems} className="clear-button">초기화</button>
        )}
      </div>
      <div className="btn-box">
        <button className="applyBtn">적용하기</button>
      </div>
      
    </div>
  );
};

export default Filter;
