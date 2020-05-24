import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import './style.css';

export default function ProfileUser() {
    const [books, setBooks] = useState([]);
    const username = localStorage.getItem('user_search')

    function Book(props) {
        return(
            <div className="book-item">
                <header>{props.name}</header>
                <div className="book-info">
                    <span><strong>Autor: </strong>{props.author}</span>
                    <span><strong>Gênero: </strong>{props.genre}</span>
                </div>
            </div>
      );
    }

    function renderBooks() {
        return(
            <ul>
                {books.map(book => (
                    <Book
                        key={book.id}
                        name={book.name}
                        author={book.author}
                        genre={book.genre}
                        id={book.id}
                    />
                ))}
            </ul>
        );
    }

    useEffect(() => {
        api.get('/users/relate', {
            headers: {
                username
            }
        })
            .then(response => { setBooks(response.data) })
            .catch(err => console.error(err));
    }, [username])

    return(
        <div className="profile_user">
            <header className="page_header">
                <h3>Perfil de {username}</h3>
                <a className="link" href="/friends">Voltar</a>
            </header>
            {renderBooks()}
        </div>
    );
}