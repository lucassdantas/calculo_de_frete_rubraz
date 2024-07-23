import { useState } from 'react';
import SquareMeterKnownForm from '@/components/Main/forms/SquareMeterKnownForm';
import SquareMeterUnkownForm from '@/components/Main/forms/SquareMeterUnkownForm';
import { StepProps } from '@/types/StepProps';


export const FirstStep = ({handleFormStep}:StepProps) => {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

  return (
    <div className='w-full flex flex-col items-center'>
      <div className="flex mb-4 gap-4">
        <button
          className={`px-4 py-2 rounded-full font-semibold  ${activeTabIndex === 0 ? 'bg-yellow-rubraz text-white' : 'bg-gray-200 text-black'}`}
          onClick={() => setActiveTabIndex(0)}
        >
          Possuo o tamanho em m³
        </button>
        <button
          className={`px-4 py-2 rounded-full font-semibold  ${activeTabIndex === 1 ? 'bg-yellow-rubraz text-white' : 'bg-gray-200 text-black'}`}
          onClick={() => setActiveTabIndex(1)}
        >
          Não possuo o tamanho em m³
        </button>
      </div>
      <div>
        {activeTabIndex === 0 && <SquareMeterKnownForm handleFormStep={handleFormStep}/>}
        {activeTabIndex === 1 && <SquareMeterUnkownForm handleFormStep={handleFormStep}/>}
      </div>
    </div>
  );
}
