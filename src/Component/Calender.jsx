import { useState, useEffect } from "react";
import axios from "axios";
import DayList from "./utils/DayList";

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
    if (!email) return;
    axios
      .get(`http://localhost:5000/tasklist?email=${email}`)
      .then((res) => setTasks(res.data))
      .catch((err) => console.error("Gagal mengambil data:", err));
  }, [email]);

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
        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
        <p className="text-gray-400 text-lg">Tidak ada tugas</p>
      </div>
    : <div className="grid gap-3 max-h-[calc(563px-2rem)] overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-thumb-rounded">
        {list.map((t) => (
          <div
            key={t.id}
             className="group relative p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all border-l-4 border-blue-500 mr-2" 
          >
            <div className="flex justify-between items-start">
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
              <button className="p-2 hover:bg-gray-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
              </button>
            </div>
            
            {/* Badge Priority */}
            {t.priority && (
              <span className={`absolute -top-2 -right-2 px-2 py-1 rounded-full text-xs font-medium ${
                t.priority === 'high' ? 'bg-red-100 text-red-700' :
                t.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-green-100 text-green-700'
              }`}>
                {t.priority.charAt(0).toUpperCase() + t.priority.slice(1)}
              </span>
            )}
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
            <h2 className="text-lg font-semibold mb-2">Tasks for Today:</h2>
            {renderTasks(todayTasks)}
          </>
        )}
        {selectedDay === "week" && (
          <>
            <h2 className="text-lg font-semibold mb-2">Tasks for This Week:</h2>
            {renderTasks(weekTasks)}
          </>
        )}
        {selectedDay === "month" && (
          <>
            <h2 className="text-lg font-semibold mb-2">Tasks for This Month:</h2>
            {renderTasks(monthTasks)}
          </>
        )}
      </div>
    </div>
  );
}
