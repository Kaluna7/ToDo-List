export default function AddStickyNote() {
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
    
    
    return(

        <h1>Hello</h1>
    );
}