import axios from 'axios';
import React, { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const LoginForm = ({setAuth, setCurrentForm}:any) => {
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
              navigate('/');
          } else setMessage('Usuário não encontrado. Caso não possua uma conta, crie uma.');
      } catch(error) {setMessage('Erro ao conectar ao servidor');}
  };
  return (
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
        <span className='cursor-pointer' onClick={() => setCurrentForm('forgetPassword')}>Esqueci minha senha</span>
      </div>
      <button type="submit" className="w-full py-4 bg-yellow-rubraz hover:bg-light-yellow-rubraz text-white font-bold rounded-full">
        Entrar
      </button>
    </form>
  )
}
