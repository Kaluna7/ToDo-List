import { useState } from "react";
import AddWork from "./NewWork/AddWork";

export default function Work() {
 const [ showWork , setShowWork ] = useState(false);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row space-x-140">
        <h1 className="mb-6">Work</h1>
        <button style={{ background: "#76DE37" }} className="h-15 shadow-lg" onClick={() => setShowWork(true)}>
          Add New Task
        </button>
      </div>
      <div className="bg-[#B1C9EF] w-[980px] h-[618px] rounded-4xl p-6">
        <div className="bg-blue-50">
          <AddWork 
          show={showWork}
          onClose={() => setShowWork(false)}
          />
        </div>
      </div>
    </div>
  );
}
