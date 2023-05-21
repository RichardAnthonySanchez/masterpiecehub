import React, { useState, useEffect } from 'react';

const Authentication = ({ token }) => {
  const [showForm, setShowForm] = useState(false);
  const [artworks, setArtworks] = useState([]);

  const handleAddArtwork = () => {
    setShowForm(true);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // Get the form data
    const formData = new FormData(event.target);
    const artworkData = Object.fromEntries(formData.entries());

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
        setArtworks([...artworks, newArtwork]);
        setShowForm(false);
      } else {
        throw new Error('Failed to add artwork');
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const getProtectedData = async () => {
      try {
        const response = await fetch('http://localhost:3000/artworks/admin', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
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
    };

    // Call the function to fetch protected data
    getProtectedData();
  }, [token]);

  //function handles deleting artworks from the database
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
      <h2>Artworks</h2>
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
    );
  };

export default Authentication;
