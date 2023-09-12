const express = require('express');
const router = express.Router();
const { client } = require('../db/db'); // Adjust the path if necessary


// /category/African
router.get('/African', async (req, res) => {
    try {
        const query = `
            SELECT r.*
            FROM public.recipes r
            LEFT JOIN public.categories_to_recipe ctr ON r."id" = ctr."recipe_id"
            LEFT JOIN public.categories c ON ctr."category_id" = c."id"
            WHERE c.category = $1;
        `;
        const values = ['African'];
        
        const { rows } = await client.query(query, values);
        console.log("africa end point");
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching African food from the database.' });
    }
});

// /category/American
router.get('/American', async (req, res) => {
    try {
        const query = `
        SELECT r.*
        FROM public.recipes r
        LEFT JOIN public.categories_to_recipe ctr ON r."id" = ctr."recipe_id"
        LEFT JOIN public.categories c ON ctr."category_id" = c."id"
        WHERE c.category = $1;
        `;
        const values = ['American'];
        
        const { rows } = await client.query(query, values);
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching American food from the database.' });
    }
});

// /category/Asian
router.get('/Asian', async (req, res) => {
    try {
        const query = `
        SELECT r.*
        FROM public.recipes r
        LEFT JOIN public.categories_to_recipe ctr ON r."id" = ctr."recipe_id"
        LEFT JOIN public.categories c ON ctr."category_id" = c."id"
        WHERE c.category = $1;
        `;
        const values = ['Asian'];
        
        const { rows } = await client.query(query, values);
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching Asian food from the database.' });
    }
});


// /category/Breakfast
router.get('/Breakfast', async (req, res) => {
    try {
        const query = `
        SELECT r.*
        FROM public.recipes r
        LEFT JOIN public.categories_to_recipe ctr ON r."id" = ctr."recipe_id"
        LEFT JOIN public.categories c ON ctr."category_id" = c."id"
        WHERE c.category = $1;
        `;
        const values = ['Breakfast'];
        
        const { rows } = await client.query(query, values);
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching Breakfast food from the database.' });
    }
});

// /category/Chinese
router.get('/Chinese', async (req, res) => {
    try {
        const query = `
        SELECT r.*
        FROM public.recipes r
        LEFT JOIN public.categories_to_recipe ctr ON r."id" = ctr."recipe_id"
        LEFT JOIN public.categories c ON ctr."category_id" = c."id"
        WHERE c.category = $1;
        `;
        const values = ['Chinese'];
        
        const { rows } = await client.query(query, values);
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching Chinese food from the database.' });
    }
});

// /category/Dinner
router.get('/Dinner', async (req, res) => {
    try {
        const query = `
        SELECT r.*
        FROM public.recipes r
        LEFT JOIN public.categories_to_recipe ctr ON r."id" = ctr."recipe_id"
        LEFT JOIN public.categories c ON ctr."category_id" = c."id"
        WHERE c.category = $1;
        `;
        const values = ['Dinner'];
        
        const { rows } = await client.query(query, values);
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching Dinner food from the database.' });
    }
});

// /category/French
router.get('/French', async (req, res) => {
    try {
        const query = `
        SELECT r.*
        FROM public.recipes r
        LEFT JOIN public.categories_to_recipe ctr ON r."id" = ctr."recipe_id"
        LEFT JOIN public.categories c ON ctr."category_id" = c."id"
        WHERE c.category = $1;
        `;
        const values = ['French'];
        
        const { rows } = await client.query(query, values);
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching French food from the database.' });
    }
});

// /category/Greek
router.get('/Greek', async (req, res) => {
    try {
        const query = `
        SELECT r.*
        FROM public.recipes r
        LEFT JOIN public.categories_to_recipe ctr ON r."id" = ctr."recipe_id"
        LEFT JOIN public.categories c ON ctr."category_id" = c."id"
        WHERE c.category = $1;
        `;
        const values = ['Greek'];
        
        const { rows } = await client.query(query, values);
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching Greek food from the database.' });
    }
});

