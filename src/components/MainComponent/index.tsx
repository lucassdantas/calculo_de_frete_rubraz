// src/components/MainComponent/index.tsx

import axios from 'axios';
import FooterInfo from '@/components/Footer/FooterInfo';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Main } from '@/components/Main';
import { UserContext } from '@/context/userContext';
import { CurrentProductProvider } from '@/context/currentProductContext';
import { Login } from '@/components/Login';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { backendUrl, url } from '@/constants';
import './style.css';

export const MainComponent = ({ setAuth, auth }: any) => {
  const userContext = useContext(UserContext);
  const navigation = useNavigate()

  if (!userContext) return <div>Carregando...</div>; 
  
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get(`${backendUrl}session.php`, { withCredentials: true });
        if (userContext) {
          userContext.setCurrentUser(response.data.user);
          setAuth(response.data.loggedIn);
          if(response.data.loggedIn) navigation(url)
        }
      } catch (error) {
        console.log('Houve um erro ao verificar a sessão!', error);
      }
    };

    checkSession();
  }, []);
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
