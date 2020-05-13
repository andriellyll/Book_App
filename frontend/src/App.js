import React, { useState, useEffect } from 'react';
import Form from './components/BookForm';
import Search from './components/BookSearch';
import Book from './components/BookItem';
import './App.css';

import api from './services/api'; 

function App () {
    const [books, setBooks] = useState([]);
    const [bookSearch, setBookSearch] = useState([]);
    const [isSearch, setisSearch] = useState(false);

    async function handleRegister(data) {
        setisSearch(false);
        await api.post('/', data);
    }

    async function handleDelete(id) {
        setisSearch(false);
        await api.delete(`/delete/${id}`);
    }

    async function handleSearch(name) {
        setisSearch(true);
        const response = await api.get(`/search?name=${name}`);
        setBookSearch(response.data);
    }

    function renderBooks() {
        let booksList = []
        
        if(!isSearch){
            booksList = books; 
        } else {
            booksList = bookSearch;
        }

        return (booksList.map(book => (
                <Book 
                  key={book._id}
                  name={book.name} 
                  author={book.author} 
                  genre={book.genre}
                  id={book._id}
                  handleDelete={(id) => handleDelete(id)}
              />
        )));
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
                <Search onSubmit={(name) => handleSearch(name)}/>
            </div>
            <div className="books">
                {renderBooks()}
            </div>
        </div>
    )
}

export default App;
