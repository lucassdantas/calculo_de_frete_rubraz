import React, { createContext, useContext, Dispatch, SetStateAction } from 'react';
import { Product } from '@/types/product';
import { products } from '@/constants';

// Define o tipo para o contexto
interface CurrentProductContextType {
  currentProduct: Product;
  setCurrentProduct: Dispatch<SetStateAction<Product>>;
}

// Cria o contexto com um valor padrão
const CurrentProductContext = createContext<CurrentProductContextType | undefined>(undefined);

// Cria um hook para usar o contexto mais facilmente
export const useCurrentProduct = () => {
  const context = useContext(CurrentProductContext);
  if (!context) {
    throw new Error('useCurrentProduct must be used within a CurrentProductProvider');
  }
  return context;
};

// Cria o Provider
export const CurrentProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentProduct, setCurrentProduct] = React.useState<Product>(products.laje_tr8644);

  return (
    <CurrentProductContext.Provider value={{ currentProduct, setCurrentProduct }}>
      {children}
    </CurrentProductContext.Provider>
  );
};