// /category/Indian
router.get('/Indian', async (req, res) => {
    try {
        const query = `
        SELECT r.*
        FROM public.recipes r
        LEFT JOIN public.categories_to_recipe ctr ON r."id" = ctr."recipe_id"
        LEFT JOIN public.categories c ON ctr."category_id" = c."id"
        WHERE c.category = $1;
        `;
        const values = ['Indian'];
        
        const { rows } = await client.query(query, values);
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching Indian food from the database.' });
    }
});

// /category/Italian
router.get('/Italian', async (req, res) => {
    try {
        const query = `
        SELECT r.*
        FROM public.recipes r
        LEFT JOIN public.categories_to_recipe ctr ON r."id" = ctr."recipe_id"
        LEFT JOIN public.categories c ON ctr."category_id" = c."id"
        WHERE c.category = $1;
        `;
        const values = ['Italian'];
        
        const { rows } = await client.query(query, values);
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching Italian food from the database.' });
    }
});

// /category/Japanese
router.get('/Japanese', async (req, res) => {
    try {
        const query = `
        SELECT r.*
        FROM public.recipes r
        LEFT JOIN public.categories_to_recipe ctr ON r."id" = ctr."recipe_id"
        LEFT JOIN public.categories c ON ctr."category_id" = c."id"
        WHERE c.category = $1;
        `;
        const values = ['Japanese'];
        
        const { rows } = await client.query(query, values);
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching Japanese food from the database.' });
    }
});

// /category/Latin-American
router.get('/Latin-American', async (req, res) => {
    try {
        const query = `
        SELECT r.*
        FROM public.recipes r
        LEFT JOIN public.categories_to_recipe ctr ON r."id" = ctr."recipe_id"
        LEFT JOIN public.categories c ON ctr."category_id" = c."id"
        WHERE c.category = $1;
        `;
        const values = ['Latin-American'];
        
        const { rows } = await client.query(query, values);
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching Latin-American food from the database.' });
    }
});

// /category/Lunch
router.get('/Lunch', async (req, res) => {
    try {
        const query = `
        SELECT r.*
        FROM public.recipes r
        LEFT JOIN public.categories_to_recipe ctr ON r."id" = ctr."recipe_id"
        LEFT JOIN public.categories c ON ctr."category_id" = c."id"
        WHERE c.category = $1;
        `;
        const values = ['Lunch'];
        
        const { rows } = await client.query(query, values);
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching Lunch food from the database.' });
    }
});

// /category/mexican
router.get('/Mexican', async (req, res) => {
  try {
    const query = `
        SELECT r.*
        FROM public.recipes r
        LEFT JOIN public.categories_to_recipe ctr ON r."id" = ctr."recipe_id"
        LEFT JOIN public.categories c ON ctr."category_id" = c."id"
        WHERE c.category = $1;
    `;
    const values = ['Mexican'];

    const { rows } = await client.query(query, values);
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching Mexican food from the database.' });
  }
});

// /category/Middle-Eastern
router.get('/Middle-Eastern', async (req, res) => {
    try {
        const query = `
        SELECT r.*
        FROM public.recipes r
        LEFT JOIN public.categories_to_recipe ctr ON r."id" = ctr."recipe_id"
        LEFT JOIN public.categories c ON ctr."category_id" = c."id"
        WHERE c.category = $1;
        `;
        const values = ['Middle-Eastern'];
        
        const { rows } = await client.query(query, values);
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching Middle-Eastern food from the database.' });
    }
});

// /category/Spanish
router.get('/Spanish', async (req, res) => {
    try {
        const query = `
        SELECT r.*
        FROM public.recipes r
        LEFT JOIN public.categories_to_recipe ctr ON r."id" = ctr."recipe_id"
        LEFT JOIN public.categories c ON ctr."category_id" = c."id"
        WHERE c.category = $1;
        `;
        const values = ['Spanish'];
        
        const { rows } = await client.query(query, values);
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching Spanish food from the database.' });
    }
});


module.exports = router;
