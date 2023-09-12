exports.seed = function(knex) {
  
    return knex("recipes").insert([
      {user_id: "1", title:"chicken pot pie", description:"a creamy, flacky chicken pot pie.", cooking_time:"90", difficulty:"3"},
      {user_id: "2", title:"biscuits", description:"a flaky, soft, buttery biscuits", cooking_time:"45", difficulty:"2"},
      {user_id: "2", title:"Spaghetti Carbonara", description:"A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper", cooking_time:"30", difficulty:"2"},
      {user_id: "4", title:"Chicken Tikka Masala", description:"A creamy tomato-based curry with tender marinated chicken pieces", cooking_time:"60", difficulty:"3"},
      {user_id: "5", title:"Beef Tacos", description:"Crispy corn tortillas filled with seasoned ground beef, lettuce, cheese, and tomatoes", cooking_time:"25", difficulty:"1"},
      {user_id: "6", title:"Caesar Salad", description:"A green salad with romaine lettuce, croutons, parmesan cheese, and Caesar dressing", cooking_time:"15", difficulty:"1"},
      {user_id: "7", title:"Lemon Herb Salmon", description:"Pan-seared salmon fillets with a lemon, garlic, and herb butter sauce", cooking_time:"25", difficulty:"2"},
      {user_id: "8", title:"Egg Fried Rice", description:"A simple Chinese-style dish made with fried rice, eggs, peas, carrots, and onions", cooking_time:"20", difficulty:"1"},
      {user_id: "9", title:"Chocolate Chip Cookies", description:"Delicious, soft, and chewy cookies loaded with chocolate chips", cooking_time:"30", difficulty:"2"},
      {user_id: "10", title:"Vegetable Stir-Fry", description:"A colorful mix of stir-fried vegetables with a savory soy sauce and garlic", cooking_time:"25", difficulty:"2"},
      {user_id: "11", title:"BBQ Ribs", description:"Tender, fall-off-the-bone pork ribs smothered in tangy BBQ sauce", cooking_time:"180", difficulty:"3"},
      {user_id: "12", title:"Caprese Salad", description:"A refreshing Italian salad with ripe tomatoes, fresh basil, and mozzarella cheese", cooking_time:"10", difficulty:"1"},
    ])
};