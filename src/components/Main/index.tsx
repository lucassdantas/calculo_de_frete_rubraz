import React, { useState } from 'react';
import AddressForm from './forms/AddressForm';
import Loader from './Loader';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { FirstStep } from '@/components/Main/formStep/FirstStep';
import './style.css';

export const Main: React.FC = () => {
  const [distanceText, setDistanceText] = useState<string>('')
  const [invisible, setInvisible] = useState<string>('hidden invisible ')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [formStep, setFormStep] = useState<number>(0)
  const [formData, setFormData] = useState({
    address: '',
    knownSquareMeter: '',
    unknownSquareMeters: [{ vigotaQuantity: 0, vigotaSize: 0 }]
  });

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
        setIsLoading(false);
        setFormStep(1);
      }, 2000);
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
      setIsLoading(false);
    }
  };

  const handleFormStep = (formStepValue:number) => {
    if (formStepValue < 0) formStepValue = 0
    setFormStep(formStepValue)
  }

  return (
    <main className="w-full min-h-[100vh] flex justify-center items-center z-10 px-4 lg:pt-[0px] pb-12">
      <div className="max-w-[1080px] flex flex-col w-full items-center justify-center text-white gap-4">
        {formStep > 0 && 
        <div className='w-full max-w-lg mb-4'>
          <div onClick={() => handleFormStep(formStep - 1)} 
            className='flex max-w-[120px]  bg-yellow-rubraz p-2 rounded-full font-bold cursor-pointer hover:bg-light-yellow-rubraz text-lg tracking-wide '>
              <ArrowBackIcon className="mr-2" />Voltar
            </div>
        </div>
        }
        
        <h1 className='font-bold text-5xl text-center'>Calculadora <span className='text-yellow-rubraz text-5xl font-normal'>de distância</span></h1>
        
        {isLoading      && <Loader />}
        {formStep === 0 && <FirstStep handleFormStep={handleFormStep} formData={formData} setFormData={setFormData} />}
        {formStep === 1 && <AddressForm onSubmit={handleSubmit} />}
      </div>
    </main>
  );
};
