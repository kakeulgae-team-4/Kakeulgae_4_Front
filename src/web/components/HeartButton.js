import React, { useState } from 'react';
import axios from 'axios';
import '../routes/Bookmark.css';
import emptyStar from '../images/emptyStar.png';
import realStart from '../images/realStart.png';

function HeartButton({ postId, token, status }) { // status에는 현재 하트가 빨강이어야 하면 true, 비어있어야하면 false를 담는다
    let [clicked, setClicked] = useState(status);
    
    const toggleHeart = async () => {
        setClicked(!clicked);
        if (!clicked) {
            await registerHeart(postId, token);
        } else {
            await deleteHeart(postId, token);
        }
    };

const registerHeart = async (postId, token) => {
    try {
        const response = await axios.post(
            `http://localhost:8080/bookmarks/register/${postId}`,
            null, // 요청 본문이 필요 없는 경우 null로 설정
            { 
                headers: { Authorization: token.Authorization }
            }
        );
        console.log(response.data);
    } catch (error) {
        console.error('등록 API 호출 오류:', error);
    }
};

const deleteHeart = async (postId, token) => {
    try {
        const response = await axios.delete(
            `http://localhost:8080/bookmarks/delete/${postId}`,
            { 
                headers: { Authorization: token.Authorization }
            }
        );
        console.log(response.data);
    } catch (error) {
        console.error('삭제 API 호출 오류:', error);
    }
};

    return (
        <button className={clicked ? 'list-heart clicked' : 'list-heart'} onClick={toggleHeart}>
            <img src={clicked ? realStart : emptyStar} alt="heart" />
        </button>
    );
}

export default HeartButton;