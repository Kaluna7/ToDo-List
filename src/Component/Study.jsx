import { useState, useEffect } from "react";
import AddStudy from "./utils/AddStudy";
import axios from "axios";

export default function Study() {
  const [showStudy, setShowStudy] = useState(false);
  const [studyList, setStudyList] = useState([]);

  const getStudyData = async () => {
    const email = localStorage.getItem("email");

    try {
      const res = await axios.get("http://localhost:5000/getstudy", {
        params: { email },
      });
      setStudyList(res.data);
      console.log("Data dari server:", res.data);
    } catch (err) {
      console.error("Gagal mengambil data:", err);
    }
  };

  useEffect(() => {
    getStudyData();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row space-x-140">
        <h1 className="mb-6">Study</h1>
        <button
          style={{ background: "#76DE37" }}
          className="h-15 shadow-lg"
          onClick={() => setShowStudy(true)}
          onSucces={getStudyData()}
        >
          Add New Task
        </button>
      </div>
      <div className="bg-[#B1C9EF] w-[980px] h-[618px] rounded-4xl p-6">
        <div className="">
          <AddStudy show={showStudy} onClose={() => setShowStudy(false)} />
        </div>
        <div className="">
          {studyList.map((item, index) => (
            <li key={index}>
              <strong>{item.title}</strong> - {item.description}{" "}
              {item.time.slice(0, 5)}
            </li>
          ))}
        </div>
      </div>
    </div>
  );
}
