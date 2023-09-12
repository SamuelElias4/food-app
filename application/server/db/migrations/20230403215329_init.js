/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('username').notNullable();
        table.string('email').notNullable();
        table.text('password').notNullable();
        table.text('profile_picture')
      })
      .createTable('recipes', (table) => {
      table.increments('id').primary();
      table.integer('user_id').unsigned().notNullable();
      table.foreign('user_id').references('users.id');
      table.string('title').notNullable();
      table.text('description');
      table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
      table.integer('cooking_time').notNullable();
      table.integer('difficulty').checkBetween([1, 5]).notNullable();
    })
    .createTable('ingredients', (table) => {
      table.increments('id').primary();
      table.integer('recipe_id').unsigned().notNullable();
      table.foreign('recipe_id').references('recipes.id');
      table.string('amount').notNullable();
      table.string('ingredient').notNullable();
    })
    .createTable('instructions', (table) => {
      table.increments('id').primary();
      table.integer('recipe_id').unsigned().notNullable();
      table.foreign('recipe_id').references('recipes.id');
      table.integer('number').notNullable();
      table.text('instruction').notNullable();
    })
    .createTable('ratings', (table) => {
      table.increments('id').primary();
      table.integer('recipe_id').unsigned().notNullable();
      table.foreign('recipe_id').references('recipes.id');
      table.integer('rating').checkBetween([1, 5]).notNullable();
    })
    .createTable('categories', (table) => {
      table.increments('id').primary();
      table.string('category').notNullable();
    })
    .createTable('categories_to_recipe', (table) => {
      table.increments('id').primary();
      table.integer('recipe_id').unsigned().notNullable();
      table.foreign('recipe_id').references('recipes.id');
      table.integer('category_id').unsigned().notNullable();
      table.foreign('category_id').references('categories.id');
    })
    .createTable('comments', (table) => {
      table.increments('id').primary();
      table.integer('recipe_id').unsigned().notNullable();
      table.foreign('recipe_id').references('recipes.id');
      table.text('comment').notNullable();
    })

    .createTable('following', (table) => {
      table.integer('user_id').unsigned().notNullable();
      table.foreign('user_id').references('users.id');
      table.integer('following_user').unsigned().notNullable();
      table.foreign('following_user').references('users.id');
    })

    .createTable('followers', (table) => {
      table.integer('user_id').unsigned().notNullable();
      table.foreign('user_id').references('users.id');
      table.integer('follower_user').unsigned().notNullable();
      table.foreign('follower_user').references('users.id');
    })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return (knex.schema
      .dropTableIfExists('followers')
      .dropTableIfExists('following')
      .dropTableIfExists('comments')
      .dropTable('categories_to_recipe')
      .dropTable('categories')
      .dropTable('ratings')
      .dropTable('instructions')
      .dropTableIfExists('ingredients')
      .dropTableIfExists('recipes')
      .dropTableIfExists('users')
      );
  };
