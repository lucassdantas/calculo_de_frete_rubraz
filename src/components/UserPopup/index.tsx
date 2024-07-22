import React, { useState, useContext, useEffect, useRef } from "react";
import { UserContext } from "@/context/userContext"; // Ajuste o caminho conforme necessário

const UserPopup = ({ onClose }: { onClose: () => void }) => {
  const user = useContext(UserContext);
  const [userName, setUserName] = useState(user.userName);
  const [userPhone, setUserPhone] = useState(user.userPhone);
  const [userCnpj, setUserCnpj] = useState(user.userCnpj);
  const [userEmail, setUserEmail] = useState(user.userEmail);
  const [userPassword, setUserPassword] = useState("");
  const [userPhoto, setUserPhoto] = useState<File | null>(null);
  
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fechar o popup quando clicar fora dele
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    // Fechar o popup ao pressionar 'Esc'
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUserPhoto(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("userPhone", userPhone);
    formData.append("userCnpj", userCnpj);
    formData.append("userEmail", userEmail);
    formData.append("userPassword", userPassword);
    if (userPhoto) {
      formData.append("userPhoto", userPhoto);
    }

    await fetch('https://localhost/public/backend/updateUser.php', {
      method: 'POST',
      body: formData,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative" ref={popupRef}>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">Editar Perfil</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="block w-full mt-1"
            />
          </label>
          <label>
            Telefone:
            <input
              type="text"
              value={userPhone}
              onChange={(e) => setUserPhone(e.target.value)}
              className="block w-full mt-1"
            />
          </label>
          <label>
            CNPJ:
            <input
              type="text"
              value={userCnpj}
              onChange={(e) => setUserCnpj(e.target.value)}
              className="block w-full mt-1"
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="block w-full mt-1"
            />
          </label>
          <label>
            Senha:
            <input
              type="password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              className="block w-full mt-1"
            />
          </label>
          <label>
            Foto:
            <input
              type="file"
              onChange={handlePhotoChange}
              className="block w-full mt-1"
            />
          </label>
          <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">Salvar</button>
        </form>
      </div>
    </div>
  );
};

export default UserPopup;
