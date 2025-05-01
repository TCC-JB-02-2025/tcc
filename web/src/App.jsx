import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useState, useEffect, useRef} from 'react'

import PopUpComponent from "../components/PopUpComponent";

function PopUpContent({}) {
  return (
    <div>
      <h1>PopUp</h1>
      <h2>Conteúdo do PopUp</h2>
      <p>Este é o conteúdo do pop-up.</p>
    </div>
  );
}

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
  const popUpRef = useRef(null); // Referência para o componente PopUpComponent

  return (
    <div>
      <h1>Home</h1>

      <button
        onClick={() => {
          popUpRef.current.show(PopUpContent); // Chama a função show do PopUpComponent
        }}
        className="btn btn-primary"
      >
        Abrir PopUp
      </button>

      {/* texto com a cor primaria */}
      <p className="text-primary">Texto com a cor primária</p> 
      

      <PopUpComponent 
        ref={popUpRef}
      />
    </div>
  )
}


export default App
