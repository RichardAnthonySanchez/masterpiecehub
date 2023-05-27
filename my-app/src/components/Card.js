import React from 'react';
import '../styles/card-grid.css';
import { Link } from 'react-router-dom';

const Card = ({ title, image, className, link }) => {
  return (
    <Link to={link} className={className}>
      <img src={image} alt={title} />
      <h3>{title}</h3>
    </Link>
  );
};

export default Card;