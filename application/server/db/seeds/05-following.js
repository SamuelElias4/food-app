exports.seed = function(knex) {
  
    return knex("following").insert([
      {user_id:1, following_user:2},
      {user_id:1, following_user:3},
      {user_id:1, following_user:4},
      {user_id:2, following_user:1},
      {user_id:2, following_user:3},
      {user_id:2, following_user:4},
      {user_id:3, following_user:1},
      {user_id:3, following_user:2},
      {user_id:3, following_user:4},
      {user_id:4, following_user:1},
      {user_id:4, following_user:2},
      {user_id:4, following_user:3}
    ])
};