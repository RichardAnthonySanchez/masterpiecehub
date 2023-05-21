import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  
  // Handles the form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Send a POST request to the login endpoint
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    // Parse the response data
    const data = await response.json();
    if (response.ok) {
      
      // Call the handleLogin function provided by the parent component
      // Pass the token received from the server
      handleLogin(data.token);
      navigate('/protected'); // Navigate to the '/protected' path
    } else {

      // Display an alert with the error message received from the server
      alert(data.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
