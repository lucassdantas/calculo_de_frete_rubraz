import React from 'react';

const FooterInfo: React.FC = () => {
  return (
    <>
      <div className="hidden lg:block text-black rounded-xl p-6 -mb-4 absolute bottom-12 text-left z-20">
        <p><span className='font-bold'>CNPJ: </span>22.577.009/0001-00 </p>
        <p><span className='font-bold'>CREA-RJ: </span>2023200826 </p>
      </div>
      <div className="hidden lg:block lg:absolute bg-yellow-rubraz text-black rounded-t-[50px] w-full h-24 bottom-[3%] lg:-left-[60%] z-10"></div>
    </>
  );
};

export default FooterInfo;
