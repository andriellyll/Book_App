import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import './style.css'

export default function Friends(){
    const [friends, setFriends] = useState([]);
    const user_id = localStorage.getItem('user_id');
    
    
    useEffect(() => {
        api.get('/profile/friends', {
            headers:{
                user_id: localStorage.getItem('user_id')
            }
        })
        .then(response => {
            setFriends(response.data)
        })
        .catch(error => console.error(error))
    }, [user_id]);
    

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
                {friends.map(user => (<li key={user.id}>{user.name}</li>))}
            </ul>
        </div>
    );
}