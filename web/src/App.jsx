import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useState, useEffect, useRef} from 'react'

import PopUpComponent from "../components/PopUpComponent";
import Home from "./home";
import SideBar from "../components/SideBar";
import Header from "../components/Header";

import "./index.css";
import "../styles/SideBar.css";

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
      <div className="container-fluid p-0" >
        <div className="d-flex w-100"> {/* Usando flex */}

          <SideBar />

          <main className="flex-grow-1"> {/* A main ocupará o espaço restante */}
            <Header />

            <div className="py-4">
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
            </div>
          </main>

        </div>
      </div>
    </Router>
  );
}



export default App
