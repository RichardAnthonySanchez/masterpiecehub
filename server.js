const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const artworkRoutes = require('./routes/artworkRoutes');
const artworkSchema = require('./models/artwork');
const artworks = require('./models/artworkData');
const authRoutes = require('./routes/authRoutes');
const app = express();
const cors = require('cors');
const path = require('path');


// enable CORS for all origins
app.use(cors({
  origin: "*",
}));

// parse requests with json payloads
app.use(express.json());

//use static middleware
app.use(express.static('public'));

// use the artwork and authentication route
app.use('/artworks', artworkRoutes);
app.use('/login', authRoutes);
  
  mongoose.connect('mongodb://localhost:27017/artwork_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB database!');
}).catch((error) => {
  console.error('Error connecting to MongoDB database:', error);
});
  
app.listen(3000, () => {
    console.log('Server listening on port 3000!');
  });