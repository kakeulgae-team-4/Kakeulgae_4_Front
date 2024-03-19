import React from 'react'
import './Join.css';

const Join = () => {
    return (
        <div className="join-container">
            <h1>GET STARTED</h1>
            <p>
            IT 계열 채용 모집 공고를 한 눈에 볼 수 있도록 제공해주는 플랫폼, IT's GOAL KEEPER입니다. IT's GOAL KEEPER는 당신의 목표와 꿈(GOAL)을 KEEP 해준다는 의미를 담아 IT와 GOAL KEEPER를 합하여 탄생한 이름입니다. 관심 키워드, 즐겨찾기와 캘린더 등을 통해 관심 공고만 한 눈에 확인할 수 있고 채용 공고나 중요 정보를 놓치지 않도록 알림 서비스를 제공하고 있습니다. 아래 버튼을 통해 IT's GOAL KEEPER의 서비스를 이용해 보세요!
            </p>
            
            <div className="join-btn">
                <a href="/signin" className='in-btn'>sign in</a>
                <a href="/signup" className='up-btn'>sign up</a>
            </div>
        </div>
    )
}

export default Join