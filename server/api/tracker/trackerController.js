var Tracker = require('./trackerModel');
var _ = require('lodash');
var logger = require('../../util/logger');

exports.params = function(req, res, next, id) {
  Tracker.findById(id)
    .populate('projects')
    .exec()
    .then(function(tracker) {
      if (!tracker) {
        next(new Error('No track with that id'));
      } else {
        req.tracker = tracker;
        next();
      }
    }, function(err) {
      next(err);
    });
};

exports.get = function(req, res, next) {
  Tracker.find({})
    .populate('projects')
    .exec()
    .then(function(trackers){
      res.json(trackers);
    }, function(err){
      next(err);
    });
};

exports.getOne = function(req, res, next) {
  var tracker = req.tracker;
  res.json(tracker);
};

exports.put = function(req, res, next) {
  var tracker = req.tracker;
  var update = req.body;
  if(req.body.projects){
    update = tracker;
    update.projects = req.body.projects;
  }  
  
  console.log(req.body)
  _.merge(tracker, update);

  tracker.save(function(err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  })
};

exports.post = function(req, res, next) {
  var newtracker = req.body;
  Tracker.create(newtracker)
    .then(function(tracker) {
      res.json(tracker);
    }, function(err) {
      logger.error(err);
      next(err);
    });
};

exports.delete = function(req, res, next) {
  req.tracker.remove(function(err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};
