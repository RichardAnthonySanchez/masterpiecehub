import React, { useState } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';

function App() {
  const [token, setToken] = useState('');

  const handleLogin = (username, password) => {
    setToken(username);
  };

  const getProtectedData = async () => {
    try {
      const response = await fetch('http://localhost:3000/artworks/admin', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (response.status === 200) {
        const html = await response.text();
        document.documentElement.innerHTML = html;
      } else {
        throw new Error('Failed to get admin dashboard');
      }
    } catch (err) {
      console.error(err);
    }
  }
  

  return (
    <div>
      {token ? (
        <div>
          <h2>You are logged in!</h2>
          <p>Your token is: {token}</p>
          <button onClick={getProtectedData}>Get Protected Data</button>
        </div>
      ) : (
        <LoginForm handleLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
