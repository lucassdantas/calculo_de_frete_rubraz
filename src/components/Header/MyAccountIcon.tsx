import { UserContext } from '@/context/userContext'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import UserPopup from '../UserPopup';

export const MyAccountIcon = () => {
  const user = useContext(UserContext)
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false)
  const handleAccountMenuOpen = () => {
    setIsAccountMenuOpen(!isAccountMenuOpen)
  }
  const handleAccountMenuClose = () => {
    setIsAccountMenuOpen(false)
  }
  return (
    <div className='h-full'>
      <div className='flex items-center gap-2 h-full'>
        <img src={'http://localhost:5173/public/userImages/'+user.userId+'.jpg'} alt='Imagem do usuário' className='rounded-full w-[50px] cursor-pointer'/> 
          <MdOutlineArrowDropDownCircle className='lg:text-2xl md:text-5xl text-7xl text-white cursor-pointer' 
          onMouseOver={() => setIsAccountMenuOpen(true)} 
          onClick={() => handleAccountMenuOpen()}
          
          />
      </div>
      {isAccountMenuOpen &&
      <AccountMenu handleAccountMenuClose={handleAccountMenuClose}/>
    }
    </div>
  
  )
}

const AccountMenu = ({ handleAccountMenuClose }: { handleAccountMenuClose: () => void }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handlePopupOpen = () => setIsPopupOpen(true);
  const handlePopupClose = () => setIsPopupOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        handleAccountMenuClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleAccountMenuClose]);

  return (
    <div
      className="bg-white p-4 absolute -mt-4"
      ref={menuRef}
    >
      <span className="font-normal cursor-pointer" onClick={handlePopupOpen}>Configurações</span>
      {isPopupOpen && <UserPopup onClose={handlePopupClose} />}
    </div>
  );
};
