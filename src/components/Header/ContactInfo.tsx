import wppIcon from "@/assets/icone-de-whatsapp.png";

export const ContactInfo = () => (
  <a
    className="flex gap-2 items-center justify-center h-full"
    href="https://api.whatsapp.com/send/?phone=5521979808794&text=Ol%C3%A1%2C+venho+atrav%C3%A9s+do+site+e+gostaria+de+or%C3%A7amento.+Poderia+me+ajudar%3F&type=phone_number&app_absent=0"
    target="_blank"
  >
    <div className="rounded-full lg:w-[38px] flex justify-center items-center">
      <img src={wppIcon} alt="Icone de WhatsApp" className="text-white md:w-[40px] w-[30px] max-iphone:w-[20px]" />
    </div>

    <span className="hidden sm:block md:text-base text-[14px] -mb-1">21 97980-8794</span>
  </a>
);
