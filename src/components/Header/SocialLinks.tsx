import { FaFacebookF, FaInstagram } from "react-icons/fa";

export const SocialLinks = () => (
  <ul className="hidden lg:flex gap-2">
    <li>
      <a href="https://www.facebook.com/rubrazlajes" target="_blank" className="text-blue-rubraz">
        <FaFacebookF className="bg-white p-2 text-4xl rounded-full" />
      </a>
    </li>
    <li>
      <a href="https://www.instagram.com/rubrazlajes/" target="_blank" className="text-blue-rubraz">
        <FaInstagram className="bg-white p-2 text-4xl rounded-full" />
      </a>
    </li>
  </ul>
);
