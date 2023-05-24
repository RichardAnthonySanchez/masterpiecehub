import React from 'react';
import '../styles/card-grid.css';

const Card = ({ title, image, className }) => {
  return (
    <div className={className}>
      <h3>{title}</h3>
      <img src={image} alt={title} />
    </div>
  );
};

export default Card;