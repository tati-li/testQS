var mongo = require('mongodb');

var Server = mongo.Server,
  Db = mongo.Db;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('listdb', server);

db.open(function(err, db) {
  if(!err) {
    console.log("Connected to 'listDb' database");
    db.collection('list', {strict:true}, function(err, collection) {
      if (err) {
        console.log("The 'List' collection doesn't exist. Creating it with sample data...");
        populateDB();
      }
    });
    db.collection('users', {strict:true}, function(err, collection) {

    });
  }
});

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {

  var pets = [
    {
      species: 'cat',
      name: 'Kitty',
      age : 2,
      owner: 'Pit'
    },
    {
      species: 'dog',
      name: 'Barsic',
      age : 1.5,
      owner: 'Ann'
    },
    {
      species: 'mouse',
      name: 'Missy',
      age : 0.8,
      owner: 'Dan'
    },
    {
      species: 'cat',
      name: 'Mursic',
      age : 9,
      owner: 'Kate'
    },
    {
      species: 'parrot',
      name: 'Kesha',
      age : 1.2,
      owner: 'Mark'
    }
  ]

  db.collection('list', function(err, collection) {
    collection.insert(pets, {safe:true}, function(err, result) {});
  });

};