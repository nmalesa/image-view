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

const product = {
  id: 1, // Increment by 1
  name: faker.commerce.productName(),
  images: _.random(1, 9),
  videoEmbed: 'https://www.youtube.com/watch?v=UcTLJ692F70', // Change to random YouTube link generator
  videoThumb: faker.image.imageUrl(),
};

// app.get('/test', async (req, res) => {
//   try {
//     let test = await console.log('Hello World');
//     res.send(test);
//   } catch (error) {
//     res.send(error);
//   }
// });

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
    let newImage = await addImage();
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
