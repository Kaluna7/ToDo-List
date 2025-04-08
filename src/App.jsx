import LandingPage from "./Page/LandingPage";
import Login from "./Page/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App(){
  return(
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
    </Routes>
    </Router>
  );
}