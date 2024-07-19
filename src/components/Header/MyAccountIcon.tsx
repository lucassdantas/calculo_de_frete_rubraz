import { UserContext } from '@/context/userContext'
import React, { useContext, useState } from 'react'
import { MdOutlineArrowDropDownCircle } from "react-icons/md";

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
          <MdOutlineArrowDropDownCircle className='text-2xl text-white cursor-pointer' 
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

const AccountMenu = ({handleAccountMenuClose}:any) => {
  const user = useContext(UserContext)
  return (
    <div className='bg-white p-4 absolute -mt-4' onMouseLeave={() => handleAccountMenuClose()}>
      <span className='font-normal cursor-pointer'>Configurações</span>
    </div>
  )
}
