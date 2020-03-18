const express = require('express');
const { pool, retrieveImage } = require('../db.js');
const Memcached = require('memcached');

const app = express();
const port = process.env.PORT || 3030;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.get('/products/:id', memcachedMiddleware(20), async (req, res) => {
  try {
    let retrievedImage = await retrieveImage(req.params.id);
    res.send(retrievedImage);
  } catch (error) {
    res.send(error);
  }
});

app.listen(port, console.log(`Listening on port ${port}...`));
