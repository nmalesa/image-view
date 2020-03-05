const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const { Benchmark } = require('benchmark');

const url = 'mongodb://localhost:27017';

const dbName = 'images';

const client = new MongoClient(url, { useUnifiedTopology: true });

// const indexCollection = function(db, callback) {
//   db.collection('products').createIndex(
//     { name: 1 },
//     { unique: true },
//     null,
//     function(err, results) {
//       console.log(results);
//       callback();
//     }
//   );
// };

const suite = new Benchmark.Suite();

const findDocuments = function(db, callback) {
  const collection = db.collection('products');

  collection.find({ name: 'Handcrafted Frozen Soap' }).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log('Found the following records:');
    console.log(docs);
    callback(docs);
  });
};

client.connect(function(err) {
  assert.equal(null, err);
  console.log('Connected successfully to server...');

  const db = client.db(dbName);

  findDocuments(db, function() {
    client.close();
  });
});
