const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

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

const findDocument = function(db, callback) {
  const collection = db.collection('products');

  collection.findOne({ name: 'Handmade Frozen Computer', description: 'Persistent 6th generation success' }, (err, docs) => {
    assert.equal(err, null);
    console.log('Found the following record:');
    console.log(docs);
    callback(docs);
  });
};

client.connect(function(err) {
  assert.equal(null, err);
  console.log('Connected successfully to server...');

  const db = client.db(dbName);

  findDocument(db, function() {
    client.close();
  });
});
