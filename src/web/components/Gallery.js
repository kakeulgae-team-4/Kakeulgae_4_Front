import './Gallery.css';
import React from 'react';
import HeartButton from './HeartButton';
import goalkeeper from '../images/logo1.png';

const Gallery = ({response, token, status}) => { // 매개변수로 response를 받음
    
    const parseDeadline = parseDateString(response.deadline);
    const checkToday = dateIsTodayChecking(response.deadline);

    function parseDateString(dateString){
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
    
        const monthString = month < 10 ? '0' + month : month.toString();
        const dayString = day < 10 ? '0' + day : day.toString();
        const date2 = new Date(year, month, day);
        const days = ['일', '월', '화', '수', '목', '금', '토'];
        const dayOfWeek = days[date2.getDay()];
    
        return monthString + '/' + dayString + '(' + dayOfWeek + ')';
    }

    function dateIsTodayChecking(dateString){
        const date = new Date(dateString);
        const dyear = date.getFullYear();
        const dmonth = String(date.getMonth() + 1).padStart(2, '0');
        const dday = String(date.getDate()).padStart(2, '0');
        const dDate = `${dyear}-${dmonth}-${dday}`;

        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const currentDate = `${year}-${month}-${day}`;

        return dDate === currentDate;
    }

    const handleRedirect = () => {
        window.open(`http://${response.url}`, '_blank');
    }

    return (
        <div className='gt-startBox'>
            <div className='gt-firstBox'>
                <button className='gallery-heart'>
                    <HeartButton postId={response.id} token={token} status={status}/>
                </button>
                <div className='keeper'>
                    <img src={goalkeeper}></img>
                </div>
            </div>
            <div className='gt-secondBox'>
            <div className='gallery-container'>
                <div className='gallery-postName' onClick={handleRedirect}>
                    {response.postName + '(' + response.companyName + ')'}
                </div>
                <div className='gallery-deadline'>
                    {'~' + parseDeadline}
                </div>
            </div>
                <div className='gallery-career'>
                    {response.careers.length > 0 ? (
                        response.careers.map((response, index) => (
                            index < 1 ? (
                                '#' + response + ' '
                            ) : null
                        ))
                    ) : (
                        null
                    )}
                    #{response.educationType + ' '}
                    {response.workTypes.length > 0 ? (
                        response.workTypes.map((response, index) => (
                            index < 1 ? (
                                '#' + response + ' '
                            ) : null
                        ))
                    ) : (
                        null
                    )}
                </div>
                <div className='gallery-subContainer'>
                    <div className='gallery-jobDetail'>
                        {response.jobDetailTypes.length > 0 ? (
                            response.jobDetailTypes.map((response, index) => (
                                index < 3 ? (
                                    response + ' '
                                ) : null
                            ))
                        ) : (
                            null
                        )}
                    </div>
                    {checkToday === true ? (
                        <div className='gallery-checkToday'>
                            오늘마감!
                        </div>
                    ) : null }
                </div>
            </div>
        </div>
    )
}

export default Gallery;

