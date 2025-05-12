import { useState, useEffect } from "react";
import axios from "axios";

export default function UpComing() {
  const [tasks, setTasks] = useState([]);
  const email = localStorage.getItem("email");

  const pad = (n) => n.toString().padStart(2, "0");

  const today = new Date();
  const todayString = `${today.getFullYear()}-${pad(today.getMonth()+1)}-${pad(today.getDate())}`;

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const tomorrowString = `${tomorrow.getFullYear()}-${pad(tomorrow.getMonth()+1)}-${pad(tomorrow.getDate())}`;

  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  const startOfWeekString = `${startOfWeek.getFullYear()}-${pad(startOfWeek.getMonth()+1)}-${pad(startOfWeek.getDate())}`;
  const endOfWeekString   = `${endOfWeek.getFullYear()}-${pad(endOfWeek.getMonth()+1)}-${pad(endOfWeek.getDate())}`;

  useEffect(() => {
    if (!email) return;
    axios
      .get(`http://localhost:5000/tasklist?email=${email}`)
      .then((res) => setTasks(res.data))
      .catch((err) => console.error(err));
  }, [email]);

  const localDateString = (isoDate) => {
    const d = new Date(isoDate);
    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
  };

  const todayTasks = tasks.filter((t) => localDateString(t.duedate) === todayString);
  const tomorrowTasks = tasks.filter((t) => localDateString(t.duedate) === tomorrowString);
  const weekTasks = tasks.filter((t) => {
    const d = localDateString(t.duedate);
    return d >= startOfWeekString && d <= endOfWeekString;
  });

 const renderTasks = (list) =>
    list.length === 0
      ? <div className="h-full flex flex-col items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
          <p className="text-gray-400 text-lg">Tidak ada tugas</p>
        </div>
      : <div className="grid gap-3 h-full overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 pr-2">
          {list.map((t) => (
            <div
              key={t.id}
              className="group relative p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all border-l-4 border-blue-500"
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
      <h1 className="font-bold mb-6" style={{ fontSize: 45 }}>Upcoming</h1>

      {/* Today Section */}
      <div className="border-2 w-[980px] h-[320px] rounded-4xl p-6 flex flex-col">
        <h2 className="font-bold mb-4" style={{ fontSize: 32 }}>Today</h2>
        <div className="flex-1 overflow-hidden">
          {renderTasks(todayTasks)}
        </div>
      </div>

      {/* Tomorrow & Week Section */}
      <div className="flex flex-row mt-[45px] gap-[40px]">
        <div className="border-2 w-[470px] h-[260px] rounded-4xl p-6 flex flex-col">
          <h2 className="font-bold mb-4" style={{ fontSize: 32 }}>Tomorrow</h2>
          <div className="flex-1 overflow-hidden">
            {renderTasks(tomorrowTasks)}
          </div>
        </div>
        
        <div className="border-2 w-[470px] h-[260px] rounded-4xl p-6 flex flex-col">
          <h2 className="font-bold mb-4" style={{ fontSize: 32 }}>This Week</h2>
          <div className="flex-1 overflow-hidden">
            {renderTasks(weekTasks)}
          </div>
        </div>
      </div>
    </div>
  );
}