var User = require('../api/user/userModel');
var _ = require('lodash');
var logger = require('./logger');
logger.log('Seeding the Database');

var users = [
  {username: 'Jimmylo', password: 'test',role:true,name:"Jimmy",email:"jimmy@jimmy.com"},
  {username: 'Xoko', password: 'test',role:true,name:"choco",email:"choco@choco.com"},
  {username: 'Katamon', password: 'test',role:false,name:"Katty",email:"katty@katty.com"},
];


var createDoc = function(model, doc) {
  return new Promise(function(resolve, reject) {
    new model(doc).save(function(err, saved) {
      return err ? reject(err) : resolve(saved);
    });
  });
};

var cleanDB = function() {
  logger.log('... cleaning the DB');
  var cleanPromises = [User]
    .map(function(model) {
      return model.remove().exec();
    });
  return Promise.all(cleanPromises);
}

var createUsers = function(data) {

  var promises = users.map(function(user) {
    return createDoc(User, user);
  });

  return Promise.all(promises)
    .then(function(users) {
      return _.merge({users: users}, data || {});
    });
};


cleanDB()
  .then(createUsers)
  .then(logger.log.bind(logger))
  .catch(logger.log.bind(logger));
