const express = require('express');
const router = express.Router();
const artworkModel = require('../models/artwork');
const artworks = require('../models/artworkData');
const bodyParser = require('body-parser');

router.use(express.json());
router.use(bodyParser.json());

router.get('/', (req, res) => {
  res.send(artworks);
});

router.post('/', (req, res) => {
  const newArtwork = {
    id: artworks.length + 1, // assign a unique ID based on the length of the existing array
    title: req.body.title,
    artist: req.body.artist,
    description: req.body.description,
    image: req.body.image,
    era: req.body.era,
  };

  artworks.push(newArtwork);
  res.send(newArtwork); // return the newly added artwork as a response
});

module.exports = router;
