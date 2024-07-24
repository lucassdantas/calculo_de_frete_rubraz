import './App.css';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios'; 
import { MainComponent } from './components/MainComponent';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './components/Login';
import { Main } from './components/Main';
import { UserContext } from './context/userContext';
import { products } from '@/constants';

function App() {
  const [auth, setAuth] = useState(false);
  const [currentUser, setCurrentUser] = useState(useContext(UserContext))
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get('http:localhost/rubraz/calculo_de_frete_rubraz/public/backend/session.php', { withCredentials: true });
        setCurrentUser(response.data.user)
        setAuth(response.data.loggedIn);
      } catch (error) {
        console.error('Houve um erro ao verificar a sessão!', error);
      }
    };

    checkSession();
  }, []);
  
  return (
      <Router>
        <Routes>
          <Route path="/" element={<MainComponent currentUser={currentUser} setAuth={setAuth} auth={auth} /> }/>
        </Routes>
    </Router>
  );
}

export default App;
