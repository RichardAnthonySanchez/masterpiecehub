import React, { useEffect, useState } from 'react';
import '../styles/card-grid.css';
import '../styles/era-pages.css';
import { Container, Row, Col } from 'react-bootstrap';
import Card from './Card';
import { fetchArtworkData } from './artworkAPI';

const MedievalPage = () => {
  const [artworkData, setArtworkData] = useState([]);
  const [medievalArtworks, setMedievalArtworks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchArtworkData();
      setArtworkData(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filterMedievalArtworks = () => {
      const filteredArtworks = artworkData.filter((artwork) => artwork.era === 'Medieval');
      setMedievalArtworks(filteredArtworks);
    };

    filterMedievalArtworks();
  }, [artworkData]);

  return (
    <div>
      <div className='medievalpage container flex-column vh-100'>
      <h1 className='header pt-5'>Medieval</h1>
      <Row className='era-card-grid d-flex justify-content-center'>
      <Row className='card-row-1 justify-content-center pt-5'>
      {medievalArtworks.slice(0, 5).map((artwork) => (
        <Col lg={1} md={1} sm={1} key={artwork.id}>
          <Card title={artwork.title} image={artwork.image} className={`card era-card-${artwork.title}`} />
        </Col>
      ))}
      </Row>
      <Row className='card-row-2 justify-content-center pt-5'>
      {medievalArtworks.slice(5, 10).map((artwork) => (
        <Col lg={1} md={1} sm={1} key={artwork.id}>
          <Card title={artwork.title} image={artwork.image} className={`card era-card-${artwork.title}`} />
        </Col>
      ))}
      </Row>
      </Row>
      <Row className='learn-more align-items-center'>
        <Col className='d-flex flex-row-reverse'>
        <img src="img/nav-down.svg" alt="nav down" />
        </Col>
        <Col>
        <h2 className='d-flex justify-content-center'>learn more</h2>
        </Col>
        <Col>
        <img src="img/nav-down.svg" alt="nav down" />
        </Col>
      </Row>
      </div>
      <div className='col-5 vh-100'>
        <body>
        The Medieval era, spanning from the 5th to the 15th century, marked a significant transition in art history. Building upon the foundations of ancient art forms, such as Roman and Byzantine influences, Medieval art developed its distinctive style and symbolism. The era saw a fusion of Christian traditions and classical motifs, resulting in magnificent illuminated manuscripts, intricate stone carvings, and awe-inspiring stained glass windows. These artistic expressions laid the groundwork for the emergence of the Gothic art movement, characterized by soaring cathedrals, pointed arches, and elaborate sculptures. The Medieval era's reverence for spirituality and innovative architectural techniques paved the way for the grandeur and magnificence of Gothic art.
        </body>
      </div>

    </div>
  );
};

export default MedievalPage;