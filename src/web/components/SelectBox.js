import React from 'react';
import './SelectBox.css';

function SelectBox({ handleSortChange }) {
    return (
        <div className="select-container">
            <select onChange={(e) => handleSortChange(e.target.value)} className="select-button">
                <option value="createdAt">생성날짜순</option>
                <option value="deadline">마감날짜순</option>
            </select>
        </div>
    );
}

export default SelectBox;