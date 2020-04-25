'use strict';
module.exports = function(app) {
    var comment = require('../controllers/commentController');

    // can make simpler routes for specific reading/updating if necessary
    app.route('/posts/:postId/comments')
        .get(comment.listAllCommentsForPost)
        .post(comment.createComment);
};
