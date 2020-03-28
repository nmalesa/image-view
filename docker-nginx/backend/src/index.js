const express = require('express');
const { pool, retrieveImage } = require('/Users/nataliamalesa/Desktop/image-view/sql/mariadb/db.js');
const redis = require('redis');

const app = express();
const port = process.env.PORT || 3030;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.get('/products/:id', redisMiddleware, async (req, res) => {
  try {
    let retrievedImage = await retrieveImage(req.params.id);
    res.send(retrievedImage);
  } catch (error) {
    res.send(error);
  }
});

app.listen(port, console.log(`Listening on port ${port}...`));
