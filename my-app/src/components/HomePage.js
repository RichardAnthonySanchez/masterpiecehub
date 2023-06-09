import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Card from './Card';
import { fetchArtworkData } from './artworkAPI';

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
    const fetchData = async () => {
      const data = await fetchArtworkData();
      setArtworkData(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filterArtWorkData = () => {
      const uniqueEras = [...new Set(artworkData.map((artwork) => artwork.era))];
      setUniqueEras(uniqueEras);
    };

    filterArtWorkData();
  }, [artworkData]);
  
  return (
    <Container className="homepage d-flex flex-column min-vh-100">
      <Row>
        <Col className="text-right" lg={{ span: 1, offset: 11}} md={{ span: 2, offset: 10 }} sm={12}>
          <Link to="/login" className="login">Login</Link>
        </Col>
      </Row>
      <Row className="align-items-center pt-4">
      <h1 className="header pt-1 d-none d-lg-flex">MASTERPIECE HUB</h1>
      <h2 className="header-mobile h2-responsive rounded d-lg-none d-flex justify-content-center align-items-center p-4">MASTERPIECE HUB</h2>
      </Row>
      <Row className="pt-5 justify-content-center h-25 align-items-center">
        <Col className="d-none d-lg-flex justify-content-end arrow-left" onClick={handleLeftArrowClick}>
          <img src="img/nav-left.svg" alt="nav left" />
        </Col>
        <Col lg={10} sm={12}>
          <div className="card-grid d-none d-lg-flex">
            {displayedEras.map((era, index) => {
              const artworkForEra = artworkData.find((artwork) => artwork.era === era);
              if (artworkForEra) {
                const era = artworkForEra.era;
                const eraNoSpace = era.split(' ').join('');
                const cardClass = `card card-${eraNoSpace}`;
                return (
                  <Col lg={2} md={12} key={index} className={cardClass}>
                    <Card 
                    title={artworkForEra.era} 
                    image={artworkForEra.image} 
                    link={`/${eraNoSpace.toLowerCase()}`} //dyanmically make our cards with links to era pages
                    />
                  </Col>
                );
              }
              return null;
            })}
          </div>
          <div className="card-grid-mobile d-lg-none md-col">
            {uniqueEras.map((era, index) => {
              const artworkForEra = artworkData.find((artwork) => artwork.era === era);
              if (artworkForEra) {
                const era = artworkForEra.era;
                const eraNoSpace = era.split(' ').join('');
                const cardClass = `card-mobile card-mobile-${eraNoSpace} pb-5`;
                return (
                  <Row key={index} className={cardClass}>
                    <div className="aspect-ratio-container">
                    <Card 
                    title={artworkForEra.era} 
                    image={artworkForEra.image}
                    link={`/${eraNoSpace.toLowerCase()}`} //dyanmically make our cards with links to era pages
                     />
                    </div>
                  </Row>
                );
              }
              return null;
            })}
          </div>
        </Col>
        <Col className="d-none d-lg-flex justify-content-start arrow-right" onClick={handleRightArrowClick}>
          <img src="img/nav-right.svg" alt="nav right" />
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;