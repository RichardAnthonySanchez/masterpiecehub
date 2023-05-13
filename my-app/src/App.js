import React, { useState } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';

function App() {
  const [token, setToken] = useState('');

  const handleLogin = (username, password) => {
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
      .then(response => response.json())
      .then(data => {
        setToken(data.token);
      });
  };

  return (
    <div>
      {token ? (
        <div>
          <h2>You are logged in!</h2>
          <p>Your token is: {token}</p>
        </div>
      ) : (
        <LoginForm handleLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
