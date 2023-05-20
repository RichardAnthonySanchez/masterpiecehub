import React, { useState } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import SearchForm from './components/SearchForm';
import { Container, ListGroup } from 'react-bootstrap';

function App() {
  const [token, setToken] = useState('');
  const [artworks, setArtworks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');


  const handleLogin = (username, password) => {
    setToken(username);
  };

  const handleSearch = () => {
    const query = searchQuery.trim().toLowerCase();
    if (query === '') {
      setSearchResults([]);
      return;
    }
    const filteredArtworks = artworks.filter(
      (artwork) =>
        artwork.title.toLowerCase().includes(query) ||
        artwork.artist.toLowerCase().includes(query) ||
        artwork.era.toLowerCase().includes(query)
    );
    setSearchResults(filteredArtworks);
  }; 

  const getProtectedData = async () => {
    try {
      const response = await fetch('http://localhost:3000/artworks/admin', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (response.status === 200) {
        const data = await response.json();
        setArtworks(data);
      } else {
        throw new Error('Failed to get admin dashboard');
      }
    } catch (err) {
      console.error(err);
    }
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    const formData = new FormData(event.target);
    const artworkData = Object.fromEntries(formData);
  
    try {
      const response = await fetch('http://localhost:3000/artworks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(artworkData),
      });
  
      if (response.status === 201) {
        const newArtwork = await response.json();
        setArtworks((prevArtworks) => [...prevArtworks, newArtwork]);
        setShowForm(false);
        event.target.reset();
      } else {
        throw new Error('Failed to add artwork');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddArtwork = () => {
    setShowForm(true);
  };
  
  const handleDelete = async (artworkId) => {
    try {
      const response = await fetch(`http://localhost:3000/artworks/${artworkId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 200) {
        console.log(`Artwork with ID ${artworkId} has been successfully deleted.`);
        // Perform any necessary UI updates or notifications
      } else {
        throw new Error('Failed to delete artwork');
      }
    } catch (err) {
      console.error(err);
    }
  };
  

  return (
<div>
      {token ? (
        <div>
          <h2>You are logged in!</h2>
          <p>Your token is: {token}</p>
          <button onClick={getProtectedData}>Modify Artworks</button>
          <h3>Search</h3>
          <SearchForm searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={handleSearch} />
          <ListGroup>
            {searchResults.map((artwork) => (
              <ListGroup.Item key={artwork.id}>
                {artwork.title} by {artwork.artist} ({artwork.year})
              </ListGroup.Item>
            ))}
          </ListGroup>
          <h3>Artworks</h3>
          <button onClick={handleAddArtwork}>Add Artwork</button>
          {showForm && (
            <form id="addArtworkForm" onSubmit={handleFormSubmit}>
              <label htmlFor="title">Title:</label>
              <input type="text" id="title" name="title" required />
              <label htmlFor="artist">Artist:</label>
              <input type="text" id="artist" name="artist" required />
              <label htmlFor="year">Year:</label>
              <input type="text" id="year" name="year" required />
              <label htmlFor="era">Era:</label>
              <input type="text" id="era" name="era" required />
              <label htmlFor="image">Image URL:</label>
              <input type="text" id="image" name="image" required />
              <label htmlFor="description">Description:</label>
              <textarea id="description" name="description" required></textarea>
              <button type="submit">Add Artwork</button>
            </form>
          )}
          <ul>
            {artworks.map((artwork) => (
              <li key={artwork.id}>
                {artwork.title}{' '}
                <button onClick={() => handleDelete(artwork.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <LoginForm handleLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
