import React from 'react';
import { motion } from 'framer-motion';

interface FormSectionProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const FormSection: React.FC<FormSectionProps> = ({ onSubmit }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className='font-bold text-5xl'>
        Calculadora <br />
        <span className='text-yellow-rubraz text-5xl font-normal'>de distância</span>
      </h1>
      <form id="distanceForm" onSubmit={onSubmit} className='lg:text-left text-center transition'>
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
    </motion.div>
  );
};

export default FormSection;
