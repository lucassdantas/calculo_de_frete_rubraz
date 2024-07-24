import { useState } from 'react';
import SquareMeterKnownForm from '@/components/Main/forms/SquareMeterKnownForm';
import SquareMeterUnkownForm from '@/components/Main/forms/SquareMeterUnkownForm';
import { StepProps } from '@/types/StepProps';

interface FirstStepProps extends StepProps {
  formData: any;
  setFormData: (data: any) => void;
  setProductValue: (value: number) => void; // Adicione este prop
}

export const FirstStep = ({ handleFormStep, formData, setFormData, setProductValue }: FirstStepProps) => {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

  return (
    <div className='w-full flex flex-col items-center'>
      <div className="flex flex-wrap mb-4 gap-4 w-full justify-center">
        <button
          className={`px-4 py-2 rounded-full font-semibold ${activeTabIndex === 0 ? 'bg-yellow-rubraz text-white' : 'bg-gray-200 text-black'}`}
          onClick={() => setActiveTabIndex(0)}
        >
          Possuo o tamanho em m³
        </button>
        <button
          className={`px-4 py-2 rounded-full font-semibold ${activeTabIndex === 1 ? 'bg-yellow-rubraz text-white' : 'bg-gray-200 text-black'}`}
          onClick={() => setActiveTabIndex(1)}
        >
          Não possuo o tamanho em m³
        </button>
      </div>
      <div className='flex justify-center items-center text-center w-full max-w-lg'>
        {activeTabIndex === 0 && <SquareMeterKnownForm handleFormStep={handleFormStep} formData={formData} setFormData={setFormData} setProductValue={setProductValue} />}
        {activeTabIndex === 1 && <SquareMeterUnkownForm handleFormStep={handleFormStep} formData={formData} setFormData={setFormData} setProductValue={setProductValue} />}
      </div>
    </div>
  );
};
