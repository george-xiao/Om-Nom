'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PostSchema = new Schema({
    // dont need to send userId in body, since it is in url
    userId: {
        type: Schema.Types.ObjectId,
        required: "Please include the user this post is assigned to"
    },
    title: {
        type: String,
        required: "Please add a title"
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    },
    photoLinks: {
        type: [String],
        required: 'Please add at least 1 photo'
    },
    description: {
        type: String,
        default: ""
    },
    tags: {
        type: [String],
        default: []
    },
    numLikes: {
        type: Number,
        default: 0
    },
    category: {
        type: [String],
        required: "Please add a category"
    },
    commentIds: {
        // comment ids
        type: [Schema.Types.ObjectId],
        default: []
    },
    cuisine: {
        type: [String],
        default: []
    },
    recipe: {
        type: Schema.Types.ObjectId
    }

});

// export { PostSchema };
module.exports = mongoose.model('Posts', PostSchema);