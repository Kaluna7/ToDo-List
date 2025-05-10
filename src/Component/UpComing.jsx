import { useState, useEffect } from "react";
import axios from "axios";

export default function UpComing() {
  const [tasks, setTasks] = useState([]);
  const email = localStorage.getItem("email");

  // helper untuk pad angka jadi 2 digit
  const pad = (n) => n.toString().padStart(2, "0");

  // buat YYYY‑MM‑DD untuk hari ini & besok
  const today = new Date();
  const todayString = `${today.getFullYear()}-${pad(today.getMonth()+1)}-${pad(today.getDate())}`;

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const tomorrowString = `${tomorrow.getFullYear()}-${pad(tomorrow.getMonth()+1)}-${pad(tomorrow.getDate())}`;

  // awal & akhir minggu (Minggu–Sabtu)
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

  // helper untuk ambil YYYY-MM-DD di zona waktu lokal
  const localDateString = (isoDate) => {
    const d = new Date(isoDate);
    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
  };

  // filter berdasarkan localDateString
  const todayTasks = tasks.filter((t) => localDateString(t.duedate) === todayString);
  const tomorrowTasks = tasks.filter((t) => localDateString(t.duedate) === tomorrowString);
  const weekTasks = tasks.filter((t) => {
    const d = localDateString(t.duedate);
    return d >= startOfWeekString && d <= endOfWeekString;
  });

  const renderTasks = (list) =>
    list.length === 0
      ? <p className="text-gray-500">Tidak ada tugas.</p>
      : list.map((t) => (
          <div key={t.id} className="p-2 border-b">
            <strong>{t.title}</strong>
            <p>{t.description}</p>
            <small className="text-gray-400">Due: {localDateString(t.duedate)}</small>
          </div>
        ));

  return (
    <div className="flex flex-col">
      <h1 className="font-bold mb-6" style={{ fontSize: 45 }}>Upcoming</h1>

      <div className="border-2 w-[980px] h-[320px] rounded-4xl p-6">
        <h2 className="font-bold mb-2" style={{ fontSize: 32 }}>Today</h2>
        {renderTasks(todayTasks)}
      </div>

      <div className="flex flex-row mt-[45px] gap-[40px]">
        <div className="border-2 w-[470px] h-[260px] rounded-4xl p-6">
          <h2 className="font-bold mb-2" style={{ fontSize: 32 }}>Tomorrow</h2>
          {renderTasks(tomorrowTasks)}
        </div>
        <div className="border-2 w-[470px] h-[260px] rounded-4xl p-6">
          <h2 className="font-bold mb-2" style={{ fontSize: 32 }}>This Week</h2>
          {renderTasks(weekTasks)}
        </div>
      </div>
    </div>
  );
}
