exports.seed = function(knex) {
  
    return knex('users').insert([
      {username:"nate", email:"nate@email.com", password:"pass123", profile_picture:"https://recipereel.s3.us-west-1.amazonaws.com/pig.png"},
      {username:"duncan", email:"duncan@email.com", password:"pass234", profile_picture:"https://recipereel.s3.us-west-1.amazonaws.com/rabbit.jpeg"},
      {username:"yueling", email:"yueling@email.com", password:"pass345", profile_picture:"https://recipereel.s3.us-west-1.amazonaws.com/duck.png"},
      {username:"marcel", email:"marcel@email.com", password:"pass456", profile_picture:"https://recipereel.s3.us-west-1.amazonaws.com/turtle.png"}
    ]);
};