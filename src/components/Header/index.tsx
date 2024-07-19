import { Logo } from "./Logo";
import { ContactInfo } from "./ContactInfo";
import { MobileMenu } from "./MobileMenu";
import { DesktopLinks } from "./DesktopLinks";
import { MyAccountIcon } from "./MyAccountIcon";
import { useContext } from "react";
import { UserContext } from "@/context/userContext";

export const Header = () => {
  return (
    <header className="w-full flex justify-center z-10 px-4">
      <div className="max-w-[1080px] w-full">
        <div className="flex w-full py-5">
          <Logo />

          <div className="flex flex-col w-2/3 text-black bg-yellow-rubraz rounded-full font-bold items-start max-w-[740px] max-iphone:w-8/10 max-iphone:py-4">
            <div className="hidden lg:block bg-yellow-rubraz rounded-full w-full h-[73px] absolute top-5 -right-[50%] -z-10"></div>
            <div className="flex lg:px-4 px-6 text-lg gap-12 flex-nowrap lg:flex-nowrap h-full w-full max-iphone:px-3">
              <div className="flex lg:flex-col gap-4 lg:gap-0 lg:w-fit w-full md:w-[70%] items-center justify-between lg:justify-center">
                <ContactInfo />
                <MobileMenu />
              </div>
              <DesktopLinks />
              <MyAccountIcon/>
            </div>
          </div>
          
        </div>
      </div>
    </header>
  );
};
