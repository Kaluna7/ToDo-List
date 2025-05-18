import axios from "axios";
import { useState } from "react";

export default function AddWork(){

    const [ addTitle , setAddTitle ] = useState("");;
    const [ description , setDescription ] = useState("");
    const [ time , setTime ] = useState("");


    const handleAddWork = async (e) => {
    e.preventDefault();
    
    const email = localStorage.getItem("email")

    try {
    const res = await axios.post("http://localhost:5000/work",{
        email,
        title : addTitle,
        description : description,
        time : time
    });
    console.log("Success Added Work")
    setAddTitle("");
    setDescription("");
    setTime("");
} catch(err){
    console.log("Error",err)
}
    };

    return(
<>
<h1>Hello</h1></>
    );
}