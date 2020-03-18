const express = require('express');
const { pool, retrieveImage } = require('../db.js');
const flatCache = require('flat-cache');

const app = express();
const port = process.env.PORT || 3030;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let cache = flatCache.load('productsCache');

let flatCacheMiddleware = (req, res, next) => {
  let key = '__express__' + req.originalUrl || req.url;
  let cacheContent = cache.getKey(key);

  if (cacheContent) {
    res.send(cacheContent);
  } else {
    res.sendResponse = res.send;
    res.send = body => {
      cache.setKey(key, body);
      cache.save();
      res.sendResponse(body);
    }
    next();
  }
};

app.get('/products/:id', flatCacheMiddleware, async (req, res) => {
  try {
    let retrievedImage = await retrieveImage(req.params.id);
    res.send(retrievedImage);
  } catch (error) {
    res.send(error);
  }
});

app.listen(port, console.log(`Listening on port ${port}...`));
