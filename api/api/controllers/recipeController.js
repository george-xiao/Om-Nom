'use strict';

var mongoose = require('mongoose'),
    Post = mongoose.model('Posts'),
    Recipe = mongoose.model('Recipes'),
    User = mongoose.model('Users');

exports.createRecipe = async function (req, res) {

    var postId = req.params.postId;
    let query = await Post.findById(postId).exec();
    var new_recipe = new Recipe(req.body);
    query.recipe = new_recipe._id;
    let querySave = await query.save(function (err, recipe) {
        if (err)
            res.send(err);
    });

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

exports.getPostRecipe = async function (req, res) {
    let post = await Post.findById(req.params.postId).exec();
    let recipe = await Recipe.findById(post.recipe).exec();
    res.json(recipe);
}

exports.getRecipesOfUser = async function (req, res) {
    
    let user = await User.findById(req.params.userId).exec();
    let recipeIds = await Post.find({'_id': { $in: user.postIds}}).select('recipe').exec();
    let recipeIdArr = [];
    for (const recipe of recipeIds) {
        if (recipe.recipe) {
            recipeIdArr.push(recipe.recipe)
        }
    }
    let recipes = await Recipe.find({'_id': { $in: recipeIdArr}}).exec();
    res.json(recipes);
}
