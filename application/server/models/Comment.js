const knex = require('knex')(require('../knexfile').development);

class Comment {
  static async create(data) {
    return await knex('comments').insert(data).returning('*');
  }

  static async getById(id) {
    return await knex('comments').where({ id }).first();
  }

  static async getAll() {
    return await knex('comments').select('*');
  }

  static async getByUserId(user_id) {
    return await knex('comments').where({ user_id }).select('*');
  }

  static async update(id, data) {
    return await knex('comments').where({ id }).update(data).returning('*');
  }

  static async delete(id) {
    return await knex('comments').where({ id }).delete();
  }

  static async getCommentsForRecipe(recipe_id) {
    return await knex('comments')
      .join('users', 'comments.user_id', 'users.id')
      .where({ 'comments.recipe_id': recipe_id })
      .select('comments.id', 'comments.comment', 'comments.recipe_id', 'users.id as user_id', 'users.username');
  }

  static async getCommentsForPost(post_id) {
    return await knex('comments')
      .join('users', 'comments.user_id', 'users.id')
      .where({ post_id })
      .select('comments.*', 'users.username as user_name');
  }

  static async likeComment(user_id,comment_id, likeBool){
    return await knex('comment_likes').insert({user_id: user_id, comment_id: comment_id, like: likeBool}).returning('*');
  }
}

module.exports = Comment;
