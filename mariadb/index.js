const express = require('express');
const { pool, retrieveImage } = require('./db.js');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get('/products/:id', query);

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

app.listen(port, console.log(`Listening on port ${port}...`));
