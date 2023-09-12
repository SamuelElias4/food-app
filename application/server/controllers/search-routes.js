const router = require("express").Router();
const Recipe = require('../models/Recipe');

router.get('/', async (req, res) => {
  const searchTerm = req.query.query; 
  if (!searchTerm) {
    res.status(400).json({ error: 'Missing search query.' });
    return;
  }
  Recipe.search(searchTerm)
  .then(results => {
    res.status(200).json({results});
  })
  .catch(err => {
    console.log('error in search-routes: ' + err.message);
    console.error(err);
    res.status(500).json({ error: 'An error occurred while searching.' });
  })
});

module.exports = router;


