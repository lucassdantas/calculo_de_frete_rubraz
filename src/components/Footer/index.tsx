import React from 'react'

export const Footer = () => {
  return (
    <>
      < div className="lg:hidden lg:invisible flex justify-center gap-6 text-base bg-yellow-rubraz text-black  p-6  text-left w-full z-20 relative ">
          <p><span className='font-bold'>CNPJ: </span>22.577.009/0001-00 </p>
          <p><span className='font-bold'>CREA-RJ: </span>2023200826 </p>
      </div>
      <footer className='w-full bg-black text-center text-white py-4 text-sm z-20 relative px-4'>
        Copyright © 2024 Rubraz Lajes & Concretos. Todos os direitos reservados. | Desenvolvido por R&D Marketing Digital. Agência de Marketing Digital.
      </footer>
    </>
  )
}
