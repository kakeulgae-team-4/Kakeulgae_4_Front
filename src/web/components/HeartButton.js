import React, { useState } from 'react';
import '../routes/Bookmark.css';

function HeartButton() {
    const [clicked, setClicked] = useState(false);

    const toggleHeart = () => {
        setClicked(!clicked);
    };

    return (
        <button className={clicked ? 'list-heart clicked' : 'list-heart'} onClick={toggleHeart}>
            {clicked ? '❤️' : '🤍'}
        </button>
    );
}

export default HeartButton;