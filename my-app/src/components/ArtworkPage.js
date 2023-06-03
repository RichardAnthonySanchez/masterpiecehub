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
    <Container className='artworkpage min-vh-100 col-lg-6 col-sm-12 flex-column'>
      <h1 className='header pb-1 pt-5'>{thisArtwork.title}</h1>
      <Row className='justify-content-center'>
        <div className='card era-card col-2'>
          <img className='img-fluid' src={'/' + thisArtwork.image} alt={thisArtwork.title} />
        </div>
        <p className='era-copy col'>{thisArtwork.description}</p>
        {/* Render other artwork details */}
      </Row>
      <div className='navigation d-flex justify-content-center pb-2 pt-5 space-between'>
        <Button className='col-3' href={`/${thisArtwork.era}`}>Back to {thisArtwork.era} Artworks</Button>
        <Button className='col-3' href='/'>Back to Art Movements</Button>
      </div>
    </Container>
  );
};

export default ArtworkPage;
