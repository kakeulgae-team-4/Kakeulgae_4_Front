import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Bookmark.css';
import Gallery from '../components/Gallery.js';
import List from '../components/List.js';
import Header from '../components/Header';
import search_icon from '../images/search_icon.png';

const Bookmark = () => {
    const name = "백예린"

    // test 데이터
    const bookmarkList = [
        {
            companyName : "우아한 형제들",
            postName : "백엔드 모집",
            deadline : "2024-03-19",
            startline : "2024-01-20",
            career : ["신입", "정규직"],
            education : "학력무관",
            jobDetail : ["증강현실", "AI", "메타버스", "Kafka", "docker", "selenium", "데이터베이스"],
            workTypes : ["정규직", "계약직"]
        }, {
            companyName : "토스뱅크",
            postName : "AI developer",
            deadline : "2024-04-03",
            startline : "2024-02-20",
            career : ["경력"],
            education : "학력무관",
            jobDetail : ["ML", "NLP", "Vision", "selenium", "redis"],
            workTypes : ["정규직"]
        },  {
            companyName : "토스뱅크",
            postName : "AI developer",
            deadline : "2024-04-03",
            startline : "2024-02-20",
            career : ["경력"],
            education : "학력무관",
            jobDetail : ["ML", "NLP", "Vision", "selenium", "redis"],
            workTypes : ["신입"]
        }
    ]

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
                <input type="text" className='search' placeholder='검색어를 입력하세요'></input>
                <button className='search-icon'><img src={search_icon} alt=""/></button>
            </div>
            <div className='divider'></div>
            {bookmarkList.length > 0 ? (
                bookmarkList.map((response, index) => (
                    <List key={index} response={response} /> // 리스트 컴포넌트 실행 -> 즐겨찾기 정보가 필요하므로 bookmark에 즐겨찾기 정보를 담음
                ))
            ) : (
                <div className='noBookmark'>
                    <center>즐겨찾기 공고가 없어요</center>
                </div>
            )}
            <div className='test-container'>
                {bookmarkList.length > 0 ? (
                    bookmarkList.map((response, index) => (
                        <Gallery key={index} response={response} /> // 갤러리 컴포넌트 실행 -> 즐겨찾기 정보가 필요하므로 bookmark에 즐겨찾기 정보를 담음
                    ))
                ) : (
                    <div className='noBookmark'>
                        <center>즐겨찾기 공고가 없어요</center>
                    </div>
                )}
            </div>
            <div className='bottomShape'>
            </div>
        </div>
    )
}

export default Bookmark;