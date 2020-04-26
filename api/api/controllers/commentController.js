'use strict';
// var cloneDeep = require('lodash.clonedeep');
var commentHelper = require('../helpers/commentHelper');

var mongoose = require('mongoose'),
    Post = mongoose.model('Posts'),
    Comment = mongoose.model('Comments');

exports.listAllCommentsForPost = async function (req, res) {
    let commentIds = [];
    try {
        const post = await Post.findById(req.params.postId);
        commentIds = post.commentIds
    } catch (error) {
        console.log(error);
    }
    let comments = [];
    for (const commentId of commentIds) {
        let comment = await Comment.findById(commentId);
        if (comment) {
            comments.push(comment);
        }
        // console.log(comment);
    }
    console.log('comments', comments);

    let commentWithAppendedUserName = [];
    for (const comment of comments) {
        let userName = await commentHelper.getUsernameForComment(comment.userId);
        // console.log(userName)
        commentWithAppendedUserName.push({
            userName,
            comment
        });
    }
    res.json(commentWithAppendedUserName);

}

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