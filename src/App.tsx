// src/App.tsx

import { useState } from 'react';
import { MainComponent } from './components/MainComponent';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { UserProvider} from './context/userContext';
import ResetPasswordForm from '@/components/Login/ResetPasswordForm';

function App() {
  const [auth, setAuth] = useState(false);
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainComponent setAuth={setAuth} auth={auth} />} />
          <Route path="resetPassword" element={<ResetPasswordForm />} />
          <Route path="*" element={<MainComponent setAuth={setAuth} auth={auth} />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
