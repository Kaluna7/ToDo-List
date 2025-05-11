import { useState } from "react";
import AddTask from "./NewTask/AddTask";

export default function NewTask() {

  const [showAddTask , setAddTask] = useState(false);
  return (
    <div className="flex flex-col">
      <h1 className="mb-6">New Task</h1>
      <div className="border w-[980px] h-[618px] rounded-4xl p-6">
        <div className="">
          <button style={{ background: "#76DE37" }} className="shadow-lg" onClick={() => {setAddTask(true)}}>
            ➕ Add new task
          </button>
          <AddTask show={showAddTask} onClose={() => {setAddTask(false)}}/>
        </div>
      </div>
    </div>
  );
}
