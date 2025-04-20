import { useState } from "react";
import axios from "axios";

export default function AddTask({show , onClose}) {
  const [addTask, setAddTask] = useState("");

  const handleNewTask = async (e) => {
    e.preventDefault();

    const email = localStorage.getItem("email");

    try {
      const res = await axios.post("http://localhost:5000/addtask", {
        email,
        title: addTask,
      });

      console.log("Task berhasil ditambahkan:", res.data);
      setAddTask("");
    } catch (err) {
      console.error("Gagal menambahkan task", err);
    }
  };

  if (!show) return null;
  return (
    <div className="fixed inset-0  bg-opacity-0 flex items-center justify-center">
      <div className="bg-[#C4C4C4] rounded-lg p-6 w-[600px] h-[400px]">
      <h2>Tambah To-do</h2>
      <form onSubmit={handleNewTask}>
        <input
          type="text"
          placeholder="Masukkan task"
          value={addTask}
          onChange={(e) => setAddTask(e.target.value)}
        />
        <button type="submit">Tambah</button>
        <button onClick={onClose}>Close</button>
      </form>
      </div>
    </div>
  );
}
