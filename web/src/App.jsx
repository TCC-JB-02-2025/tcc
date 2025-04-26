import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useState, useEffect} from 'react'

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> 
      </nav>

      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>
    </Router>
  );
} 

function Home(){
  return (
    <p>home</p>
  )
}


export default App
