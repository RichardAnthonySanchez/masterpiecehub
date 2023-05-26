import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Card from './Card';

const HomePage = () => {
  const [artworkData, setArtworkData] = useState([]);
  const [uniqueEras, setUniqueEras] = useState([]);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  //navigate era cards to the left
  const handleLeftArrowClick = () => {
    setActiveCardIndex((prevIndex) => {
      if (prevIndex === 0) {
        // Loop to the end if at the beginning
        return uniqueEras.length - 4;
      } else {
        return prevIndex - 1;
      }
    });
  };
  
  //navigate era cards to the right
  const handleRightArrowClick = () => {
    setActiveCardIndex((prevIndex) => {
      if (prevIndex === uniqueEras.length - 4) {
        // Loop to the beginning if at the end
        return 0;
      } else {
        return prevIndex + 1;
      }
    });
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
    <Container className="homepage vh-100">
      <Row>
        <Col className="text-right" lg={{ span: 1, offset: 11}} md={{ span: 2, offset: 10 }}>
          <Link to="/login" className="login">Login</Link>
        </Col>
      </Row>
      <h1 className="header pt-1">MASTERPIECE HUB</h1>
      <Row className="pt-5 justify-content-center h-25 align-items-center">
        <Col className="d-flex justify-content-end arrow-left" onClick={handleLeftArrowClick}>
          <img src="img/nav-left.svg" alt="nav left" />
        </Col>
        <Col lg={10}>
          <div className="card-grid">
            {displayedEras.map((era, index) => {
              const artworkForEra = artworkData.find((artwork) => artwork.era === era);
              if (artworkForEra) {
                const era = artworkForEra.era;
                const eraNoSpace = era.split(' ').join('');
                const cardClass = `card card-${eraNoSpace}`;
                return (
                  <Col lg={2} key={index} className={cardClass}>
                    <Card title={artworkForEra.era} image={artworkForEra.image} />
                  </Col>
                );
              }
              return null;
            })}
          </div>
        </Col>
        <Col className=" d-flex justify-content-start arrow-right" onClick={handleRightArrowClick}>
          <img src="img/nav-right.svg" alt="nav right" />
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;