const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const Memcached = require('memcached');

const app = express();
const port = process.env.PORT || 3030;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let db;

let memcached = new Memcached('127.0.0.1:11211');

let memcachedMiddleware = duration => {
  return (req, res, next) => {
    let key = '__express__' + req.originalUrl || req.url;

    memcached.get(key, (err, data) => {
      if (data) {
        res.send(data);
        return;
      } else {
        res.sendResponse = res.send;
        res.send = body => {
          memcached.set(key, body, (duration*60), err => {
            //
          });
          res.sendResponse(body);
        }
        next();
      }
    });
  }
};

MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true }, (err, database) => {
  if (err) return console.log(err);
  db = database.db('images');
});

app.get('/products/:id', memcachedMiddleware(20), (req, res) => {
  const objId = new require('mongodb').ObjectID(req.params.id);

  db.collection('products').findOne({ _id: objId }, (err, results) => {
    if (err) return console.log(err);
    res.send(results);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}...`));
