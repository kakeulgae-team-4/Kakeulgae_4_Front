import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Notification.css';
import Header from '../components/Header';
import { auth } from "../routes/firebaseAuth";
import { defaultHeaders } from "../../config/clientConfig";

const Notification = () => {
    const [notificationList, setNotificationList] = useState([]);
    const [page, setPage] = useState(0);
    const [token, setToken] = useState([]);

    useEffect(() => {
        auth.onAuthStateChanged(async (firebaseUser) => {
            try {
                if (firebaseUser) {
                    const token = await firebaseUser.getIdToken();
                    defaultHeaders.Authorization = `Bearer ${token}`;
                    const cnt = await axios.get('http://localhost:8080/api/v1/notifications/list', {
                        headers: defaultHeaders
                    });
                    
                    setToken(defaultHeaders);
                    setNotificationList(cnt.data.content);
                }
            } catch (error) {
                console.log('에러 발생:', error);
            }
        });
    }, [page]);

    const currentDate = new Date();

    const getDaysDifference = (createdAt) => {
        const createdDate = new Date(createdAt);
        const differenceInTime = currentDate.getTime() - createdDate.getTime();
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);
        return Math.round(differenceInDays);
    };

    const formatDaysDifference = (difference) => {
        if (difference === 0) {
            return "오늘";
        } else {
            return `${difference}일 전`;
        }
    };

    const handleRedirect = (url) => {
        window.open(`http://${url}`, '_blank');
    };

    return (
        <div>
            <Header />
            <div className='first'>
                {notificationList.map((notification, index) => (
                    <div key={index}>
                        <div className='notification-container'>
                            <div className='jobDetail' onClick={() => handleRedirect(notification.jobPosting.url)}>
                                {notification.jobPosting.title}
                            </div>
                            <div className='day'>
                                {formatDaysDifference(getDaysDifference(notification.createdAt))}
                            </div>
                        </div>
                        <div className='border'>
                        </div>
                    </div>
                ))}
            </div>
        <div id="bottom"></div>
    </div>
    );
};

export default Notification;