import React, { FormEvent } from 'react';
import { motion } from 'framer-motion';
import { StepProps } from '@/types/StepProps';

const SquareMeterKnownForm = ({handleFormStep}:StepProps) => {
  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
    <form id="squareMeterKownForm" className='lg:text-left text-center transition  ' onSubmit={(e) => handleSubmit(e)}>
        <fieldset className="flex flex-col mb-4 justify-center items-center lg:items-start">
          <label htmlFor='squareMeter' className='font-bold text-white text-2xl mb-4'>Tamanho em m³</label>
          <input
            type="text"
            id="squareMeter"
            name="squareMeter"
            placeholder="Digite o tamanho em m³"
            className='rounded-full p-4 text-black outline-none max-w-[512px] w-full'
            required
          />
        </fieldset>
        <input className='calc-button bg-yellow-rubraz p-4 rounded-full text-center font-bold cursor-pointer hover:bg-light-yellow-rubraz text-lg tracking-wide' type="submit" value="Calcular distância" />
      </form>
    </motion.div>
  );
};

export default SquareMeterKnownForm;
