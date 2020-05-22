import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import './style.css'
import Unauthorized from '../Unauthorized';

export default function Users() {
    const [users, setUsers] = useState([]);
    const logged_id = localStorage.getItem('user_id');

    async function handleClick(id) {
        try{
            await api.post(`/users/friends?user1_id=${logged_id}&user2_id=${id}`, {}, {
                headers: {
                    id: logged_id 
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
    }, [logged_id]);

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