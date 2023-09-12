import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { IconButton, Rating } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function Cards({ data }) {
    const { title, rating } = data;
    return (
        <Card sx={{ width: 320 }}>
            <CardMedia
                sx={{ height: 180 }}
                image="https://source.unsplash.com/random/400x400/?foods"
                title=""
            />
            <CardContent>
                <div className='d-flex justify-content-between align-items-center'>
                    <Typography gutterBottom variant="h6" component="div">
                        {title}
                    </Typography>
                    <Rating name="read-only" value={parseFloat(rating)} readOnly />                   
                </div>
            </CardContent>
            <CardActions>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon color='error' />
                </IconButton>
                <Typography>3</Typography>
            </CardActions>
        </Card>
    );
}