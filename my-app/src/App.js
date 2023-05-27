import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginForm from './components/LoginForm';
import HomePage from './components/HomePage';
import Authentication from './components/Authentication';
import MedievalPage from './components/MedievalPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.css';

//init state with no token
function App() {
  const [token, setToken] = useState('');

  //get token after authorized login
  const handleLogin = (token) => {
    setToken(token);
  };

  //render html on homepage
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm handleLogin={handleLogin} />} />
        <Route exact path="/medieval" element={<MedievalPage />} />
        <Route
          path="/protected"
          element={<Authentication token={token} />} // Wrap Authentication component in a Route
        />
      </Routes>
    </Router>
  );
}

export default App;
