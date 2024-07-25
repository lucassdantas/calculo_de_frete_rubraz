import React, { useState, useContext, useEffect, useRef } from "react";
import axios from "axios";
import { UserContext } from "@/context/userContext";
import { backendUrl } from "@/constants";
import UserPhoto from "@/components/UserPopup/UserPhoto";
import UserForm from "@/components/UserPopup/UserForm";

interface UserPopupProps {
  onClose: () => void;
}

const UserPopup: React.FC<UserPopupProps> = ({ onClose }) => {
  const userContext = useContext(UserContext);
  if (!userContext) return <div>Carregando...</div>;

  const [userName, setUserName] = useState(userContext.currentUser.userName);
  const [userPhone, setUserPhone] = useState(userContext.currentUser.userPhone);
  const [userCpfOrCnpj, setUserCpfOrCnpj] = useState(userContext.currentUser.userCpfOrCnpj);
  const [userEmail, setUserEmail] = useState(userContext.currentUser.userEmail);
  const [userPassword, setUserPassword] = useState("");
  const [userPhoto, setUserPhoto] = useState<File | null>(null);

  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

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

  const handlePhotoChange = (file: File) => {
    setUserPhoto(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userId", userContext.currentUser.userId.toString());
    formData.append("userName", userName);
    formData.append("userPhone", userPhone);
    formData.append("userCpfOrCnpj", userCpfOrCnpj);
    formData.append("userEmail", userEmail);
    formData.append("userPassword", userPassword);
    if (userPhoto) {
      formData.append("userPhoto", userPhoto, `${userContext.currentUser.userId}.jpg`);
    }

    try {
      const response = await axios.post(`${backendUrl}updateUser.php`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log(response)
      if (Number(response.data.user.userId) === userContext.currentUser.userId) {
        const updatedUser = {
          ...userContext.currentUser,
          ...response.data.user,
          userId:Number(response.data.user.userId)
        };
        
        console.log(userContext)
        userContext.setCurrentUser(updatedUser);
      }
      
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar o perfil:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="flex flex-col justify-center bg-white p-6 rounded-lg shadow-lg relative w-full max-w-md h-fit max-h-[99vh] overflow-y-scroll" ref={popupRef}>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">Editar Perfil</h2>
        {/* <UserPhoto
          userId={user.userId}
          userHasImage={user.userHasImage}
          onPhotoChange={handlePhotoChange}
        /> */}
        <UserForm
          userName={userName}
          userPhone={userPhone}
          userCpfOrCnpj={userCpfOrCnpj}
          userEmail={userEmail}
          userPassword={userPassword}
          onChangeName={setUserName}
          onChangePhone={setUserPhone}
          onChangeCpfOrCnpj={setUserCpfOrCnpj}
          onChangeEmail={setUserEmail}
          onChangePassword={setUserPassword}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default UserPopup;
