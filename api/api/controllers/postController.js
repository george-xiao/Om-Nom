'use strict';

// import PostSchema from '../models/postModel'

var mongoose = require('mongoose'),
    Post = mongoose.model('Posts'),
    Recipe = mongoose.model('Recipes'),
    User = mongoose.model('Users');

const postHelper = require('../helpers/postHelper');

exports.retrievePost = async function (req, res) {
    Post.findById(req.params.postId, function (err, post) {
        if (err) return handleError(err);
        console.log("yeet it worked")
        res.json(post);
    });
};

exports.createPost = function (req, res) {
    var new_post = new Post(req.body);
    new_post.userId = mongoose.Types.ObjectId(req.params.userId);
    User.findById(req.params.userId, function (err, user) {
        user.postIds.push(new_post._id);
        user.save(function (err, user) {
            if (err) res.send(err);
        })
    })
    new_post.save(function (err, post) {
        if (err)
            res.send(err);
        res.json(post);
    });
};

exports.getUserPosts = function (req, res) {
    Post.find({ userId: req.params.userId }, function (err, posts) {
        if (err) return handleError(err);
        console.log("yeet it worked")
        res.json(posts);
    });
};

exports.getRecipe = function (req, res) {
    Post.findById(req.params.postId, async function (err, post) {
        if (err) return handleError(err);

        let query = await Recipe.findById(post.recipe).exec();
        console.log("yeet it worked")
        res.json(query);
    });
};


// requires user id and page of posts to get
exports.getRecommendedPostsForUser = function (req, res) {
    // get top user tags
    let userTopTags;
    User.findById(req.params.userId, function (err, user) {
        if (err) {
            res.send(err);
            return
        }
        userTopTags = user.topTagMap;


    const postPerPage = 100;
    const offset = req.params.pageNum

    Post.find().limit(postPerPage).skip(postPerPage * offset).sort({
        dateCreated: -1
    }).exec(function (err, posts) {
        if (err) console.log(err);
        res.json(postHelper.getPostSortedByScore(posts, userTopTags));
    });
    });

};

// requires user id and number of posts to get
exports.getFollowingPosts = async function (req, res) {
    // get top user tags
    let peopleFollowed;
    let userData = await User.findById(req.params.userId, function (err, user) {
        if (err) {
            res.send(err);
            return
        }
        peopleFollowed = user.followingIds;
    });

    const postPerPage = 100;
    const offset = req.params.pageNum

    Post.find({ userId: { $in: peopleFollowed } }).limit(postPerPage).skip(postPerPage * offset).sort({
        dateCreated: -1
    }).exec(function (err, posts) {
        if (err) console.log(err);
        res.json(posts);
    });
};

exports.getTrendingPosts = function (req, res) {
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