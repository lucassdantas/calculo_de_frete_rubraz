import axios from 'axios';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { backendUrl, url } from '@/constants';

export const RegisterForm = ({ setAuth, setCurrentForm }: any) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [cpfCnpj, setCpfCnpj] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [message, setMessage] = useState<string>('');
  const navigate = useNavigate();

  const formatCpfCnpj = (value: string) => {
    const cleanedValue = value.replace(/\D/g, '');

    if (cleanedValue.length <= 11) {
      return cleanedValue
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
        .substring(0, 14);
    } else {
      return cleanedValue
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d{1,2})$/, '$1-$2')
        .substring(0, 18);
    }
  };

  const formatPhone = (value: string) => {
    const cleanedValue = value.replace(/\D/g, '');

    if (cleanedValue.length <= 10) {
      // Telefone fixo
      return cleanedValue
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d{4})$/, '$1-$2')
        .substring(0, 14);
    } else if (cleanedValue.length <= 11) {
      // Celular
      return cleanedValue
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d{4})$/, '$1-$2')
        .substring(0, 15);
    } else {
      // Número com código do país
      return cleanedValue;
    }
  };

  const handleCpfCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCpfCnpj(formatCpfCnpj(e.target.value));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!username || !password || !email || !cpfCnpj || !phone) {
      setMessage('Todos os campos são obrigatórios.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      formData.append('email', email);
      formData.append('cpfCnpj', cpfCnpj);
      formData.append('phone', phone);
      if (photo) formData.append('photo', photo);

      const response = await axios.post(`${backendUrl}createAccount.php`, formData, { withCredentials: true });
      
      if (response.data.success) {
        setMessage('Conta criada com sucesso!');
        navigate(url);
        setCurrentForm('login');
      } else {
        setMessage(response.data.message || 'Erro ao criar a conta.');
      }
    } catch (error) {
      setMessage('Erro ao conectar ao servidor');
    }
  };

  return (
    <form className="max-w-lg mx-auto p-4 rounded-lg shadow-lg" onSubmit={handleSubmit}>
      <div className="mb-4">
        <input
          type="text"
          maxLength={50}
          placeholder="Nome"
          className="w-full p-4 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-rubraz"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <input
          type="email"
          maxLength={50}
          placeholder="E-mail"
          className="w-full p-4 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-rubraz"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          value={cpfCnpj}
          placeholder="CPF/CNPJ"
          className="w-full p-4 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-rubraz"
          onChange={handleCpfCnpjChange}
        />
      </div>
      <div className="mb-4">
        <input
          type="tel"
          value={phone}
          placeholder="Telefone/Celular com DDD"
          className="w-full p-4 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-rubraz"
          onChange={handlePhoneChange}
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          placeholder="Senha"
          maxLength={255}
          className="w-full p-4 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-rubraz"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="w-full py-4 bg-yellow-rubraz hover:bg-light-yellow-rubraz text-white font-bold rounded-full"
      >
        Criar Conta
      </button>
      {message && <p className="text-yellow-rubraz font-bold mt-4">{message}</p>}
    </form>
  );
};
