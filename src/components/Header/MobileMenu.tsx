import { useState } from "react";
import { FaFacebookF, FaInstagram, FaTimes } from "react-icons/fa";
import hamburguerIcon from "@/assets/barras-menu-hamburguer.png";

export const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden flex justify-center text-center">
      {isOpen ? (
        <FaTimes className="md:text-2xl lg:hidden" onClick={() => setIsOpen(!isOpen)} />
      ) : (
        <img
          src={hamburguerIcon}
          alt="icone menu hamburguer"
          className="md:w-[42px] w-[32px] max-iphone:w-[28px] lg:hidden object-contain"
          onClick={() => setIsOpen(!isOpen)}
        />
      )}

      {isOpen && (
        <div className="absolute top-24 md:right-auto right-0.5">
          <div className="bg-white shadow-md rounded-lg py-4 px-6 mt-2 relative z-20">
            <div className="absolute top-[-10px] left-[50%] transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-white"></div>
            <ul className="flex flex-col gap-4">
              <li>
                <a href="https://www.facebook.com/rubrazlajes" target="_blank" className="text-blue-rubraz flex items-center gap-2 md:text-base text-sm">
                  <FaFacebookF className="md:text-2xl text-sm" /> Facebook
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/rubrazlajes/" target="_blank" className="text-blue-rubraz flex items-center gap-2 md:text-base text-sm">
                  <FaInstagram className="md:text-2xl text-sm" /> Instagram
                </a>
              </li>
              <li>
                <a href="https://rubrazlajes.com/" target="_blank" className="text-blue-rubraz flex items-center gap-2 md:text-base text-sm">
                  rubrazlajes.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
