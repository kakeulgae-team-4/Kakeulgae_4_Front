import React from 'react'
import './Join.css';

const Join = () => {
    return (
        <div className="join-container">
            <h1>GET STARTED</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident accusamus itaque ipsum quisquam consequatur corrupti hic sequi mollitia maxime sit eius asperiores expedita, numquam nesciunt illo magni obcaecati earum beatae.</p>
            
            <div className="join-btn">
                <button className='in-btn'><a href="/signin">sign in</a></button>
                <button className='up-btn'><a href="/signup">sign up</a></button>
            </div>
        </div>
    )
}

export default Join