const Artwork = require('../models/artwork');

Artwork.find({}, (err, artwork) => {
    if (err) {
      console.log(err);
    } else {
      console.log(artwork);
    }
  });
  