import whiteLogoRubraz from "@/assets/Logo-Rubraz-branco.png";
import { useEffect, useState } from 'react';
import { LoginForm } from '@/components/Login/LoginForm';
import { RegisterForm } from '@/components/Login/RegisterForm';
import { ForgetPassowrdForm } from '@/components/Login/ForgetPasswordForm';
import './style.css';

export const Login = ({setAuth}:any) => {
    const [currentForm, setCurrentForm] = useState('login')
    const [title, setTitle] = useState('Área de login');

    useEffect(() => {
      switch (currentForm) {
        case 'register':
          setTitle('Crie sua conta');
          break;
        case 'forgetPassword':
          setTitle('Recupere sua senha');
          break;
        default:
          setTitle('Área de login');
      }
    }, [currentForm]);
    return (
      <div className="flex flex-col items-center text-center justify-center min-h-screen w-full px-4 my-2">
        <img src={whiteLogoRubraz} alt="Logo branca rubraz" className="w-[128px]  mb-12" />
        <div className="bg-opacity-30 bg-dark-blue-rubraz rounded-xl p-8 border border-white border-opacity-30 max-w-lg w-full">
          <div className="text-center mb-6">
            <h2 className="text-2xl  text-white">{title}</h2>
          </div>

          {currentForm==='login'          &&<LoginForm setAuth={setAuth} setCurrentForm={setCurrentForm}/>}
          {currentForm==='register'       &&<RegisterForm setAuth={setAuth}/>}
          {currentForm==='forgetPassword' &&<ForgetPassowrdForm setAuth={setAuth}/>}
          
          <div className="flex sm:flex-row flex-col justify-between mt-4 text-white">
            {currentForm==='login' && <a onClick={() => setCurrentForm('register')} className="hover:underline cursor-pointer">Criar conta</a>}
            {currentForm==="register"&& <a onClick={() => setCurrentForm('login')} className="hover:underline  cursor-pointer">Faça login</a>}
            {currentForm==="forgetPassword"&& <a onClick={() => setCurrentForm('login')} className="hover:underline  cursor-pointer">Faça login</a>}
            
            <a href="https://api.whatsapp.com/send/?phone=5521979808794&text=Ol%C3%A1%2C+venho+atrav%C3%A9s+do+site+e+gostaria+de+or%C3%A7amento.+Poderia+me+ajudar%3F&type=phone_number&app_absent=0" target='_blank' className="hover:underline">Precisa de ajuda?</a>
          </div>
        </div>
      </div>
    );
  };