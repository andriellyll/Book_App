import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Unauthorized from '../Unauthorized';

import './style.css'

export default function Friends(){
    const [friends, setFriends] = useState([]);
    const token = localStorage.getItem('token');
    
    async function handleClick(id) {
        await api.delete(`/users/friends?user2_id=${id}`, {
            headers: {
                token
            }
        });

        const response = await api.get('/profile/friends', {
            headers: {
                token
            }
        });
            
        setFriends(response.data);
    }
    
    useEffect(() => {
        api.get('/profile/friends', {
            headers: {
                token
            }
        })
        .then(response => {
            setFriends(response.data)
        })
        .catch(error => console.error(error))
    }, [token]);
    
    if(localStorage.getItem('logged') !== 'true'){
        return <Unauthorized/>;
    }

    return(
        <div className="friends">
           <header className="page_header">
               <h3>Meus amigos</h3> 
               <div className="div_links">
                   <a className="link" href='/users'>Adicionar Amigos</a>
                   <a className="link" href='/profile'>Voltar</a>
               </div>
           </header>
           
           <ul>
                {friends.map(user => (
                    <li key={user.id}>
                        <a 
                            className='link' 
                            onClick={() => {localStorage.setItem('user_search', user.name)}} 
                            href='/user/profile'>
                                {user.name}
                        </a>
                        <button onClick={() => handleClick(user.id)}>Deletar de Meus Amigos</button>
                    </li>))}
            </ul>
        </div>
    );
}