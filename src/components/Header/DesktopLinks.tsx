import { SocialLinks } from "./SocialLinks";

export const DesktopLinks = () => (
  <>
    <div className="hidden lg:flex flex-col lg:w-fit w-1/8 items-center lg:items-end justify-center">
      <a href="https://rubrazlajes.com/" target="_blank" className="items-center hidden lg:block">
        rubrazlajes.com
      </a>
    </div>
    
    <div className="hidden lg:flex flex-col w-fit items-end justify-center">
      <SocialLinks />
    </div>
  </>
);
