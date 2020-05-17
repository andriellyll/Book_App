import React, { useState, useEffect } from  'react';

import api from '../../services/api';
import '../../components/BookItem/style.css'
import './style.css'

export default function ProfileBooks(){
    const [books, setBooks] = useState([]);
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    const user_id = localStorage.getItem('user_id');

    async function handleDelete(id){
        await api.delete(`/users/relate?user_id=${user_id}&book_id=${id}`, {
            headers: {
                name: username,
                password: password
            }
        });

        const response = await api.get(`users/relate?user_id=${user_id}`, {
            headers: {
                name: username,
                password: password
            }
        });

        setBooks(response.data)
    }

    function Book(props) {
        return (
          <div className="book-item">
            <header>{props.name}</header>
            <div className="book-info">
              <span><strong>Autor: </strong>{props.author}</span>
              <span><strong>Gênero: </strong>{props.genre}</span>
              <div className="buttons">
                <button id="delete" onClick={() => {handleDelete(props.id)}}>Deletar de Meus Livros</button>
              </div>
            </div>
          </div>
        );
      }

    function renderBooks() {
        
        return(books.map(book => (
            <Book
                key={book.id}
                name={book.name}
                author={book.author}
                genre={book.genre}
                id={book.id}
            />
        )));
    }

    useEffect(() => {
        api.get(`users/relate?user_id=${user_id}`, {
            headers: {
                name: username,
                password: password
            }
        })
            .then(response => {
                setBooks(response.data);
            });
    }, [user_id, username, password]);

    return(
        <div className="books_profile">
            <header id='header'>
                <h3>Meus Livros</h3> 
                <a href='/profile'>Voltar</a>
            </header>
            <div id="books">
                {renderBooks()}
            </div>
        </div>
    );
}