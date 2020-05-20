import React from 'react';
import './style.css';

export default function Unauthorized(){
    return(
        <div className='unauthorized'>
            <h1>401 Unauthorized</h1>
            <p>Faça <a href='/'>login</a> para continuar</p>
        </div>
    );
}