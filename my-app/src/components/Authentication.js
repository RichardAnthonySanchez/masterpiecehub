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

    return (
      <div>
      <h2>Artworks</h2>
      <ul>
        {artworks.map((artwork) => (
          <li key={artwork.id}>{artwork.title}</li>
        ))}
      </ul>
    </div>
    );
  };

export default Authentication;
