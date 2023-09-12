import React from 'react'
import { useHistory } from "react-router-dom";

import PopularDIshesCards from '../Cards/PopularDIshesCards'
import './PopularDishes.css'

// boostrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function PopularDishes() {
  const history = useHistory();
  const categoryList = ['Mexican', 'Italian', 'American']
  return (
    <>
      <Container style={{ maxWidth: '80%' }}>
        <Row>
            <Col xl={12}>
              <h2 className='title'>Popular Dishes</h2>
            </Col>
        </Row>

        <Row style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {categoryList.map(category => (
                <PopularDIshesCards  category={category} onClick={() => history.push(`post/${category.id}`)}  />
            ))}
        </Row>
      </Container>
    </>
  )
}

export default PopularDishes;