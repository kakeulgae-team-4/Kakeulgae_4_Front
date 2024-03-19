import React from 'react'
import './Allrecruit.css';
import Header from '../components/Header';
import Filter from '../components/Filter';

const Allrecruit = () => {
    const name = '변인정';

    return (
        <div className="allrecruit-container">
            <Header/>
            <div className='container-box'>
              <h1>채용공고</h1>
              <p><span>{name}</span>님의 원하는 공고를 찾아보세요!</p>
              <Filter/>
            </div>
        </div>
    )
}

export default Allrecruit