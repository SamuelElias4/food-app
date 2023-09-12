import React, { useEffect, useState, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';

function ProfileCard({ showDetails, userDetails: { user_id } }) {
  const history = useHistory();
  const [sameUser, setSameUser] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  const [profileUsername, setProfileUsername] = useState('');
  const [followingUser, setFollowingUser] = useState(false);
  // logged in users id
  let userID = localStorage.getItem('userId');

  let splitURL = window.location.href.split('/');
  let currentUser = splitURL[splitURL.length - 1];
  const { loggedIn, setLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    setSameUser(userID === user_id);
  }, [userID, user_id]);

  // this is just too get user profile_picture and username
  useEffect(() => {
    const getImgAndName = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_REQ_URL}/user/${user_id}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        const data = await response.json();
        const user = data; // Assuming the profile image is accessible directly from the data response
        if (!response.ok) {
          throw new Error('Failed to fetch profile image');
        } else {
          setProfileImg(user.profile_picture);
          setProfileUsername(user.username);
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    getImgAndName(); //
  }, [user_id]); // Dependency array was missing

  // for following
  const seeFollowerHandler = () => {
    history.push(`/following/${userID}`);
  };


  // Follow the user card
  const handleFollowUser = async () => {
    if (!loggedIn) {
      toast.error(`Must login to  follow others! !♨`, {
        position: toast.POSITION.TOP_CENTER,
        duration: 3000, // 3s
      });

      return;
    }
    try {
      const response = await fetch(
        // send the person you want to follow id
        `${process.env.REACT_APP_REQ_URL}/user/follow/${user_id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          // Send the currently logged in userID
          body: JSON.stringify({
            userID: userID,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error('Response ERROR');
      }
      console.log('DATA: ', data);
      toast.success(`Hurray! you followed  ${profileUsername}! 🍾🎉`, {
        position: toast.POSITION.TOP_CENTER,
        duration: 3000, // 3s
      });
      getUserfollowing()
    } catch (error) {
      console.log('Error message: ' + error.message);
    }
  };

   //FOLLOWING
   const [followingData, setFollowingData] = useState([]);
   const getUserfollowing = async () => {
     console.log('user_id', user_id);
     try {
       const response = await fetch(
         `${process.env.REACT_APP_REQ_URL}/user/following/${userID}`,
         {
           method: 'GET',
           headers: {
             'Content-Type': 'application/json',
            },
          }
          );
          const data = await response.json();
          
          if (!response) {
            console.error('Failed fetch recipe for profile');
          } else {
            setFollowingData(data);
            
            for (let i = 0; i < data.users.length; i++) {
              console.log("data.users[i].id" , data.users[i].id);
              if (user_id == data.users[i].id){
                  console.log('following user!');
                  setFollowingUser(true);
                }
              }
              console.log('data in profile: ', JSON.stringify(data));
            }
          } catch (err) {
            console.log(err.message);
          }
        };
      useEffect(() => {
        getUserfollowing()
      }, [user_id]);
      
      //  console.log("followingData" ,followingData);
  
  // need to make an if for if the user is following show unFOLLOW
  return (
    <>
      <Card sx={{ width: 320, marginLeft: 2.5 }}>
        <CardHeader />
        <Avatar
          alt={currentUser}
          src={profileImg}
          sx={{ width: 180, height: 180, margin: '0 auto' }}
        />
        <CardContent>
          <Typography
            variant="h5"
            style={{ textAlign: 'center', margin: '10px 0' }}
          >
            {profileUsername}
          </Typography>
          {/* {showDetails ? (
            <> */}
          <div className="d-flex items-center justify-content-evenly">
            <Button variant="subtitle1" onClick={seeFollowerHandler}>
              Followers
            </Button>
            <Typography variant="subtitle1">Following</Typography>
          </div>

          {/* if true we dont want the follow button */}
          {sameUser 
              ? null 
              : (
                <div className="d-flex justify-content-center mt-2">
                    {followingUser 
                      ?<Button variant="contained" onClick={handleFollowUser} style={{ backgroundColor: 'red', color: 'white' }}>Unfollow</Button>
                      : <Button variant="contained" onClick={handleFollowUser}>Follow</Button>
                    }
                </div>
              )
          }
        </CardContent>
      </Card>
      <ToastContainer />
    </>
  );
}
export default ProfileCard;
