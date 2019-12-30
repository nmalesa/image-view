const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3010;
const {pool, retrieveImage, addImage, addThumbnails, modifyImage, deleteImage} = require('../db/index.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// CRUD OPERATIONS - GET
app.get('/products/:id', async (req, res) => {
  // console.time();
  try {
    let retrievedImage = await retrieveImage(req.params.id);
    res.send(retrievedImage);
  } catch (error) {
    res.send(error);
  }
  // console.timeEnd();
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
