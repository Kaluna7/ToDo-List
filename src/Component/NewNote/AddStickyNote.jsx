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
      <div className="fixed bg-blue-200 bg-opacity-0 justify-center ml-80 mt-30" >
      <form className="grid grid-rows-[repeat(2,50px)] justify-center p-5 gap-5">
        <input type="text" placeholder="Title" value={addStickyNote} onChange={(e) => setAddStickyNote(e.target.value)} className="border " />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="border" />
        <div className="flex gap-30">
          <button onClick={handleAddNote}>Submit</button>
          <button onClick={onClose}>Exit</button>
        </div>
      </form>
      </div>
    );
}