import { useState } from "react";
import { FaFacebookF, FaInstagram, FaTimes } from "react-icons/fa";
import hamburguerIcon from "@/assets/barras-menu-hamburguer.png";

export const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden flex justify-center items-center text-center relative">
      <div className="relative">
        {isOpen ? (
          <FaTimes
            className="text-2xl cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          />
        ) : (
          <img
            src={hamburguerIcon}
            alt="icone menu hamburguer"
            className="w-[42px] max-w-[32px] max-iphone:w-[28px] cursor-pointer object-contain"
            onClick={() => setIsOpen(!isOpen)}
          />
        )}
        
        {isOpen && (
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white shadow-md rounded-lg py-4 px-6 w-[250px]">
            <div className="absolute top-[-10px] left-[50%] transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-white"></div>
            <ul className="flex flex-col gap-4">
              <li>
                <a
                  href="https://www.facebook.com/rubrazlajes"
                  target="_blank"
                  className="text-blue-rubraz flex items-center gap-2 text-base"
                >
                  <FaFacebookF className="text-2xl" /> Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/rubrazlajes/"
                  target="_blank"
                  className="text-blue-rubraz flex items-center gap-2 text-base"
                >
                  <FaInstagram className="text-2xl" /> Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://rubrazlajes.com/"
                  target="_blank"
                  className="text-blue-rubraz flex items-center gap-2 text-base"
                >
                  rubrazlajes.com
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
