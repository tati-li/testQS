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
        db.collection('list', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'List' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving item: ' + id);
    db.collection('list', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findByName = function(req, res) {
    var name = req.params.name;
    console.log('Retrieving item: ' + name);
    db.collection('list', function(err, collection) {
        collection.findOne({'name': name}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('list', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addItem = function(req, res) {
    var item = req.body;
    console.log('Adding item: ' + JSON.stringify(item));
    db.collection('list', function(err, collection) {
        collection.insert(item, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateItem = function(req, res) {
    var id   = req.params.id;
    var item = req.body;
    console.log('Updating item: ' + id, item);
    db.collection('list', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, item, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating item: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(item);
            }
        });
    });
}

exports.deleteItem = function(req, res) {
    var id = req.params.id;
    console.log('Deleting item: ' + id);
    db.collection('list', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}

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