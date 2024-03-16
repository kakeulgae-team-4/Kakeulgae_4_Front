import React , { useState, useEffect }from 'react'
import './Calendar.css';
import Header from '../components/Header';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const Calendar = () => {
          // 날짜 상태를 관리하기 위한 useState
          const [currentDate, setCurrentDate] = useState('');

          // FullCalendar의 datesSet 이벤트에 대한 핸들러
          const handleDatesSet = (arg) => {
              // 날짜 형식을 YYYY.MM으로 설정
              const newDate = `${arg.start.getFullYear()}.${String(arg.start.getMonth() + 1).padStart(2, '0')}`;
              setCurrentDate(newDate);
          };

          // 컴포넌트가 마운트될 때 현재 날짜를 설정
          useEffect(() => {
              const today = new Date();
              const initialDate = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}`;
              setCurrentDate(initialDate);
          }, []);

    return (
      <div className="allrecruit-container">
        <Header/>
        <div className="calendar-box">
          {/* <div className="date_bar">{currentDate}</div> */}
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            weekends={true}
            events={[
              { title: 'Event 1', date: '2024-03-03' },
              { title: 'Event 2', start: '2024-03-03', end: '2024-03-05', color: '#CDCDCD', url:'https://naver.com'}
            ]}
            datesSet={handleDatesSet}
          />
        </div>
      </div>
     
    )
}

export default Calendar