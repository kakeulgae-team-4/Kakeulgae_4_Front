import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Bookmark.css';
import Gallery from '../components/Gallery.js';
import List from '../components/List.js';
import Header from '../components/Header';
import search_icon from '../images/search_icon.png';

const Bookmark = () => {

    const [bookmarkList, setBookmarkList] = useState([]);
    const [userList, setUserList] = useState([]);
    const [showGallery, setShowGallery] = useState(true);
    const accessToken = '토큰';
    console.log(accessToken);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/bookmarks/likes',
                    {
                        headers: {
                          Authorization: `Bearer ${accessToken}`
                        },                                                                                     
                    }
                );
                const user = await axios.get('http://localhost:8080/api/v1/member/info',
                    {
                        headers: {
                          Authorization: `Bearer ${accessToken}`
                        },          
                    }
                )
                //console.log(response.data);
                //console.log(user.data);
                setUserList(user.data);
                setBookmarkList(response.data.content);
            } catch (error) {
                console.log('에러 발생:', error);
            }
        };
        fetchData();
    }, []);

   
    return (
        <div>
            <Header />
            <br></br>
            <h1 className='mainLocation'>
                즐겨찾기
            </h1>
                <div className='customer'>
                    <div className='customer1'>
                        {userList.nickname}
                    </div>
                    <div className='customer2'>
                        님의 즐겨찾기 목록을 확인해보세요!
                    </div>
                </div>
                <div className='gelleryandlist'>
                    <button className={`colorless-button ${showGallery ? 'active' : ''}`} onClick={() => setShowGallery(true)}>
                        Gallery
                    </button>
                    <button className={`colorless-button ${!showGallery ? 'active' : ''}`} onClick={() => setShowGallery(false)}>
                        List
                    </button>
                    <input type="text" className='search' placeholder='검색어를 입력하세요'></input>
                    <button className='search-icon'><img src={search_icon} alt=""/></button>
                </div>
                <div className='divider'></div>
                {showGallery ? ( // showGallery 상태에 따라 Gallery 또는 List 컴포넌트 렌더링
                    bookmarkList.length > 0 ? (
                        <div className='bookmark-container'>
                            {bookmarkList.map((response, index) => ( // 갤러리 컴포넌트 수행 시 3개 씩 짜르기 위한 css를 bookmark.js에서 구현
                                <div className={index % 2 === 0 && 'bookmark-container-inline'}>
                                    <Gallery key={index} response={response} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className='noBookmark'>
                            <center>즐겨찾기 공고가 없어요</center>
                        </div>
                    )
                ) : (
                    bookmarkList.length > 0 ? (
                        bookmarkList.map((response, index) => (
                            <List key={index} response={response} />
                        ))
                    ) : (
                        <div className='noBookmark'>
                            <center>즐겨찾기 공고가 없어요</center>
                        </div>
                    )
                )}
                <div className='bottomShape'>
            </div>
        </div>
    )
}

export default Bookmark;