'use strict';
// var cloneDeep = require('lodash.clonedeep');
var commentHelper = require('../helpers/commentHelper');

var mongoose = require('mongoose'),
    Post = mongoose.model('Posts'),
    Comment = mongoose.model('Comments'),
    User = mongoose.model('Users');

exports.listAllCommentsForPost = function (req, res) {
    let postId;
    Post.findById(req.params.postId, function (err, post) {
        if (err) return handleError(err);
        postId = post._id;
    });

    Comment.find({postId}, async function(err, comments){
        if (err) return handleError(err);
        let commentWithAppendedUserName = [];
        for (const comment of comments){
            let userName = await commentHelper.getUsernameForComment(Comment.userId)
            commentWithAppendedUserName.push({
                    userName,
                    ...comment
                });
        }
        res.json(commentWithAppendedUserName);
    });

};

exports.createComment = function (req, res) {
    // comment id for new comment
    let commentId = mongoose.Types.ObjectId();
    Post.findById(req.params.postId, function (err, post) {
        if (err) {
            return handleError(err);
        }
        post.commentIds.push(commentId);
        post.save(function (err, post) {
            if (err)
                res.send(err);
        });
    });

    let newComment = new Comment(req.body);
    newComment._id = commentId;
    newComment.save(function (err, comment) {
        if (err)
            res.send(err);
        res.json(comment);
    });
};