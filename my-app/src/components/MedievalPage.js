import React, { useEffect, useState } from 'react';
import Card from './Card';
import '../styles/era-pages.css';
import { Container, Row, Col } from 'react-bootstrap';
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
      <div className='medievalpage container col-lg-10 col-md-12 flex-column'>
        <h1 className='header pt-5'>MEDIEVAL</h1>
        <Row className='era-card-grid d-flex justify-content-center'>
            {medievalArtworks.slice(0, 10).map((artwork) => (
              <Col className='era-card-container' lg={2} md={5} sm={1} key={artwork.id}>
                <Card
                  title={artwork.title}
                  image={artwork.image}
                  className={`card era-card era-card-${artwork.title.split(' ').join('').toLowerCase()}`}
                >
                  <div className="aspect-ratio-container">
                    <img src={artwork.image} alt={artwork.title} />
                  </div>
                  <h3>{artwork.title}</h3>
                </Card>
              </Col>
            ))}
        </Row>
        <a href='#era-copy' className='learn-more'>
        <Row className='learn-more align-items-center pt-5 pb-5'>
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
        </a>
      </div>
      <div id='era-copy' className='row justify-content-center align-items-center pt-5 vh-100'>
        <h2 className='row justify-content-center'>Medieval Art</h2>
        <p className='era-copy col-lg-5 col-md-10'>
          The Medieval era, spanning from the 5th to the 15th century, marked a significant transition in art history. Building upon the foundations of ancient art forms, such as Roman and Byzantine influences, Medieval art developed its distinctive style and symbolism. The era saw a fusion of Christian traditions and classical motifs, resulting in magnificent illuminated manuscripts, intricate stone carvings, and awe-inspiring stained glass windows. These artistic expressions laid the groundwork for the emergence of the Gothic art movement, characterized by soaring cathedrals, pointed arches, and elaborate sculptures. The Medieval era's reverence for spirituality and innovative architectural techniques paved the way for the grandeur and magnificence of Gothic art.
        </p>
      </div>
    </div>
  );
            };  

export default MedievalPage;