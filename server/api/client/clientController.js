var Client = require('./clientModel');
var _ = require('lodash');
var logger = require('../../util/logger');

exports.params = function(req, res, next, id) {
  Client.findById(id)
    .populate('projects')
    .exec()
    .then(function(client) {
      if (!client) {
        next(new Error('No client with that id'));
      } else {
        req.client = client;
        next();
      }
    }, function(err) {
      next(err);
    });
};

exports.get = function(req, res, next) {
  Client.find({})
    .populate('projects')
    .exec()
    .then(function(clients){
      res.json(clients);
    }, function(err){
      next(err);
    });
};

exports.getOne = function(req, res, next) {
  var client = req.client;
  res.json(client);
};

exports.put = function(req, res, next) {
  var client = req.client;
  var update = req.body;
  if(req.body.projects){
    update = client;
    update.projects = req.body.projects;
  }
  if(req.body.seller){
    update = client;
    update.seller = req.body.seller;
  }

  
  
  console.log(req.body)
  _.merge(client, update);

  client.save(function(err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  })
};

exports.post = function(req, res, next) {
  var newclient = req.body;
  Client.create(newclient)
    .then(function(client) {
      res.json(client);
    }, function(err) {
      logger.error(err);
      next(err);
    });
};

exports.delete = function(req, res, next) {
  req.client.remove(function(err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};
