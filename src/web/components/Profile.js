import React from 'react';
import {useContext} from 'react'
import './Profile.css';
import profile from '../images/cute.jpg';
import { UserContext } from '../components/AuthProvider';
import {signOut} from "../routes/firebaseAuth";


const Profile = () => {
    const { user }  = useContext(UserContext);

    const name = user.nickname;
    const email = user.email;
    const image = user.image;
    const bookmark = 13;
    const prefer = 159;

    return (
        <div className="profile-container">
            <div>
                <h1>Welcome, <span>{name}!</span></h1>
                <p>{email}</p>
            </div>

            <img src={profile} alt="" />

            <div className='profile-btn'>
                <a href="/mypage">My Page</a>
                <a href="/" onClick={signOut}>Log out</a>
            </div>
        </div>
    )
}

export default Profile
