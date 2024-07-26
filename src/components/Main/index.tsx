import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import AddressForm from './forms/AddressForm';
import Loader from './Loader';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { FirstStep } from '@/components/Main/formStep/FirstStep';
import './style.css';
import { useCurrentProduct } from '@/context/currentProductContext';
import { backendUrl, pricePerKmDistance, products } from '@/constants';
import { freightCalculation } from '@/utils/handleCalculation';

export const Main: React.FC = () => {
  const [distanceText, setDistanceText] = useState<string>('');
  const [invisible, setInvisible] = useState<string>('hidden invisible');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [distanceError, setDistanceError] = useState<string>('')
  const [isRequestLoading, setIsRequestLoading] = useState<boolean>(false);
  const [formStep, setFormStep] = useState<number>(0);
  const [formData, setFormData] = useState({
    address: '',
    knownSquareMeter: '',
    unknownSquareMeters: [{ vigotaQuantity: 0, vigotaSize: 0 }]
  });
  const [productValue, setProductValue] = useState<number>(0);

  const handleResponseSuccess = (responseData: string) => {
    if (responseData) {
      const distanceValue = (Number(responseData) / 1000 * 2).toFixed(2);
      const distancePrice = freightCalculation(Number(distanceValue), pricePerKmDistance);
      setProductValue(prevValue => prevValue + distancePrice);
      setDistanceText(distanceValue.replace('.', ','));
      setInvisible('');
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, completeAddress: string) => {
    event.preventDefault();
    setIsRequestLoading(true);
    setDistanceError('')
    try {
      const response: AxiosResponse = await axios.post(`${backendUrl}calcular_distancia.php`, { completeAddress });
      if(response.data.distanceValue) handleResponseSuccess(response.data.distanceValue);
      else setDistanceError('Digite o seu endereço completo!')
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
    } finally {
      setIsRequestLoading(false);
    }
  };

  const handleFormStep = (formStepValue: number) => {
    setFormStep(Math.max(formStepValue, 0));
    setDistanceText('')
  };

  const formatCurrency = (value: number): string => {
    return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <main className="w-full min-h-[100vh] flex justify-center items-center z-10 px-4 lg:pt-[0px] pb-12">
      <div className="max-w-[1080px] flex flex-col w-full items-center justify-center text-white gap-4">
        {formStep > 0 && (
          <div className='w-full max-w-xl mb-4'>
            <div 
              onClick={() => handleFormStep(formStep - 1)} 
              className='flex max-w-[120px] font-bold cursor-pointer text-lg tracking-wide items-center'
            >
              <ArrowBackIcon className="mr-2 text-yellow-rubraz" />Voltar
            </div>
          </div>
        )}

        <h1 className='font-bold text-5xl text-center mb-4'>Calculadora <span className='text-yellow-rubraz text-5xl font-normal'>de metragem</span></h1>

        {isLoading && <Loader />}
        {formStep === 0 && <FirstStep handleFormStep={handleFormStep} formData={formData} setFormData={setFormData} setProductValue={setProductValue} />}
        {formStep === 1 && <AddressForm onSubmit={handleSubmit} />}
        
        {!isRequestLoading && productValue > 0 && (
          <div id="productValue" className="mt-4 w-full max-w-xl">
            <h3 className='font-bold mb-2 text-xl'>Resultado</h3>
            {distanceError && <p>Digite o endereço completo! </p>}
            {distanceText  && <p>A distância de ida e volta do caminhão ao destino é: <span className='font-bold'>{distanceText} km</span></p>}
            {!distanceText && productValue && <p>O valor total do produto é: <span className='font-bold'>R$ {formatCurrency(productValue)}</span></p>}
            {distanceText  && productValue && <p>O valor total do produto com frete é de: <span className='font-bold'>R$ {formatCurrency(productValue)}</span></p>}
          </div>
        )}
      </div>
    </main>
  );
};