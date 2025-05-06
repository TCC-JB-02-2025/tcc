import { useRef } from "react";
import PopUpComponent from "../components/PopUpComponent";

function PopUpContent() {
  return (
    <div className="p-3 bg-blue">
      <h2>Conteúdo do PopUp</h2>
      <p>Este é o conteúdo do PopUp.</p>
    </div>
  );
}

function Home(){
    const popUpRef = useRef(null); // Referência para o componente PopUpComponent
  
    return (
      <main>
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
      </main>
    )
  }

export default Home