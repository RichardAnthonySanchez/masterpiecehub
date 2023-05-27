import React from 'react';
import '../styles/card-grid.css';
import { Container, Row, Col } from 'react-bootstrap';



const MedievalPage = () => {
  return (
    <div className='medievalpage container d-flex flex-column justify-content-center'>
      <h1 className='header'>Medieval</h1>
      <Row className='card-row-1'></Row>
      <Row className='card-row-2'></Row>
      <Row className='learn-more align-items-center'>
        <Col className='d-flex flex-row-reverse'>
        <img src="img/nav-left.svg" alt="nav left" />
        </Col>
        <Col>
        <h2 className='d-flex justify-content-center'>learn more</h2>
        </Col>
        <Col>
        <img src="img/nav-right.svg" alt="nav right" />
        </Col>
      </Row>

    </div>
  );
};

export default MedievalPage;