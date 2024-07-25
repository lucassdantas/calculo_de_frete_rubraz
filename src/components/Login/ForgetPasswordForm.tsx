import { backendUrl } from '@/constants';
import axios from 'axios';
import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ForgetPasswordForm = ({ setAuth }: any) => {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}forgetPassword.php`, { email }, { withCredentials: true });
      if (response.data.success) {
        setMessage('E-mail de recuperação enviado com sucesso!');
        // Navega para uma página de confirmação ou retorna à página inicial
        navigate('/');
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage('Erro ao conectar ao servidor');
    }
  };

  return (
    <form className="max-w-lg mx-auto p-4 rounded-lg shadow-lg" onSubmit={handleSubmit}>
      <div className='mb-4'>
        <input
          type="email"
          placeholder="Digite seu e-mail"
          className="w-full p-4 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-rubraz"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="w-full py-4 bg-yellow-rubraz hover:bg-light-yellow-rubraz text-white font-bold rounded-full"
      >
        Recuperar senha
      </button>
      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
    </form>
  );
};
