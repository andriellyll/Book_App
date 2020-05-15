import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './style.css';

import api from '../../services/api'

export default function Login(){
    const [loginName, setLoginName] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [registerName, setRegisterName] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');

    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try{
            await api.get('/session', {
                headers: {
                    name: loginName,
                    password: loginPassword
                }
            })

            setLoginName('');
            setLoginPassword('');

            localStorage.setItem('username', loginName);
            localStorage.setItem('password', loginPassword);

            history.push('/profile');
        } catch(error){
            alert('Usuário ou senha inválidos.')
        }
    }

    async function handleRegister(e){
        e.preventDefault();
        console.log(registerPassword, registerName)
        try{
            await api.post('/users', {}, {
                headers: {
                    name: registerName,
                    password: registerPassword
                }
            })
            
            setRegisterName('');
            setRegisterPassword('');
            alert('Cadastro feito com sucesso.')
        } catch(error){
            alert('Usuário ou senha inválidos.')
        }
    }
    
    return(
        <div className="login">
            <form id="logon" onSubmit={e => {handleLogin(e)}}>
                <header>Faça login</header>
                <input 
                    value={loginName} 
                    type="text" 
                    placeholder="Username"
                    onChange={(e) => {setLoginName(e.target.value)}}
                />
                <input
                    value={loginPassword} 
                    type="text" 
                    placeholder="Senha"
                    onChange={(e) => {setLoginPassword(e.target.value)}}
                />
                <button type="submit">Entrar</button>
            </form>
           
            <h1>OU</h1>

            <form id="register" onSubmit={e => {handleRegister(e)}}>
                <header>Cadastre-se</header>
                <input
                    type="text" 
                    value={registerName}
                    placeholder="Username"
                    onChange={(e) => {setRegisterName(e.target.value)}}
                />
                <input 
                    type="text" 
                    value={registerPassword}
                    placeholder="Senha"
                    onChange={(e) => {setRegisterPassword(e.target.value)}}
                />
                <button type="submit">Cadastrar</button>
            </form>
        </div>         
    );    
}