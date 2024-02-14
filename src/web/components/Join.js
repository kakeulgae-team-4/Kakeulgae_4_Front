import React from 'react'
import './Join.css';

const Join = () => {
    return (
        <div className="join-container">
            <h1>GET STARTED</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident accusamus itaque ipsum quisquam consequatur corrupti hic sequi mollitia maxime sit eius asperiores expedita, numquam nesciunt illo magni obcaecati earum beatae.</p>
            <div className="joinBtn">
                <a href="/signin" className='inBtn'>sign in</a>
                <a href="/signup" className='upBtn'>sign up</a>
            </div>
        </div>
    )
}

export default Join