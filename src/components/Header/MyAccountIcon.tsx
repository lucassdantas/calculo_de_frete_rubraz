import { UserContext } from '@/context/userContext';
import React, { useContext, useState, useRef } from 'react';
import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import UserPopup from '../UserPopup';
import { userImagesDirectoryUrl, backendUrl, url } from '@/constants';
import axios from 'axios';

export const MyAccountIcon = () => {
  const user = useContext(UserContext);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleAccountMenuOpen = () => {
    setIsAccountMenuOpen(true);
  };

  const handleAccountMenuClose = () => {
    setIsAccountMenuOpen(false);
  };

  const handlePopupOpen = () => {
    setIsPopupOpen(true);
    handleAccountMenuClose();
  };

  const handlePopupClose = () => setIsPopupOpen(false);

  const handleLogout = async () => {
    try {
      const response = await axios.post(`${backendUrl}logout.php`, {}, { withCredentials: true });
      if (response.data.success) {
        window.location.href = url; // Redirecionar para a página de login
      } else {
        console.error('Erro ao deslogar:', response.data.message);
      }
    } catch (error) {
      console.error('Erro ao conectar ao servidor:', error);
    }
  };

  return (
    <div 
      className='h-full relative'
      onMouseEnter={handleAccountMenuOpen} 
      onMouseLeave={handleAccountMenuClose}
    >
      <div className='flex items-center gap-2 h-full'>
        <img
          src={`${userImagesDirectoryUrl}default.jpg`}
          alt='Imagem do usuário'
          className='rounded-full w-[38px] cursor-pointer'
        />
        <MdOutlineArrowDropDownCircle
          className='lg:text-xl md:text-5xl text-7xl text-white cursor-pointer'
          onClick={handleAccountMenuOpen}
        />
      </div>
      {isAccountMenuOpen && (
        <AccountMenu 
          handlePopupOpen={handlePopupOpen}
          handlePopupClose={handlePopupClose}
          handleLogout={handleLogout}
        />
      )}
      {isPopupOpen && <UserPopup onClose={handlePopupClose} />}
    </div>
  );
};

const AccountMenu = ({ handlePopupOpen, handlePopupClose, handleLogout }: { handlePopupOpen: () => void, handlePopupClose: () => void, handleLogout: () => void }) => {
  return (
    <div className="flex flex-col divide-y-2 gap-4 bg-white p-4 absolute -mt-4 rounded-[20px]">
      <span className="font-normal cursor-pointer py-2" onClick={handlePopupOpen}>
        Configurações
      </span>
      <span className="font-normal cursor-pointer py-2" onClick={handleLogout}>
        Sair
      </span>
    </div>
  );
};
