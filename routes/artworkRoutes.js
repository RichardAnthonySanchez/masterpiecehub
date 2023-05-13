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
  const id = req.params.id;
  const artwork = artworks[id - 1];

  if (!artwork) {
    return res.status(404).send('Artwork not found');
  }

  artwork.era = req.body.era || artwork.era;
  artwork.title = req.body.title || artwork.title;
  artwork.artist = req.body.artist || artwork.artist;
  artwork.year = req.body.year || artwork.year;
  artwork.image = req.body.image || artwork.image;
  artwork.description = req.body.description || artwork.description;

  return res.status(200).send(artwork);
});


module.exports = router;
