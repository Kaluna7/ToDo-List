import { useState } from "react";
import axios from "axios";

export default function AddStickyNote({show , onClose}) {
     const [ addStickyNote , setAddStickyNote ] = useState("");
      const [ description , setDescription ] = useState("");
    
      const handleAddNote = async (e) => {
        e.preventDefault();
        const email = localStorage.getItem("email");
    
        try{
          const res = await axios.post("http://localhost:5000/sticky-note",{
            email,
            title : addStickyNote,
            description : description
          });
          console.log("Added successfully:", res.data);
          alert("Added Successfully");
    
          setAddStickyNote("");
          setDescription("");
        } catch(err){
          alert("Error" , err);
        }
      }
    
          if (!show) return null;
    return(
      <div className="" >
      <form className="">
        <input type="text" placeholder="Title" value={addStickyNote} />
        <input type="text" placeholder="Description" value={description} />
        <button onClick={handleAddNote}>Submit</button>
        <button onClick={onClose}>Exit</button>
      </form>
      </div>
    );
}