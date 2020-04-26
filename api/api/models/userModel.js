'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
    username: {
        type: String,
        required: "Please add an username"
    },
    password: {
        type: String,
        required: "Please add a password"
    },
    firstName: {
        type: String,
        required: 'Please add your first name'
    },
    lastName: {
        type: String,
        required: 'Please add your last name'
    },
    profilePicture: {
        type: String,
        default: ''
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    lastUpdatedDate: {
        type: Date,
        default: Date.now
    },
    bio: {
        type: String,
        default: ""
    },
    postIds: {
        // post ids
        type: [Schema.Types.ObjectId],
        default: []
    },
    likedPostIds: {
        type: [Schema.Types.ObjectId],
        default: []
    },
    followingIds: {
        // User ids
        type: [Schema.Types.ObjectId],
        default: []
    },
    followersIds: {
        // User ids
        type: [Schema.Types.ObjectId],
        default: []
    },
    topTagMap: {
        //Keys as names, value as number of posts liked with that tag
        type: Map,
        default: new Map()
    },
    nationality: {
        type: [String],
        default: []
    },
    userType: {
        type: String,
        enum: ['restaurant', 'chef', 'home cook'],
        default: 'home cook'
    },

});


module.exports = mongoose.model('Users', UserSchema);


