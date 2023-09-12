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

function FavoritesCard({ result, onClick, userName,getAllSavedRecipes }) {
  const history = useHistory();
  const [value, setValue] = React.useState(2);
  const [favorite, setFavorite] = React.useState(true);
  // for same user checking
  const [sameUser, setSameUser] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  let userID = localStorage.getItem('userId');
  // handle delete on favorite
  const handleDeletePost = async (recipeID) => {
    console.log('triggered delete from favorites button');
    let theRecipeId = recipeID;
    try {
      const response = await fetch(
        `${process.env.REACT_APP_REQ_URL}/user/saved-recipes/${userID}/${theRecipeId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        getAllSavedRecipes();
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

  // for description
  function ScrollableParagraph({ text }) {
    return (
      <div style={{ overflow: 'auto', maxHeight: '170px' }}>
        <p>{text}</p>
      </div>
    );
  }

  // get current user page from URL
  let splitURL = window.location.href.split('/');
  let currentUser = splitURL[splitURL.length - 1];

  // if the userName is the same set same user to true
  if (userName === currentUser) {
    setSameUser(true);
  }

  // fetch for user with Id to get username and their profile_pic
  const getUserInfo = async () => {
    try {
      let response = await fetch(
        `${process.env.REACT_APP_REQ_URL}/user/${result.recipe[0].user_id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      let data = await response.json();

      if (!response) {
        console.log('bad response');
      } else {
        setUserInfo(data);
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getUserInfo();
    console.log('result.recipe[0].id', result.recipe[0].id);
  }, [result.recipe[0].user_id]);

  
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
                  src={result.recipe[0].photo_url}
                  alt="pic"
                  className="cardImg"
                  onClick={() => {
                    history.push(`/post/${result.recipe[0].id}`);
                  }}
                />
              </Row>
              <Row>
                <Col xs={6}>
                  <h4 style={{ textAlign: 'left' }}>
                    {result.recipe[0].title}
                  </h4>
                </Col>

                <Col xs={6}>
                  <Box
                    sx={{
                      '& > legend': { mt: 2 },
                    }}
                  >
                    <Rating name="read-only" value={value} readOnly />
                  </Box>
                </Col>
              </Row>

              <Row>
                <div className="d-flex align-items-center">
                  <div onClick={() => handleDeletePost(result.recipe[0].id)}>
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
              </Row>
            </Col>

            {/* Right side */}
            <Col md={5}>
              <Row style={{ padding: '5px 0px' }}>
                <Col xs={4}>
                  <img
                    src={userInfo.profile_picture}
                    alt="user-icon"
                    className="userImg"
                    onClick={() => {
                      history.push(`/profile/${userInfo.username}`);
                    }}
                  />
                </Col>
                <Col xs={8}>
                  <h5>{userInfo.username}</h5>
                </Col>
              </Row>
              <Row>Description:</Row>
              <Row>
                <ScrollableParagraph text={result.recipe[0].description} />
              </Row>
            </Col>
          </Row>
        </Container>
        <ToastContainer />
      </Card>
    </>
  );
}

export default FavoritesCard;
