'use strict';

var mongoose = require('mongoose'),
  Recipe = mongoose.model('Recipe');

exports.createRecipe = function (req, res) {
  var new_recipe = new Recipe(req.body);
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

//Please check this george
exports.getRecipesOfUser = function (req, res) {
  Recipe.find({ userId: req.params.userId,}, function (err,recipes) {
    if (err)
      res.send(err);
    res.json(recipes);
  });
}

exports.deleteRecipe = function (req, res) {
  Recipe.remove({
    _id: req.params.recipeId
  }, function (err, task) {
    if (err)
      res.send(err);
    res.json({ message: req.params.recipeId });
  });
};
