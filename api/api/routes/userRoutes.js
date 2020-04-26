'use strict';
module.exports = function(app) {
    var user = require('../controllers/userController');

    // can make simpler routes for specific reading/updating if necessary
    app.route('/users')
        .get(user.listAllUsers)
        .post(user.createUser);


    app.route('/users/:userId')
        .get(user.getUser)
        .put(user.updateUser)
        .delete(user.deleteUser);

    app.route('/users/:userId/likedposts')
        .get(user.getLikedPosts);

    app.route('/users/:userId/followUpdate')
        .put(user.updateFollowing);
};
