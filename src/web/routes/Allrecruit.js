import React from 'react'
import { useContext, useState, useEffect, useRef } from 'react';
import './Allrecruit.css';
import Header from '../components/Header';
import Filter from '../components/Filter';
import { UserContext } from '../components/AuthProvider';
import { IoSearch } from "react-icons/io5";
import SelectBox from '../components/SelectBox.js';
import Gallery from '../components/Gallery.js';
import List from '../components/List.js';
import axios from 'axios';
import { defaultHeaders } from "../../config/clientConfig";
import { MdOutlineGridView, MdViewList } from "react-icons/md";

const Allrecruit = () => {
    const { user } = useContext(UserContext);

    const [bookmarkList, setBookmarkList] = useState([]);
    const [showGallery, setShowGallery] = useState(true);
    const [token, setToken] = useState([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [sortCriteria, setSortCriteria] = useState('createdAt');
    const [initialRender, setInitialRender] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const observer = useRef();
    const [pageSearch, setPageSearch] = useState(0);

    useEffect(() => {
        setInitialRender(false);
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        const handleObserver = (entities) => {
            const target = entities[0];
            if (target.isIntersecting && hasMore && !loading) {
                setPage(prevPage => prevPage + 1);
            }
        };

        observer.current = new IntersectionObserver(handleObserver, options);
        if (observer.current && !loading) {
            observer.current.observe(document.getElementById('bottom'))
        }

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [hasMore, loading]);

    const handleSortChange = (criteria) => {
        setSortCriteria(criteria);
        setPage(0);
        setBookmarkList([]);
    };

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchClick = async () => {
        // 검색어가 변경되었을 때만 검색을 수행하도록 조건 추가
        if (searchTerm.trim() !== '') {
            try {
                const res = await axios.get('http://localhost:8080/bookmarks/search',{
                    headers: defaultHeaders,
                    params: { keyword: searchTerm, page: 0, size: 100, sort: sortCriteria }
                });
                console.log("현재 page : 0");
                console.log("정렬방식 : " + sortCriteria);
                console.log("검색어 : " + searchTerm);
                console.log(res.data.content);
    
                setBookmarkList([]);
                setBookmarkList(res.data.content);
                
                console.log(pageSearch);
                setHasMore(!res.data.last);
            } catch (error) {
                console.error('검색 요청 오류:', error);
            }
        }
    };

    return (
        <div className="allrecruit-container">
            <Header/>
            <div className='container-box'>
              <h1>채용공고</h1>
              <p><span>{user?.nickname}</span>님의 원하는 공고를 찾아보세요!</p>
              <Filter/>


            <div className='galleryandlist'>
                <div>
                    <span className={`view-btn ${showGallery ? 'blue-btn' : ''}`} onClick={() => setShowGallery(true)}><MdOutlineGridView /></span>
                    <span className={`view-btn ${!showGallery ? 'blue-btn' : ''}`} onClick={() => setShowGallery(false)}><MdViewList /></span>
                </div>

                <div className='search-container'>
                    <div className='search-box'>
                        <input type="text" placeholder='검색어를 입력하세요' onChange={handleInputChange}></input>
                        <span id='search-icon' onClick={handleSearchClick}><IoSearch /></span>
                    </div>
                    <SelectBox handleSortChange={handleSortChange} />
                </div>
            </div>
            <hr/>
            <div className='divider'></div>
            {showGallery ? (
                bookmarkList.length > 0 ? (
                    <div className='bookmark-container'>
                        {bookmarkList.map((response, index) => (
                            <div className={index % 2 === 0 && 'bookmark-container-inline'}>
                                <Gallery key={index} response={response} token={token} status={true}/>
                            </div>
                        ))}
                    </div>
                ) : (
                    null
                )
            ) : (
                bookmarkList.length > 0 ? (
                    bookmarkList.map((response, index) => (
                        <List key={index} response={response} token={token} status={true}/>
                    ))
                ) : (
                    null
                )
            )}
            <div id="bottom" className='bottomShape'></div>
            </div>
        </div>
    )
}

export default Allrecruit