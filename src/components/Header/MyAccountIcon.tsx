import { UserContext } from '@/context/userContext';
import React, { useContext, useState, useRef } from 'react';
import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import UserPopup from '../UserPopup';

export const MyAccountIcon = () => {
  const user = useContext(UserContext);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const userId = user? user.currentUser.userId : 0 
  const handleAccountMenuOpen = () => {
    setIsAccountMenuOpen(true);
  };

  const handleAccountMenuClose = () => {
    setIsAccountMenuOpen(false);
  };

  const handlePopupOpen = () => {setIsPopupOpen(true); handleAccountMenuClose()}
  const handlePopupClose = () => setIsPopupOpen(false);

  return (
    <div 
      className='h-full relative'
      onMouseEnter={handleAccountMenuOpen} 
      onMouseLeave={handleAccountMenuClose}
    >
      <div className='flex items-center gap-2 h-full'>
        <img
          src={`http://localhost:5173/public/userImages/${userId}.jpg`}
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
        />
      )}
      {isPopupOpen && <UserPopup onClose={handlePopupClose} />}
    </div>
  );
};

const AccountMenu = ({ handlePopupOpen, handlePopupClose }: { handlePopupOpen: () => void, handlePopupClose: () => void }) => {
  return (
    <div className="bg-white p-4 absolute -mt-4">
      <span className="font-normal cursor-pointer" onClick={handlePopupOpen}>
        Configurações
      </span>
    </div>
  );
};
