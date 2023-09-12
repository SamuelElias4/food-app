exports.seed = function(knex) {
  
    return knex("categories_to_recipe").insert([
      {recipe_id:"1", category_id:"2"},
      {recipe_id:"1", category_id:"17"},
      {recipe_id:"1", category_id:"21"},
      {recipe_id:"2", category_id:"2"},
      {recipe_id:"2", category_id:"13"},
      {recipe_id:"2", category_id:"21"}
    ])
};