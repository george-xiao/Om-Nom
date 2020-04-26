'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var RecipeSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: "Please include the user who made this",
    },
    ingredients: {
        type: [{
            name: String,
            amount: Number,
            unit: String,
        }],
        default: []
    },
    prepTime: {
        type: Number,
        default: 0,
    },
    directions: {
        type: [String],
        default: []
    },
    notes: {
        type: String,
        default: ""
    },
    servings: {
        type: {
            amount: Number,
            unit: String,
        },
        default: {
            amount: 1,
            unit: "serving",
        }
    },

});


module.exports = mongoose.model('Recipes', RecipeSchema);