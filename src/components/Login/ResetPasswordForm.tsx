import React, { FormEvent, useState } from 'react';
import axios from 'axios';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { backendUrl } from '@/constants';
import whiteLogoRubraz from "@/assets/Logo-Rubraz-branco.png";

import './style.css'
const ResetPasswordForm = () => {
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('As senhas não coincidem!');
      return;
    }
    try {
      const response = await axios.post(`${backendUrl}resetPassword.php`, { password, token }, { withCredentials: true });
      if (response.data.success) {
        setMessage('Senha redefinida com sucesso!');
        navigate('/');
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage('Erro ao conectar ao servidor');
    }
  };

  return (
    <div className='mainComponent flex flex-col min-h-screen w-full relative justify-center items-center px-4'>
      <div className="bgImage absolute inset-0  z-0"></div>
      <div className="relative z-10 w-full overflow-x-hidden"></div>
      <img src={whiteLogoRubraz} alt="Logo branca rubraz" className="w-[128px]  mb-12 z-10" />
      <form className="mainComponent max-w-xl mx-auto shadow-lg z-10 bg-opacity-30 bg-dark-blue-rubraz rounded-xl p-8 border border-white border-opacity-30 w-full" onSubmit={handleSubmit}>
          <div className="text-center mb-6">
            <h2 className="text-2xl  text-white">Defina sua nova senha</h2>
          </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Digite sua nova senha"
            className="w-full p-4 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-rubraz"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Confirme sua nova senha"
            className="w-full p-4 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-rubraz"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="w-full py-4 bg-yellow-rubraz hover:bg-light-yellow-rubraz text-white font-bold rounded-full">
          Redefinir senha
        </button>
        {message && <p className="text-center mt-4 font-bold text-yellow-rubraz">{message}</p>}
        <div className="flex sm:flex-row flex-col sm:justify-between items-center mt-4 text-white">
          <Link className="hover:underline  cursor-pointer" to='/'>Faça login</Link>
          <a href="https://api.whatsapp.com/send/?phone=5521979808794&text=Ol%C3%A1%2C+venho+atrav%C3%A9s+do+site+e+gostaria+de+or%C3%A7amento.+Poderia+me+ajudar%3F&type=phone_number&app_absent=0" target='_blank' className="hover:underline">Precisa de ajuda?</a>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordForm;