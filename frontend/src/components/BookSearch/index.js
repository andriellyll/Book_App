import React from 'react';
import './style.css'

function Search() {
  return (
    <div className="search">
        <h3>Pesquisar livro</h3>
        <input placeholder="Nome do Livro"/>
        <button>Pesquisar</button>
    </div>
  );
}

export default Search;
