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
    title: req.body.title,
    artist: req.body.artist,
    year: req.body.year,
    era: req.body.era,
    image: req.body.image,
    description: req.body.description
  };

  // Validate artwork data against schema
  const { error } = artworkModel.validate(newArtwork);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  artworks.push(newArtwork);
  res.status(201).json(newArtwork);
});

module.exports = router;
