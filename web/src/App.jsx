import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useState, useEffect, useRef} from 'react'

import PopUpComponent from "../components/PopUpComponent";
import Home from "./home";
import SideBar from "../components/SideBar";
import Header from "../components/Header";

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
      <div className="container-fluid">
        <div className="row">

          <aside className="col-md-3 col-lg-2 p-0">
            <SideBar />
          </aside>

          <main className="col-md-9 col-lg-10">
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
