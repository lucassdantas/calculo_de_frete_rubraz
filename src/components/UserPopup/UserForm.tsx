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
}) => (
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
        onChange={(e) => onChangePhone(e.target.value)}
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
        onChange={(e) => onChangeCpfOrCnpj(e.target.value)}
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

export default UserForm;
