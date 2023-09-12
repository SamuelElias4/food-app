const router = require('express').Router();
const { Upload } = require('@aws-sdk/lib-storage'),
  { S3 } = require('@aws-sdk/client-s3');
const { v4: uuidv4 } = require('uuid');
const Recipe = require('../models/Recipe');
const Comment = require('../models/Comment');

// image storing
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
// Initialize Multer with the storage options
// const upload = multer({ storage: storage });
const upload = multer({ storage: multer.memoryStorage() });

//s3 bucket connection
const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_DEFAULT_REGION,
});

router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.getAll();
    res.status(200).json({ recipes });
  } catch (err) {
    console.log(err);
  }
});
router.get('/user/:id', async (req, res) => {
  try {
    console.log('in route');
    const recipes = await Recipe.getByUserID(req.params.id);
    res.status(200).json({ recipes });
  } catch (err) {
    console.log(err);
  }
});

router.get('/user/:id', async (req, res) => {
  try {
    console.log('in route');
    const user = await User.getByID(req.params.id); // Change this line to call the appropriate method in your User model
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    console.log(res);
    console.log('id of POOOST: ' + req.params.id);
    const recipeID = req.params.id;
    const recipe = await Recipe.getById(recipeID);
    res.status(200).json(recipe);
  } catch (err) {
    console.log(err);
  }
});

router.post('/', upload.single('recipe_image'), async (req, res) => {
  const parsedRecipe = JSON.parse(req.body.recipe);
  const parsedIngredients = JSON.parse(req.body.ingredients);
  const parsedInstructions = JSON.parse(req.body.instructions);
  console.log('recipe', parsedRecipe);
  console.log('ingredients: ', parsedIngredients);
  console.log('instructions: ', parsedInstructions);
  try {
    var imgURL = null;
    if (req.file) {
      const file = req.file;
      const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: uuidv4() + '-' + file.originalname,
        Body: file.buffer,
        ContentEncoding: 'base64',
        ContentType: file.mimetype,
      };
      imgURL = (
        await new Upload({
          client: s3,
          params: uploadParams,
        }).done()
      ).Location;
    }
    const recipe = {
      user_id: parseInt(parsedRecipe.user_id),
      title: parsedRecipe.title,
      description: parsedRecipe.description,
      cooking_time: parsedRecipe.cooking_time,
      difficulty: parsedRecipe.difficulty,
      photo_url: imgURL,
    };
    const recipeRes = await Recipe.create(
      recipe,
      parsedIngredients,
      parsedInstructions
    );

    console.log('success');
    res.status(201).json(recipeRes);
  } catch (err) {
    console.log(err.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.getById(req.params.id);
    if (recipe.recipe == undefined) {
      res.status(404).json({ message: 'recipe does not exist' });
    }

    if (recipe.recipe.user_id == req.body.userID) {
      const deleted = await Recipe.delete(recipe.recipe.id);
      res.status(200).json({ deleted });
    } else {
      res.status(401).json({ message: 'user does not own this post' });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post('/comments/:commentID/like', async (req, res) => {
  try {
    console.log(req.body);
    const commentLike = await Comment.likeComment(
      req.body.userID,
      req.params.commentID,
      req.body.like
    );
    res.status(201).json(commentLike);
  } catch (err) {
    console.log(err);
  }
});

router.post('/:id/rating', async (req, res) => {
  try {
    const rating = await Recipe.rate(
      req.body.userID,
      req.params.id,
      req.body.rating
    );
    res.status(201).json(rating);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
