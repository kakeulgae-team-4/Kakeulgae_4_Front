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
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [sortCriteria, setSortCriteria] = useState('createdAt');
    const observer = useRef(null);
    useEffect(() => {
        auth.onAuthStateChanged(async (firebaseUser) => {
            try {
                if (firebaseUser) {
                    const token = await firebaseUser.getIdToken();
                    defaultHeaders.Authorization = `Bearer ${token}`;
                    const cnt = await axios.get('http://localhost:8080/api/v1/notifications/list', {
                        headers: defaultHeaders,
                        params: { page: page, size: 5, sort: sortCriteria }
                    });
    
                    setToken(defaultHeaders);
                    setNotificationList(cnt.data.content);
                    setHasMore(!cnt.data.last);
                    setLoading(false);
                }
            } catch (error) {
                console.log('에러 발생:', error);
                setLoading(false);
            }
        });
    }, [page, sortCriteria]);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        const handleObserver = (entities) => {
            const target = entities[0];
            if (target && target.isIntersecting && hasMore && !loading && window.scrollY >= 300) {
                setPage(prevPage => prevPage + 1);
            }
        };

        observer.current = new IntersectionObserver(handleObserver, options);

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [hasMore, loading]);

    const handleSortChange = (criteria) => {
        setSortCriteria(criteria);
        setPage(0);
        setNotificationList([]);
    };

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