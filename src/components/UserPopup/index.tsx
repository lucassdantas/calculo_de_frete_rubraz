import React, { useState, useContext, useEffect, useRef } from "react";
import { UserContext } from "@/context/userContext";
import Cropper from 'react-easy-crop';
import { getCroppedImg } from '@/utils/cropImage';
import { MdEdit } from "react-icons/md";

interface UserPopupProps {
  onClose: () => void;
}

const UserPopup: React.FC<UserPopupProps> = ({ onClose }) => {
  const currentUser = useContext(UserContext);
  if(!currentUser) return <div>Carregando...</div>
  const user = currentUser?.currentUser
  const [userName, setUserName] = useState(user.userName);
  const [userPhone, setUserPhone] = useState(user.userPhone);
  const [userCnpj, setUserCnpj] = useState(user.userCnpj);
  const [userEmail, setUserEmail] = useState(user.userEmail);
  const [userPassword, setUserPassword] = useState("");
  const [userPhoto, setUserPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [isCropping, setIsCropping] = useState(false);

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

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === "image/jpeg") {
        setUserPhoto(file);
        setPhotoPreview(URL.createObjectURL(file));
        setIsCropping(true);
      } else {
        alert("Somente imagens JPG são aceitas.");
      }
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
    if (croppedImage) {
      formData.append("userPhoto", croppedImage);
    }

    await fetch('https://localhost/public/backend/updateUser.php', {
      method: 'POST',
      body: formData,
    });

    onClose();
  };

  const handleCropComplete = async (croppedArea: any, croppedAreaPixels: any) => {
    const croppedImg = await getCroppedImg(photoPreview as string, croppedAreaPixels);
    setCroppedImage(URL.createObjectURL(croppedImg));
    setIsCropping(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="flex flex-col justify-center bg-white p-6 rounded-lg shadow-lg relative w-full max-w-md h-fit max-h-[90vh] overflow-y-scroll " ref={popupRef}>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">Editar Perfil</h2>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <div className="relative">
            {photoPreview && isCropping ? (
              <div className="relative w-full h-[300px] bg-gray-200">
                <Cropper
                  image={photoPreview}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={handleCropComplete}
                />
                <div className="absolute bottom-0 left-0 w-full p-2 flex justify-between bg-gray-800 bg-opacity-50">
                  <button
                    type="button"
                    onClick={() => setIsCropping(false)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCropComplete({}, {})}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Confirmar
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative flex items-end justify-start">
                <img
                  src={userPhoto ? `http://localhost:5173/userImages/${user.userId}.jpg`:'http://localhost:5173/userImages/default.jpg'}
                  alt="Foto do usuário"
                  className="rounded-full w-24 h-24 object-cover -mr-6"
                />
                <input
                  type="file"
                  onChange={handlePhotoChange}
                  accept="image/jpeg"
                  className="hidden"
                  id="photoInput"
                />
                <label htmlFor="photoInput" className=" bg-yellow-500 p-1 rounded-full cursor-pointer mb-2">
                  <MdEdit className="text-white text-sm"/>
                </label>
              </div>
            )}
          </div>
          <label>
            Nome:
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="block w-full mt-1 border px-2 font-normal"
            />
          </label>
          <label>
            Telefone:
            <input
              type="text"
              value={userPhone}
              onChange={(e) => setUserPhone(e.target.value)}
              className="block w-full mt-1 border px-2 font-normal"
            />
          </label>
          <label>
            CNPJ:
            <input
              type="text"
              value={userCnpj}
              onChange={(e) => setUserCnpj(e.target.value)}
              className="block w-full mt-1 border px-2 font-normal"
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="block w-full mt-1 border px-2 font-normal"
            />
          </label>
          <label>
            Senha:
            <input
              type="password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              className="block w-full mt-1 border px-2 font-normal"
            />
          </label>
          <button type="submit" className="mt-4 bg-yellow-500 text-white p-2 rounded">Salvar</button>
        </form>
      </div>
    </div>
  );
};

export default UserPopup;
