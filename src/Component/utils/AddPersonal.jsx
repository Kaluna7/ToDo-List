import axios from "axios";
import { useState } from "react";

export default function AddWork({ show, onClose, onAddSucces }) {
  const [addTitle, setAddTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");

  const handleAddWork = async (e) => {
    e.preventDefault();

    const email = localStorage.getItem("email");

    try {
      const res = await axios.post("http://localhost:5000/addpersonal", {
        email,
        title: addTitle,
        description: description,
        time: time,
      });
      console.log("Success Added Work", res.data);
      alert("Success");
      setAddTitle("");
      setDescription("");
      setTime("");

      if (onAddSucces){
        onAddSucces();
      }

    } catch (err) {
      console.log("Error", err);
    }
  };

  if (!show) return null;
  return (
    <div className="">
      <form
        onSubmit={handleAddWork}
        className="grid grid-rows-[repeat(3 , 100px)]"
      >
        <input
          placeholder="Title"
          value={addTitle}
          type="text"
          onChange={(e) => setAddTitle(e.target.value)}
        />
        <input
          placeholder="Description"
          value={description}
          type="text"
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          placeholder="Time"
          value={time}
          type="time"
          onChange={(e) => setTime(e.target.value)}
        />
        <div className="">
          <button type="submit">Create</button>
          <button type="button" onClick={onClose}>
            Exit
          </button>
        </div>
      </form>
    </div>
  );
}
