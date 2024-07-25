import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface FormSectionProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>, completeAddress:string) => void;
}

const AddressForm: React.FC<FormSectionProps> = ({ onSubmit }) => {
  const [completeAddress, setCompleteAddress] = useState('')
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='w-full'
    >
      <form id="distanceForm" onSubmit={(e) => onSubmit(e, completeAddress)} className='transition w-full flex flex-col items-center'>
        <fieldset className="flex flex-col mb-4 w-full max-w-lg items-start ">
          <label htmlFor='completeAddress' className='font-bold text-white text-2xl mb-4'>Endereço completo</label>
          <input
            type="text"
            id="completeAddress"
            name="completeAddress"
            value={completeAddress}
            onChange={(e) => setCompleteAddress(e.target.value)}
            placeholder="Endereço completo (Rua, Bairro, Cidade, Estado)"
            className='rounded-full p-4 text-black outline-none w-full mb-4'
            required
          />
          <input className='calc-button bg-yellow-rubraz p-4 text-left rounded-full font-bold cursor-pointer hover:bg-light-yellow-rubraz text-lg tracking-wide' type="submit" value="Calcular distância" />
        </fieldset>
      </form>
    </motion.div>
  );
};

export default AddressForm;
