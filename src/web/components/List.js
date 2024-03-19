import './List.css';
import React from 'react';
import HeartButton from './HeartButton';

const List = ({response}) => { // 매개변수로 response를 받음
    
    const parseStartline = parseDateString(response.startline);
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

    return (
        <div className='list-layout'>
            <div className='list-container'>
                <div className='list-companyname'>
                    {response.companyName}
                </div>
                <div className='list-divider'>
                </div>
                <div className='list-subContainer'>
                    <div className='list-postname'>
                        <HeartButton />
                        {' ' + response.postName}
                    </div>
                    <div className='list-career'>
                        {response.career.length > 0 ? (
                            response.career.map((response, index) => (
                                index < 3 ? (
                                    '#' + response + ' '
                                ) : null
                            ))
                        ) : (
                            null
                        )}
                        #{response.education + ' '}
                        {response.workTypes.length > 0 ? (
                            response.workTypes.map((response, index) => (
                                index < 3 ? (
                                    '#' + response + ' '
                                ) : null
                            ))
                        ) : (
                            null
                        )}
                    </div>
                    <div className='list-jobDetail'>
                        {response.jobDetail.length > 0 ? (
                            response.jobDetail.map((response, index) => (
                                index < 5 ? (
                                    response + ' '
                                ) : null
                            ))
                        ) : (
                            null
                        )}
                    </div>
                </div>
                <div className='list-subContainer2'>
                    <div className='list-date'>
                        {parseStartline} ~ {parseDeadline}
                    </div>
                    <div>
                        {checkToday === true ? (
                            <div className='list-checkToday'>
                                오늘마감!
                            </div>
                        ) : null }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default List;