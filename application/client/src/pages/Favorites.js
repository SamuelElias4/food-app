import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { PostsData } from '../PostsData';
import { useHistory } from 'react-router-dom';

import FilterbarStatic from '../components/filterbar/FilterbarStatic';
import FavoritesCard from '../components/Cards/FavoritesCard';
// boostrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Favorites = () => {
  const history = useHistory();

  const [savedRecipes, setSavedRecipes] = useState([]);

  const name = { recipe_title: 'Favorites' };
  let userID = localStorage.getItem('userId');
  // userID = parseInt(userID, 10); // convert to integer then we can do comparisoon
  console.log('userID: ', userID);
  // get all saved recipes
  const getAllSavedRecipes = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_REQ_URL}/user/saved-recipes/${userID}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const savedRecipes = await response.json();
      console.log('checking data in favorites:', savedRecipes);
      if (!response) {
        throw new Error(savedRecipes.error);
      } else {
        console.log('in success');
        setSavedRecipes(savedRecipes.savedRecipes);
      }
    } catch (err) {
      throw new Error(err.message);
    }
  };

  useEffect(() => {
    getAllSavedRecipes();
  }, []);
  

  return (
    <>
      <FilterbarStatic title={name} />

      <Container style={{ maxWidth: '80%' }}>
        <Row
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
        
        {savedRecipes.length > 0 ? (
        <> 
           {savedRecipes.map((data) => (
            <FavoritesCard
              result={data}
              onClick={() => history.push(`post/${data.id}`)}
              getAllSavedRecipes={getAllSavedRecipes}
            />
          ))}
        </>
        ) : (
          <>
            <p style={{textAlign: 'center'}}>No results found.</p>
          </>
        )}
        
        </Row>
      </Container>
    </>
  );
};

export default Favorites;
