import axios from 'axios';
import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCamera } from 'react-icons/fa';

export const RegisterForm = ({ setAuth }: any) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [cpfCnpj, setCpfCnpj] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [message, setMessage] = useState<string>('');
  const [currentForm, setCurrentForm] = useState('login');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      formData.append('email', email);
      formData.append('cpfCnpj', cpfCnpj);
      formData.append('phone', phone);
      if (photo) formData.append('photo', photo);

      const response = await axios.post('backend/login.php', formData, { withCredentials: true });
      console.log(response);
      if (response.data) {
        setMessage('sucesso!');
        setAuth(true);
        navigate('/');
      } else setMessage('Usuário não encontrado. Caso não possua uma conta, crie uma.');
    } catch (error) {
      setMessage('Erro ao conectar ao servidor');
    }
  };

  return (
    <form className="max-w-lg mx-auto p-4 rounded-lg shadow-lg " onSubmit={handleSubmit}>
      <div className="text-center mb-4">
        <label htmlFor="photo" className="relative cursor-pointer">
          <FaCamera className="text-4xl text-gray-700" />
          <input
            type="file"
            id="photo"
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files ? e.target.files[0] : null)}
          />
        </label>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Nome"
          className="w-full p-4 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-rubraz"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <input
          type="email"
          placeholder="E-mail"
          className="w-full p-4 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-rubraz"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="CPF/CNPJ"
          className="w-full p-4 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-rubraz"
          onChange={(e) => setCpfCnpj(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <input
          type="tel"
          placeholder="Telefone"
          className="w-full p-4 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-rubraz"
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          placeholder="Senha"
          className="w-full p-4 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-rubraz"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="w-full py-4 bg-yellow-rubraz hover:bg-light-yellow-rubraz text-white font-bold rounded-full"
      >
        Entrar
      </button>
    </form>
  );
};
