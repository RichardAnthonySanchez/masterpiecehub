const Artwork = require('./models/artwork');

const retrieveArtwork = async () => {
  try {
    const artwork = await Artwork.find();
    return artwork;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to retrieve artwork');
  }
};

retrieveArtwork()
  .then((artwork) => console.log(artwork))
  .catch((error) => console.error(error));