const express = require('express');
const mongoose = require('mongoose');
const Artwork = require('./models/artwork');

const app = express();
  
  mongoose.connect('mongodb://localhost:27017/artwork_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB database!');
}).catch((error) => {
  console.error('Error connecting to MongoDB database:', error);
});

const ArtworkContent = require('./models/artwork');
const newArtwork = new Artwork({
  name: 'Starry Night',
  artist: 'Vincent van Gogh',
  year: 1889,
  image: 'https://www.example.com/starry_night.jpg',
  era: 'Post-Impressionism'
});

const artworkSchema = new mongoose.Schema({
    era: String,
    artist: String,
    title: String,
    image: String
  });
  
  mongoose.models = {}
  const nameOfArtwork = mongoose.model('Artwork', artworkSchema);
  
  async function createArtwork() {
    const artwork = new Artwork({
      era: 'Renaissance',
      artist: 'Leonardo da Vinci',
      title: 'Mona Lisa',
      image: 'https://example.com/mona-lisa.jpg',
      year: 1503,
      description: 'A portrait of Lisa Gherardini, the wife of Francesco del Giocondo'
    });
  
    await artwork.save();
    console.log('Artwork created successfully!');
  }
  
  createArtwork();
  

app.listen(3000, () => {
    console.log('Server listening on port 3000!');
  });