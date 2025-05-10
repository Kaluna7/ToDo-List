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
      ? <p className="text-gray-500">Tidak ada tugas.</p>
      : list.map((t) => (
          <div key={t.id} className="p-2 border-b">
            <strong>{t.title}</strong>
            <p>{t.description}</p>
            <small className="text-gray-400">
              Due: {localDateString(t.duedate)}
            </small>
          </div>
        ));

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
