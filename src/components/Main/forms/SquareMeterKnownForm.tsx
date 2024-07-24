import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { StepProps } from '@/types/StepProps';
import { squareMeterKownCalculation } from '@/utils/handleCalculation';
import { priceBySquareMeter } from '@/constants';

interface FormProps extends StepProps {
  formData: any;
  setFormData: (data: any) => void;
  setProductValue: (value: number) => void;
}

const SquareMeterKnownForm = ({ handleFormStep, formData, setFormData, setProductValue }: FormProps) => {
  useEffect(() => {
    const result = squareMeterKownCalculation(Number(formData.knownSquareMeter), priceBySquareMeter);
    setProductValue(result);
  }, [formData.knownSquareMeter, setProductValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, knownSquareMeter: e.target.value });
  };

  const handleNextStep = () => {
    handleFormStep(1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div id="squareMeterKownForm" className='lg:text-left text-center transition'>
        <div>
          <div className="flex flex-col mb-4 lg:items-start">
            <label htmlFor='squareMeter' className='font-bold text-white text-2xl mb-4'>Tamanho em m³</label>
            <input
              type="number"
              id="squareMeter"
              name="squareMeter"
              placeholder="Digite o tamanho em m³"
              className='rounded-full p-4 text-black outline-none max-w-[512px] w-full mb-4'
              required
              value={formData.knownSquareMeter}
              onChange={handleChange}
            />
          </div>
          <button
            className='calc-button bg-yellow-rubraz p-4 rounded-full text-center font-bold cursor-pointer hover:bg-light-yellow-rubraz text-lg tracking-wide'
            onClick={handleNextStep}
          >
            Calcular frete
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SquareMeterKnownForm;
