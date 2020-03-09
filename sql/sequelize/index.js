const express = require('express');
const { retrieveImage } = require('./db.js');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/products/:id', (req, res, next) => {
  retrieveImage(req.params.id)
  .then(data => {
    res.send(data);
  })
  .catch(next)
});

app.listen(port, console.log(`Listening on port ${port}...`));
