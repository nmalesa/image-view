const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = process.env.PORT || 3030;

let db;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true }, (err, database) => {
  if (err) return console.log(err);
  db = database.db('images');
  app.listen(port, () => console.log(`Listening on port ${port}...`));
});

app.get('/products/:id', (req, res) => {
  db.collection('products').findOne({ _id: req.params.id }, (err, results) => {
    if (err) return console.log(err);
    console.log('Found the following document:', results);
  });
});
