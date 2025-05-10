import { useState, useEffect } from "react";
import axios from "axios";

export default function UpComing() {
  const [tasks, setTasks] = useState([]);

  // Mengambil email dari localStorage
  const email = localStorage.getItem("email"); 

  // Membuat objek tanggal untuk hari ini, besok, dan minggu ini
  const today = new Date();
  const todayString = today.toISOString().split("T")[0]; // 'YYYY-MM-DD'
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1); // Menambahkan 1 hari
  const tomorrowString = tomorrow.toISOString().split("T")[0]; // 'YYYY-MM-DD'

  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay()); // Minggu
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6); // Sabtu
  const startOfWeekString = startOfWeek.toISOString().split("T")[0];
  const endOfWeekString = endOfWeek.toISOString().split("T")[0];

  useEffect(() => {
    // Mengecek jika email sudah ada di localStorage
    if (email) {
      axios
        .get(`http://localhost:5000/tasklist?email=${email}`) // Ganti dengan URL API yang sesuai
        .then((res) => {
          setTasks(res.data); // Menyimpan data tugas dari API ke state
        })
        .catch((err) => {
          console.error("Gagal mengambil data:", err);
        });
    } else {
      console.error("Email tidak ditemukan di localStorage.");
    }
  }, [email]);

  // Memfilter tugas yang sesuai dengan tanggal
  const todayTasks = tasks.filter((task) => {
    const taskDate = new Date(task.duedate).toISOString().split("T")[0];
    return taskDate === todayString;
  });

 const tomorrowTasks = tasks.filter((task) => {
  const taskDate = new Date(task.duedate).toISOString().split("T")[0]; // Pastikan ini adalah format yang sesuai
  console.log("taskDate:", taskDate); // Log taskDate untuk debugging
  return taskDate === tomorrowString;
});


  const weekTasks = tasks.filter((task) => {
    const taskDate = new Date(task.duedate).toISOString().split("T")[0];
    return taskDate >= startOfWeekString && taskDate <= endOfWeekString;
  });

  // Fungsi untuk merender tugas
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
      <h1 style={{ fontSize: "45px" }} className="font-bold mb-6">
        Upcoming
      </h1>

      <div className="border-2 w-[980px] h-[320px] rounded-4xl p-6">
        <div className="flex flex-col gap-3">
          <h1 style={{ fontSize: "32px" }} className="font-bold">
            Today
          </h1>
          {renderTasks(todayTasks)}
        </div>
      </div>

      <div className="flex flex-row mt-[45px] gap-[40px]">
        <div className="border-2 w-[470px] h-[260px] rounded-4xl p-6">
          <div className="flex flex-col gap-3">
            <h1 style={{ fontSize: "32px" }} className="font-bold">
              Tomorrow
            </h1>
            {renderTasks(tomorrowTasks)}
          </div>
        </div>

        <div className="border-2 w-[470px] h-[260px] rounded-4xl p-6">
          <div className="flex flex-col gap-3">
            <h1 style={{ fontSize: "32px" }} className="font-bold">
              This Week
            </h1>
            {renderTasks(weekTasks)}
          </div>
        </div>
      </div>
    </div>
  );
}
