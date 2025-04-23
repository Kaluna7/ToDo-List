import { useState } from "react";
import axios from "axios";

export default function AddTask({show , onClose}) {
  const [addTask, setAddTask] = useState();
  const [ description , setDescription ] = useState();

  const handleNewTask = async (e) => {
    e.preventDefault();

    const email = localStorage.getItem("email");

    try {
      const res = await axios.post("http://localhost:5000/addtask", {
        email,
        title : addTask,
        description : description
      });

      alert("Added Successfully!:", res.data);
      setAddTask("");
    } catch (err) {
      alert("Error Add Task!", err);
    }
  };

  if (!show) return null;
  return (
    <div className="fixed bg-opacity-0 flex items-center justify-center ml-50 mt-10">
      <div className="grid grid-rows-[repeat(2,30px)] bg-[#C4C4C4] rounded-lg p- w-[600px] h-[400px] text-center">
      <h2 className="font-extrabold text-[32px]">Tambah To-do</h2>
      <form className="grid grid-rows-[repeat(4,70px)] gap-5 justify-center items-center mt-15" onSubmit={handleNewTask}>
        <input
          className="border-2"
          type="text"
          placeholder="Title"
          value={addTask}
          onChange={(e) => setAddTask(e.target.value)}
        />
          <input
          className="border-2"
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex gap-30">
        <button type="submit">Tambah</button>
        <button onClick={onClose}>Close</button>
        </div>
      </form>
      </div>
    </div>
  );
}
