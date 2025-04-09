import LandingPage from "./Page/LandingPage";
import Login from "./Page/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./Page/SignUp";

export default function App(){
  return(
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
    </Routes>
    </Router>
  );
}