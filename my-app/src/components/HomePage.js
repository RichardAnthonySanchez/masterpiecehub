import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from './Card'; // Replace './path/to/Card' with the actual path to your Card component file

const HomePage = () => {
  const [artworkData, setArtworkData] = useState([]);

  useEffect(() => {
    // Fetch artwork data when the component mounts
    fetchArtworkData();
  }, []);

  const fetchArtworkData = async () => {
    try {
      const response = await fetch('http://localhost:3000/artworks');
      const data = await response.json();
      setArtworkData(data);
    } catch (error) {
      console.error('Error fetching artwork data:', error);
    }
  };
  
    return (
      <div className="homepage">
      <h2>Explore Art Eras</h2>
      <div className="card-grid">
      {artworkData.map((artwork) => (
        <Card
          key={artwork.id}
          title={artwork.era}
          image={artwork.image}
        />
      ))}
    </div>
      <Link to="/login">Login</Link>
      </div>
    );
  }

export default HomePage;