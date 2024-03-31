import React, { useState } from 'react';
import './Filter.css';
import {defaultHeaders} from "../../config/clientConfig";
import axios from "axios";


const Filter =({handleSaveKeywords}) => {
  const [selectedCategory, setSelectedCategory] = useState('직무');
  const [items, setItems] = useState(categories[selectedCategory]);
  const [selectedItems, setSelectedItems] = useState({});
  const [keywords, setKeywords] = useState([]);

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
    setItems(categories[category]);
  };

  const handleItemClick = (item) => {
    setSelectedItems(prevSelectedItems => ({
      ...prevSelectedItems,
      [item]: !prevSelectedItems[item],
    }));
  };

  const selectedKeywords = Object.entries(selectedItems)
  .filter(([, isSelected]) => isSelected)
  .map(([item]) => item);

  const clearSelectedItems = () => {
    setSelectedItems({});
  };

  // 선택된 키워드를 부모 컴포넌트로 전달
  const saveKeywords = () => {
    handleSaveKeywords(selectedKeywords);
  };

  return (
      <div className="filter-container">
        <div className="filter">
          <div className="category-selector">
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
          <div className="items-display">
            {items.map((item, index) => (
                <div
                    key={index}
                    className={`item ${selectedItems[item] ? 'selected' : ''}`}
                    onClick={() => handleItemClick(item)}
                >
                  <span>{item}</span>
                  <span className="checkmark">{selectedItems[item] ? '✓'
                      : '+'}</span>
                </div>
            ))}
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
          <button onClick={saveKeywords} className="save-button">저장</button>
        </div>
      </div>
  );
};

export default Filter;
