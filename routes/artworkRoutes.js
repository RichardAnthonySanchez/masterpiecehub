const express = require('express');
const router = express.Router();
const { artworkSchema } = require('../models/artwork');
const artworks = require('../models/artworkData');

// Get all artworks
router.get('/artworks', (req, res) => {
  res.send(artworks);
});

// Get artwork by ID
router.get('/artworks/:id', (req, res) => {
  const id = req.params.id;
  const artwork = artworks.find((artwork) => artwork.id === id);
  if (!artwork) return res.status(404).send('Artwork not found');
  res.send(artwork);
});

// Create artwork
router.post('/artworks', (req, res) => {
  const { era, title, artist, year, description, image } = req.body;
  const artwork = { era, title, artist, year, description, image };

  // Validate artwork data against artworkSchema
  const { error } = artworkSchema.validate(artwork);
  if (error) return res.status(400).send(error.details[0].message);

  // Add artwork to artworks array
  artworks.push(artwork);

  res.send(artwork);
});

module.exports = router;
