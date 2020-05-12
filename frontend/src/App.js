import React, { useState, useEffect } from 'react';
import Form from './components/BookForm';
import Search from './components/BookSearch';
import Book from './components/BookItem';
import './App.css';

import api from './services/api'; 

function App () {
    const [books, setBooks] = useState([]);
    
    async function handleRegister(data) {
        await api.post('/', data);
    }

    async function handleDelete(id) {
        await api.delete(`/delete/${id}`);
    }

    // useEffect eh como o componentDidMount, componentDidupdate e componentWillUnmount (que sao usados em componentes de classes) juntos   
    // componentes de classe nao tem um metodo de executar o mesmo efeito colateral em cada renderização
    useEffect(() => {
        api.get('/')
            .then(response => {
                setBooks(response.data)
            });
    });

    return (
        <div className="App">
            <div className="inputs">
                <Form onSubmit={(data) => handleRegister(data)}/>
                <Search/>
            </div>
            <div className="books">
                {books.map(book => (
                  <Book 
                    key={book._id}
                    name={book.name} 
                    author={book.author} 
                    genre={book.genre}
                    id={book._id}
                    handleDelete={(id) => handleDelete(id)}
                />
                ))}
            </div>
        </div>
    )
    
}

export default App;
