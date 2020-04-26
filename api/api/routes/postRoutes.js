'use strict';
module.exports = function(app) {
    var post = require('../controllers/postController');

    // Should you be retrieving one post? all posts for a user? create post dont work w a post id param
    app.route('/posts/:postId')
        .get(post.retrievePost);

    app.route('/posts/:postId/recipe')
        .get(post.getRecipe);

    app.route('/users/:userId/posts')
        // get posts for user id
        .get(post.getUserPosts)
        // create post for user id
        .post(post.createPost);

    app.route('/users/:userId/foryou/:pageNum')
        .get(post.getFollowingPosts);

    app.route('/users/:userId/posts/recommended/:pageNum')
        // get recommended posts based on tags
        .get(post.getRecommendedPostsForUser);

    app.route('/users/posts/trending/:pageNum')
        // get trending posts (most liked posts last 24 hours)
        .get(post.getTrendingPosts);
};
