import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { MainComponent } from './components/MainComponent';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './components/Login';
import { Main } from './components/Main';

function App() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get('http:localhost/rubraz/calculo_de_frete_rubraz/public/backend/session.php', { withCredentials: true });
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
        <Route path="/" element={auth ? <MainComponent setAuth={setAuth} Component={Main} /> : <Login setAuth={setAuth} />} />
        <Route path="/main" element={auth ? <MainComponent setAuth={setAuth} Component={Main} /> : <Login setAuth={setAuth} />} />
      </Routes>
    </Router>
  );
}

export default App;
