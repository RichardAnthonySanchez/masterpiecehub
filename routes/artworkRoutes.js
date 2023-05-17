const express = require('express');
const router = express.Router();
const artworkModel = require('../models/artwork');
const artworks = require('../models/artworkData');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const path = require('path');


router.use(express.json());
router.use(bodyParser.json());

// middleware function to check for JWT token in Authorization header
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  req.token = token;

  if (typeof token !== 'undefined') {
    jwt.verify(token, 'secret_key', (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

//get all artworks
router.get('/', (req, res) => {
  res.send(artworks);
});

//get admin dashboard boilerplate html
router.get('/admin', authenticateToken, (req, res) => {
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

//delete artwork by id
router.delete('/:id', authenticateToken, (req, res) => {
  const id = req.params.id;
  const index = artworks[id - 1];

  if (index !== -1) {
    artworks.splice(index, 1);
    res.send(`Artwork with id ${id} deleted.`);
  } else {
    res.status(404).send(`Artwork with id ${id} not found.`);
  }
});



module.exports = router;
