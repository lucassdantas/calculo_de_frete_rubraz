import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Main } from '@/components/Main';
import { UserContext } from '@/context/userContext';
import { CurrentProductProvider } from '@/context/currentProductContext';
import './style.css';

export const MainComponent = ({ currentUser }: any) => {
  return (
    <div className='mainComponent flex flex-col min-h-screen w-full relative '>
      <div className="bgImage absolute inset-0  z-0"></div>
      <div className="relative z-10 w-full overflow-x-hidden">
        <UserContext.Provider value={currentUser}>
          <CurrentProductProvider>
            <Header />
            <Main />
            <Footer />
          </CurrentProductProvider>
        </UserContext.Provider>
      </div>
    </div>
  );
};
