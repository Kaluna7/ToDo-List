import { useState } from "react";
import AddTask from "./NewTask/AddTask";
import task from "../assets/task.png";

export default function NewTask() {

  const [showAddTask , setAddTask] = useState(false);
  return (
    <div className="flex flex-col">
      <h1 className="mb-6">New Task</h1>
      <div className="border w-[980px] h-[618px] rounded-4xl p-6 relative bg-[#B1C9EF]">
        <div className="">
          <button style={{ background: "#76DE37" }} className="shadow-lg" onClick={() => {setAddTask(true)}}>
            ➕ Add new task
          </button>
          <AddTask show={showAddTask} onClose={() => {setAddTask(false)}}/>
            <div className="bg-[#8AAEE0] w-full h-100 justify-center absolute top-25 right-0 rounded-xl shadow-[10px ,10px,10px,100px] ">
               <img src={task} id="task" className="w-100 h-100 right-0 absolute"></img>
            </div>
        </div>
      </div>
    </div>
  );
}
