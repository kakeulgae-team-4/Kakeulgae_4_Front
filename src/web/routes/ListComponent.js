import './Bookmark.css';
import React from 'react';

const ListComponent = ({bookmark}) => { // 매개변수로 bookmark를 받음. 회사명, 공고명, 마감일 데이터가 담겨 있음.ex) bookmark = { companyName : '우아한 형제들', postName : 'Back 모집', deadlist : '2024-04-15' } 형태로 넣어서 확인 가능
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
    
    const parseDate = parseDateString(bookmark.deadline);

    return (
        <div className='list-layout'>
            <div className='list-container'>
                <div className='list-companyname'>
                    {bookmark.companyName}
                </div>
                <div className='list-divider'>
                </div>
                <div className='list-postname'>
                    {bookmark.postName}
                </div>
                <div className='list-deadline'>
                    ~ {parseDate}
                </div>
            </div>

        </div>
    )
}

export default ListComponent;