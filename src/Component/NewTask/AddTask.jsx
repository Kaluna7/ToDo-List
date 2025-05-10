import { useState } from "react";
import axios from "axios";

export default function AddTask({show , onClose}) {
  const [addTask, setAddTask] = useState("");
  const [ description , setDescription ] = useState("");
  const [dueDate ,setDueDate] = useState("");

  const handleNewTask = async (e) => {
    e.preventDefault();

    const email = localStorage.getItem("email");

    try {
      const res = await axios.post("http://localhost:5000/addtask", {
        email,
        title : addTask,
        description : description,
        duedate : dueDate
      });

      console.log("Added Successfully:", res.data);
      alert("Added Successfully!");

      setAddTask("");
      setDescription("");
      setDueDate("");
    } catch (err) {
      alert("Error Add Task!", err);
    }
  };

  if (!show) return null;
  return (
    <div className="fixed bg-opacity-0 flex items-center justify-center ml-50 mt-10">
      <div className="grid grid-rows-[repeat(2,30px)] bg-[#E3F2FD] rounded-4xl p- w-[500px] h-[400px] text-center">
      <h2 className="font-extrabold text-[32px]">Create To-Do</h2>
      <form className="grid grid-rows-[repeat(4,50px)] gap-5 justify-center items-center mt-15" onSubmit={handleNewTask}>
        <input
          className="border border-gray-400 border-opacity-50 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          type="text"
          placeholder="Title"
          value={addTask}
          onChange={(e) => setAddTask(e.target.value)}
        />
          <input
          className="border border-gray-400 border-opacity-50 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
        type="date"
        className="border border-gray-400 border-opacity-50 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        />
        <div className="flex gap-40">
        <button type="submit">Add</button>
        <button type="button" onClick={onClose}>Exit</button>
        </div>
      </form>
      </div>
    </div>
  );
}
