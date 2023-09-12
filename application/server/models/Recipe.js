// models/Recipe.js

const knex = require('knex')(require('../knexfile').development);
const { client } = require("../db/db"); 

class Recipe {
  static async create(recipeParam, ingredientsParam, instructionsParam) {
    console.log("recipeParam: ",recipeParam);
    console.log("ingredients: ",ingredientsParam);
    console.log("instructionsParam: ",instructionsParam);
    const recipe = (await knex('recipes').insert(recipeParam).returning('*'))[0];
    const ingredients = [];
    const instructions = [];
    for(let i = 0; i < ingredientsParam.length; i++){
      ingredients.push(await knex('ingredients').insert({
        recipe_id: recipe.id, 
        amount: ingredientsParam[i].amount,
        ingredient: ingredientsParam[i].ingredient
        }).returning('*'))
    }
    for(let i = 0; i < instructionsParam.length; i++){
      ingredients.push(await knex('instructions').insert({
        recipe_id: recipe.id,
        order: instructionsParam[i].order,
        instruction: instructionsParam[i].instruction
      }).returning('*'))
    }
    return {recipe, ingredients, instructions};
  }

  static async delete(id){
    return await knex('recipes').where({id}).del();
  }

  static async getById(id) {
    const recipe = (await knex('recipes').where({id}))[0];
    const ingredients = await knex('ingredients').where('ingredients.recipe_id', id);
    const instructions = await knex('instructions').where('instructions.recipe_id', id);
    return {recipe, ingredients, instructions};
  }

  static async getAll() {
   const recipesRes = await knex('recipes').select('*');
   const recipes = await Promise.all(recipesRes.map(async (recipe) => {
    const ingredients = await knex('ingredients').where('ingredients.recipe_id', recipe.id);
    const instructions = await knex('instructions').where('instructions.recipe_id', recipe.id);
    return {recipe, ingredients, instructions}
   }))
    return recipes;
  }

  static async getByUserID(userID) {
    const recipesRes = await knex('recipes').select('*').where('recipes.user_id', userID);
    const recipes = await Promise.all(recipesRes.map(async (recipe) => {
     const ingredients = await knex('ingredients').where('ingredients.recipe_id', recipe.id);
     const instructions = await knex('instructions').where('instructions.recipe_id', recipe.id);
     return {recipe, ingredients, instructions}
    }))
     return recipes;
   }

  static async update(id, data) {
    return await knex('recipes').where({ id }).update(data).returning('*');
  }

  static async delete(id) {
    return await knex('recipes').where({ id }).delete();
  }

//   static async search(query) {
//     const searchQuery = `
//     WITH search_result AS (
//       SELECT DISTINCT r."id" AS recipe_id, r."title" AS recipe_title, r."description" AS recipe_description, r."created_at" AS recipe_CreateAt, u."username" AS userName
//       FROM public.recipes r
//       JOIN public.users u ON r."user_id" = u."id"
//       LEFT JOIN public.categories_to_recipe ctr ON r."id" = ctr."recipe_id"
//       LEFT JOIN public.categories c ON ctr."category_id" = c."id"
//       LEFT JOIN public.comments cm ON r."id" = cm."recipe_id"
//       LEFT JOIN public.ingredients i ON r."id" = i."recipe_id"
//       LEFT JOIN public.instructions ins ON r."id" = ins."recipe_id"
//       LEFT JOIN public.ratings rt ON r."id" = rt."recipe_id"
//       WHERE (
//           r.title ILIKE '%${query}%' 
//           OR r.description ILIKE '%${query}%' 
//           OR c.category ILIKE '%${query}%' 
//           OR u.username ILIKE '%${query}%' 
//           OR cm.comment ILIKE '%${query}%' 
//           OR i.ingredient ILIKE '%${query}%' 
//           OR ins.instruction ILIKE '%${query}%'
//       )
//     )
//     SELECT * FROM search_result
//     ORDER BY recipe_id ASC;
// `;
//     const { rows } = await client.query(searchQuery);
//     return rows;
//   }
static async search(query) {
  const searchQuery = `
  WITH search_result AS (
    SELECT DISTINCT r."id" AS recipe_id, r."title" AS recipe_title, r."description" AS recipe_description, r."created_at" AS recipe_CreateAt, u."username" AS userName, r."photo_url" AS recipe_photo_url, u."profile_picture" AS user_profile_picture
    FROM public.recipes r
    JOIN public.users u ON r."user_id" = u."id"
    LEFT JOIN public.categories_to_recipe ctr ON r."id" = ctr."recipe_id"
    LEFT JOIN public.categories c ON ctr."category_id" = c."id"
    LEFT JOIN public.comments cm ON r."id" = cm."recipe_id"
    LEFT JOIN public.ingredients i ON r."id" = i."recipe_id"
    LEFT JOIN public.instructions ins ON r."id" = ins."recipe_id"
    LEFT JOIN public.ratings rt ON r."id" = rt."recipe_id"
    WHERE (
        r.title ILIKE '%${query}%' 
        OR r.description ILIKE '%${query}%' 
        OR c.category ILIKE '%${query}%' 
        OR u.username ILIKE '%${query}%' 
        OR cm.comment ILIKE '%${query}%' 
        OR i.ingredient ILIKE '%${query}%' 
        OR ins.instruction ILIKE '%${query}%'
    )
  )
  SELECT * FROM search_result
  ORDER BY recipe_id ASC;
`;
  const { rows } = await client.query(searchQuery);
  return rows;
}




  static async rate(userID, recipeID, rating){
    return await knex('ratings').insert({user_id: userID, recipe_id: recipeID, rating: rating}).returning('*');
  }
}

module.exports = Recipe;

