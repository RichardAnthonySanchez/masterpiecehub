const mongoose = require('mongoose');

// Define the connection string to your MongoDB database
const dbURI = 'mongodb://localhost/my-database';

// Establish a connection to the database
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.log(`Error connecting to database: ${err}`);
  });

// Export the Mongoose connection
module.exports = mongoose.connection;
