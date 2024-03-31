import React, {useState, useEffect, useRef, useContext} from 'react';
import axios from 'axios';
import './Notification.css';
import Header from '../components/Header';
import { defaultHeaders } from "../../config/clientConfig";
import {UserContext} from "../components/AuthProvider";

const Notification = () => {
  const [data, setData] = useState([]);
  const [lastId, setLastId] = useState(0);
  const loader = useRef(null);
  const  user  = useContext(UserContext);

  useEffect(() => {
    var options = { // IntersectionObserver이란 브라우저의 viewport와 관찰 대상 요소의 교차점을 관찰하는 API
      root: null,
      rootMargin: "20px",// rootMargin은 뷰포트와 교차점을 얼마나 더 넓게 할 것인지를 결정 크면 클수록 더 늦게 로딩
      threshold: 1.0 // threshold는 교차점의 비율을 나타냄 1.0은 교차점이 완전히 보일 때 콜백함수가 실행 작으면 작을수록 더 빨리 로딩
    };

    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current)// load가 보이면 handleObserver 실행
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    defaultHeaders.Authorization = `Bearer ${localStorage.getItem('idToken')}`;
    const url = lastId
        ? `http://localhost:8080/api/v1/notifications/list?size=2&lastId=${Number(lastId)}`
        : `http://localhost:8080/api/v1/notifications/list?size=2`;
    axios.get(url, {
      headers: defaultHeaders
    })
    .then(res => {
      console.log(res.data);
      const newData = res.data.content;
      const combinedData = [...data, ...newData]; // 중복 제거
      const uniqueData = Array.from(new Set(combinedData.map(a => a.id)))
      .map(id => {
        return combinedData.find(a => a.id === id)
      });
      setData(uniqueData);
      //setData(prevData => [...prevData, ...res.data.content]);
      const lastElement = res.data.content.slice().pop();// 마지막 요소
      if (res.data.hasNext && lastElement) {// 다음 페이지가 있고 마지막 요소가 있으면
        setLastId(lastElement.id);
      }
    })
  }, [lastId]);// lastId가 바뀔 때마다 실행
  const handleObserver = (entities) => { //
    const target = entities[0];//load가 보이면
    if (target.isIntersecting) {
      setLastId(prev => prev + 1); // lastId를 1씩 증가
    }
  };

    const currentDate = new Date();

    const getDaysDifference = (createdAt) => {
        const createdDate = new Date(createdAt);
        const differenceInTime = currentDate.getTime() - createdDate.getTime();// 현재 시간과 생성 시간의 차이
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);// 일 단위로 변환
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
        window.open(`http://www.${url}`, '_blank');
    };

    return (
        <div>
            <Header />
            <div className='first'>
                <div className='notification-title'>
                  <h2>알림함으로 한 눈에 보세요! </h2>
                </div>
              {data.length === 0 && <div className='no-notification'>새로운 알림이 없습니다.</div>}
                {data.map((notification, index) => (
                    <div key={index}>
                        <div className='notification-container'>
                            <div className='jobDetail' onClick={() => handleRedirect(notification.jobPosting.url)}>
                                {notification.contents}
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
