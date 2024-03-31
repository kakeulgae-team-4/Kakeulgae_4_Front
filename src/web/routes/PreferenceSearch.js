import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Bookmark.css';
import Gallery from '../components/Gallery.js';
import List from '../components/List.js';
import Header from '../components/Header';
import real_search from '../images/realSearch.png';
import { auth } from "../routes/firebaseAuth";
import { defaultHeaders } from "../../config/clientConfig";
import SelectBox from '../components/SelectBox.js';

const PreferenceSearch = () => {
    const [preferenceList, setPreferenceList] = useState([]);
    const [bookmarkList, setBookmarkList] = useState([]);
    const [jobDetailList, setJobDetailList] = useState([]);
    const [showGallery, setShowGallery] = useState(true);
    const [token, setToken] = useState([]);
    const [user, setUser] = useState([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [sortCriteria, setSortCriteria] = useState('createdAt');
    const [initialRender, setInitialRender] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const observer = useRef();
    let trueArray = [];

    useEffect(() => {
        auth.onAuthStateChanged(async (firebaseUser) => {
            try {
                if (firebaseUser && !initialRender) {
                    const token = await firebaseUser.getIdToken();
                    defaultHeaders.Authorization = `Bearer ${token}`;
                    const tmp = await axios.get('http://localhost:8080/api/v1/member/info', {
                        headers: defaultHeaders
                    });
                    const cnt = await axios.get('http://localhost:8080/jobs/details', {
                        headers: defaultHeaders,
                        params: { page: page, size: 5, sort: sortCriteria }
                    });
                    const temp = await axios.get('http://localhost:8080/jobs/preference', {
                        headers: defaultHeaders
                    });
                    const elle = await axios.get('http://localhost:8080/bookmarks/likes', {
                        headers: defaultHeaders
                    })

                    setUser(tmp.data);
                    setToken(defaultHeaders);
                    setPreferenceList(temp.data.preference);
                    setBookmarkList(prevList => [...prevList, ...cnt.data.content]);
                    setJobDetailList(elle.data.content);
                    setHasMore(!cnt.data.last);
                }
            } catch (error) {
                console.log('에러 발생:', error);
            }
        });
    }, [page, initialRender, sortCriteria]);

    useEffect(() => {
        setInitialRender(false);
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        const handleObserver = (entities) => {
            const target = entities[0];
            if (target.isIntersecting && hasMore && !loading && window.scrollY >= 300) {
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

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSortChange = (criteria) => {
        setSortCriteria(criteria);
        setPage(0);
        setBookmarkList([]);
    };

    function checkDataEquality(bookmark, jobDetail) {
        trueArray = [];
    
        for (let i = 0; i < bookmark.length; i++) {
            let foundMatch = false;
    
            for (let j = 0; j < jobDetail.length; j++) {
                if (bookmark[i].postName === jobDetail[j].postName) {
                    foundMatch = true;
                    break;
                }
            }
            trueArray.push(foundMatch);
        }
    }
    checkDataEquality(bookmarkList, jobDetailList);

    const redirectToKeyword = () => {
        if(searchTerm.trim() !== '') {
            window.location.href = `http://localhost:3000/preference/keyword/${encodeURIComponent(searchTerm)}`;
        }
    }

    return (
        <div>
            <Header />
            <br></br>
            <h1 className='mainLocation'>관심 공고</h1>
            <div className='customer'>
                <div className='customer1'>{user.nickname}</div>
                <div className='customer2'>님이 설정해둔 관심키워드로 찾아봤어요!</div>
            </div>

            <div className='topTag'>
                {preferenceList.length > 0 && (
                    preferenceList.slice(0, 10).map((preference, index) => (
                    <span key={index} className='tagItem'>{'#' + preference}</span>
                    ))
                )}
            </div>

            <div className='gelleryandlist'>
                <button className={`colorless-button ${showGallery ? 'active' : ''}`} onClick={() => setShowGallery(true)}>Gallery</button>
                <button className={`colorless-button ${!showGallery ? 'active' : ''}`} onClick={() => setShowGallery(false)}>List</button>
                <input type="text" className='search' placeholder='검색어를 입력하세요' onChange={handleInputChange}></input>
                <button className='search-icon' onClick={redirectToKeyword}>
                    <img src={real_search} alt=""/>
                </button>
                <div className='selectBox-container'>
                    <SelectBox handleSortChange={handleSortChange} />
                </div>
            </div>
            <div className='divider'></div>
            {showGallery ? (
                bookmarkList.length > 0 ? (
                    <div className='bookmark-container'>
                        {bookmarkList.map((response, index) => (
                            <div className={index % 2 === 0 && 'bookmark-container-inline'}>
                                <Gallery key={index} response={response} token={token} status={trueArray[index]}/>
                            </div>
                        ))}
                    </div>
                ) : (
                    null
                )
            ) : (
                bookmarkList.length > 0 ? (
                    bookmarkList.map((response, index) => (
                        <List key={index} response={response} token={token} status={trueArray[index]}/>
                    ))
                ) : (
                    null
                )
            )}
            <div id="bottom" className='bottomShape'></div>
        </div>
    )
}

export default PreferenceSearch;