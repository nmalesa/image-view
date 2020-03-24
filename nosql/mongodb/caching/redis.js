const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const redis = require('redis');

const app = express();
const port = process.env.PORT || 3030;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true }, (err, database) => {
  if (err) return console.log(err);
  db = database.db('images');
});

let db;

let client = redis.createClient();

let redisMiddleware = (req, res, next) => {
  let key = '__express__' + req.originalUrl || req.url;

  client.get(key, (err, reply) => {
    if (reply) {
      res.send(reply);
    } else {
      res.sendResponse = res.send;
      res.send = body => {
        client.set(key, JSON.stringify(body));
        res.sendResponse(body);
      }
      next();
    }
  });
};

app.get('/products/:id', redisMiddleware, (req, res) => {
  const objId = new require('mongodb').ObjectID(req.params.id);

  db.collection('products').findOne({ _id: objId }, (err, results) => {
    if (err) return console.log(err);
    res.send(results);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}...`));
