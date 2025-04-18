import { useState } from "react";
import axios from "axios";

export default function AddTask() {
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

  return (
    <div>
      <h2>Tambah To-do</h2>
      <form onSubmit={handleNewTask}>
        <input
          type="text"
          placeholder="Masukkan task"
          value={addTask}
          onChange={(e) => setAddTask(e.target.value)}
        />
        <button type="submit">Tambah</button>
      </form>
    </div>
  );
}
