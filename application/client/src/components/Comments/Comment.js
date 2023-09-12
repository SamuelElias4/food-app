import React, { useState,useEffect } from 'react';
import { Avatar, Card, CardContent, Typography } from '@mui/material';
import { FaTrash } from 'react-icons/fa';
import Button from 'react-bootstrap/esm/Button';

const Comment = ({ author, date, text, userID, commentId, onCommentDeleted }) => {
  const[sameUser, setSameUser] = useState(false)
  let loggedUserId = localStorage.getItem('userId');

  // check if user is the same as owner of comment user
  useEffect(() => {
    console.log("here is comment ID: " , commentId);
    if (loggedUserId == userID) {
      setSameUser(true)
    } else {
      setSameUser(false)
    }
  }, [userID]);
  
  // handle to delete comment
  const handleDeleteComment = async() => {
    try {
      const response = await fetch(`${process.env.REACT_APP_REQ_URL}/user/post/comment/${commentId}`,{ 
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.ok) {
        console.log('comment deleted successfully');
        // Here we are calling the onCommentDeleted function
        onCommentDeleted();
      } else {
        console.error('Failed to delete comment');
      }
    } catch (error) {
      // Handle any network or other errors
      console.error('Error occurred while deleting the post:', error);
    }
  }
  

  return (
    <Card style={{marginBottom: '12px',}}>
      <CardContent>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: 8,
          }}
        >
          <Avatar>{author[0].toUpperCase()}</Avatar>
          <Typography variant="h6" style={{ marginLeft: 8 }}>
            {author}
          </Typography>
        </div>
        <Typography variant="body1" color="textSecondary">
          {text}
        </Typography>
        <Typography variant="caption" display="block" align="right">
          {date} 

       {   (sameUser) ? (
            <>
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
                onClick={() => handleDeleteComment()}
              >
                <FaTrash />
              </Button>
            </>
          ) : (
            <>
            </>
          )}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Comment;
