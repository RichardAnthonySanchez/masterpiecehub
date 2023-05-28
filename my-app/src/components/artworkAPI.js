// artworkAPI.js

export const fetchArtworkData = async () => {
    try {
      const response = await fetch('http://localhost:3000/artworks');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching artwork data:', error);
      return [];
    }
  };
