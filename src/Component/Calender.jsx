import { useState, useEffect } from "react";
import axios from "axios";
import DayList from "./utils/DayList";
import noTask from "../assets/noTask.jpg";

export default function Calender() {
  const [selectedDay, setSelectedDay] = useState("day");
  const [tasks, setTasks] = useState([]);
  const email = localStorage.getItem("email");

  const pad = (n) => n.toString().padStart(2, "0");

  const today = new Date();
  const todayString = `${today.getFullYear()}-${pad(today.getMonth()+1)}-${pad(today.getDate())}`;

  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  const weekStartString = `${startOfWeek.getFullYear()}-${pad(startOfWeek.getMonth()+1)}-${pad(startOfWeek.getDate())}`;
  const weekEndString   = `${endOfWeek.getFullYear()}-${pad(endOfWeek.getMonth()+1)}-${pad(endOfWeek.getDate())}`;

useEffect(() => {
  const checkSession = async () => {
    try {
      const response = await axios.get('http://localhost:5000/check-session', {
        withCredentials: true
      });
      if (!response.data.loggedin) {
        localStorage.removeItem('email');
        window.location.href = '/login';
      }
    } catch (err) {
      console.error('Session check failed:', err);
    }
  };
  checkSession();
}, []);

  useEffect(() => {
    if (!email) return;
    axios
      .get(`http://localhost:5000/tasklist?email=${email}`)
      .then((res) => setTasks(res.data))
      .catch((err) => console.error("Gagal mengambil data:", err));
  }, [email]);

 const handleTaskComplete = async (taskTitle) => {
  const isConfirmed = window.confirm("Apakah tugas ini sudah selesai?");
  
  if (!isConfirmed) return;

  try {
    await axios.delete(
      `http://localhost:5000/tasklist/${encodeURIComponent(taskTitle)}`, 
      {
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('sessionToken')}` // Jika menggunakan token
        }
      }
    );
    
    setTasks(prevTasks => 
      prevTasks.filter(task => task.title !== taskTitle)
    );
    
  } catch (err) {
    console.error("Gagal menghapus tugas:", err);
    if (err.response?.status === 401) {
      alert('Session expired, please login again');
      localStorage.removeItem('email');
      window.location.href = '/login';
    } else {
      alert("Gagal menghapus tugas");
    }
  }
};

  const localDateString = (iso) => {
    const d = new Date(iso);
    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
  };

  const todayTasks = tasks.filter((t) =>
    t.duedate && localDateString(t.duedate) === todayString
  );

  const weekTasks = tasks.filter((t) => {
    if (!t.duedate) return false;
    const d = localDateString(t.duedate);
    return d >= weekStartString && d <= weekEndString;
  });

  const monthTasks = tasks.filter((t) => {
    if (!t.duedate) return false;
    const d = new Date(t.duedate);
    return d.getFullYear() === today.getFullYear() &&
           d.getMonth() === today.getMonth();
  });

  const renderTasks = (list) =>
    list.length === 0
      ? <div className="h-full flex flex-col items-center justify-center">
          <img src={noTask} className="w-60 h-60 mb-6"/>
          <p className="text-gray-400 text-lg">No goals yet. Great things start small.</p>
        </div>
      : <div className="grid gap-3 max-h-[calc(563px-2rem)] overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-thumb-rounded">
          {list.map((t) => (
            <div
              key={t.id}
              className="group relative p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all border-l-4 border-blue-500 mr-2"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-3 flex-1">
                  <div className="mt-1 relative">
                   <input
  type="checkbox"
  className="w-5 h-5 rounded border-2 border-gray-300 
           checked:border-blue-500 checked:bg-blue-500 
           focus:ring-0 focus:ring-offset-0 cursor-pointer 
           transition-colors duration-200"
  onChange={() => handleTaskComplete(t.title)}
/>
                    <svg
                      className="absolute top-0 left-0 w-5 h-5 pointer-events-none 
                        opacity-0 [input:checked+&]:opacity-100 transition-opacity duration-200"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{t.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{t.description}</p>
                    <div className="flex items-center text-gray-400 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{new Date(t.duedate).toLocaleDateString('id-ID', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>;

  return (
    <div className="flex flex-col">
      <h1 className="mb-4 font-bold">{today.toDateString()}</h1>

      <div className="flex flex-row gap-6 w-fit bg-[#DDDDDD] justify-center rounded-lg p-2">
        <DayList isSelected={selectedDay === "day"} onPress={() => setSelectedDay("day")}>
          Day
        </DayList>
        <DayList isSelected={selectedDay === "week"} onPress={() => setSelectedDay("week")}>
          Week
        </DayList>
        <DayList isSelected={selectedDay === "month"} onPress={() => setSelectedDay("month")}>
          Month
        </DayList>
      </div>

      <div className="border mt-6 w-[980px] h-[563px] rounded-4xl p-4 overflow-y-auto">
        {selectedDay === "day" && (
          <>
            <h2 className="text-[28px] mt-6 mb-[-40px] font-semibold text-center">Tasks for Today :</h2>
            {renderTasks(todayTasks)}
          </>
        )}
        {selectedDay === "week" && (
          <>
            <h2 className="text-[28px] mt-6 mb-[-40px] font-semibold text-center">Tasks for This Week :</h2>
            {renderTasks(weekTasks)}
          </>
        )}
        {selectedDay === "month" && (
          <>
            <h2 className="text-[28px] mt-6 mb-[-40px] font-semibold text-center">Tasks for This Month :</h2>
            {renderTasks(monthTasks)}
          </>
        )}
      </div>
    </div>
  );
}