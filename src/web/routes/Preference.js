import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Preference.css';
import Gallery from '../components/Gallery.js';
import List from '../components/List.js';
import Header from '../components/Header';
import search_icon from '../images/search_icon.png';
import real_search from '../images/realSearch.png';
import { auth } from "../routes/firebaseAuth";
import { defaultHeaders } from "../../config/clientConfig";
import SelectBox from '../components/SelectBox.js';


const Preference = () => {

    const [preferenceList, setPreferenceList] = useState([]);
    const [bookmarkList, setBookmarkList] = useState([]);
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
    const [pageSearch, setPageSearch] = useState(0);

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

                    setUser(tmp.data);
                    setToken(defaultHeaders);
                    console.log(temp.data.preference);
                    setPreferenceList(temp.data.preference);
                    setBookmarkList(prevList => [...prevList, ...cnt.data.content]);
                    setHasMore(!cnt.data.last);
                }
            } catch (error) {
                //setPage(0);
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

const handleSearchClick = async () => {
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


    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

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
                <button className='search-icon' onClick={handleSearchClick}><img src={real_search} alt=""/></button>
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
    )
}

export default Preference;