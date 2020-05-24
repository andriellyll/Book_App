import React, { useState, useEffect } from  'react';

import api from '../../services/api';
import '../../components/BookItem/style.css'
import './style.css'
import Unauthorized from '../Unauthorized';

export default function ProfileBooks(){
    const [books, setBooks] = useState([]);
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');

    async function handleDelete(id){
        await api.delete(`/users/relate?book_id=${id}`, {
            headers: {
                token: token
            }
        });

        const response = await api.get('users/relate', {
            headers: {
                username: username
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
        
        return(
            books.map(book => (
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
        api.get('users/relate', {
            headers: {
                username: username
            }
        })
            .then(response => {
                setBooks(response.data);
            })
            .catch(err => {console.log(err)});
    }, [token, username]);

    if(localStorage.getItem('logged') !== 'true'){
        return <Unauthorized/>;
    }

    return(
        <div className="books_profile">
            <header className="page_header">
                <h3>Meus Livros</h3> 
                <a className="link" href='/profile'>Voltar</a>
            </header>
            <div id="books">
                {renderBooks()}
            </div>
        </div>
    );
}