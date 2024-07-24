import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Main } from '@/components/Main';
import { UserContext } from '@/context/userContext';
import { CurrentProductProvider } from '@/context/currentProductContext';
import './style.css';
import { Login } from '@/components/Login';
import FooterInfo from '@/components/Footer/FooterInfo';

export const MainComponent = ({ currentUser, setAuth, auth }: any) => {
  return (
    <div className='mainComponent flex flex-col min-h-screen w-full relative '>
      <div className="bgImage absolute inset-0  z-0"></div>
      <div className="relative z-10 w-full overflow-x-hidden">
        <UserContext.Provider value={currentUser}>
          <CurrentProductProvider>
            {currentUser && currentUser.id>0?
              <>
                <Header /> 
                <Main /> 
                <FooterInfo />
              </>
            :<Login setAuth={setAuth}/>
            }
            <Footer />
          </CurrentProductProvider>
        </UserContext.Provider>
      </div>
    </div>
  );
};
