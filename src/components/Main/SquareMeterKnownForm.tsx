import React from 'react';
import { motion } from 'framer-motion';

const SquareMeterKnownForm = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <h1 className='font-bold text-5xl'>
        Calculadora <br />
        <span className='text-yellow-rubraz text-5xl font-normal'>de distância</span>
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
  );
};

export default SquareMeterKnownForm;
