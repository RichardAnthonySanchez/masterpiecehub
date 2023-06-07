import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';

//structure auth, init form state hidden, and access artwork data
const Authentication = ({ token }) => {
  const [showForm, setShowForm] = useState(false);
  const [artworks, setArtworks] = useState([]);

  //handle add artwork button
  const handleAddArtwork = () => {
    setShowForm(true);
  };
  
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // Get the form data
    const formData = new FormData(event.target);
    const artworkData = Object.fromEntries(formData.entries());

    //get all artwork post request
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

  //get admin dashboard via post request
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

  //render html for authorized users
    return (
      <div className='container min-vh-100 justify-content-center'>
        <Col className='col-5'>
      <h2>Artworks</h2>
      <button className='btn btn-primary' onClick={handleAddArtwork}>Add Artwork</button>
      {showForm && (
            <form className='col-1 pb-2 pt-2' id="addArtworkForm" onSubmit={handleFormSubmit}>
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
              <button className='btn btn-primary' type="submit">Add Artwork</button>
            </form>
          )}
      <ul>
            {artworks.map((artwork) => (
              <li className='pt-2' key={artwork.id}>
                {artwork.title}{' '}
                <button className='btn btn-primary btn-delete' onClick={() => handleDelete(artwork.id)}>Delete</button>
              </li>
            ))}
          </ul>
          </Col>
    </div>
    );
  };

export default Authentication;
