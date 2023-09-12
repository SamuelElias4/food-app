import React, { useState,useEffect } from 'react';

// MUI
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// Bootstrap 
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Container from 'react-bootstrap/esm/Container';

const FilterbarStatic = ({title, popularFilter}) => {

  // filter for changing filter box look
  const [filter, setFilter] = useState('');
  const handleChange = (event) => {
    // setFilter for name in filter box
    setFilter(event.target.value);

    // 20 means popular filter was picked
    if (event.target.value === 20) {
      showPopularCards();
    }

    if (event.target.value === 10) {
      console.log('inside 10');
      // showPopularCards();
    }
  };

  // filter for changing cards
  const showPopularCards = (r) => {
    console.log(filter);
    const showPopular = popularFilter();
    console.log(showPopular);
  }

  // useEffect(() => {
  //   console.log(filter);
  //   showPopularCards()
  //  }, [filter]);

  return (
    <>
      <Container style={{ marginBottom: '20px'}}>
        <Row>
          <Col xs={5} sm={8}>
            <div >
                <h1 style={{ textAlign: 'left', fontWeight: 'bolder' }}>{title.recipe_title}</h1>
            </div>
          </Col>

          <Col xs={7} sm={4}>
            <div className="d-flex align-items-center" style={{ justifyContent: 'flex-end' }} >
              <h3>Sort by:</h3>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Select
                  value={filter}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  sx={{ height: '32px', lineHeight: '30px' }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Lastest</MenuItem>
                  <MenuItem value={20}>Popular</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default FilterbarStatic