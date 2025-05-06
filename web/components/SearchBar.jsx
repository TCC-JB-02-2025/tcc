import React from 'react'
import { useState, useEffect, useCallback } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // Import useNavigate


function SearchBar(){
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");


  const handleSearch = (e) => {
    e.preventDefault(); // Evita o comportamento padrão do formulário
    if (searchTerm.trim() !== "") {
      navigate(`/search/${searchTerm}`); // Navega para a rota de pesquisa com o termo
      e.target.reset(); // Limpa o formulário após a pesquisa
    }
  }

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value); // Atualiza o estado com o valor do input
  } 

  //TODO: tem que mudar esse form, ta bem feio e foi feito pelo gemini, porem funciona
  return (
    <form onSubmit={handleSearch} className="d-flex align-items-center gap-0">
      <input
        type="text"
        className="form-control me-2"
        placeholder="Pesquisar..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button type="submit" className="btn btn-primary">Pesquisar</button>
    </form>
  )
}

export default SearchBar