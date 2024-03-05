import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Bookmark.css';
import Header from '../components/Header';
import search_icon from '../images/search_icon.png';

const Bookmark = () => {
    const name = "백예린"

    const [bookmarkList, setBookmarkList] = useState([]);

    useEffect(() => {
        let i = 1;
        const fetchData = async () => {
            try {
                const response = await axios.get('bookmark/' + i);
                setBookmarkList(response.data);
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
                    {name}
                </div>
                <div className='customer2'>
                    님의 즐겨찾기 목록을 확인해보세요!
                </div>
            </div>
            <div className='gelleryandlist'>
                <button className='colorless-button'>
                    Gallery
                </button>
                <button className='colorless-button'>
                    List
                </button>
                <input type="text" className='search'></input>
                <button className='search-icon'><img src={search_icon} alt=""/></button>
            </div>
            <div className='divider'></div>
            {bookmarkList.length > 0 ? ( 
                bookmarkList.map((bookmark, index) => (
                    <div key={index} className='galleyLayout'>
                        <div className='companyname'>
                            {bookmark.companyName}
                        </div>

                        <div className='postname'>
                            {bookmark.postName}
                        </div>
                        <div className='deadline'>
                            {bookmark.deadline} 에 마감하는 공고
                        </div>
                    </div>
                ))
            ) : (
                <div className='noBookmark'> 
                    즐겨찾기 공고가 없어요
                </div>
            )}
            <div className='bottomShape'>
            </div>
        </div>
    )
}

export default Bookmark;