import whiteLogoRubraz from "@/assets/Logo-Rubraz-branco.png";

export const Logo = () => (
  <div className="flex flex-col items-start justify-center w-1/3 max-w-[320px] max-iphone:w-2/10">
    <img src={whiteLogoRubraz} alt="Logo branca rubraz" className="w-[128px] max-iphone:w-full" />
  </div>
);
