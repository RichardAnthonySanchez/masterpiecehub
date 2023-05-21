import React, { useState, useEffect } from 'react';

const Authentication = ({ token }) => {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    const getProtectedData = async () => {
      console.log('getProtectedData function triggered in auth component');
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
