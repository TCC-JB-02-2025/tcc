import { useRef } from "react";
import PopUpComponent from "../components/PopUpComponent";
import SearchBar from "../components/SearchBar";

function Header({pageName}){
    return (
      <header className="border-bottom d-flex justify-content-between px-3">
        <h1>{pageName}</h1>

        <SearchBar />

        <span className="d-flex align-items-center gap-2">
          <span className="fw-bold">Nome do Usuário</span>
          <i className="bi bi-person-circle fs-1" />
        </span>

      </header>
    )
  }

export default Header