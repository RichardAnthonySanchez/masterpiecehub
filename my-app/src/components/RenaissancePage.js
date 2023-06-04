import React, { useEffect, useState } from 'react';
import Card from './Card';
import '../styles/era-pages.css';
import { Container, Row, Col, Accordion, Button } from 'react-bootstrap';
import { fetchArtworkData } from './artworkAPI';

const RenaissancePage = () => {
  const [artworkData, setArtworkData] = useState([]);
  const [renaissanceArtworks, setRenaissanceArtworks] = useState([]);

  const title = 'Renaissance';
  const description = "The Renaissance art movement, which emerged in Italy during the 14th century, marked a significant shift from the medieval era that came before it. Building upon the foundations laid by medieval art, the Renaissance celebrated humanism, individualism, and the revival of classical Greek and Roman aesthetics. Artists of the Renaissance focused on realistic depictions of the human form, perspective, light, and shadow. This newfound emphasis on humanistic ideals and naturalism paved the way for the flourishing of Renaissance art. The Renaissance also laid the groundwork for the subsequent Baroque art movement, which further expanded upon the principles of naturalism, emotion, and grandeur. The influence of Renaissance art can be seen in the richly detailed and dramatic compositions of Baroque artworks. Together, the Renaissance and Baroque art movements represent a remarkable evolution in the history of Western art, with the Renaissance acting as a bridge between the medieval era and the exuberant splendor of the Baroque."

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchArtworkData();
      setArtworkData(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filterRenaissanceArtworks = () => {
      const filteredArtworks = artworkData.filter((artwork) => artwork.era === title);
      setRenaissanceArtworks(filteredArtworks);
    };

    filterRenaissanceArtworks();
  }, [artworkData]);

function ShowAccordion() {
  return (
    <Accordion defaultActiveKey="1" className='d-lg-none accordion-flush pt-5'>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Show Artwork</Accordion.Header>
        <Accordion.Body>
        {renaissanceArtworks.slice(0, 10).map((artwork) => (
              <Col className='card-grid-mobile pt-5'>
                <div className='aspect-ratio-container'>
                <Card
                  title={artwork.title}
                  image={artwork.image}
                  link={`/artwork/${artwork.id}`}
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
        <h2 className='row justify-content-center pt-5'>{title} Art</h2>
        <p className='era-copy col-lg-5 col-md-10 col-sm-12'>
{          `${description}`
}        </p>
      </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

  return (
    <div>
      <div className='renaissancepage container min-vh-100 col-lg-10 col-sm-12 flex-column'>
        <h1 className='header pt-5 d-none d-lg-flex'>{title.toUpperCase()}</h1>
        <h2 className="header-mobile h2-responsive rounded d-lg-none d-flex justify-content-center align-items-center p-4">{title.toUpperCase()}</h2>
        <Row className='justify-content-center d-none d-lg-flex'>
        <Row className='col-10 justify-content-center'>
            {renaissanceArtworks.slice(0, 10).map((artwork) => (
              <Col lg={2} className='card era-card'>
                <Card
                  title={artwork.title}
                  image={artwork.image}
                  link={`/artwork/${artwork.id}`}
                  className={`era-card-${artwork.title.split(' ').join('').toLowerCase().split("'").join('')}`}>
                    <img src={artwork.image} alt={artwork.title} />
                  <h3>{artwork.title}</h3>
                </Card>
                </Col>
            ))}
        </Row>
        </Row>
        <ShowAccordion className='d-flex col d-lg-none'></ShowAccordion>
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
        <h2 className='row justify-content-center'>{title} Art</h2>
        <p className='era-copy col-lg-5 col-md-10'>
          {description}
        </p>
      </div>
      <div className='navigation d-flex justify-content-center pb-2 pt-5'>
              <Button className='col' href='/'>Back to Art Movements</Button>
      </div>
    </div>
  );
            };  

export default RenaissancePage;