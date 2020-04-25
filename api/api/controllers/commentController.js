'use strict';
var cloneDeep = require('lodash.clonedeep');

var mongoose = require('mongoose'),
    Post = mongoose.model('Posts'),
    Comment = mongoose.model('Comments'),
    User = mongoose.model('Users');

var postComments = [];
async function processCommentIds(commentIdArray, res) {
    for (let i = 0; i < commentIdArray.length; i++) {
        await Comment.findById(commentIdArray[i], async function (err, comment) {
            if (err) {
                return handleError(err);
            }
            var commentUserId = comment.userId, commentBody = comment.body, commentTimestamp = comment.dateCreated;
            await User.findById(commentUserId.toString(), async function (err, user) {
                if (err) {
                    return handleError(err);
                } else {
                    // return 0;
                    postComments.push({username: user.username, dateCreated: commentTimestamp, body: commentBody, userId: commentUserId});
                    res.json(postComments)
                }
            }).exec();
        }).exec();
    }
}

exports.listAllComments = function (req, res) {
    var response = [], commentID;
    var comment_ids = [];
    var postObj;
    Post.findById(req.params.postId, async function (err, post) {
        if (err) return handleError(err);
        await processCommentIds(post.commentIds, res);
        res.json(postComments)
    });
};

exports.createComment = function (req, res) {
    // comment id for new comment
    var commentId = mongoose.Types.ObjectId();
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

    var newComment = new Comment(req.body);
    newComment._id = commentId;
    newComment.save(function (err, comment) {
        if (err)
            res.send(err);
        res.json(comment);
    });
};