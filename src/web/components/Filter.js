import React, {useEffect, useState} from 'react';
import './Filter.css';
import axios from "axios";

const Filter = ({handleSaveKeywords}) => {
  const [selectedCategory, setSelectedCategory] = useState();
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const [keywords, setKeywords] = useState([]);

  const [selectedCategoryItemMap, setSelectedCategoryItemMap] = useState({});

  useEffect(() => {
    const fetchKeywords = async () => {
      const response = await axios.get('http://localhost:8080/categories', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('idToken')}`
        },
      });
      console.log(response.data)

      setKeywords(response.data);
    };

    fetchKeywords();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setItems(keywords[category]);
  };

  const handleItemClick = (item) => {
    if (selectedItems[item.type]) {
      setSelectedItems(prevSelectedItems => {
        const copy = {...prevSelectedItems}
        delete copy[item.type]
        return copy;
      })

      const index = selectedCategoryItemMap[selectedCategory].indexOf(item.id);
      if (index > -1) {
        selectedCategoryItemMap[selectedCategory].splice(index, 1);
      }
    } else {
      setSelectedItems(prevSelectedItems => ({
            ...prevSelectedItems,
            [item.type]: true
          })
      );

      if (!selectedCategoryItemMap[selectedCategory]) {
        selectedCategoryItemMap[selectedCategory] = []
      }
      selectedCategoryItemMap[selectedCategory].push(item.id)
    }

    setSelectedCategoryItemMap(selectedCategoryItemMap)
  };

  const  saveInterest=async () => {
    await axios.post('http://localhost:8080/interest/create',JSON.stringify(selectedCategoryItemMap), {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('idToken')}`,
        "Content-Type": `application/json`
      },
    });
  }

  const selectedKeywords = Object.entries(selectedItems)
  .filter(([, isSelected]) => isSelected)
  .map(([item]) => item);

  const clearSelectedItems = () => {
    setSelectedItems({});
  };

  // API 키와 사용자에게 보여줄 텍스트 간의 매핑
  const categoryNames = {
    jobDetails: '직무',
    career: '경력',
    education: '학력',
    work_type: '직무 형태',
  };

  return (
      <div className="filter-container">
        <div className="filter">
          <div className="category-selector">
            {Object.keys(keywords).map((category, index) => (
                <button
                    key={index}
                    className={selectedCategory === category ? 'active':''} // 선택된 카테고리에 active 클래스를 추가
                    onClick={() => handleCategoryClick(category)}
                >
                  {categoryNames[category]}
                </button>
                // 매핑된 한글 이름을 사용
            ))}
          </div>
          <div className="items-display">
            {items.map((item, index) =>
                (
                    <div
                        key={index}
                        className={`item `}
                        onClick={() => handleItemClick(item)}
                    >
                      <span>{item.type ? item.type : item.region1st}</span>
                    </div>
                ))
            }
          </div>
        </div>
        <div className="selected-keywords">
          {selectedKeywords.map((keyword, index) => (
              <div key={index} className="keyword">
                #{keyword}
              </div>
          ))}
          {selectedKeywords.length > 0 && (
              <button onClick={clearSelectedItems}
                      className="clear-button">초기화</button>
          )}
          {/* 저장 버튼 추가 */}
          <button onClick={saveInterest} className="save-button">저장</button>
        </div>
      </div>
  );
};

export default Filter;
