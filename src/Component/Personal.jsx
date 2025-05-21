import { useState,useEffect } from 'react';
import AddPersonal from './utils/AddPersonal';
import axios from 'axios';

export default function Personal() {

  const [showPersonal , setShowPersonal ] = useState(false);
   const [personalList, setPersonalList] = useState([]);

  const getPersonalData = async () => {
    const email = localStorage.getItem("email");

    try {
      const res = await axios.get("http://localhost:5000/getpersonal", {
        params: { email },
      });
      setPersonalList(res.data);
      console.log("Data dari server:", res.data);
    } catch (err) {
      console.error("Gagal mengambil data:", err);
    }
  };

  useEffect(() => {
    getPersonalData();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row space-x-140">
        <h1 className="mb-6">Personal</h1>
        <button style={{ background: "#76DE37" }} className="h-15 shadow-lg" onClick={() => setShowPersonal(true)} onAddSucces={getPersonalData()}>
          Add New Task
        </button>
      </div>
      <div className="bg-[#B1C9EF] w-[980px] h-[618px] rounded-4xl p-6">
        <div className="">
          <AddPersonal show={showPersonal} onClose={()=> setShowPersonal(false)} />
        </div>
         <div className="">
          {personalList.map((item, index) => (
            <li key={index}>
              <strong>{item.title}</strong> - {item.description} {item.time.slice(0,5)}
            </li>
          ))}
        </div>
      </div>
    </div>
  );
}
