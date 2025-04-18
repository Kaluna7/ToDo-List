import { useNavigate } from "react-router-dom";
export default function NewTask() {
  const navigate = useNavigate();

  function addNewTask(){
    navigate('/addtask')
  }

  return (
    <div className="flex flex-col">
      <h1 className="mb-6">New Task</h1>
      <div className="border w-[980px] h-[618px] rounded-4xl p-6">
        <div className="">
          <button style={{ background: "#76DE37" }} className="" onClick={addNewTask}>
            ➕ Add new task
          </button>
        </div>
      </div>
    </div>
  );
}
