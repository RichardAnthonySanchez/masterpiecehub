const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'password';

// Login endpoint
router.post('/', (req, res) => {
    console.log("test loing endpoint")
  const { username, password } = req.body;

  // Check if the provided username and password match the admin credentials
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    // Generate a JWT token with a secret key and a one hour expiration time
    const token = jwt.sign({ username }, 'secret_key', { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

module.exports = router;