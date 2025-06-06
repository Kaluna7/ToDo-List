import { useEffect, useState } from "react";
import AddTask from "./utils/AddTask";
import task from "../assets/task.png";
import gsap from "gsap";

export default function NewTask() {
  useEffect(() => {
    gsap.to("#task", {
      scale: 1.08,
      duration: 1.2,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut",
    });
  }, []);

  const [showAddTask, setAddTask] = useState(false);
  return (
    <div className="flex flex-col">
      <h1 className="mb-6">New Task</h1>
      <div className="w-[980px] h-[618px] rounded-4xl relative bg-[#B1C9EF]">
        <div className="bg-[#8AAEE0] w-230 h-100 justify-center ml-7 absolute top-25 rounded-[100px] shadow-xl">
          <img src={task} id="task" className="w-100 h-100 right-0 absolute" />
          <AddTask
            show={showAddTask}
            onClose={() => {
              setAddTask(false);
            }}
          />
          <div className="">
            <div className="w-110 text-center text-[12px] mt-15 ml-25">
              <h1 className="font-bold">
                Add a goal and chase it by clicking the button below!
              </h1>
              <div className="text-[20px] mt-15">
                <button
                  style={{ background: "#76DE37" }}
                  className="shadow-lg"
                  onClick={() => {
                    setAddTask(true);
                  }}
                >
                  ➕ Add new task
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
