import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Main }   from '@/components/Main'
import './style.css'

export const MainComponent = () => {
  return (
    <div className='mainComponent bg-blue-rubraz flex flex-col w-full justify-center items-center h-screen overflow-hidden'>
      <div className="bgImage opacity-15 absolute bottom-0 top-0 right-0 left-0 w-full z-0"></div>
        <Header/>
        <Main/>
        <Footer/>
    </div>
  )
}
