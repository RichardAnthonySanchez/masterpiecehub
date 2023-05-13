const express = require('express');
const router = express.Router();
const artworkModel = require('../models/artwork');
const artworks = require('../models/artworkData');
const bodyParser = require('body-parser');

router.use(express.json());
router.use(bodyParser.json());

//get all artworks
router.get('/', (req, res) => {
  res.send(artworks);
});

//generate unique pages for each artwork
router.get('/:id', (req, res) => {
  const id = req.params.id;
  res.send(artworks[id - 1]);
});


//create artwork
router.post('/', (req, res) => {
  const newArtwork = {
    title: req.body.title,
    artist: req.body.artist,
    year: req.body.year,
    era: req.body.era,
    image: req.body.image,
    description: req.body.description
  };

  newArtwork.id = artworks.length + 1;

  // Validate artwork data against schema
  const { error } = artworkModel.validate(newArtwork);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  artworks.push(newArtwork);
  res.status(201).json(newArtwork);
});

//update existing artwork by id
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const artwork = artworks.find((artwork) => artwork.id === id);

  if (!artwork) {
    return res.status(404).send('Artwork not found');
  }

  const { error } = artworkModel.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  artwork.era = req.body.era;
  artwork.title = req.body.title;
  artwork.artist = req.body.artist;
  artwork.year = req.body.year;
  artwork.image = req.body.image;
  artwork.description = req.body.description;

  res.send(artwork);
});

module.exports = router;
