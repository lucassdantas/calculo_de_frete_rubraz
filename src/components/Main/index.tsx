import React, { useState } from 'react';
import FormSection from './FormSection';
import ResultSection from './ResultSection';
import Loader from './Loader';
import FooterInfo from './FooterInfo';
import compelteEngineerImg from '@/assets/engenheiro-rubraz-calculadora-distancia-com-fundo.png';
import './style.css';

export const Main: React.FC = () => {
  const [distanceText, setDistanceText] = useState<string>('')
  const [invisible, setInvisible] = useState<string>('hidden invisible ')
  const [showSecondForm, setShowSecondForm] = useState<boolean>(false);
  const [showNewTitle, setShowNewTitle] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleResponseSuccess = (responseData: string) => {
    setDistanceText('')
    if (responseData) {
      responseData = (
        String(
          (Number(responseData) / 1000 * 2).toFixed(2)
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
            {!showSecondForm ? (
              <FormSection onSubmit={handleSubmit} />
            ) : (
              <ResultSection onBack={handleBack} />
            )}
            {isLoading && <Loader />}
            <FooterInfo />
          </div>
          <div className="flex flex-col px-12 lg:items-end items-center mt-7 -ml-16 lg:-ml-0 lg:mt-4">
            <img src={compelteEngineerImg} alt='Imagem do engenheiro' className='lg:w-[88%] w-[100%] max-w-[250px] lg:max-w-[390px] z-0' />
          </div>
        </div>
      </div>
    </main>
  );
};
