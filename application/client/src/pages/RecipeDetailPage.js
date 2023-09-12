import React, { useState, useEffect, useContext, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import ProfileCard from '../components/ProfileCard/ProfileCard';
import { AuthContext } from '../AuthContext';
import Comment from '../components/Comments/Comment';
import CommentForm from '../components/Comments/CommentForm';
// bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/esm/Button';

// MUI
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const RecipeDetailPage = (props) => {
  // for dummy star rating
  const [value, setValue] = React.useState(2);
  // login status
  const { loggedIn, setLoggedIn } = useContext(AuthContext);
  const [recipeDetails, setRecipeDetails] = useState({});
  const [instructionDetails, setInstructionDetails] = useState([]);
  const [ingredientsDetails, setIngredientsDetails] = useState([]);
  const [savedRecipes, setSaveRecipes] = useState([]);
  const [recipeImg, setRecipeImg] = useState('image7');
  // const [isSavedRecipe, setIsSavedRecipe] = useState(false);
  let userID = localStorage.getItem('userId');
  userID = parseInt(userID, 10); // convert to integer then we can do comparisoon

  // for clickable favorite heart button
  const [favorite, setFavorite] = React.useState(false);
  const FavoriteToTrue = () => {
    setFavorite(true);
    handleSaveRecipe();
  };
  const FavoriteToFalse = () => {
    setFavorite(false);
    handleDeletePost();
  };

  // all for comments
  const postId = props.match.params.postId;
  const { token } = useContext(AuthContext);
  const [Comments, setComments] = useState([]);
  //fetching comments
  const fetchComments = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_REQ_URL}/user/post/${postId}/comments`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log('comments arr: ' + data.data);
        setComments(data.data);
      } else {
        console.log('response was not okay');
        throw new Error(data.error);
      }
    } catch (err) {
      console.log('response threw error');
      console.log(err.message);
      console.error(err.message);
    }
  }, [postId]);
  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  // delete comment
  const handleCommentDeleted = () => {
    fetchComments();
  };

  // save recipe
  const handleSaveRecipe = async () => {
    try {
      console.log('in try');
      console.log('this is postID: ', postId);
      // Make an HTTP POST request to the save recipe route
      const response = await fetch(
        `${process.env.REACT_APP_REQ_URL}/user/save/recipe/${postId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userID: userID }),
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

  //fetching Recipe details
  const getRecipeDetails = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_REQ_URL}/recipe/${postId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log('recipe details okay');
        
        setRecipeDetails(data.recipe);
        console.log(
          'checking recipe details now ',
          JSON.stringify(recipeDetails)
        );
        setInstructionDetails(data.instructions);
        setIngredientsDetails(data.ingredients);

        if (data.recipe.photo_url) {
          setRecipeImg(data.recipe.photo_url);
        }
      } else {
        console.log('response was not okay');
        throw new Error(data.error);
      }
    } catch (err) {
      console.log('response threw error');
      console.log(err.message);
      console.error(err.message);
    }
  };
  useEffect(() => {
    getRecipeDetails();
  }, []);
  // using sepearate single dependency array
  // useEffect(() => {
  //   console.log('recipe details have been updated:', recipeDetails);
  //   // Perform actions that rely on updated recipeDetails here
  // }, [recipeDetails]);

  // check if recipe is already in users favorites
  const checkIfInFavorites = async () => {
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

      const data = await response.json();

      if (!response) {
        console.log('bad response in get favorites.');
      }

      // checks to see if recipe is already in favorites 
      // turns Heart red if in favorites
      for (let i = 0; i < data.savedRecipes.length; i++) {
        console.log('here is data in data.savedRecipes[i]: ', data.savedRecipes[i]);
        for (let j = 0; j < data.savedRecipes[i].recipe.length; j++) {
          if (postId == data.savedRecipes[i].recipe[j].id){
            console.log('same post');
            setFavorite(true);
          }
          console.log("in for loop postID: " + postId);
          console.log('here is data in data.savedRecipes[i].recipe[j]: ', data.savedRecipes[i].recipe[j].id);
        }
    }
    
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    checkIfInFavorites();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const year = date.getFullYear().toString().substr(-2);
    return month + '/' + day + '/' + year;
  };
  const formattedDate = formatDate(recipeDetails.created_at);

  // conver '90' mins into hour min format
  function convertToHoursAndMinutes(num) {
    const hours = Math.floor(num / 60);
    const minutes = num % 60;
    return `${hours}h ${minutes}min`;
  }
  const formattedTime = convertToHoursAndMinutes(recipeDetails.cooking_time);

  // handle delete of favorite
  const handleDeletePost = async (recipeID) => {
    console.log('triggered delete from favorites button');
    let theRecipeId = recipeDetails.id;
    
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
  
  return (
    <>
      <Container>
        <Row>
          {/* left side of page */}
          <Col md={7}>
            <Row>
              {recipeImg ? (
                <img src={recipeImg} alt="pic" />
              ) : (
                <img src="image7.jpg" alt="pic" />
              )}
            </Row>

            {/* save isn't working yet */}
            {/* <Button
              style={{
                color: 'white',
                backgroundColor: 'hsl(0, 83%, 39%)',
                width: '30%',
                marginTop: '2px',
                textTransform: 'uppercase',
              }}
              onClick={handleSaveRecipe}
            >
              Save to favorites
            </Button> */}
            {/* detail row */}
            <Row>
              <Col md={7}>
                {/* description */}

                <h4
                  style={{
                    fontWeight: '700',
                    padding: '10px',
                  }}
                >
                  Description:
                </h4>
                <h4>{recipeDetails.description}</h4>

                {/* cooking time */}
                <div className="d-flex align-items-center">
                  <div className="d-flex align-items-center">
                    <h4 style={{ marginRight: '5px', fontWeight: '700' }}>
                      Cooking time:
                    </h4>
                    <h4> {formattedTime}</h4>
                  </div>
                </div>

                <div className="d-flex align-items-center">
                  <div className="d-flex align-items-center">
                    <h4 style={{ marginRight: '5px', fontWeight: '700' }}>
                      Difficulty:
                    </h4>
                    <h4>{recipeDetails.difficulty}</h4>
                  </div>
                </div>
                {/* ingredients */}
                <h4 style={{ fontWeight: '700' }}>ingredients list:</h4>
                {/* MAP THROUGH A COMPONENT FOR PROPER DESIGN */}
                {ingredientsDetails.map((ingredientDetail, index) => {
                  return (
                    <div key={index}>
                      <p>
                        {ingredientDetail.amount} {ingredientDetail.ingredient}
                      </p>
                    </div>
                  );
                })}
              </Col>

              <Col md={5}>
                {/* recipe instructions */}
                <h4 style={{ fontWeight: '700' }}>Recipe Instructions:</h4>

                {/* MAP THROUGH A COMPONENT FOR PROPER DESIGN */}
                {instructionDetails.map((instructionDetail, index) => {
                  return (
                    <div key={index}>
                      <h4 style={{ fontWeight: '600' }}>Step {index + 1}:</h4>
                      <p>{instructionDetail.instruction}</p>
                    </div>
                  );
                })}
              </Col>
            </Row>
          </Col>

          {/* right side of page */}
          <Col md={5}>
            <Row className="justify-content-center">
              <Col xs={6}>
                <h3 style={{ fontWeight: 'bold' }}>{recipeDetails.title}</h3>
              </Col>

              <Col xs={6}>
                <Box
                  sx={{
                    '& > legend': { mt: 2 },
                    display: 'flex',
                    justifyContent: 'right',
                    alignItems: 'center',
                    paddingTop: '10px',
                  }}
                  style={{ paddingTop: '10px' }}
                >
                  <Rating name="read-only" value={value} readOnly />
                </Box>
              </Col>
            </Row>

            <Row
              className="justify-content-center"
              style={{ marginBottom: '25px' }}
            >
              <Col xs={6}>
                {favorite ? (
                  <div className="d-flex align-items-center">
                    <div
                      className="d-flex align-items-center"
                      onClick={FavoriteToFalse}
                    >
                      <FavoriteIcon
                        className="float-start"
                        style={{ marginRight: '5px', fontSize: '2rem' }}
                        color="error"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="d-flex align-items-center">
                    <div
                      className="d-flex align-items-center"
                      onClick={FavoriteToTrue}
                    >
                      <FavoriteBorderIcon
                        className="float-start"
                        style={{ marginRight: '5px', fontSize: '2rem' }}
                        color="error"
                      />
                    </div>
                  </div>
                )}
              </Col>

              <Col xs={6}>
                <h4 style={{ fontWeight: 'bold', textAlign: 'right' }}>
                  {formattedDate}
                </h4>
              </Col>
            </Row>

            <Row>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ProfileCard showDetails userDetails={recipeDetails} />
              </div>
            </Row>

            {/* comment section  */}
            {loggedIn ? (
              <Row>
                <CommentForm
                  token={token}
                  postId={postId}
                  fetchComments={fetchComments}
                />
              </Row>
            ) : (
              <> </>
            )}

            <Row>
              {/* map through comments */}
              {Comments.map((data, index) => (
                <Comment
                  key={index}
                  commentId={data.id}
                  author={data.username}
                  date={data.username}
                  text={data.comment}
                  userID={data.user_id}
                  onCommentDeleted={handleCommentDeleted}
                />
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </>
  );
};

export default RecipeDetailPage;
