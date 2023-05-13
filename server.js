const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const artworkRoutes = require('./routes/artworkRoutes');
const artworkSchema = require('./models/artwork');
const artworks = require('./models/artworkData');
const app = express();

// Mount artworkRoutes as middleware
app.use(express.json());
app.use(bodyParser.json());
app.use('/artworks', artworkRoutes);
  
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