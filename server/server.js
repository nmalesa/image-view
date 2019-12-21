const express = require('express');
const cors = require('cors');
const faker = require('faker');
const _ = require('lodash');
const app = express();
const port = process.env.PORT || 3010;
const {pool, retrieveImage, addImage, modifyImage, deleteImage} = require('../db/index.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// const video_id = faker.random.alphaNumeric(11);
//
// const seedProduct = () => {
//
// };
//
// const product = {
//   id: 1, // Increment by 1
//   name: faker.commerce.productName(),
//   primary_image: faker.image.imageUrl(),
//   video_embed: `https://www.youtube.com/watch?v=${video_id}`,
//   description: faker.company.catchPhrase()
// };
//
// const thumbnails = {
//   product_id: _.random(1, 10000000),
//   thumb_1: faker.image.imageUrl(),  // Or null (randomize)
//   thumb_2: faker.image.imageUrl(),
//   thumb_3: faker.image.imageUrl(),
//   thumb_4: faker.image.imageUrl(),
//   thumb_5: faker.image.imageUrl()
// };
//
// app.get('/test', async (req, res) => {
//   try {
//     let test1 = await console.log(product);
//     res.send(test1);
//   } catch (error) {
//     res.send(error);
//   }
// });

const video_id = faker.random.alphaNumeric(11);

const product = {
  name: faker.commerce.productName(),
  primary_image: faker.image.imageUrl(),
  video_embed: `https://www.youtube.com/watch?v=${video_id}`,
  description: faker.company.catchPhrase()
};

app.get('/products/:id', async (req, res) => {
  try {
    let retrievedImage = await retrieveImage(req.params.id);
    res.send(retrievedImage);
  } catch (error) {
    res.send(error);
  }
});

app.post('/products', async (req, res) => {
  try {
    let newImage = await addImage(product.name, product.primary_image, product.video_embed, product.description);
    res.send(newImage);
  } catch (error) {
    res.send(error);
  }
});

app.put('/products/:id', async (req, res) => {
  try {
    let modifiedImage = await modifyImage(req.params.id);
    res.send(modifiedImage);
  } catch (error) {
    res.send(error);
  }
});

app.delete('/products/:id', async (req, res) => {
  try {
    let deletedImage = await deleteImage(req.params.id);
    res.send(deletedImage);
  } catch (error) {
    res.send(error);
  }
});

app.listen(port, console.log(`Listening on port ${port}...`));
