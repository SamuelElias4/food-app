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

function CategoryCard({category}) {
  const [value, setValue] = React.useState(2);
  const [favorite, setFavorite] = React.useState(false);

  const FavoriteToTrue = () => {
    setFavorite(true);
  }
  const FavoriteToFalse = () => {
    setFavorite(false);
  }

  return (
      <>
        <Card style={{ width: '18rem', margin: '20px 20px 15px 22px', padding: '0px' }} >
          <Card.Img variant="top" src="hero.jpg" />
          <Card.Body>
            <Container fluid>
              <Row>
                {/* Title and number of hearts */}
                <Col>
                  <Row>
                    <Card.Title>Pizza</Card.Title>
                  </Row>
                  <Row xs={11}>
                    <div>
                      {/* 3 will be replaced by number up favorites */}
                      <FavoriteIcon color="error"/> 3
                    </div>
                  </Row>
                </Col>

                {/* Stars and able to favorite item */}
                <Col>
                  <Row>
                    <Box
                      sx={{
                        '& > legend': { mt: 2 },
                      }}
                    >
                      <Rating name="read-only" value={value} readOnly />
                    </Box>
                  </Row>
                  <Row xs={1}>
                    {(favorite) ? (
                      <div onClick={FavoriteToFalse} >
                        <FavoriteIcon className="float-end" style={{ marginLeft: 'auto', marginRight: 0 }} color="error"/> 
                      </div>
                    ) : (
                      <div onClick={FavoriteToTrue} >
                        <FavoriteBorderIcon className="float-end" style={{ marginLeft: 'auto', marginRight: 0 }} color="error"/>
                      </div>
                    )}
                  </Row>
                </Col>

              </Row>
            </Container>
          </Card.Body>
        </Card>
      </>
  )
}

export default CategoryCard