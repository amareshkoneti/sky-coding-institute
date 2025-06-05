import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Courses from "./pages/Courses";
import About from "./pages/About";
import Address from "./pages/Address";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import VerifyEmail from "./pages/VerifyEmail";
import MyCourses from "./components/MyCourses";
import Certificate from "./components/Certificates";
import StudyMaterials from "./components/StudyMaterials";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/about" element={<About />} />
        <Route path="/address" element={<Address />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<VerifyEmail />} />
        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/verify-certificate" element={<Certificate/>}/>
        <Route path="/study-materials" element={<StudyMaterials/>}/>

      </Routes>
    </Router>
  );
}

export default App;