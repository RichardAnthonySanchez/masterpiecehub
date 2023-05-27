import React from 'react';
import '../styles/card-grid.css';

const Card = ({ title, image, className }) => {
  return (
    <div className={className}>
      <img src={image} alt={title} />
      <h3>{title}</h3>
    </div>
  );
};

export default Card;