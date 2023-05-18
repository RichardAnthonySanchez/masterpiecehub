const csv = require('csv-parser');
const fs = require('fs');

const artworks = [

  ]

  function parseArtworkData() {
    const results = [];
  
    fs.createReadStream('./data/artworkData.csv')
      .pipe(csv())
      .on('data', (data) => {
        results.push(data);
      })
      .on('end', () => {
        console.log('CSV data has been parsed.');
        // Add the parsed data to the artworks array
        artworks.push(...results);
      });
  }  

  // Call the function to parse the artwork data from the CSV file
  parseArtworkData();

  module.exports = artworks;