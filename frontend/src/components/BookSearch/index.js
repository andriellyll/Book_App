import React, { useState } from 'react';
import './style.css'

function Search(props) {
  const [name, setName] = useState('');

  function handleSubmit(e){
    e.preventDefault();
    
    const searchName = name;
    setName('');

    props.onSubmit(searchName);  
  }

  return (
    <div className="search">
        <h3>Pesquisar livro</h3>
        <form onSubmit={e => handleSubmit(e)}>
          <input 
            placeholder="Nome do Livro"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <button type='submit'>Pesquisar</button>
        </form>
    </div>
  );
}

export default Search;
