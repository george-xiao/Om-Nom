'use strict';

// import PostSchema from '../models/postModel'

var mongoose = require('mongoose'),
    Post = mongoose.model('Posts'),
    User = mongoose.model('Users');

exports.retrievePost = function(req, res) {
    Post.findById(req.params.postId, function (err, post) {
        if (err) return handleError(err);
        console.log("yeet it worked")
        res.json(post);
    });
};

exports.createPost = function(req, res) {
    var new_post = new Post(req.body);
    new_post.userId = mongoose.Types.ObjectId(req.params.userId);
    User.findById(req.params.userId, function (err, user) {
        user.postIds.push(new_post._id);
        user.save(function(err, user) { 
            if (err) res.send(err);
        })
    })
    new_post.save(function(err, post) {
        if (err)
            res.send(err);
        res.json(post);
    });
};

exports.getUserPosts = function(req, res) {
    Post.find({userId: req.params.userId}, function (err, posts) {
        if (err) return handleError(err);
        console.log("yeet it worked")
        res.json(posts);
    });
};

exports.getRecommendedTagsForUser = function(req, res){
    let tags = [];
    Post.find({userId: req.params.userId}, function (err,post){
        if (err) return handleError(err);
        post.tags
    });
}

exports.getRecommendedPostsForUser = function(req, res) {
    
};

exports.getTrendingPosts = function(req, res) {
    var currentDate = Date.now();
    const dayInMs = 86400000;
    var earliestDate = currentDate - dayInMs;
    var gtDate = new Date(earliestDate);

    var pageNum = req.params.pageNum - 1, skipValue = pageNum * 30;

    Post.find({ dateCreated: { $gte: gtDate } }, "userId photoLinks numLikes cuisine tags title", { skip: skipValue }).sort([['likes', 'descending']]).exec(function (err, posts) {
        if (err) return console.log(err);
        res.json(posts)
    });
};