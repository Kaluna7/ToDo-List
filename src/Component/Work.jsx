import { useEffect, useState } from "react";
import AddWork from "./utils/AddWork";
import axios from "axios";

export default function Work() {
  const [showWork, setShowWork] = useState(false);
  const [workList, setWorkList] = useState([]);

  const getWorkData = async () => {
    const email = localStorage.getItem("email");

    try {
      const res = await axios.get("http://localhost:5000/getwork", {
        params: { email },
      });
      setWorkList(res.data);
      console.log("Data dari server:", res.data);
    } catch (err) {
      console.error("Gagal mengambil data:", err);
    }
  };

  useEffect(() => {
    getWorkData();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row space-x-140">
        <h1 className="mb-6">Work</h1>
        <button
          style={{ background: "#76DE37" }}
          className="h-15 shadow-lg"
          onClick={() => setShowWork(true)}
        >
          Add New Task
        </button>
      </div>
      <div className="bg-[#B1C9EF] w-[980px] h-[618px] rounded-4xl p-6">
        <div className="bg-blue-50">
          <AddWork show={showWork} onClose={() => setShowWork(false)} onAddSucces={getWorkData()}/>
        </div>
        <div className="">
          {workList.map((item, index) => (
            <div key={index} className="border w-fit h-[100px] flex flex-col">
              <div className="text-red">
              {item.title}  
              <div className="">
              {item.description} 
              </div>
              {item.time.slice(0,5)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
