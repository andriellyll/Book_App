import React, { useState } from 'react';
import './style.css'

function Form(props) {
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');

  function handleSubmit(e){
    e.preventDefault();
    const data = {
      name: name,
      author: author,
      genre: genre,
    }

    setName('');
    setAuthor('');
    setGenre('');

    props.onSubmit(data);
  }

  return (
    <div className="form">
      <form onSubmit={e => handleSubmit(e)}>
        <h3>Cadastrar livro</h3>
        <input 
          placeholder="Nome do Livro"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input 
          placeholder="Nome do Autor"
          value={author}
          onChange={e => setAuthor(e.target.value)}
        />
        <input 
          placeholder="Gênero"
          value={genre}
          onChange={e => setGenre(e.target.value)}
        />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default Form;
