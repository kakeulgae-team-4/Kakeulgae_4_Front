import React from 'react'
import { useContext, useState, useEffect, useRef } from 'react';
import './Allrecruit.css';
import Header from '../components/Header';
import Filter from '../components/Filter';
import { UserContext } from '../components/AuthProvider';
import SelectBox from '../components/SelectBox.js';
import Gallery from '../components/Gallery.js';
import List from '../components/List.js';
import axios from 'axios';
import { defaultHeaders } from "../../config/clientConfig";
import { MdOutlineGridView, MdViewList } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { auth } from "../routes/firebaseAuth";

const Allrecruit = () => {
    const [bookmarkList, setBookmarkList] = useState([]);
    const [jobDetailList, setJobDetailList] = useState([]);
    const [showGallery, setShowGallery] = useState(true);
    const [token, setToken] = useState([]);
    const [page, setPage] = useState(0);
    const [user, setUser] = useState([]);
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
                    const cnt = await axios.get('http://localhost:8080/jobs', {
                        headers: defaultHeaders,
                        params: { page: page, size: 5, sort: sortCriteria }
                    });
                    const elle = await axios.get('http://localhost:8080/bookmarks/likes', {
                        headers: defaultHeaders
                    })

                    setUser(tmp.data);
                    setToken(defaultHeaders);
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
                if (bookmark[i].postName === jobDetail[j].postName && bookmark[i].companyName === jobDetail[j].companyName) {
                    foundMatch = true;
                    break;
                }
            }
            trueArray.push(foundMatch);
        }
    }
    checkDataEquality(bookmarkList, jobDetailList);

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const redirectToKeyword = () => {
        if(searchTerm.trim() !== '') {
            window.location.href = `http://localhost:3000/allrecruit/keyword/${encodeURIComponent(searchTerm)}`;
        }
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            redirectToKeyword();
        }
    }

    // const handleKeyPress = (event) => {
    //     if (event.key === 'Enter') {
    //         redirectToKeyword();
    //     }
    // };

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
                        <span id='search-icon' onClick={redirectToKeyword}><IoSearch /></span>
                    </div>
                    <SelectBox handleSortChange={handleSortChange} />
                </div>
            </div>
            <hr/>
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
        </div>
    )
}

export default Allrecruit;