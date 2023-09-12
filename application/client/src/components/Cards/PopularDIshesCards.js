import React, { useState } from 'react';
import '../categories/PopularDishes.css'
// bootStrap
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Mui icon
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

function PopularDIshesCards({onClick}) {
  const [value, setValue] = React.useState(2);
  const [favorite, setFavorite] = React.useState(false);

  const FavoriteToTrue = () => {
    setFavorite(true);
  }
  const FavoriteToFalse = () => {
    setFavorite(false);
  }

  // for description
  function ScrollableParagraph({text}) {
    return (
      <div style={{ overflow: 'auto', maxHeight: '170px' }}>
        <p>{text}</p>
      </div>
    );
  }

  return (
      <>
        <Card style={{ width: '33rem', margin: '20px 20px 15px 22px', padding: '0px' }}  className="card-hover" onClick={onClick}>
            <Container fluid>
              <Row>
                {/* Title and number of hearts */}
                <Col md={7}>
                    <Row>
                      <img src='hero.jpg' alt='pic' className='cardImg'/>
                    </Row>
                    <Row>
                      <Col xs={6} >
                        <h4>Chicken Tikka Masala</h4>
                      </Col>

                      <Col xs={6}>
                          <Box
                            sx={{
                              '& > legend': { mt: 2 },
                            }}
                            style={{paddingTop: '10px'}}
                          >
                            <Rating name="read-only" value={value} readOnly />
                          </Box>
                      </Col>
                    </Row>

                    <Row >
                    {(favorite) ? (
                        <div onClick={FavoriteToFalse} >
                          <FavoriteIcon className="float-start" style={{ marginLeft: 0, marginRight: 'auto', marginBottom: '10px' }} color="error"/> 4
                        </div>
                      ) : (
                        <div onClick={FavoriteToTrue} >
                          <FavoriteBorderIcon className="float-start" style={{ marginLeft: 0, marginRight: 'auto', marginBottom: '10px' }} color="error"/> 3
                        </div>
                      )}
                    </Row>
                </Col>
                
                {/* Right side */}
                <Col md={5}>
                  <Row style={{padding: '5px 0px'}}>
                    <Col xs={4}>
                        <img src='user.ico' alt='user-icon' className='userImg'/>
                    </Col>
                    <Col xs={8}>
                        <h5>TestingUser3</h5>
                    </Col>
                  </Row>
                  <Row>
                    Description:
                  </Row>
                  <Row>
                    <ScrollableParagraph text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries" />
                  </Row>
                </Col>

              </Row>
            </Container>
        </Card>
      </>
  )
}

export default PopularDIshesCards