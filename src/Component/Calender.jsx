import { useState, useEffect } from "react";
import axios from "axios";
import DayList from "./utils/DayList";

export default function Calender() {
  const [selectedDay, setSelectedDay] = useState("day");
  const [tasks, setTasks] = useState([]);

  const today = new Date();
  const todayString = today.toISOString().split("T")[0]; // 'YYYY-MM-DD'

  const email = localStorage.getItem("email"); // Mendapatkan email dari localStorage

  useEffect(() => {
    if (email) {
      axios
        .get(`http://localhost:5000/tasklist?email=${email}`) // Ganti URL sesuai backend kamu
        .then((res) => {
          setTasks(res.data);
        })
        .catch((err) => {
          console.error("Gagal mengambil data:", err);
        });
    }
  }, [email]); // Menambahkan email sebagai dependency agar data diambil setiap kali email berubah

  const todayTasks = tasks.filter((task) => {
  const taskDate = new Date(task.duedate).toISOString().split("T")[0]; // Mengambil hanya tanggal
  return taskDate === todayString; // Bandingkan hanya tanggal
});


  const weekTasks = tasks.filter((task) => {
    const taskDate = new Date(task.duedate);
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // Minggu
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Sabtu
    return taskDate >= startOfWeek && taskDate <= endOfWeek;
  });

  const monthTasks = tasks.filter((task) => {
    const taskDate = new Date(task.duedate);
    return (
      taskDate.getMonth() === today.getMonth() &&
      taskDate.getFullYear() === today.getFullYear()
    );
  });

  const renderTasks = (taskList) => (
    <>
      {taskList.length === 0 ? (
        <p className="text-gray-500">Tidak ada tugas.</p>
      ) : (
        taskList.map((task) => (
          <div key={task.id} className="p-2 border-b">
            <strong>{task.title}</strong>
            <p>{task.description}</p>
            <small className="text-gray-400">Due: {task.duedate}</small>
          </div>
        ))
      )}
    </>
  );

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
