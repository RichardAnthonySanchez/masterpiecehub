import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';

const HomePage = () => {
  const [artworkData, setArtworkData] = useState([]);
  const [uniqueEras, setUniqueEras] = useState([]);

  useEffect(() => {
    // Fetch artwork data when the component mounts
    fetchArtworkData();
  }, []);

  const fetchArtworkData = async () => {
    try {
      const response = await fetch('http://localhost:3000/artworks');
      const data = await response.json();
      setArtworkData(data);
      // Extract unique eras from artwork data
      const uniqueEras = [...new Set(data.map((artwork) => artwork.era))];
      setUniqueEras(uniqueEras);
    } catch (error) {
      console.error('Error fetching artwork data:', error);
    }
  };
  
  return (
    <div className="homepage">
      <h1 className='header'>MASTERPIECE HUB</h1>
      <div className="arrow-left">
      <img src="img/nav-left.svg" alt="nav left" />
      </div>
      <div className="arrow-right">
      <img src="img/nav-right.svg" alt="nav right" />
      </div>
      <div className="card-grid">
        {uniqueEras.map((era) => {
          // Find the first artwork for the era
          const artworkForEra = artworkData.find((artwork) => artwork.era === era);

          // Render the card only if there is artwork for the era
          if (artworkForEra) {
            return (
              <Card
                key={artworkForEra.id}
                //title={artworkForEra.era}
                image={artworkForEra.image}
              />
            );
          }
          return null;
        })}
      </div>
      <Link to="/login" className='login'>Login</Link>
    </div>
  );
  }

export default HomePage;