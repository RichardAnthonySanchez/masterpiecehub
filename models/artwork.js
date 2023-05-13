const mongoose = require('mongoose');

const artworkSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  era: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

const Artwork = mongoose.model('Artwork', artworkSchema);

module.exports = Artwork;
