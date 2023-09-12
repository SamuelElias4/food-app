// models/Users.js

const knex = require('knex')(require('../knexfile').development);

class User {
  static async create(data) {
    return await knex('users').insert(data).returning('*');
  }

  static async getById(id) {
    return await knex('users').where({ id }).first();
  }

  static async getAll() {
    return await knex('user').select('*');
  }

  static async getByEmail(email) {
    return await knex('users').where({ email }).first();
  }

  static async update(id, data) {
    return await knex('users').where({ id }).update(data).returning('*');
  }

  static async delete(id) {
    return await knex('users').where({ id }).delete();
  }

  static async follow(userID, followID) {
    return (
      await knex('following')
        .insert({ user_id: userID, following_id: followID })
        .returning('*')
    )[0];
  }

  static async unfollow(userID, followID) {
    return await knex('following')
      .where('user_id', userID)
      .where('following_id', followID)
      .delete();
  }

  static async getFollowers(userID) {
    return await knex('following')
      .select('users.id', 'users.username', 'users.profile_picture')
      .join('users', 'following.user_id', 'users.id')
      .where('following_id', userID);
  }

  static async getFollowing(userID) {
    return await knex('following')
      .select('users.id', 'users.username','users.profile_picture')
      .join('users', 'following.following_id', 'users.id')
      .where('user_id', userID);
  }

  static async saveRecipe(userID, recipeID) {
    return (
      await knex('user_favorite_recipes')
        .insert({ user_id: userID, recipe_id: recipeID })
        .returning('*')
    )[0];
  }

  static async getSavedRecipes(userID) {
    const savedRecipeIDs = await knex('user_favorite_recipes')
      .where('user_favorite_recipes.user_id', userID);
      const savedRecipes = await Promise.all(savedRecipeIDs.map(async (recipeData) => {
        const recipe = await await knex('recipes').where('id', recipeData.recipe_id)
        const ingredients = await knex('ingredients').where('ingredients.recipe_id', recipeData.recipe_id);
        const instructions = await knex('instructions').where('instructions.recipe_id', recipeData.recipe_id);
        return {recipe, ingredients, instructions}
       }))
      return savedRecipes
  }

  static async removeSavedRecipe(userID, recipeID) {
    return await knex('user_favorite_recipes')
      .where('user_id', userID)
      .where('recipe_id', recipeID)
      .del();
  }


  static async getByUsername(username) {
    return await knex('users').where({ username }).first();
  }
}

module.exports = User;
