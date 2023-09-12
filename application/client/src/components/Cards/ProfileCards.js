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

function ProfileCards({ result, onClick }) {
  const history = useHistory();
  // for rating
  const [value, setValue] = React.useState(2);
  // for favorites
  const [favorite, setFavorite] = React.useState(false);
  // for same user checking
  const [sameUser, setSameUser] = useState(false);
  // for deleting
  const [deletePost, setDeletePost] = useState(false);
  // get userID
  let userID = localStorage.getItem('userId');

  // set user info
  const [userNameState, setUserName] = useState('');
  const [userProfile, setUserImage] = useState();
  // console.log(userID);

  // get the user name and image
  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_REQ_URL}/user/${userID}`
      );

      if (!response.ok) {
        console.error('Failed to fetch user');
      } else {
        const user = await response.json();
        setUserName(user.username);
        setUserImage(user.profile_picture);
      }
    };
    fetchUserInfo();
  }, []);

  //   check if same user of owner of profile
  useEffect(() => {
    if (userID == result.recipe.user_id) {
      setSameUser(true);
    } else {
      setSameUser(false);
    }
  }, [userID, result.recipe.user_id]);

  // to delete post
  const handleDeletePost = async () => {
    console.log('Deleting post with ID:');

    try {
      // Make the API call to delete the post
      const response = await fetch(
        `${process.env.REACT_APP_REQ_URL}/recipe/${result.recipe.id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userID: userID,
          }),
        }
      );

      if (response.ok) {
        // Deletion successful
        toast.success('Deleted recipe successfully 🚀👏', {
          position: toast.POSITION.TOP_CENTER,
        });

        console.log('recipe deleted successfully');
        // Update the state or perform any other necessary actions
        setDeletePost(true);
      } else {
        // Handle errors if the deletion was not successful
        toast.error('Failed to delete the recipe!', {
          position: toast.POSITION.TOP_CENTER,
        });
        console.error('Failed to delete the recipe');
      }
    } catch (error) {
      // Handle any network or other errors
      console.error('Error occurred while deleting the post:', error.message);
    }
  };

  const FavoriteToTrue = () => {
    setFavorite(true);
  };
  const FavoriteToFalse = () => {
    setFavorite(false);
  };

  // for description
  function ScrollableParagraph({ text }) {
    return (
      <div style={{ overflow: 'auto', maxHeight: '170px' }}>
        <p>{text}</p>
      </div>
    );
  }
  // console.log(JSON.stringify(result));
  return (
    <>
      <Card
        style={{
          width: '33rem',
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
                  onClick={() => {
                    history.push(`/post/${result.recipe.id}`);
                  }}
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
                    {sameUser && (
                      <Button
                        variant="dark"
                        style={{
                          backgroundColor: 'transparent',
                          borderColor: 'transparent',
                          color: 'hsl(0, 83%, 39%)',
                          marginLeft: 0,
                          marginRight: 'auto',
                          marginBottom: '10px',
                        }}
                        // onClick={handleDeletePost(result.recipe_id)}
                        onClick={() => handleDeletePost(result.recipe.title)}
                      >
                        <FaTrash />
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="d-flex align-items-center">
                    {sameUser && (
                      <Button
                        variant="dark"
                        style={{
                          backgroundColor: 'transparent',
                          borderColor: 'transparent',
                          color: 'hsl(0, 83%, 39%)',
                          marginLeft: 0,
                          marginRight: 'auto',
                          marginBottom: '10px',
                        }}
                        // onClick={handleDeletePost(result.recipe_id)}
                        onClick={() => handleDeletePost(result.recipe.title)}
                      >
                        <FaTrash />
                      </Button>
                    )}
                  </div>
                )}
              </Row>
            </Col>

            {/* Right side */}
            <Col md={5}>
              <Row style={{ padding: '5px 0px' }}>
                <Col xs={4}>
                  <img
                    src={userProfile}
                    alt="user-icon"
                    className="userImg"
                    onClick={() => {
                      history.push(`/profile/${userNameState}`);
                    }}
                  />
                </Col>
                <Col xs={8}>
                  <h5>{userNameState}</h5>
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
    </>
  );
}

export default ProfileCards;
