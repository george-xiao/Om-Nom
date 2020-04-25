'use strict';

var mongoose = require('mongoose'),
    Post = mongoose.model('Posts'),
    Comment = mongoose.model('Comments'),
    User = mongoose.model('Users');

exports.listAllComments = function(req, res) {
    var comment_ids = [];
    Post.findById(req.params.postId, function (err, post) {
        if (err) return handleError(err);
        comment_ids.push(post.commentIds);
    });
    
    // Fix this
    // for (let i = 0; i < comment_ids.length; i++) {
    //     Comment.findById(comment_ids[i], "body userId")
    // }
};

exports.createComment = function(req, res) {
    // comment id for new comment
    var commentId = mongoose.Types.ObjectId();
    Post.findById(req.params.postId, function (err, post) {
        if (err) {
            return handleError(err);
        }
        post.commentIds.push(commentId);
        post.save(function(err, post) {
            if (err)
                res.send(err);
        });
    });

    var newComment = new Comment(req.body);
    newComment._id = commentId;
    newComment.save(function(err, comment) {
        if (err)
            res.send(err);
        res.json(comment);
    });
};