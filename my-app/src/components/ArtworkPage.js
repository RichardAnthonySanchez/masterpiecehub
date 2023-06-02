import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArtworkData } from './artworkAPI';

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
    <div>
      <h1>{thisArtwork.title}</h1>
      <img src={thisArtwork.image} alt={thisArtwork.title} />
      <p>{thisArtwork.description}</p>
      {/* Render other artwork details */}
    </div>
  );
};

export default ArtworkPage;
