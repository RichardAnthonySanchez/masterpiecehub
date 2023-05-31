import React, { useEffect, useState } from 'react';
import Card from './Card';
import '../styles/era-pages.css';
import { Container, Row, Col, Accordion, Button } from 'react-bootstrap';
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

function BasicExample() {
  return (
    <Accordion defaultActiveKey="1" className='d-lg-none accordion-flush pt-5'>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Show Artwork</Accordion.Header>
        <Accordion.Body>
        {medievalArtworks.slice(0, 10).map((artwork) => (
              <Col className='card-grid-mobile pt-5'>
                <div className='aspect-ratio-container'>
                <Card
                  title={artwork.title}
                  image={artwork.image}
                  className={`card-mobile card-mobile-${artwork.title.split(' ').join('').toLowerCase()}`}>
                    <img src={artwork.image} alt={artwork.title} />
                  <h3>{artwork.title}</h3>
                </Card>
                </div>
                </Col>
            ))}
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Learn More</Accordion.Header>
        <Accordion.Body>
        <div id='' className='row justify-content-center align-items-center'>
        <h2 className='row justify-content-center pt-5'>Medieval Art</h2>
        <p className='era-copy col-lg-5 col-md-10 col-sm-12'>
          The Medieval era, spanning from the 5th to the 15th century, marked a significant transition in art history. Building upon the foundations of ancient art forms, such as Roman and Byzantine influences, Medieval art developed its distinctive style and symbolism. The era saw a fusion of Christian traditions and classical motifs, resulting in magnificent illuminated manuscripts, intricate stone carvings, and awe-inspiring stained glass windows. These artistic expressions laid the groundwork for the emergence of the Gothic art movement, characterized by soaring cathedrals, pointed arches, and elaborate sculptures. The Medieval era's reverence for spirituality and innovative architectural techniques paved the way for the grandeur and magnificence of Gothic art.
        </p>
      </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

  return (
    <div>
      <div className='medievalpage container min-vh-100 col-lg-10 col-sm-12 flex-column'>
        <h1 className='header pt-5 d-none d-lg-flex'>MEDIEVAL</h1>
        <h2 className="header-mobile h2-responsive rounded d-lg-none d-flex justify-content-center align-items-center p-4">MEDIEVAL</h2>
        <Row className='justify-content-center d-none d-lg-flex'>
        <Row className='col-10 justify-content-center'>
            {medievalArtworks.slice(0, 10).map((artwork) => (
              <Col lg={2} className='card era-card'>
                <Card
                  title={artwork.title}
                  image={artwork.image}
                  className={`era-card-${artwork.title.split(' ').join('').toLowerCase().split("'").join('')}`}>
                    <img src={artwork.image} alt={artwork.title} />
                  <h3>{artwork.title}</h3>
                </Card>
                </Col>
            ))}
        </Row>
        </Row>
        <BasicExample className='d-flex col d-lg-none'></BasicExample>
        <a href='#era-copy' className='learn-more'>
        <Row className='learn-more align-items-center pt-5 pb-5 d-none d-lg-flex'>
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
      <div id='era-copy' className='d-none d-lg-flex row justify-content-center align-items-center pt-5 vh-100'>
        <h2 className='row justify-content-center'>Medieval Art</h2>
        <p className='era-copy col-lg-5 col-md-10'>
          The Medieval era, spanning from the 5th to the 15th century, marked a significant transition in art history. Building upon the foundations of ancient art forms, such as Roman and Byzantine influences, Medieval art developed its distinctive style and symbolism. The era saw a fusion of Christian traditions and classical motifs, resulting in magnificent illuminated manuscripts, intricate stone carvings, and awe-inspiring stained glass windows. These artistic expressions laid the groundwork for the emergence of the Gothic art movement, characterized by soaring cathedrals, pointed arches, and elaborate sculptures. The Medieval era's reverence for spirituality and innovative architectural techniques paved the way for the grandeur and magnificence of Gothic art.
        </p>
      </div>
      <div className='navigation d-flex justify-content-center pb-2 pt-5'>
              <Button className='col' href='/'>Back to Art Movements</Button>
      </div>
    </div>
  );
            };  

export default MedievalPage;