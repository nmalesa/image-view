const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = process.env.PORT || 3030;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true }, (err, database) => {
  if (err) return console.log(err);
  db = database.db('images');
});

let db;

app.get('/products/:id', (req, res) => {
  const objId = new require('mongodb').ObjectID(req.params.id);

  db.collection('products').findOne({ _id: objId }, (err, results) => {
    if (err) return console.log(err);
    res.send(results);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}...`));
