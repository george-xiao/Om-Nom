var mongoose = require('mongoose'),
    User = mongoose.model('Users');

exports.updatetopTagMapOfUser = async function (userId, tagList) {
    User.findById(userId, async function (err, user) {
        if (err) return 0;

        for (const tag of tagList) {
            if (user.topTagMap.has(tag)) {
                const count = User.topTagMap.get(tag)
                user.topTagMap.set(tag, count + 1);
            } else {
                user.topTagMap.set(tag, 1);
            }
        }

        await user.save();
    });
}