import React, {} from 'react';
import axios from 'axios';
import Header from '../components/Header';

function PostBookmark() {
    const handleHeartClick = async () => {
        try {
            const response = await axios.post('test/bookmark', 
            {
              memberId: 1,
              jobPostingId: 1
            },
            {
              headers: {
                 'Content-type': 'application/json',
                 'Accept': 'application/json'
              }
            }
            )
            .then((response) => {console.log(response.data); })
            .catch((response) => {console.log('Error!') });
        } catch (error) {
            console.error('에러 발생:', error);
        }
        
    };
    
    return (
        <div>
            <Header />
            <h1>즐겨찾기 추가</h1>
            <button onClick={handleHeartClick}>하트임</button>
        </div>
    );
}

export default PostBookmark;