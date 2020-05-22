import React, { useState, useEffect } from 'react';
import Form from '../../components/BookForm';
import Search from '../../components/BookSearch';
import Book from '../../components/BookItem';
import './style.css';

import api from '../../services/api'; 
import Unauthorized from '../Unauthorized';

function Profile () {
    const [books, setBooks] = useState([]);
    const [bookSearch, setBookSearch] = useState([]);
    const [isSearch, setIsSearch] = useState(false);

    async function handleRegister(data) {
        setIsSearch(false);
        await api.post('/books', data);
        const response = await api.get('/books');
        setBooks(response.data);
    }

    async function handleDelete(id) {
        setIsSearch(false);
        await api.delete(`/books/${id}`);
        const response = await api.get('/books');
        setBooks(response.data);
    }

    async function handleAddUserBook(id) {
        await api.post(`users/relate?user_id=${localStorage.getItem('user_id')}&book_id=${id}`, 
        {}, {
            headers: {
                name: localStorage.getItem('username'),
                password: localStorage.getItem('password')
            }
        });

        alert('Livro Adicionado!')
    }

    async function handleSearch(name) {
        setIsSearch(true);
        const response = await api.get(`/books/search?name=${name}`);
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
                  key={book.id}
                  name={book.name} 
                  author={book.author} 
                  genre={book.genre}
                  id={book.id}
                  handleDelete={(id) => handleDelete(id)}
                  handleAddUserBook={(id) => handleAddUserBook(id)}
              />
        )));
    }

    // useEffect eh como o componentDidMount, componentDidupdate e componentWillUnmount (que sao usados em componentes de classes) juntos   
    // componentes de classe nao tem um metodo de executar o mesmo efeito colateral em cada renderização
    
    useEffect(() => {
        api.get('/books')
            .then(response => {
                setBooks(response.data);
            });
    }, [isSearch]);

    if(localStorage.getItem('logged') !== 'true'){
        return <Unauthorized/>;
    }

    return (
        <div className="profile">
            <header className="page_header">
                <h3>Bem vindo(a), {localStorage.getItem('username')}</h3>
                <div className="links">
                    <a className="link" href='/books'>Meus Livros</a>
                    <a className="link" href='/friends'>Meus Amigos</a>
                    <a 
                        className="link"
                        href='/' 
                        onClick={() => {localStorage.clear()}}>
                        Sair
                    </a>
                </div>
            </header>
            <div className="profile_books">
                <div className="inputs">
                    <Form onSubmit={(data) => handleRegister(data)}/>
                    <Search onSubmit={(name) => handleSearch(name)}/>
                </div>
                <div className="books">
                    {renderBooks()}
                </div>
            </div>
        </div>
    )
}

export default Profile;
