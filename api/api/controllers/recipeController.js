'use strict';

var mongoose = require('mongoose'),
    Post = mongoose.model('Posts'),
    Recipe = mongoose.model('Recipes');

exports.createRecipe = async function (req, res) {

    var postId = req.params.postId;
    let query = await Post.findById(postId).exec();
    var new_recipe = new Recipe(req.body);
    query.recipe = new_recipe._id;
    
    new_recipe.save(function (err, recipe) {
        if (err)
            res.send(err);
        res.json(recipe);
    });
};

exports.getRecipe = function (req, res) {
    Recipe.findById(req.params.recipeId, function (err, recipe) {
        if (err)
            res.send(err);
        res.json(recipe);
    });
};

exports.getRecipesOfUser = function (req, res) {
    Recipe.findOne({ userId: req.params.userId, }, function (err, recipe) {
        if (err)
            res.send(err);
        res.json(recipe.userId);
    });
}
