'use strict';
module.exports = function(app) {
    var recipe = require('../controllers/recipeController');

    // Should you be retrieving one post? all posts for a user? create post dont work w a post id param

    app.route('/recipes/:recipeId')
        .get(recipe.getRecipe);

    app.route('/posts/:postId/recipes')
        .get(recipe.getPostRecipe)
        .post(recipe.createRecipe);

    app.route('/users/:userId/recipes')
        // get posts for user id
        .get(recipe.getRecipesOfUser);
};
