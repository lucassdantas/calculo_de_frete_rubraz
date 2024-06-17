import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios'; 
import engineerImg from '@/assets/engenheiro-rubraz-calculadora-distancia.png';
import './style.css';

export const Main: React.FC = () => {
  const [distanceText, setDistanceText] = useState<string>('')
  const [invisible, setInvisible] = useState<string>('invisible')
  const handleResponseSuccess = (responseData:string) => {
    setInvisible('')
    setDistanceText(responseData)
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    
    try {
      const response: AxiosResponse = await axios.post('/parceiros/backend/calcular_distancia.php', formData);
      
      if(response.data){
        handleResponseSuccess(response.data)
      }
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
    }
  };

  return (
    <main className="w-full h-full flex justify-center z-10 px-4">
      <div className={"max-w-[1280px] w-full flex flex-col justify-end "}>

        <div className="flex lg:flex-row flex-col w-full items-center">

          <div className="flex flex-col lg:w-1/2 w-full lg:text-left text-center lg:mt-0 mt-12 text-white gap-4">
            <h1 className='font-bold text-5xl'>
              Calculadora <br />
              <span className='text-yellow-rubraz text-5xl font-normal'>de Distância</span>
            </h1>

            <form id="distanceForm" onSubmit={handleSubmit} className='lg:text-left text-center'> 
              <fieldset className="flex flex-col mb-4 justify-center items-center lg:items-start ">
                <label htmlFor='destino' className='font-bold text-white text-2xl mb-4'>Destino</label>
                <input type="text" id="destino" name="destino" placeholder="Endereço de Destino" className='rounded-full p-4 text-black outline-none max-w-[512px] w-full' required />
              </fieldset>
              <input className='calc-button bg-yellow-rubraz p-4 rounded-full text-center font-bold cursor-pointer hover:bg-light-yellow-rubraz text-lg tracking-wide' type="submit" value="Calcular Distância" />
            </form>

            <div id="resultado" className={`${invisible} lg:my-0 my-12`}>
              <h3 className='font-bold mb-2 text-xl'>Resultado</h3>
              <p>A distância entre a origem e o destino é: {distanceText} km</p>
            </div>

            <div className="hidden lg:block text-black rounded-xl p-6 -mb-4 absolute bottom-16 text-left z-20 ">
              <p><span className='font-bold'>CNPJ: </span>22.577.009/0001-00 </p>
              <p><span className='font-bold'>CREA-RJ: </span>2023200826 </p>
            </div>

            <div className="hidden lg:block lg:absolute bg-yellow-rubraz text-black rounded-t-[50px] w-full h-36 bottom-[3%] lg:-left-[60%] z-10">
            </div>

          </div>

          <div className="flex flex-col px-12 items-end ">
            <div className='flex border-yellow-rubraz lg:border-[24px] border-[12px] rounded-t-full mx-12 lg:w-[450px] w-[200px] justify-center items-end lg:-mb-10 -mb-16 engineerBackground '>
              <img src={engineerImg} alt='Imagem do engenheiro' className='lg:w-full w-56  max-w-[390px] -scale-x-100 z-0' />
            </div>
          </div>

        </div>
      </div>
    </main>
  );
};
