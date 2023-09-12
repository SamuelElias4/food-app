import * as React from 'react';
import { Button, TextField } from '@mui/material';

const CommentForm = ({  token, postId, fetchComments }) => {
  const [text, setText] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Post ID:', postId);
    console.log('Token:', token);
    console.log('Text:', text);

    try {
      const response = await fetch(`${process.env.REACT_APP_REQ_URL}/user/post/${postId}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, text }),
      });

      const result = await response.json();

      if (result.status === 'success') {
        console.log('Success to post comment');
        fetchComments(); 
        setText(''); 
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Failed to post comment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '15px' }}>
      <TextField
        label="Comment"
        value={text}
        onChange={(e) => setText(e.target.value)}
        fullWidth
        margin="normal"
        multiline
        minRows={2}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Post comment
      </Button>
    </form>
  );
};

export default CommentForm;
