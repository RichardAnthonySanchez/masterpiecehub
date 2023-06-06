import React, { useEffect, useState } from 'react';
import Card from './Card';
import '../styles/era-pages.css';
import { Container, Row, Col, Accordion, Button } from 'react-bootstrap';
import { fetchArtworkData } from './artworkAPI';

const PopArtPage = () => {
  const [artworkData, setArtworkData] = useState([]);
  const [popArtArtworks, setPopArtArtworks] = useState([]);

  const title = 'Pop Art';
  const description = "Pop art, an art movement that emerged in the mid-1950s, celebrated the vibrant and mass-produced culture of consumerism. Influenced by popular media, advertising, and everyday objects, Pop artists sought to blur the boundaries between fine art and popular culture. They embraced images from popular culture, such as comic books, celebrities, and consumer products, and transformed them into art through techniques like collage, bold colors, and repetition. Pop art aimed to challenge traditional notions of high art and elitism, making art accessible to the masses. It reflected the post-war optimism and fascination with materialism, while also critiquing the commodification of art and society's obsession with fame and consumerism."

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchArtworkData();
      setArtworkData(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filterPopArtArtworks = () => {
      const filteredArtworks = artworkData.filter((artwork) => artwork.era === title);
      setPopArtArtworks(filteredArtworks);
    };

    filterPopArtArtworks();
  }, [artworkData]);

function ShowAccordion() {
  return (
    <Accordion defaultActiveKey="1" className='d-lg-none accordion-flush pt-5'>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Show Artwork</Accordion.Header>
        <Accordion.Body>
        {popArtArtworks.slice(0, 10).map((artwork) => (
              <Col className='card-grid-mobile pt-5'>
                <div className='aspect-ratio-container'>
                <Card
                  title={artwork.title}
                  image={artwork.image}
                  link={`/artwork/${artwork.id}`}
                  className={`card-mobile card-mobile-${artwork.title.split(' ').join('').toLowerCase().split('.').join('').split('-').join('').split(',').join('').split("'").join('').split('!').join('').split('?').join('')}`}>
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
      <div className='popArtpage container min-vh-100 col-lg-10 col-sm-12 flex-column'>
        <h1 className='header pt-5 d-none d-lg-flex'>{title.toUpperCase()}</h1>
        <h2 className="header-mobile h2-responsive rounded d-lg-none d-flex justify-content-center align-items-center p-4">{title.toUpperCase()}</h2>
        <Row className='justify-content-center d-none d-lg-flex'>
        <Row className='col-10 justify-content-center'>
            {popArtArtworks.slice(0, 10).map((artwork) => (
              <Col lg={2} className='card era-card'>
                <Card
                  title={artwork.title}
                  image={artwork.image}
                  link={`/artwork/${artwork.id}`}
                  className={`era-card-${artwork.title.split(' ').join('').toLowerCase().split("'").join('').split('.').join('').split('-').join('').split(',').join('').split('!').join('').split('?').join('')}`}>
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

export default PopArtPage;