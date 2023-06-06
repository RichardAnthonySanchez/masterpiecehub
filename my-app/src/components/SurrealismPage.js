import React, { useEffect, useState } from 'react';
import Card from './Card';
import '../styles/era-pages.css';
import { Container, Row, Col, Accordion, Button } from 'react-bootstrap';
import { fetchArtworkData } from './artworkAPI';

const SurrealismPage = () => {
  const [artworkData, setArtworkData] = useState([]);
  const [surrealismArtworks, setSurrealismArtworks] = useState([]);

  const title = 'Surrealism';
  const description = "Surrealism, a revolutionary art movement that emerged in the early 20th century, sought to explore the realm of the unconscious and unleash the power of imagination. Led by André Breton, Surrealists embraced irrationality, dreams, and the subconscious as sources of artistic inspiration. They sought to break free from the constraints of reason and traditional artistic techniques, embracing automatism and chance as creative methods. Surrealist artworks often featured bizarre and dreamlike imagery, juxtaposing unexpected elements to create a sense of mystery and unsettling beauty. This movement challenged conventional notions of reality, inviting viewers to delve into the depths of the human psyche and question the boundaries of perception."

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchArtworkData();
      setArtworkData(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filterSurrealismArtworks = () => {
      const filteredArtworks = artworkData.filter((artwork) => artwork.era === title);
      setSurrealismArtworks(filteredArtworks);
    };

    filterSurrealismArtworks();
  }, [artworkData]);

function ShowAccordion() {
  return (
    <Accordion defaultActiveKey="1" className='d-lg-none accordion-flush pt-5'>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Show Artwork</Accordion.Header>
        <Accordion.Body>
        {surrealismArtworks.slice(0, 10).map((artwork) => (
              <Col className='card-grid-mobile pt-5'>
                <div className='aspect-ratio-container'>
                <Card
                  title={artwork.title}
                  image={artwork.image}
                  link={`/artwork/${artwork.id}`}
                  className={`card-mobile card-mobile-${artwork.title.split(' ').join('').toLowerCase().split('.').join('').split('-').join('').split(',').join('').split("'").join('')}`}>
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
      <div className='surrealismpage container min-vh-100 col-lg-10 col-sm-12 flex-column'>
        <h1 className='header pt-5 d-none d-lg-flex'>{title.toUpperCase()}</h1>
        <h2 className="header-mobile h2-responsive rounded d-lg-none d-flex justify-content-center align-items-center p-4">{title.toUpperCase()}</h2>
        <Row className='justify-content-center d-none d-lg-flex'>
        <Row className='col-10 justify-content-center'>
            {surrealismArtworks.slice(0, 10).map((artwork) => (
              <Col lg={2} className='card era-card'>
                <Card
                  title={artwork.title}
                  image={artwork.image}
                  link={`/artwork/${artwork.id}`}
                  className={`era-card-${artwork.title.split(' ').join('').toLowerCase().split("'").join('').split('.').join('').split('-').join('').split(',').join('')}`}>
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

export default SurrealismPage;