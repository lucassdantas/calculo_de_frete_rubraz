import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { StepProps } from '@/types/StepProps';

type Vigotas = {
  vigotaQuantity: number,
  vigotaSize: number
}

const SquareMeterUnkownForm = ({ handleFormStep }: StepProps) => {
  const initialVigotas: Vigotas[] = [{ vigotaQuantity: 0, vigotaSize: 0 }];
  const [vigotas, setVigotas] = useState<Vigotas[]>(initialVigotas);

  const handleVigotaChange = (index: number, field: keyof Vigotas, value: number) => {
    const updatedVigotas = [...vigotas];
    updatedVigotas[index][field] = value;
    setVigotas(updatedVigotas);
  };

  const addVigota = () => {
    setVigotas([...vigotas, { vigotaQuantity: 0, vigotaSize: 0 }]);
  };

  const removeVigota = (index: number) => {
    const updatedVigotas = vigotas.filter((_, i) => i !== index);
    setVigotas(updatedVigotas);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className='lg:text-left text-center transition mt-4 '>
        <div className='max-h-56 overflow-y-auto mb-2 px-2'>
          {vigotas.map((vigota, i) => (
            <div className='flex flex-row mb-4 gap-5 items-end' key={i}>
              <div className='flex flex-col '>
                <label htmlFor={`vigotaQuantity-${i}`} className='font-bold text-white mb-4'>Quantidade de vigotas</label>
                <input
                  required
                  type="number"
                  id={`vigotaQuantity-${i}`}
                  name={`vigotaQuantity-${i}`}
                  value={vigota.vigotaQuantity === 0 ? '' : vigota.vigotaQuantity}
                  onChange={(e) => handleVigotaChange(i, 'vigotaQuantity', Number(e.target.value))}
                  placeholder="Quantidade das vigotas"
                  className='rounded-full p-4 text-black outline-none max-w-[512px] w-full'
                />
              </div>
              <div className='flex flex-col'>
                <label htmlFor={`vigotaSize-${i}`} className='font-bold text-white mb-4'>Tamanho da vigota</label>
                <input
                  required
                  type="number"
                  id={`vigotaSize-${i}`}
                  name={`vigotaSize-${i}`}
                  value={vigota.vigotaSize === 0 ? '' : vigota.vigotaSize}
                  onChange={(e) => handleVigotaChange(i, 'vigotaSize', Number(e.target.value))}
                  placeholder="Tamanho das vigotas"
                  className='rounded-full p-4 text-black outline-none max-w-[512px] w-full'
                />
              </div>
              <button
                className='text-white mb-4 text-2xl'
                onClick={() => removeVigota(i)}
              >
                x
              </button>
            </div>
          ))}
        </div>
        <div className='flex flex-row mb-4 items-end gap-5 px-2'>
          <div className='flex flex-col '>
            <label htmlFor="newVigotaQuantity" className='font-bold text-white mb-4'>Quantidade de vigotas</label>
            <input
              required
              type="number"
              id="newVigotaQuantity"
              name="newVigotaQuantity"
              placeholder="Quantidade das vigotas"
              className='rounded-full p-4 text-black outline-none max-w-[512px] w-full'
              onChange={(e) => handleVigotaChange(vigotas.length - 1, 'vigotaQuantity', Number(e.target.value))}
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="newVigotaSize" className='font-bold text-white mb-4'>Tamanho da vigota</label>
            <input
              required
              type="number"
              id="newVigotaSize"
              name="newVigotaSize"
              placeholder="Tamanho das vigotas"
              className='rounded-full p-4 text-black outline-none max-w-[512px] w-full'
              onChange={(e) => handleVigotaChange(vigotas.length - 1, 'vigotaSize', Number(e.target.value))}
            />
          </div>
        </div>
        <div className='flex flex-col items-center md:flex-row md:justify-between px-2'>
          <div className="w-1/2 text-left">
            <button
              className='calc-button bg-transparent border-yellow-rubraz border-2 p-4 px-7 rounded-full text-center font-bold cursor-pointer hover:bg-light-yellow-rubraz text-lg tracking-wide'
              type="button"
              onClick={addVigota}
            >
              Adicionar Vigota
            </button>
          
          </div>
          <div className="w-1/2 text-center">
            <button
              className='calc-button bg-yellow-rubraz py-4 px-10 rounded-full text-center font-bold cursor-pointer hover:bg-light-yellow-rubraz text-lg tracking-wide'
              type="submit"
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SquareMeterUnkownForm;
