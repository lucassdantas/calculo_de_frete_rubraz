// src/App.tsx

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios'; 
import { MainComponent } from './components/MainComponent';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider, UserContext } from './context/userContext';
import { backendUrl } from '@/constants';

function App() {
  const [auth, setAuth] = useState(false);
  const userContext = useContext(UserContext);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get(`${backendUrl}session.php`, { withCredentials: true });
        if (userContext) {
          userContext.setCurrentUser(response.data.user);
          setAuth(response.data.loggedIn);
        }
      } catch (error) {
        console.error('Houve um erro ao verificar a sessão!', error);
      }
    };

    checkSession();
  }, [userContext]);

  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainComponent setAuth={setAuth} auth={auth} />} />
          <Route path="*" element={<MainComponent setAuth={setAuth} auth={auth} />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
