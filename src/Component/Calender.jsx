import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


export default function Calender(){
    const today = new Date();
    return(
        <div className='flex flex-col'>
        <h1 className='mb-6'>Calender</h1>
        <div className="flex justify-center items-center ml-[20%]">
    <div className="bg-white p-6 rounded-2xl shadow-lg w-fit ">
      <Calendar
        value={today}
        tileContent={({ date, view }) => {
          const isToday =
            view === 'month' &&
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();

          return isToday ? (
            <div style={{ background: '#76DE37' }} className="absolute inset-0 rounded-full opacity-20"></div>
          ) : null;
        }}
        tileClassName={({ date }) => {
          const isToday =
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();

          return isToday ? 'relative text-green-700 font-bold' : '';
        }}
      />
    </div>
</div>
</div>
    );
}