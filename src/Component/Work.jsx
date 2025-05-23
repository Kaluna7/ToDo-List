import { useEffect, useState } from "react";
import AddWork from "./utils/AddWork";
import axios from "axios";

export default function Work() {
  const [showWork, setShowWork] = useState(false);
  const [workList, setWorkList] = useState([]);

  const getWorkData = async () => {
    const email = localStorage.getItem("email");
    if (!email) return;

    try {
      const res = await axios.get("http://localhost:5000/getwork", {
        params: { email },
        withCredentials: true,
      });
      console.log("Data from server:", res.data);
      setWorkList(res.data);
    } catch (err) {
      console.error("Error get the data:", err);
    }
  };

  const deleteWork = async (id) => {
    console.log("Trying to delete id:", id);
    if (!window.confirm("Are you sure delete this work?")) return;

    try {
      await axios.delete("http://localhost:5000/deletework", {
        params: { id },
        withCredentials: true,
      });
      getWorkData();
    } catch (err) {
      console.error("Error delete work:", err);
      alert("Error delete work.");
    }
  };

  useEffect(() => {
    getWorkData();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row space-x-140">
        <h1 className="mb-6">Task List</h1>
        <button
          className="h-15 shadow-lg"
          style={{ background: "#76DE37" }}
          onClick={() => setShowWork(true)}
        >
          Add New Task
        </button>
      </div>
      <div className="bg-[#B1C9EF] w-[980px] h-[618px] rounded-4xl p-6 overflow-y-auto">
        {showWork && (
          <AddWork
            show={showWork}
            onClose={() => setShowWork(false)}
            onAddSucces={() => {
              getWorkData();
              setShowWork(false);
            }}
          />
        )}

        <div className="flex flex-col space-y-4">
          {workList.length ? (
            workList.map((item) => {
              console.log("DEBUG item:", item);
              return (
                <div
                  key={item.id}
                  className="relative border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-300 p-4"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      {item.time.slice(0, 5)}
                    </span>
                    <button
                      onClick={() => deleteWork(item.id)}
                      className="text-red-500 hover:text-red-700 focus:outline-none"
                      title="Delete"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-800 truncate mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-snug">
                    {item.description}
                  </p>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-700">Don't Have Task.</p>
          )}
        </div>
      </div>
    </div>
  );
}
