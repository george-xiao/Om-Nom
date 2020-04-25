
exports.getUsernameForComment = async function(userId){
    User.findById(userId, function (err, user){
        if (err) return '';
        return user.username;
    });
}