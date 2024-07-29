import React from "react";

interface UserFormProps {
  userName: string;
  userPhone: string;
  userCpfOrCnpj: string;
  userEmail: string;
  userPassword: string;
  onChangeName: (value: string) => void;
  onChangePhone: (value: string) => void;
  onChangeCpfOrCnpj: (value: string) => void;
  onChangeEmail: (value: string) => void;
  onChangePassword: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const UserForm: React.FC<UserFormProps> = ({
  userName,
  userPhone,
  userCpfOrCnpj,
  userEmail,
  userPassword,
  onChangeName,
  onChangePhone,
  onChangeCpfOrCnpj,
  onChangeEmail,
  onChangePassword,
  onSubmit,
}) => {
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
    onChangeCpfOrCnpj(formatCpfCnpj(e.target.value));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangePhone(formatPhone(e.target.value));
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div>
        <label className="block text-gray-700">Nome</label>
        <input
          type="text"
          value={userName}
          maxLength={50}
          onChange={(e) => onChangeName(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Telefone</label>
        <input
          type="text"
          value={userPhone}
          maxLength={30}
          onChange={handlePhoneChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Cpf ou CNPJ</label>
        <input
          type="text"
          value={userCpfOrCnpj}
          maxLength={30}
          onChange={handleCpfCnpjChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          value={userEmail}
          disabled
          onChange={(e) => onChangeEmail(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Senha (deixe em branco para não alterar)</label>
        <input
          type="password"
          value={userPassword}
          maxLength={255}
          onChange={(e) => onChangePassword(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
        />
      </div>
      <button
        type="submit"
        className="bg-yellow-rubraz text-white px-4 py-2 rounded-full hover:bg-blue-rubraz"
      >
        Salvar
      </button>
    </form>
  );
};

export default UserForm;