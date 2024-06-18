import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Main } from '@/components/Main';
import './style.css';

export const MainComponent = () => {
  return (
    <div className='mainComponent bg-blue-body-rubraz flex flex-col w-full justify-center items-center overflow-y-hidden relative h-[100vh]'>
      <div className="bgImage absolute inset-0 opacity-10 z-0"></div>
      <div className="relative z-10 w-full overflow-x-hidden">
        <Header />
        <Main />
        <Footer />
      </div>
    </div>
  );
};
