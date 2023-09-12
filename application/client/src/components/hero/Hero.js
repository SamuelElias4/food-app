import React from 'react'
import './hero.css'

// Boostrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <>
      <Container className='container'>
        <Row>
          {/* left side */}
          <Col xs={5} sm={12} md={5} xl={5} className='leftSide'>
            <Row className='d-flex .justify-content-center heroDish'><h1>Find Dishes</h1></Row>
            <Row className='heroDish' style={{marginBottom: '15px'}}><h1>That Suit You!</h1></Row>

            <Row ><p >Looking for new recipes to spice up your day?</p></Row>
            <Row style={{marginBottom: '18px'}}><p>No need to worry get started today!</p></Row>

            <Row >
              <Col xs={12} sm={5} md={6} lg={4} xl={4}>
                <Link to="/register" style={{ textDecoration: 'none' }}>
                  <Button style={{marginBottom: '10px'}} size="md" variant="success">Get Started</Button>
                </Link>
              </Col>
              <Col xs={12} sm={5} md={6} xl={5}>
                <Link to="/">
                  <Button size="md" variant="outline-success">Explore Now</Button>{' '}
                </Link>
              </Col>
            </Row>
          </Col>

          {/* img (right side) */}
          <Col xs={7} sm={12} md={7} xl={7}>
            <div className='full-width-image-container'>
              <img className='full-width-image' src='hero.jpg' alt='hero' />
            </div>
          </Col>

        </Row>
      </Container>
    </>
  )
}

export default Hero