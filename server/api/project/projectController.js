var Project = require('./projectModel');
var _ = require('lodash');
var logger = require('../../util/logger');
var moment = require('moment')

exports.params = function(req, res, next, id) {
  Project.findById(id)
/*     .populate('client')
    .exec() */
    .then(function(project) {
      if (!project) {
        next(new Error('No project with that id'));
      } else {
        req.project = project;
        next();
      }
    }, function(err) {
      next(err);
    });
};

exports.get = function(req, res, next) {
  Project.find({})
/*     .populate('client')
    .exec() */
    .then(function(projects){
      res.json(projects);
    }, function(err){
      next(err);
    });
};

exports.getOne = function(req, res, next) {
  var project = req.project;
  res.json(project);
};

exports.put = function(req, res, next) {
  var project = req.project;

  var update = req.body;

  _.merge(project, update);

  project.save(function(err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  })
};

exports.post = function(req, res, next) {
  var newproject = req.body;
  Project.create(newproject)
    .then(function(project) {
      res.json(project);
    }, function(err) {
      logger.error(err);
      next(err);
    });
};
exports.log = function(req, res, next) {
    console.log(req.user.toJson())
    var project = req.project;
    var newLog = req.body
    var logExist=false
    var logIndex="0"
   
    project.log.forEach(function(element,index,array){

      if((moment(req.body.date).isSame(moment(project.log[index].date),'day') && ((req.user.toJson()._id+"") == (project.log[index].user+"")))){
        logIndex=index;
        logExist=true;
      }
  
    });
    if(logExist){
      
      project.log[logIndex] = newLog;
      project.log[logIndex].user= req.user.toJson()._id
    }else{      
      project.log.push(newLog)
      project.log[project.log.length-1].user= req.user.toJson()._id
    }
    
    
    var update = project;
  
    _.merge(project, update);
  
    project.save(function(err, saved) {
      if (err) {
        next(err);
      } else {
        res.json(saved);
      }
    })
};
exports.getLog = function(req, res, next) {
  var project = req.project;
  var time = 0;
  var response={};
  var start = moment(req.body.date_start)
  var end = moment(req.body.date_end)
  var currentDate;
  var diff = end.diff(start,req.body.period)+1
  response.diff = diff;
  response.log =[]
  for (let index = 0; index < diff; index++) {
    time=0
    project.log.forEach(function(element,index,array){
    
     
      if (start.isSame(moment(project.log[index].date),req.body.period) && ((req.user.toJson()._id+"")==(project.log[index].user+""))){
        
        time += element.time
       
      }
    });

    
    response.log.push({"time":time})
    start.add(1,req.body.period);

  }  
 
  res.json(response);
};
exports.getLogUsers = function(req, res, next) {
  var project = req.project;
  var time = 0;
  var response={};
  var start = moment(req.body.date_start)
  var end = moment(req.body.date_end)
  var currentDate;
  var diff = end.diff(start,req.body.period)+1
  response.diff = diff;
  response.log =[]
  for (let index = 0; index < diff; index++) {
    time=0
  
      project.log.forEach(function(element,index,array){
        
        if(req.body.user_id!=""){
          if (start.isSame(moment(project.log[index].date),req.body.period) && ((req.body.user_id+"")==(project.log[index].user+""))){
          
            time += element.time
           
          }
        }else{
          if (start.isSame(moment(project.log[index].date),req.body.period)){
          
            time += element.time
           
          }
        }

        
      });
  
  
    
    
    response.log.push({"time":time})
    start.add(1,req.body.period);

  }  

  res.json(response);
};

exports.delete = function(req, res, next) {
  req.project.remove(function(err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};
