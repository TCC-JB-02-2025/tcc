import { useRef } from "react";
import PopUpComponent from "../components/PopUpComponent";

function Header(){
    const popUpRef = useRef(null); // Referência para o componente PopUpComponent
  
    return (
      <header className="border-bottom">
        <h1>Header</h1>
      </header>
    )
  }

export default Header