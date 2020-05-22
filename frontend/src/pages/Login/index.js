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
            const response = await api.get('/session', {
                headers: {
                    name: loginName,
                    password: loginPassword
                }
            })

            const { id } = response.data;

            localStorage.setItem('logged', true);
            localStorage.setItem('username', loginName);
            localStorage.setItem('password', loginPassword);
            localStorage.setItem('user_id', id);

            if(loginName === 'admin' && loginPassword === 'admin'){
                localStorage.setItem('admin', true);
            } else {
                localStorage.setItem('admin', false);
            }
            
            setLoginName('');
            setLoginPassword('');
            
            setTimeout(history.push('/profile'), 200);
        } catch(error){
            alert('Usuário ou senha inválidos.')
        }
    }

    async function handleRegister(e){
        e.preventDefault();
        
        try{
            await api.post('/users', {
                    name: registerName,
                    password: registerPassword
            })
            
            setRegisterName('');
            setRegisterPassword('');
            alert('Cadastro feito com sucesso.')
        } catch(error){
            alert('Usuário ou senha inválidos.')
            setRegisterName('');
            setRegisterPassword('');
        }
    }
    
    return(
        <div className="login">
            <header className="page_header"><h3>Sistema de Livros</h3></header>
            <div className="forms">
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
                        type="password" 
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
                        type="password" 
                        value={registerPassword}
                        placeholder="Senha"
                        onChange={(e) => {setRegisterPassword(e.target.value)}}
                    />
                    <button type="submit">Cadastrar</button>
                </form>
            </div>
        </div>         
    );    
}