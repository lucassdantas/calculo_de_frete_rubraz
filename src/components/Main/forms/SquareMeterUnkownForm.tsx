import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { StepProps } from '@/types/StepProps';
import { squareMeterUnkownCalculation } from '@/utils/handleCalculation';
import { useCurrentProduct } from '@/context/currentProductContext';

type Vigotas = {
  vigotaQuantity: number;
  vigotaSize: number;
}

interface FormProps extends StepProps {
  formData: any;
  setFormData: (data: any) => void;
  setProductValue: (value: number) => void;
}

const SquareMeterUnkownForm = ({ handleFormStep, formData, setFormData, setProductValue }: FormProps) => {
  const [vigotas, setVigotas] = useState<Vigotas[]>(formData.unknownSquareMeters);
  const {currentProduct} = useCurrentProduct()
  useEffect(() => {
    const totalVigotaQuantity = vigotas.reduce((total, vigota) => total + vigota.vigotaQuantity, 0);
    const totalVigotaSize = vigotas.reduce((total, vigota) => total + vigota.vigotaSize, 0);
    const productValue = squareMeterUnkownCalculation(totalVigotaQuantity, totalVigotaSize, currentProduct.interation);
    setProductValue(productValue);
  }, [vigotas, setProductValue]);

  const handleVigotaChange = (index: number, field: keyof Vigotas, value: number) => {
    const updatedVigotas = [...vigotas];
    updatedVigotas[index][field] = value;
    setVigotas(updatedVigotas);
    setFormData({ ...formData, unknownSquareMeters: updatedVigotas });
  };

  const addVigota = () => {
    setVigotas([...vigotas, { vigotaQuantity: 0, vigotaSize: 0 }]);
  };

  const removeVigota = (index: number) => {
    const updatedVigotas = vigotas.filter((_, i) => i !== index);
    setVigotas(updatedVigotas);
    setFormData({ ...formData, unknownSquareMeters: updatedVigotas });
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
      <div className='text-center lg:text-left transition mt-4'>
        <div className='max-h-[302px] overflow-y-auto mb-2 px-2'>
          {vigotas.map((vigota, i) => (
            <div className='relative flex flex-col lg:flex-row lg:mb-4 mb-8 gap-5 items-end' key={i}>
              <div className='flex flex-col w-full lg:w-auto'>
                <label htmlFor={`vigotaQuantity-${i}`} className='font-bold text-white mb-4'>Quantidade de vigotas</label>
                <input
                  type="number"
                  id={`vigotaQuantity-${i}`}
                  name={`vigotaQuantity-${i}`}
                  value={vigota.vigotaQuantity}
                  onChange={(e) => handleVigotaChange(i, 'vigotaQuantity', Number(e.target.value))}
                  placeholder="Quantidade das vigotas"
                  className='rounded-full p-4 text-black outline-none w-full'
                />
              </div>
              <div className='flex flex-col w-full lg:w-auto'>
                <label htmlFor={`vigotaSize-${i}`} className='font-bold text-white mb-4'>Tamanho da vigota</label>
                <input
                  type="number"
                  id={`vigotaSize-${i}`}
                  name={`vigotaSize-${i}`}
                  value={vigota.vigotaSize}
                  onChange={(e) => handleVigotaChange(i, 'vigotaSize', Number(e.target.value))}
                  placeholder="Tamanho das vigotas"
                  className='rounded-full p-4 text-black outline-none w-full'
                />
              </div>
              {vigotas.length > 1 && (
                <button
                  className='absolute right-0 top-0 lg:relative lg:right-auto lg:top-auto lg:self-center lg:translate-y-[-10%] lg:ml-2 text-white text-2xl lg:mb-0'
                  onClick={() => removeVigota(i)}
                >
                  x
                </button>
              )}
            </div>
          ))}
        </div>
        <div className='flex flex-col items-center md:flex-row md:justify-between px-2'>
          <div className="w-full md:w-1/2 text-center md:text-left mb-4 md:mb-0">
            <button
              className='calc-button bg-transparent border-yellow-rubraz border-2 p-4 px-5 rounded-full font-bold cursor-pointer hover:bg-light-yellow-rubraz text-lg tracking-wide'
              type="button"
              onClick={addVigota}
            >
              Adicionar Vigota
            </button>
          </div>
          <div className="w-full md:w-1/2 text-left">
            <button
              className='calc-button bg-yellow-rubraz py-4 px-5 rounded-full font-bold cursor-pointer hover:bg-light-yellow-rubraz text-lg tracking-wide'
              onClick={handleNextStep}
            >
              Calcular frete
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SquareMeterUnkownForm;
