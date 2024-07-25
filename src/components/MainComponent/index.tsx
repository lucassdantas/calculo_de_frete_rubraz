// src/components/MainComponent/index.tsx

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Main } from '@/components/Main';
import { UserContext } from '@/context/userContext';
import { CurrentProductProvider } from '@/context/currentProductContext';
import './style.css';
import { Login } from '@/components/Login';
import FooterInfo from '@/components/Footer/FooterInfo';
import { useContext } from 'react';

export const MainComponent = ({ setAuth, auth }: any) => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    return <div>Carregando...</div>;
  }

  const { currentUser } = userContext;

  return (
    <div className='mainComponent flex flex-col min-h-screen w-full relative '>
      <div className="bgImage absolute inset-0  z-0"></div>
      <div className="relative z-10 w-full overflow-x-hidden">
        <CurrentProductProvider>
          {currentUser && currentUser.userId > 0 ?
            <>
              <Header /> 
              <Main /> 
              <FooterInfo />
            </>
            :
            <Login setAuth={setAuth}/>
          }
          <Footer />
        </CurrentProductProvider>
      </div>
    </div>
  );
};
