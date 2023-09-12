exports.seed = function(knex) {
  
    return knex("categories").insert([
        {category:"African"},
        {category:"American"},
        {category:"Latin-American"},
        {category:"Asian"},
        {category:"Indian"},
        {category:"French"},
        {category:"Chinese"},
        {category:"Greek"},
        {category:"Middle-Eastern"},
        {category:"Spanish"},
        {category:"Mexican"},
        {category:"Italian"},
        {category:"Japanese"},
        {category:"Snacks"},
        {category:"Entrees"},
        {category:"Breakfast"},
        {category:"Lunch"},
        {category:"Dinner"},
        {category:"Sandwich"},
        {category:"Handheld"},
        {category:"Quick"},
        {category:"Comfort Food"},
        {category:"Seafood"},
        {category:"Special Occasion"}


    ])
};