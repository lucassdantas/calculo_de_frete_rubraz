import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios'; 
import engineerImg from '@/assets/engenheiro-rubraz-calculadora-distancia.png';
import compelteEngineerImg from '@/assets/engenheiro-rubraz-calculadora-distancia-com-fundo.png';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { motion } from 'framer-motion';
import './style.css';

export const Main: React.FC = () => {
  const [distanceText, setDistanceText] = useState<string>('')
  const [invisible, setInvisible] = useState<string>('hidden invisible ')
  const [showSecondForm, setShowSecondForm] = useState<boolean>(false);
  const [showNewTitle, setShowNewTitle] = useState<boolean>(false);
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
    
    try {
      
      setTimeout(() => {
        handleResponseSuccess("1000");
        setShowSecondForm(true);
        setIsLoading(false);
      }, 2000);
      
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setShowSecondForm(false);
  };


  return (
    <main className="w-full h-full flex justify-center z-10 px-4 mt-[2%] min-[1700px]:mt-[7%]">
      <div className="max-w-[1080px] w-full flex flex-col justify-end">

        <div className="flex lg:flex-row flex-col w-full justify-between">

          <div className="flex flex-col lg:w-1/2 w-full lg:text-left text-center mt-12 text-white gap-4">
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: showSecondForm ? 0 : 1 }}
              transition={{ duration: 0.5 }}
              style={{ display: showSecondForm ? 'none' : 'block' }}
            >
              <h1 className='font-bold text-5xl'>
                Calculadora <br />
                <span className='text-yellow-rubraz text-5xl font-normal'>de distância</span>
              </h1>
              
              {!showSecondForm && (
                <form id="distanceForm" onSubmit={handleSubmit} className='lg:text-left text-center transition'> 
                  <fieldset className="flex flex-col mb-4 justify-center items-center lg:items-start">
                    <label htmlFor='destino' className='font-bold text-white text-2xl mb-4'>Destino</label>
                    <input 
                      type="text" 
                      id="destino" 
                      name="destino" 
                      placeholder="Endereço de destino" 
                      className='rounded-full p-4 text-black outline-none max-w-[512px] w-full' 
                      required 
                    />
                  </fieldset>
                  <input className='calc-button bg-yellow-rubraz p-4 rounded-full text-center font-bold cursor-pointer hover:bg-light-yellow-rubraz text-lg tracking-wide' type="submit" value="Calcular distância" />
                </form>
              )}
            </motion.div>
            
            {showSecondForm && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <button type="button" onClick={handleBack} className='flex items-center mb-4 bg-yellow-rubraz p-2 rounded-full font-bold cursor-pointer hover:bg-blue-rubraz text-lg tracking-wide'>
                  <ArrowBackIcon className="mr-2" />
                  Voltar
                </button>
                <h1 className='font-bold text-5xl'>
                  Novo Título <br />
                  <span className='text-yellow-rubraz text-5xl font-normal'>Aparece Aqui</span>
                </h1>

                <form className='lg:text-left text-center transition mt-4'> 
                  <fieldset className="flex flex-col mb-4 justify-center items-center lg:items-start">
                    <div className='flex flex-row'>
                    <div className='flex flex-col mr-5'>
                    <label htmlFor='additional' className='font-bold text-white text-2xl mb-4'>Outro Campo</label>
                    <input 
                      type="text" 
                      id="additional" 
                      name="additional" 
                      placeholder="Informação adicional" 
                      className='rounded-full p-4 text-black outline-none max-w-[512px] w-full' 
                    />
                    </div>
                    <div className='flex flex-col'>
                    <label htmlFor='additional' className='font-bold text-white text-2xl mb-4'>Outro Campo</label>
                    <input 
                      type="text" 
                      id="additional" 
                      name="additional" 
                      placeholder="Informação adicional" 
                      className='rounded-full p-4 text-black outline-none max-w-[512px] w-full' 
                    />
                    </div>
                    </div>
                  </fieldset>
                  <div className='flex gap-4'>
                    <button className='calc-button bg-yellow-rubraz p-4 pr-10 pl-10 rounded-full text-center font-bold cursor-pointer hover:bg-light-yellow-rubraz text-lg tracking-wide ' type="submit">Enviar</button>
                  </div>
                </form>
              </motion.div>
            )}

            {
              isLoading && 
              <div className='w-full text-center flex justify-center lg:justify-start items-center lg:pb-16'>
                <div className="w-[70px]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                    <radialGradient id="a8" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)">
                      <stop offset="0" stopColor="#FCBA08"></stop>
                      <stop offset=".3" stopColor="#FCBA08" stopOpacity=".9"></stop>
                      <stop offset=".6" stopColor="#FCBA08" stopOpacity=".6"></stop>
                      <stop offset=".8" stopColor="#FCBA08" stopOpacity=".3"></stop>
                      <stop offset="1" stopColor="#FCBA08" stopOpacity="0"></stop>
                    </radialGradient>
                    <circle fill="none" stroke="url(#a8)" strokeWidth="15" strokeLinecap="round" strokeDasharray="200 1000" strokeDashoffset="0" cx="100" cy="100" r="70">
                      <animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="2s" values="360;0" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform>
                    </circle>
                    <circle fill="none" opacity=".2" stroke="#FCBA08" strokeWidth="15" strokeLinecap="round" cx="100" cy="100" r="70"></circle>
                  </svg>
                </div>
              </div>
            }

            <div className="hidden lg:block text-black rounded-xl p-6 -mb-4 absolute bottom-16 text-left z-20">
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