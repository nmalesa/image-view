const express = require('express');
const { Product, Thumbnail } = require('./db.js');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// SQL GET query:
// 'SELECT * FROM products INNER JOIN thumbnails ON products.id = thumbnails.thumb_id WHERE products.id = ?'

app.get('/products/:id', (req, res) => {
  let query = Product.findAll({
    where: {
      id: req.params.id
    },
    include: [{
      model: Thumbnail,
      required: true
    }]
  });
  return query.then(product => res.send(product));
});

app.listen(port, console.log(`Listening on port ${port}...`));
