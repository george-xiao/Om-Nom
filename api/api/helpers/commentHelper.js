var mongoose = require('mongoose'),
User = mongoose.model('Users');

exports.getUsernameForComment = async function(userId){
    let user = await User.findById(userId);
    return user.username;
}