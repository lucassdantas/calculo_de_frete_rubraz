import React, { useState, FormEvent } from 'react';
import axios, { AxiosResponse } from 'axios'; 
import engineerImg from '@/assets/engenheiro-rubraz-calculadora-distancia.png';
import compelteEngineerImg from '@/assets/engenheiro-rubraz-calculadora-distancia-com-fundo.png';
import { AuthResponse, AuthProps } from '../../types/auth';
import { useNavigate } from "react-router-dom";
import {Logo} from '@/components/Header/Logo'
import whiteLogoRubraz from "@/assets/Logo-Rubraz-branco.png";

import './style.css';



export const Login = ({setAuth}:any) => {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('backend/login.php', { username, password }, { withCredentials: true });

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
      <div className="flex flex-col items-center text-center justify-center min-h-screen w-full px-4">
        <img src={whiteLogoRubraz} alt="Logo branca rubraz" className="w-[128px]  mb-12" />
        <div className="bg-opacity-30 bg-dark-blue-rubraz rounded-xl p-8 border border-white border-opacity-30 max-w-lg w-full">
          <div className="text-center mb-6">
            <h2 className="text-2xl  text-white">Área de login</h2>
          </div>

          <form className="" onSubmit={handleSubmit}>
            <div className='mb-4'>
              <input
                type="text"
                placeholder="Usuário"
                className="w-full p-4 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-rubraz"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className='mb-2'>
              <input
                type="password"
                placeholder="Senha"
                className="w-full p-4 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-rubraz"
                onChange={(e) => setPassword(e.target.value)}

              />
            </div>
            <div className='text-white w-full text-left mb-4 '>
              <span>Esqueci minha senha</span>
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-yellow-rubraz hover:bg-light-yellow-rubraz text-white font-bold rounded-full"
            >
              Entrar
            </button>
          </form>
       
          <div className="flex lg:flex-row flex-col justify-between mt-4 text-white">
            <a href="#" className="hover:underline">Criar conta</a>
            <a href="#" className="hover:underline">Precisa de ajuda?</a>
          </div>
        </div>
      </div>
    );
  };