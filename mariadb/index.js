const express = require('express');
const { pool, retrieveImage } = require('./db.js');
const { Benchmark } = require('benchmark');

const app = express();
const port = process.env.PORT || 3000;
const suite = new Benchmark.Suite();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get('/products/:id', query);
app.get('/products/:id', (req, res) => {
  suite.add('retrieve', () => {
    let retrievedImage = retrieveImage(req.params.id);
    try {
      let retrievedImage = retrieveImage(req.params.id);
      res.send(retrievedImage);
    } catch (error) {
      res.send(error);
    }
  })
  .on('cycle', event => {
    console.log(String(event.target));
  })
  // Run async
  .run({ async: true });
});


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

app.listen(port, console.log(`Listening on port ${port}...`));
