import React, { FormEvent } from 'react';
import { motion } from 'framer-motion';
import { StepProps } from '@/types/StepProps';

interface FormProps extends StepProps {
  formData: any;
  setFormData: (data: any) => void;
}

const SquareMeterKnownForm = ({ handleFormStep, formData, setFormData }: FormProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleFormStep(1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, knownSquareMeter: e.target.value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div id="squareMeterKownForm" className='lg:text-left text-center transition'>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-4 lg:items-start">
            <label htmlFor='squareMeter' className='font-bold text-white text-2xl mb-4'>Tamanho em m³</label>
            <input
              type="text"
              id="squareMeter"
              name="squareMeter"
              placeholder="Digite o tamanho em m³"
              className='rounded-full p-4 text-black outline-none max-w-[512px] w-full mb-4'
              required
              value={formData.knownSquareMeter}
              onChange={handleChange}
            />
          </div>
          <button className='calc-button bg-yellow-rubraz p-4 rounded-full text-center font-bold cursor-pointer hover:bg-light-yellow-rubraz text-lg tracking-wide' type="submit">
            Calcular distância
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default SquareMeterKnownForm;
