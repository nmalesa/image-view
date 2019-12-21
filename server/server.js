const express = require('express');
const cors = require('cors');
const faker = require('faker');
const _ = require('lodash');
const app = express();
const port = process.env.PORT || 3010;
const {pool, retrieveImage, addImage, addThumbnails, modifyImage, deleteImage} = require('../db/index.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const video_id = faker.random.alphaNumeric(11);

const product = {
  name: faker.commerce.productName(),
  primary_image: faker.image.imageUrl(),
  video_embed: `https://www.youtube.com/watch?v=${video_id}`,
  description: faker.company.catchPhrase()
};

const thumbnails = {
  product_id: _.random(1, 10000000),
  thumb_1: faker.image.imageUrl(),  // Or null (randomize)
  thumb_2: faker.image.imageUrl(),
  thumb_3: faker.image.imageUrl(),
  thumb_4: faker.image.imageUrl(),
  thumb_5: faker.image.imageUrl()
};

// CRUD OPERATIONS - GET
app.get('/products/:id', async (req, res) => {
  try {
    let retrievedImage = await retrieveImage(req.params.id);
    res.send(retrievedImage);
  } catch (error) {
    res.send(error);
  }
});

// CRUD OPERATIONS - POST
app.post('/products', async (req, res) => {
  try {
    let newImage = await addImage(product.name, product.primary_image, product.video_embed, product.description);
    res.send(newImage);
  } catch (error) {
    res.send(error);
  }
});

app.post('/thumbnails', async (req, res) => {
  try {
    let newThumbs = await addThumbnails(thumbnails.product_id, thumbnails.thumb_1, thumbnails.thumb_2, thumbnails.thumb_3, thumbnails.thumb_4, thumbnails.thumb_5);
    res.send(newThumbs);
  } catch (error) {
    res.send(error);
  }
});

// CRUD OPERATIONS - PUT
app.put('/products/:id', async (req, res) => {
  try {
    let modifiedImage = await modifyImage(req.params.id);
    res.send(modifiedImage);
  } catch (error) {
    res.send(error);
  }
});

// CRUD OPERATIONS - POST
app.delete('/products/:id', async (req, res) => {
  try {
    let deletedImage = await deleteImage(req.params.id);
    res.send(deletedImage);
  } catch (error) {
    res.send(error);
  }
});

app.listen(port, console.log(`Listening on port ${port}...`));
