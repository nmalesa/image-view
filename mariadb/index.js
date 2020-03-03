const express = require('express');
const {pool, retrieveImage } = require('./db.js');
const { Benchmark } = require('benchmark');

const app = express();
const port = process.env.PORT || 3010;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, console.log(`Listening on port ${port}...`));

// CRUD OPERATIONS - GET
// app.get('/products/:id', async (req, res) => {
//   // console.time();
//   try {
//     let retrievedImage = await retrieveImage(req.params.id);
//     res.send(retrievedImage);
//   } catch (error) {
//     res.send(error);
//   }
//   // console.timeEnd();
// });

// BENCHMARK TESTING
const suite = new Benchmark.Suite();

suite.add('getRequest', function() {
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
});

suite.on('cycle', function(event) {
  console.log(String(event.target));
});

suite.run();

// CRUD OPERATIONS - POST
// app.post('/products', async (req, res) => {
//   try {
//     let newImage = await addImage(product.name, product.primary_image, product.video_embed, product.description);
//     res.send(newImage);
//   } catch (error) {
//     res.send(error);
//   }
// });
//
// app.post('/thumbnails', async (req, res) => {
//   try {
//     let newThumbs = await addThumbnails(thumbnails.product_id, thumbnails.thumb_1, thumbnails.thumb_2, thumbnails.thumb_3, thumbnails.thumb_4, thumbnails.thumb_5);
//     res.send(newThumbs);
//   } catch (error) {
//     res.send(error);
//   }
// });

// CRUD OPERATIONS - PUT
// app.put('/products/:id', async (req, res) => {
//   try {
//     let modifiedImage = await modifyImage(req.params.id);
//     res.send(modifiedImage);
//   } catch (error) {
//     res.send(error);
//   }
// });

// CRUD OPERATIONS - POST
// app.delete('/products/:id', async (req, res) => {
//   try {
//     let deletedImage = await deleteImage(req.params.id);
//     res.send(deletedImage);
//   } catch (error) {
//     res.send(error);
//   }
// });