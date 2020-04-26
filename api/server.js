var express = require('express'),
  app = express(),
  port = process.env.PORT || 3001,
  mongoose = require('mongoose'),
  User = require('./api/models/userModel'), //created model loading here
  Recipe = require('./api/models/recipeModel'),
  Post = require('./api/models/postModel'),
  Comment = require('./api/models/commentModel'),
  bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
// add user + pass
mongoose.connect('mongodb+srv://jake_xia:DknyIBNcsq4Iglwk@georgetestcluster-kmuhe.gcp.mongodb.net/app-testing?retryWrites=true&w=majority');

mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to thingymobober');
    mongoose.connection.db.listCollections().toArray(function (err, names) {
        console.log(names); // [{ name: 'dbname.myCollection' }]
        module.exports.Collection = names;
    });
  }); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

var userRoutes = require('./api/routes/userRoutes'), //importing route
    postRoutes = require('./api/routes/postRoutes'),
    commentRoutes = require('./api/routes/commentRoutes'),
    recipeRoutes = require('./api/routes/recipeRoutes');

userRoutes(app); //register the route
postRoutes(app); //register the route
commentRoutes(app); //register the route
recipeRoutes(app); //register the route

app.listen(port);

console.log('OMNOM RESTful API server started on: ' + port);