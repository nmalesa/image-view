const express = require('express');
const { pool, retrieveImage } = require('./db.js');
// const ExpressRedisCache = require('express-redis-cache');
const redis = require('redis');
const client = redis.createClient();

client.on('connect', () => console.log('Redis connected'));

const app = express();
const port = process.env.PORT || 3030;
// const cache = ExpressRedisCache({
//   expire: 10
// });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cache = (req, res, next) => {
  const key = req.url;

  client.get(key, (err, result) => {
    if (err === null && result !== null) {
      res.send('from cache');
    } else {
      res.sendResponse = res.send;
      res.send = body => {
        client.set(key, body, (err, reply) => {
          if (reply === 'OK') {
            res.sendResponse(body);
          }
        })
      }
      next();
    }
  })
};

app.get('/products/:id', cache(), async (req, res) => {
  try {
    let retrievedImage = await retrieveImage(req.params.id);
    res.send(retrievedImage);
  } catch (error) {
    res.send(error);
  }
});

app.listen(port, console.log(`Listening on port ${port}...`));
