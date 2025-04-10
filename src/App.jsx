import LandingPage from "./Page/LandingPage";
import Login from "./Page/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./Page/SignUp";
import Home from "./Page/Home";

export default function App(){
  return(
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/home" element={<Home/>}/>
    </Routes>
    </Router>
  );
}