import FooterInfo from '@/components/Main/FooterInfo'
import React from 'react'

export const Footer = () => {
  return (
    <div className='mt-5'>
      <FooterInfo />
      <div className="lg:hidden lg:invisible flex flex-col  justify-center items-center text-base bg-yellow-rubraz text-black  p-2 w-full z-20 relative ">
        <div>
          <p><span className='font-bold'>CNPJ: </span>22.577.009/0001-00 </p>
          <p><span className='font-bold'>CREA-RJ: </span>2023200826 </p>
        </div>
      </div>
      <footer className='w-full bg-black text-center text-white py-4 text-sm z-20 relative px-4'>
        Copyright © 2024 Rubraz Lajes & Concretos. Todos os direitos reservados. | Desenvolvido por R&D Marketing Digital. Agência de Marketing Digital.
      </footer>
    </div>
  )
}
