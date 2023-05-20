import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginForm from './components/LoginForm';
import HomePage from './components/HomePage';
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
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </Router>
  );
}

export default App;
