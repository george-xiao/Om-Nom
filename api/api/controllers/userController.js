'use strict';

var mongoose = require('mongoose'),
  User = mongoose.model('Users'),
  Post = mongoose.model('Posts')

const getTopNTags = require('../helpers/tagHelper');

exports.createUser = function(req, res) {
  // const userCollection = db.db().collection("users").find();
  // var query = User.find()
  // query.exec(function (err, docs) {console.log(docs)});
  User.findOne({username: req.body.username}, function (err, user) {
      if (err)  {
          return handleError(err)
      }
      else if (user != null) {
          res.json({response: "This user already exists. Please choose a different username."});
      } else {
          var new_user = new User(req.body);
          new_user.save(function(err, user) {
              if (err)
                  res.send(err);
              res.json(user);
          });
      }
  });
};

exports.listAllUsers = function (req, res) {
  User.find({}, function (err, users) {
    if (err) return handleError(err);
    console.log("yeet it worked")
    res.json(users);
  });
};

exports.getProfilePicture = function (req, res) {
  User.findById(req.params.userId, function (err,user){
    if (err) res.send(err);
    res.json(user.profilePicture);
  })
};

exports.getUser = function (req, res) {
  User.findById(req.params.userId, function (err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

exports.getLikedPosts = function(req, res) {
  var likedPostArray = []; // post objects
  User.findById(req.params.userId, function(err, user) {
      if (err)
          res.send(err);
      else {
          let likedPostIds = user.likedPostIds, length = likedPostIds.length;
          for (var i = 0; i < length; i++) {
              Post.find({_id: likedPostIds[i]}, function(err, post) {
                  if (err)
                      res.send(err);
                  else {
                      likedPostArray.push(post)
                  }
              })
          }
          res.json(likedPostArray);
      }
  });
};

// should we specify what to update?
exports.updateUser = function (req, res) {
  User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true }, function (err, task) {
    if (err) res.send(err);
    res.json(task);
  });
};

//update topTagMap
//should be called on 'liking'
//expects tags of to be added as an array
exports.updatetopTagMapOfUser = async function (req, res) {
  User.findById(req.params.userId, async function (err, user) {
    if (err) res.send(err);

    for (const tag of req.params.tags) {
      if (user.topTagMap.has(tag)) {
        const count = User.topTagMap.get(tag)
        user.topTagMap.set(tag, count + 1);
      } else {
        user.topTagMap.set(tag, 1);
      }
    }

    await user.save();
    res.json({ message: 'sucess' });
  });
}

//takes in userID and numberOfTags to get
exports.getTopTagsOfUser = async function (req, res) {
  User.findById(req.params.userId, async function (err, user) {
    if (err) res.send(err);
    //Sort the tags
    user.topTagMap = new Map([...user.topTagMap.entries()].sort((a, b) => b[1] - a[1]));
    await user.save();
    //get top n number of tags
    res.json(getTopNTags(req.params.numberOfTags, user.topTagMap.keySet()));
  });
};

exports.deleteUser = async function (req, res) {
  User.remove({
    _id: req.params.userId
  }, function (err, task) {
    if (err) res.send(err);
    res.json({ message: req.params.userId });
  });
};
