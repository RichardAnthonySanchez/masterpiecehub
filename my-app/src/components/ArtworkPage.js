import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArtworkData } from './artworkAPI';
import { Container, Row, Col, Accordion, Button } from 'react-bootstrap';

const ArtworkPage = () => {
  const { id } = useParams();
  const [artworkData, setArtworkData] = useState([]);
  const [thisArtwork, setThisArtwork] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchArtworkData();
      setArtworkData(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filterArtwork = () => {
      const filteredArtwork = artworkData.find((artwork) => String(artwork.id) === String(id));
      setThisArtwork(filteredArtwork);
    };
  
    filterArtwork();
  }, [artworkData, id]);

  if (!thisArtwork) {
    return <div>Loading...</div>; // Show a loading state while fetching data or if artwork not found
  }

  // Render the artwork page content based on the specific artwork
  return (
    <Container className='artworkpage min-vh-100 col-lg-6 col-md-12 flex-column'>
      <h1 className='header text-center pb-1 pt-5 d-none d-lg-flex'>{thisArtwork.title}</h1>
      <h2 className='header-mobile text-center h2-responsive rounded d-lg-none d-flex justify-content-center align-items-center p-4'>{thisArtwork.title}</h2>
      <Row className='justify-content-center d-none d-lg-flex'>
        <div className='col'>
          <div className='artwork float-start'>
            <img className='' src={'/' + thisArtwork.image} alt={thisArtwork.title} />
          </div>
          <p className='era-copy'>{thisArtwork.description}</p>
        </div>
        
        {/* Render other artwork details */}
      </Row>
      <Row className='mobile-content d-lg-none pt-5 justify-content-center'>
        <div className='card era-card col-10'>
          <img className='img-fluid' src={'/' + thisArtwork.image} alt={thisArtwork.title} />
        </div>
        <p className='era-copy pt-5'>{thisArtwork.description}</p>
        {/* Render other artwork details */}
      </Row>
      <div className='navigation d-flex justify-content-center pb-2 pt-5 space-between'>
        <Button className='col-lg-3 col-sm-5' href={`/${thisArtwork.era.split(' ').join('')}`}>Back to {thisArtwork.era} Artworks</Button>
        <Button className='col-lg-3 col-sm-5' href='/'>Back to Art Movements</Button>
      </div>
    </Container>
  );
};

export default ArtworkPage;
