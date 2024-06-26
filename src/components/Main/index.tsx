import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios'; 
import engineerImg from '@/assets/engenheiro-rubraz-calculadora-distancia.png';
import compelteEngineerImg from '@/assets/engenheiro-rubraz-calculadora-distancia-com-fundo.png';
import './style.css';

export const Main: React.FC = () => {
  const [distanceText, setDistanceText] = useState<string>('')
  const [invisible, setInvisible] = useState<string>('hidden invisible ')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleResponseSuccess = (responseData:string) => {
    setDistanceText('')
    if(responseData){
      responseData = (
        String (
          ( Number (responseData) / 1000 * 2).toFixed(2)
        )
      ).replace('.', ',');
      setInvisible('')
      setDistanceText(responseData)
    }
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form = event.currentTarget;
    const formData = new FormData(form);
    
    try {
      const response: AxiosResponse = await axios.post('/parceiros/backend/calcular_distancia.php', formData);
      handleResponseSuccess(response.data.distanceValue)
      console.log(response.data)
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
    }
    finally{
      setIsLoading(false)
    }
  };

  return (
    <main className="w-full h-full flex justify-center z-10 px-4  mt-[2%] min-[1700px]:mt-[7%]">
      <div className={"max-w-[1080px] w-full flex flex-col justify-end "}>

        <div className="flex lg:flex-row flex-col w-full justify-between ">

          <div className="flex flex-col lg:w-1/2 w-full lg:text-left text-center mt-12 text-white gap-4">
            <h1 className='font-bold text-5xl'> Calculadora <br />
              <span className='text-yellow-rubraz text-5xl font-normal'>de distância</span>
            </h1>

            <form id="distanceForm" onSubmit={handleSubmit} className='lg:text-left text-center transition'> 
              <fieldset className="flex flex-col mb-4 justify-center items-center lg:items-start ">
                <label htmlFor='destino' className='font-bold text-white text-2xl mb-4'>Destino</label>
                <input type="text" id="destino" name="destino" placeholder="Endereço de destino " className='rounded-full p-4 text-black outline-none max-w-[512px] w-full' required />
              </fieldset>
              <input className='calc-button bg-yellow-rubraz p-4 rounded-full text-center font-bold cursor-pointer hover:bg-light-yellow-rubraz text-lg tracking-wide' type="submit" value="Calcular distância" />
            </form>

            {
              isLoading && 
              <div className='w-full text-center flex justify-center lg:justify-start items-center  lg:pb-16 '>
                <div className="w-[70px]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><radialGradient id="a8" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)"><stop offset="0" stop-color="#FCBA08"></stop><stop offset=".3" stop-color="#FCBA08" stop-opacity=".9"></stop><stop offset=".6" stop-color="#FCBA08" stop-opacity=".6"></stop><stop offset=".8" stop-color="#FCBA08" stop-opacity=".3"></stop><stop offset="1" stop-color="#FCBA08" stop-opacity="0"></stop></radialGradient><circle transform-origin="center" fill="none" stroke="url(#a8)" stroke-width="15" stroke-linecap="round" stroke-dasharray="200 1000" stroke-dashoffset="0" cx="100" cy="100" r="70"><animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="2" values="360;0" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform></circle><circle transform-origin="center" fill="none" opacity=".2" stroke="#FCBA08" stroke-width="15" stroke-linecap="round" cx="100" cy="100" r="70"></circle></svg>
                </div>
              </div>
            }
            {
              !isLoading && 
              <div id="resultado" className={`${invisible} lg:pb-16 `}>
                <h3 className={`font-bold mb-2 text-xl`}>Resultado</h3>
                <p>A distância de ida e volta do caminhão ao destino é: <span className='font-bold'>{distanceText} km</span></p>
              </div>
            }


            <div className="hidden lg:block text-black rounded-xl p-6 -mb-4 absolute bottom-16 text-left z-20 ">
              <p><span className='font-bold'>CNPJ: </span>22.577.009/0001-00 </p>
              <p><span className='font-bold'>CREA-RJ: </span>2023200826 </p>
            </div>

            <div className="hidden lg:block lg:absolute bg-yellow-rubraz text-black rounded-t-[50px] w-full h-36 bottom-[3%] lg:-left-[60%] z-10">
            </div>

          </div>

          <div className="flex flex-col px-12 lg:items-end items-center mt-7 -ml-16 lg:-ml-0 lg:mt-4">
              <img src={compelteEngineerImg} alt='Imagem do engenheiro' className='lg:w-[88%] w-[100%] max-w-[250px] lg:max-w-[390px] z-0' />
          </div>

        </div>
      </div>
    </main>
  );
};
