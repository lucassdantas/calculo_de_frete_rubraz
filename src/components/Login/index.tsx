import React, { useState, FormEvent } from 'react';
import axios, { AxiosResponse } from 'axios'; 
import engineerImg from '@/assets/engenheiro-rubraz-calculadora-distancia.png';
import compelteEngineerImg from '@/assets/engenheiro-rubraz-calculadora-distancia-com-fundo.png';
import { AuthResponse, AuthProps } from '../../types/auth';
import { useNavigate } from "react-router-dom";
import './style.css';



export const Login = ({setAuth, Component}:any) => {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:80/rubraz/calculo_de_frete_rubraz/public/backend/login.php', { username, password }, { withCredentials: true });

            console.log(response)

            if (response.data) {
                
                setMessage("sucesso!");
                setAuth(true); 
                navigate('/main');
            } else {
                setMessage('Erro ao fazer login');
            }
        } catch (error) {
            setMessage('Erro ao conectar ao servidor');
        }
    };
    return (
        <div className='container'>
            <div className='loginContainer'>
                <form onSubmit={handleSubmit}>
                    <div className='titleLogin'><h1>Login</h1></div>
                    <input className='userInput' type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Usuário' name='username'/>
                    <input className='passwordInput' type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Senha' name='password'/>
                    <button className='buttonLogin' type='submit'>Entrar</button>
                </form>
                {message && <p className='message'>{message}</p>}
            </div>
        </div>
        
    );
  };