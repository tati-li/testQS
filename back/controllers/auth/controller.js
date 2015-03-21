/**
 * Created by ТАНЯ on 20.03.15.
 */
//var mongo = require('mongodb');
//
//var Server = mongo.Server,
//    Db = mongo.Db,
//    BSON = mongo.BSONPure;
//
//var server = new Server('localhost', 27017, {auto_reconnect: true});
//db = new Db('listdb', server);
//
//db.open(function(err, db) {
//    if(!err) {
//        console.log("Connected to 'listdb' database");
//    }
//});
//
//exports.login = function(req, res) {
//  var name = req.params.name;
//  var pass = req.params.pass;
//
//  console.log('Login user: ' + name + ', ' + pass);
//  db.collection('list', function(err, collection) {
//    collection.findOne({'name': name, 'password': pass}, function(err, item) {
//      res.send(item);
//    });
//  });
//};
//
//exports.logout = function(req, res) {
//  var name = req.params.name;
//  console.log('Logout user: ' + name);
//  db.collection('list', function(err, collection) {
//
//  });
//};
//
//exports.findByCreds = function(req, res) {
//    var name = req.params.name;
//    var pass = req.params.pass;
//
//    console.log('Retrieving item for authentication: ' + name);
//    db.collection('list', function(err, collection) {
//        collection.findOne({'name': name, 'password': pass}, function(err, item) {
//            res.send(item);
//        });
//    });
//};

var mongo = require('mongodb');

var Server = mongo.Server,
  Db = mongo.Db,
  BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('usersdb', server);

db.open(function (err, db) {
  if (!err) {
    console.log("Connected to 'usersdb' database");
  }
});

exports.login = function (req, res) {
  var name = req.params.name;
  var pass = req.params.pass;
  var isLogged = req.params.isLogged;

  console.log('Login user: ' + name + ', ' + pass + ', ' + isLogged);
  db.collection('users', function (err, collection) {
    collection.findOne({'name': name, 'password': pass, 'isLogged': isLogged}, function (err, item) {
      res.send(item);
    });
  });
};

exports.logout = function (req, res) {
  var name = req.params.name;
  console.log('Logout user: ' + name);
  db.collection('users', function (err, collection) {

  });
};

exports.findByCreds = function (req, res) {
  var item = req.body;

  console.log('Retrieving item for authentication2: ' + JSON.stringify(item));
  db.collection('users', function (err, collection) {
    collection.findOne(item, function (err, item) {
      console.log('Success: ' + item);
      res.send(item);
    });
  });
};

exports.findAll = function(req, res) {
  db.collection('users', function(err, collection) {
    collection.find().toArray(function(err, items) {
      res.send(items);
    });
  });
};

exports.registration = function (req, res) {
  var item = req.body;
  console.log('registration user: ' + JSON.stringify(item));

  db.collection('users', function (err, collection) {
    collection.insert(item, {safe:true}, function(err, result) {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        console.log('Success: ' + JSON.stringify(result[0]));
        res.send(result[0]);
      }
    });
  });
};



