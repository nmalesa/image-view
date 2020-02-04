const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';

const dbName = 'images';

let db;

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  if (err) return console.log(err);

  db = client.db(dbName);
  console.log(`Connected to MongoDB: ${url}`);
  console.log(`Database: ${dbName}`);
});
