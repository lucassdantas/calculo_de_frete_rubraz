import { UserContext } from '@/context/userContext'
import React, { useContext } from 'react'

export const MyAccountIcon = () => {
  const user = useContext(UserContext)

  return (
    <div className='flex items-center'>
        <img src={'http://localhost:5173/public/userImages/'+user.userId+'.jpg'} alt='Imagem do usuário' className='rounded-full w-[50px]'/>
    </div>
  )
}
