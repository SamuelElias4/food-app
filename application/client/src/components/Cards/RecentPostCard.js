import React, { useState, useEffect } from 'react';
import '../categories/PopularDishes.css';
import { FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

// bootStrap
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/esm/Button';

// Mui icon
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { useMediaQuery } from '@mui/material';

function RecentPostCard({ result, onClick, userIDs}) {
  const history = useHistory();
  const [value, setValue] = React.useState(2);
  const [favorite, setFavorite] = React.useState(false);

  const [userNameRecent, setUsernameRecent] = useState('');
  const [userImg, setUserImg] = useState('');
  const loggedInUserID = localStorage.getItem('userId')

  // for getting user info
  useEffect(() => {
    // console.log('this is userID ', userIDs);
    const fetchUserName = async () => {
      // const userId = localStorage.getItem('userId');
      const response = await fetch(
        `${process.env.REACT_APP_REQ_URL}/user/${userIDs}`
      );
      if (!response.ok) {
        console.log('Failed to fetch user');
      } else {
        const user = await response.json();
        // console.log('on recent card', user.username);
        // console.log('on recent card, ', user.profile_picture);
        setUsernameRecent(user.username);
        setUserImg(user.profile_picture);
      }
    };
    fetchUserName();
  }, [userIDs]);

  const FavoriteToTrue = () => {
    setFavorite(true);
    handleSaveRecipe();
  };
  const FavoriteToFalse = () => {
    setFavorite(false);
    handleDeletePost();
  };

 // check if recipe is already in users favorites
   const checkIfInFavorites = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_REQ_URL}/user/saved-recipes/${loggedInUserID}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();

      if (!response) {
        console.log('bad response in get favorites.');
      }

      // checks to see if recipe is already in favorites 
      // turns Heart red if in favorites
      for (let i = 0; i < data.savedRecipes.length; i++) {
        for (let j = 0; j < data.savedRecipes[i].recipe.length; j++) {
          if (result.recipe.id == data.savedRecipes[i].recipe[j].id){
            console.log('same post');
            setFavorite(true);
          }
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    checkIfInFavorites();
  }, []);


  // handle delete on favorite
  const handleDeletePost = async () => {
    console.log('triggered delete from favorites button');
    let theRecipeId = result.recipe.id;
    console.log('theRecipeId: ',theRecipeId);
    console.log("userIDs", userIDs);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_REQ_URL}/user/saved-recipes/${loggedInUserID}/${theRecipeId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        toast.success('Removed recipe from favorites successfully 🚀👏', {
          position: toast.POSITION.TOP_CENTER,
        });

        console.log('recipe deleted from favorites successfully');
      } else {
        toast.error('Failed to delete the recipe from favorites!', {
          position: toast.POSITION.TOP_CENTER,
        });
        console.error('Failed to delete the recipe from favorites');
      }
    } catch (error) {
      console.error(
        'Error occurred while deleting the post from favorites:',
        error
      );
    }
  };

  // save recipe
  const handleSaveRecipe = async () => {
    try {
      let theRecipeId = result.recipe.id;
      // Make an HTTP POST request to the save recipe route
      const response = await fetch(
        `${process.env.REACT_APP_REQ_URL}/user/save/recipe/${theRecipeId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userID: loggedInUserID }),
        }
      );
      const savedRecipe = await response.json();
      console.log('this is savedRecipe: ', savedRecipe);
      
      if (response.ok) {
        console.log('Recipe saved!');
        toast.success('Yay! You saved this recipe! 🚀👏', {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        // Error saving the recipe
        console.log('Failed to save the recipe.');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // for description
  function ScrollableParagraph({ text }) {
    return (
      <div style={{ overflow: 'auto', maxHeight: '170px' }}>
        <p>{text}</p>
      </div>
    );
  }

  return (
    <>
      <Card
        style={{
          width: '45rem',
          margin: '20px 20px 15px 22px',
          padding: '0px',
        }}
      >
        <Container fluid>
          <Row>
            {/* Title and number of hearts */}
            <Col md={7}>
              <Row>
                <img
                  src={result.recipe.photo_url}
                  alt="pic"
                  className="cardImg"
                  onClick={onClick}
                />
              </Row>
              <Row>
                <Col xs={6}>
                  <h4 style={{ textAlign: 'left' }}>{result.recipe.title}</h4>
                </Col>

                <Col xs={6}>
                  <Box
                    sx={{
                      '& > legend': { mt: 2 },
                      mt: '10px',
                    }}
                  >
                    <Rating name="read-only" value={value} readOnly />
                  </Box>
                </Col>
              </Row>

              <Row>
                {favorite ? (
                  <div className="d-flex align-items-center">
                    <div style={{cursor: 'pointer'}}  onClick={FavoriteToFalse}>
                      <FavoriteIcon
                        className="float-start"
                        style={{
                          marginLeft: 0,
                          marginRight: 'auto',
                          marginBottom: '10px',
                        }}
                        color="error"
                      />{' '}
                      
                    </div>
                  </div>
                ) : (
                  <div className="d-flex align-items-center">
                    <div style={{cursor: 'pointer'}} onClick={FavoriteToTrue}>
                      <FavoriteBorderIcon
                        className="float-start"
                        style={{
                          marginLeft: 0,
                          marginRight: 'auto',
                          marginBottom: '10px',
                        }}
                        color="error"
                      />{' '}
                      
                    </div>
                  </div>
                )}
              </Row>
            </Col>

            {/* Right side */}
            <Col md={5}>
              <Row style={{ padding: '5px 0px' }}>
                <Col xs={4}>
                  <img
                    src={userImg}
                    alt="user-icon"
                    className="userImg"
                    // onClick={() => {
                    //   history.push(`/profile/${userNameState}`);
                    // }}
                  />
                </Col>
                <Col xs={8}>
                  <h5>{userNameRecent}</h5>
                </Col>
              </Row>
              <Row>Description:</Row>
              <Row>
                <ScrollableParagraph text={result.recipe.description} />
              </Row>
            </Col>
          </Row>
        </Container>
        <ToastContainer />
      </Card>
      {/* <ToastContainer /> */}
    </>
  );
}

export default RecentPostCard;
