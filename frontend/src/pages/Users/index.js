import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import './style.css'
import Unauthorized from '../Unauthorized';

export default function Users() {
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem('token');

    async function handleClick(id) {
        try{
            await api.post(`/users/friends?user2_id=${id}`, {}, {
                headers: {
                    token: localStorage.getItem('token')
                }
            });
            alert('Amigo adicionado!')
        }catch(error){
            console.log(error)
        }
    }

    function renderUsers(){        
        return(
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.name}
                        <button onClick={() => {handleClick(user.id)}}>Adicionar aos Meus Amigos</button>
                    </li>))}
            </ul>
        )
    }
    
    useEffect(() => {
        api.get('/users')
        .then(response => {setUsers(response.data)})
        .catch(error => {console.log(error)});
    }, [token]);

    if(localStorage.getItem('logged') !== 'true'){
        return <Unauthorized/>;
    }

    return(
        <div className="users">
            <header className="page_header">
                <h3>Usuários</h3>
                <a href="/profile" className="link">Voltar</a>
            </header>
            {renderUsers()}
        </div>
    );
}