import React from 'react';
import './style.css'

function Book(props) {
  return (
    <div className="book-item">
      <header>{props.name}</header>
      <div className="book-info">
        <span><strong>Autor: </strong>{props.author}</span>
        <span><strong>Gênero: </strong>{props.genre}</span>
        <div className="buttons">
          <button onClick={() => props.handleAddUserBook(props.id)}>Adicionar em Meus Livros</button>
          <button hidden={localStorage.getItem('admin') === 'false'} id="delete" onClick={() => props.handleDelete(props.id)}>Deletar</button>
        </div>
      </div>
    </div>
  );
}

export default Book;
