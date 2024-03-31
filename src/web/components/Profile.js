import React from 'react';
import {useContext} from 'react'
import './Profile.css';
import { UserContext } from './AuthProvider';
import {signOut} from "../routes/firebaseAuth";


const Profile = () => {
    const { user }  = useContext(UserContext);

    const name = user.nickname;
    const email = user.email;
    const phoneNumber = user.phoneNumber;
    const image = user.url;

    return (
        <div className="profile-container">
            <div>
                <h1>Welcome, <span>{name}!</span></h1>
                <p>{email}</p>
                <p>{phoneNumber}</p>
            </div>

            <img src={image} alt="" />

            <div className='profile-btn'>
                <a href="/mypage">My Page</a>
                <a href="/" onClick={signOut}>Log out</a>
            </div>
        </div>
    )
}

export default Profile
