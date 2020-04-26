'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    // User who commented, don't require userid of the person who's post this comment is attached to
    userId: {
        type: Schema.Types.ObjectId,
        required: "Please include the user this comment is assigned to"
    },
    // postId:{
    //     type: Schema.Types.ObjectId,
    //     required: "comments need to have a post associated"
    // },
    body: {
        type: String,
        required: "Please add a body"
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Comments', CommentSchema);