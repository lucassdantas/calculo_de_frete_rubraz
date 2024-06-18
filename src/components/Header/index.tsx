import whiteLogoRubraz from "@/assets/Logo-Rubraz-branco.png";
import { FaFacebookF, FaTimes } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import wppIcon from "@/assets/icone-de-whatsapp.png";
import hamburguerIcon from '@/assets/barras-menu-hamburguer.png';
import { useState } from "react";

export const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <header className='w-full flex justify-center z-10 px-4 '>
      <div className="max-w-[1280px] w-full ">
  
        <div className="flex w-full py-5 ">
          <div className="flex flex-col items-start w-1/3 max-w-[320px]">
            <img src={whiteLogoRubraz} alt='Logo branca rubraz' className={'w-[128px] '}/>
          </div>

          <div className="flex flex-col w-2/3 text-black bg-yellow-rubraz rounded-full font-bold items-start max-w-[740px] ">
            <div className="hidden lg:block bg-yellow-rubraz rounded-full w-full h-[73px] absolute top-5 -right-[50%] -z-10"></div>
            
            <div className="flex lg:px-4 px-6 gap-4 text-lg flex-nowrap lg:flex-nowrap h-full w-full ">
              <div className="flex lg:flex-col gap-4 lg:gap-0 lg:w-1/3 w-full md:w-[70%] items-center justify-between lg:justify-center ">
                <a className='flex gap-2 items-center justify-center ' href='https://api.whatsapp.com/send/?phone=5521979808794&text=Ol%C3%A1%2C+venho+atrav%C3%A9s+do+site+e+gostaria+de+or%C3%A7amento.+Poderia+me+ajudar%3F&type=phone_number&app_absent=0' target="_blank">
                  <div className="rounded-full lg:w-[38px] flex justify-center items-center ">
                    <img src={wppIcon} alt='Icone de whatsApp' className='text-white md:w-[40px] w-[30px] '/>
                  </div>
                  <span className='md:text-base text-[14px]'>21 97980-8794</span>
                </a>
                <div className='lg:hidden flex justify-center'>
                  {isOpen ? (
                      <FaTimes className='md:text-2xl lg:hidden' onClick={() => setIsOpen(!isOpen)} />
                    ) : (
                      <img src={hamburguerIcon} alt='icone menu hamburguer' className='md:w-[42px] w-[32px] lg:hidden' onClick={() => setIsOpen(!isOpen)}/>
                    )}

                    {isOpen && (
                      <div className="absolute top-24 md:right-auto right-0.5">
                        <div className="bg-white shadow-md rounded-lg py-4 px-6 mt-2 relative z-20">
                          <div className="absolute top-[-10px] left-[50%] transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-white"></div>
                          <ul className="flex flex-col gap-4">
                            <li><a href='https://www.facebook.com/rubrazlajes' target='_blank' className='text-blue-rubraz flex items-center gap-2 md:text-base text-sm'><FaFacebookF className='md:text-2xl text-sm'/> Facebook</a></li>
                            <li><a href='https://www.instagram.com/rubrazlajes/' target='_blank' className='text-blue-rubraz flex items-center gap-2 md:text-base text-sm'><FaInstagram className='md:text-2xl text-sm'/> Instagram</a></li>
                            <li><a href='https://rubrazlajes.com/' target="_blank" className='text-blue-rubraz flex items-center gap-2 md:text-base text-sm'>rubrazlajes.com</a></li>
                          </ul>
                        </div>
                      </div>
                    )}
                </div>
               
              </div>
              <div className="hidden lg:flex flex-col lg:w-1/3 w-1/8 items-center lg:items-end justify-center ">
                <a href='https://rubrazlajes.com/' target="_blank" className='items-center hidden lg:block'>rubrazlajes.com</a>
                
             
              </div>
              <div className="hidden lg:flex flex-col w-1/3 items-end justify-center">
                <ul className='hidden lg:flex gap-2'>
                  <li className=''><a href='https://www.facebook.com/rubrazlajes' target='_blank' className='text-blue-rubraz'><FaFacebookF className='bg-white p-2 text-4xl rounded-full'/></a></li>
                  <li className=''><a href='https://www.instagram.com/rubrazlajes/' target='_blank' className='text-blue-rubraz'><FaInstagram className='bg-white p-2 text-4xl rounded-full'/></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      

      </div>
    </header>
  )
}
