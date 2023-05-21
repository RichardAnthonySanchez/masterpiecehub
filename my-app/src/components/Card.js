import React from 'react';
import '../styles/card-grid.css';

const Card = ({ title, image }) => {
  return (
    <div className="card">
      <img src={image} alt={title} />
      <h3>{title}</h3>
    </div>
  );
};

export default Card;