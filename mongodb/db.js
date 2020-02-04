const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';

const dbName = 'images';

const client = new MongoClient(url, { useUnifiedTopology: true });

client.connect(function(err) {
  assert.equal(null, err);
  console.log('Connected successfully to server');

  const db = client.db(dbName);

  client.close();
});



// const { MongoClient } = require('mongodb');
//
// const url = 'mongodb://localhost:27017';
//
// const dbName = 'images';
//
// let db;
//
// MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
//   if (err) return console.log(err);
//
//   db = client.db(dbName);
//   console.log(`Connected to MongoDB: ${url}`);
//   console.log(`Database: ${dbName}`);
//
//   db.products.find({ name: 'Ergonomic Wooden Bacon' });
// });
