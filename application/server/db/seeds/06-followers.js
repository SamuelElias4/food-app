
exports.seed = function(knex) {
  
    return knex("followers").insert([
        {user_id:1, follower_user:2},
        {user_id:1, follower_user:3},
        {user_id:1, follower_user:4},
        {user_id:2, follower_user:1},
        {user_id:2, follower_user:3},
        {user_id:2, follower_user:4},
        {user_id:3, follower_user:1},
        {user_id:3, follower_user:2},
        {user_id:3, follower_user:4},
        {user_id:4, follower_user:1},
        {user_id:4, follower_user:2},
        {user_id:4, follower_user:3}
    ])
};