/**
 * Created by ТАНЯ on 20.03.15.
 */
var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('listdb', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'listdb' database");
    }
});

exports.login = function(req, res) {
  var name = req.params.name;
  var pass = req.params.pass;

  console.log('Login user: ' + name + ', ' + pass);
  db.collection('list', function(err, collection) {
    collection.findOne({'name': name, 'password': pass}, function(err, item) {
      res.send(item);
    });
  });
};

exports.logout = function(req, res) {
  var name = req.params.name;
  console.log('Logout user: ' + name);
  db.collection('list', function(err, collection) {

  });
};

exports.findByCreds = function(req, res) {
    var name = req.params.name;
    var pass = req.params.pass;

    console.log('Retrieving item for authentication: ' + name);
    db.collection('list', function(err, collection) {
        collection.findOne({'name': name, 'password': pass}, function(err, item) {
            res.send(item);
        });
    });
};