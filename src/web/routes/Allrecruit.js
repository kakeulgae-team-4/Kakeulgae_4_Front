import React from 'react'
import './Allrecruit.css';
import Header from '../components/Header';
import real_search from '../images/realSearch.png';
import { auth } from "../routes/firebaseAuth";
import { defaultHeaders } from "../../config/clientConfig";
import SelectBox from '../components/SelectBox.js';
import './Allrecruit.css';
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
    const name = '변인정';

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