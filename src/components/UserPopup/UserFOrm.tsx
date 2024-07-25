import React from "react";

interface UserFormProps {
  userName: string;
  userPhone: string;
  userCnpj: string;
  userEmail: string;
  userPassword: string;
  onChangeName: (value: string) => void;
  onChangePhone: (value: string) => void;
  onChangeCnpj: (value: string) => void;
  onChangeEmail: (value: string) => void;
  onChangePassword: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const UserForm: React.FC<UserFormProps> = ({
  userName,
  userPhone,
  userCnpj,
  userEmail,
  userPassword,
  onChangeName,
  onChangePhone,
  onChangeCnpj,
  onChangeEmail,
  onChangePassword,
  onSubmit,
}) => (
  <form onSubmit={onSubmit} className="flex flex-col gap-4">
    <div>
      <label className="block text-gray-700">Nome</label>
      <input
        type="text"
        value={userName}
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
        onChange={(e) => onChangePhone(e.target.value)}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
        required
      />
    </div>
    <div>
      <label className="block text-gray-700">Cpf ou CNPJ</label>
      <input
        type="text"
        value={userCnpj}
        onChange={(e) => onChangeCnpj(e.target.value)}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
        required
      />
    </div>
    <div>
      <label className="block text-gray-700">Email</label>
      <input
        type="email"
        value={userEmail}
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

export default UserForm;
