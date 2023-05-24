import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';

const HomePage = () => {
  const [artworkData, setArtworkData] = useState([]);
  const [uniqueEras, setUniqueEras] = useState([]);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  //navigate era cards to the left
  const handleLeftArrowClick = () => {
    setActiveCardIndex((prevIndex) => prevIndex - 1);
  };
  
  //navigate era cards to the right
  const handleRightArrowClick = () => {
    setActiveCardIndex((prevIndex) => prevIndex + 1);
  };

  //display 4 cards at a time
  const displayedEras = uniqueEras.slice(activeCardIndex, activeCardIndex + 4);

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
      <div className="arrow-left" onClick={handleLeftArrowClick}>
      <img src="img/nav-left.svg" alt="nav left" />
      </div>
      <div className="arrow-right" onClick={handleRightArrowClick}>
      <img src="img/nav-right.svg" alt="nav right" />
      </div>
      <div className="card-grid">
        {displayedEras.map((era, index) => {
          // Find the first artwork for the era
          const artworkForEra = artworkData.find((artwork) => artwork.era === era);

          // Render the card only if there is artwork for the era
          if (artworkForEra) {
            const cardClass = `card card-${index + 1}`; // Generate a unique class name
            return (
              <Card
                key={index}
                title={artworkForEra.era}
                image={artworkForEra.image}
                className={cardClass}
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