import React, { useState, useEffect } from 'react';
import Form from '../../components/BookForm';
import Search from '../../components/BookSearch';
import Book from '../../components/BookItem';
import Unauthorized from '../Unauthorized';
import Modal from '../../components/Modal';
import './style.css';

import api from '../../services/api'; 

function Profile () {
    const [books, setBooks] = useState([]);
    const [bookSearch, setBookSearch] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [dataBook, setDataBook] = useState({});

    async function handleRegister(data) {
        setIsSearch(false);
        await api.post('/books', data, {
            headers: {
                token: localStorage.getItem('token')
            }
        });
        const response = await api.get('/books');
        setBooks(response.data);
    }

    async function handleUpdate(id, data){
        setIsSearch(false);
        await api.put(`/books/${id}`, data, {
            headers: {
                token: localStorage.getItem('token')
            }
        });
        const response = await api.get('/books');
        setBooks(response.data);
        setModalOpen(false);
    }

    async function handleDelete(id) {
        setIsSearch(false);
        await api.delete(`/books/${id}`, {
                headers: {
                    token: localStorage.getItem('token')
                }
        });
        const response = await api.get('/books');
        setBooks(response.data);
    }

    async function handleAddUserBook(id) {
        await api.post(`users/relate?book_id=${id}`, 
        {}, {
            headers: {
                token: localStorage.getItem('token')
            }
        });

        alert('Livro Adicionado!')
    }

    async function handleSearch(name) {
        setIsSearch(true);
        const response = await api.get(`/books/search?name=${name}`);
        setBookSearch(response.data);
    }
    
    function openModal(data){
        setModalOpen(true);
        setDataBook(data);
    }

    function ModalForm(props) {
        const id = dataBook.id;
        const bookName = dataBook.name;
        const bookAuthor = dataBook.author;
        const bookGenre = dataBook.genre;
        
        const [name, setName] = useState(bookName);
        const [author, setAuthor] = useState(bookAuthor);
        const [genre, setGenre] = useState(bookGenre);


        function handleUpdate(e){
            if(!name || !author || !genre){
                return;
            }

            e.preventDefault();
            
            props.handleUpdate(id, {
                name,
                author,
                genre
            });
        }

        return(
            <Modal 
                show={modalOpen}
                closeModal={() => {setModalOpen(false)}}>
                <form className="modalForm" onSubmit={e => {handleUpdate(e)}}>
                    <input 
                    placeholder="Nome"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                    <input 
                    placeholder="Autor"
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    />
                    <input 
                    placeholder="Gênero"
                    type="text"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    />
                    <button type="submit">Atualizar</button>
                </form>
            </Modal>
    )}

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
                  openModal={(id) => openModal(id)}
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
                    <ModalForm
                        handleUpdate={(id, data) => {handleUpdate(id, data)}}
                    />
                </div>
            </div>
        </div>
    )
}

export default Profile;
