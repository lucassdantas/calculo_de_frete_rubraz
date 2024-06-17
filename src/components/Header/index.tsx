import whiteLogoRubraz from "@/assets/Logo-Rubraz-branco.png"
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";

export const Header = () => {
  return (
    <header className='w-full flex justify-center z-10 px-4 '>
      <div className="max-w-[1280px] w-full ">
  
        <div className="flex w-full py-5">
          <div className="flex flex-col w-1/3">
            <img src={whiteLogoRubraz} alt='Logo branca rubraz' className={'w-[128px] '}/>
          </div>

          <div className="flex flex-col w-2/3 text-gray-700 bg-yellow-rubraz rounded-full font-bold">
            <div className="bg-yellow-rubraz rounded-full w-full h-[73px] absolute top-5 -right-[50%] -z-10"></div>
            
            <div className="flex lg:px-4 px-6 gap-4 text-lg flex-wrap lg:flex-nowrap h-full">
              <div className="flex flex-col lg:w-1/3 items-center justify-center ">
                <a className='flex gap-2 items-center justify-center ' href='https://api.whatsapp.com/send/?phone=5521979808794&text=Ol%C3%A1%2C+venho+atrav%C3%A9s+do+site+e+gostaria+de+or%C3%A7amento.+Poderia+me+ajudar%3F&type=phone_number&app_absent=0' target="_blank">
                  <div className="bg-green-600 rounded-full lg:w-[38px] flex justify-center items-center ">
                    <FaWhatsapp className='text-white text-4xl mb-1 '/>
                  </div>
                      21 97980-8794
                </a>
              </div>
              <div className="hidden lg:flex flex-col w-1/3 items-center justify-center invisible lg:visible">
                <a href='https://rubrazlajes.com/' target="_blank" className='items-center'>rubrazlajes.com</a>
              </div>
              <div className="hidden lg:flex none flex-col w-1/3 justify-center invisible lg:visible">
                <ul className='flex w-full gap-2'>
                  <li className=''><a href='https://www.facebook.com/rubrazlajes'   target='_blank' className='text-blue-rubraz'><FaFacebookF className='bg-white p-2 text-4xl rounded-full'/></a></li>
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
