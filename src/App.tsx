import './App.css';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios'; 
import { MainComponent } from './components/MainComponent';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './components/Login';
import { Main } from './components/Main';
import { UserContext } from './context/userContext';

function App() {
  const [auth, setAuth] = useState(true);
  const [currentUser, setCurrentUser] = useState(useContext(UserContext))
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get('http:localhost/rubraz/calculo_de_frete_rubraz/public/backend/session.php', { withCredentials: true });
        //setCurrentUser(response.data.user)
        //setAuth(response.data.loggedIn);
      } catch (error) {
        console.error('Houve um erro ao verificar a sessão!', error);
      }
    };

    checkSession();
  }, []);
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={auth ? <MainComponent setAuth={setAuth} Component={Main} currentUser={currentUser} /> : <Login setAuth={setAuth} />} />
        <Route path="/main" element={auth ? <MainComponent setAuth={setAuth} Component={Main} currentUser={currentUser}/> : <Login setAuth={setAuth} />} />
      </Routes>
    </Router>
  );
}

export default App;
