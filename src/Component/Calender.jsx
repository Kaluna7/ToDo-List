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
        <h1 className='mb-4 font-bold'>{formattedDate}</h1>
        <div className='flex flex-row gap-6 w-fit bg-[#DDDDDD] justify-center rounded-lg p-2'>
          <DayList isSelected={selectedDay === 'day'} onPress={() => {handleClickDay('day')}}>Day</DayList>
          <DayList isSelected={selectedDay === 'week'} onPress={() => {handleClickDay('week')}}>Week</DayList>
          <DayList isSelected={selectedDay === 'month'} onPress={() => {handleClickDay('month')}}>Month</DayList>
        </div>
        <div className="border mt-6 w-[980px] h-[563px] rounded-4xl">

        </div>
      </div>

    );
}