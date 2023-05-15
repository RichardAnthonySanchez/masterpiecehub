import React, { useState } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';

function App() {
  const [token, setToken] = useState('');

  const handleLogin = (username, password) => {
    setToken(username);
  };

  const getProtectedData = () => {
    //console.log(`${token}`)
    fetch('http://localhost:3000/artworks/1', {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      });
  };

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
