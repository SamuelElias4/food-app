// server.js
require('dotenv').config();
const express = require('express');
const { client } = require('./db/db');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

const searchRoutes = require('./controllers/search-routes');
const userRoutes = require('./controllers/user-routes');
const categoriesRoutes = require('./controllers/category-routes');
const recipeRoutes = require('./controllers/recipe-routes');


const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 8080;

// cores
// const corsOptions = {
//   origin: 'http://localhost:3000',
//   optionsSuccessStatus: 200,
// };

app.use(cors());

// jwt middleware
const jwtCheck = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
});

// routes
app.use(express.json());
app.use('/category',  categoriesRoutes);
app.use('/search',  searchRoutes);
app.use('/user', userRoutes);
// app.post('/post/:postId/comment', userRoutes); 
// app.use('/post/:postId/comments', userRoutes); 
app.use('/recipe', recipeRoutes);
app.get('/', (req, res) => res.send('Hello World'));

app.listen(PORT, () => console.log(`Server listening in port ${PORT}`));
