import { useState } from "react";
import DayList from "./utils/DayList";

export default function Calender(){
  const [ selectedDay , setSelectedDay ] = useState();

  function handleClickDay(selectedDay){
    setSelectedDay(selectedDay);
    console.log(selectedDay);
  }

    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    })

  
    

    return(
      <div className='flex flex-col'>
        <h1 className='mb-6 font-bold'>{formattedDate}</h1>
        <div className='flex flex-row gap-6 bg-[#DDDDDD] justify-center rounded-2xl cursor-pointer p-2'>
          <DayList isSelected={selectedDay === 'day'} onPress={() => {handleClickDay('day')}}>Day</DayList>
          <DayList isSelected={selectedDay === 'week'} onPress={() => {handleClickDay('week')}}>Week</DayList>
          <DayList isSelected={selectedDay === 'month'} onPress={() => {handleClickDay('month')}}>Month</DayList>
        </div>
        
      </div>

    );
}