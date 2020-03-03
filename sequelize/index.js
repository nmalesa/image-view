const express = require('express');
const { query } = require('./db.js');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// SQL GET query:
// 'SELECT * FROM products INNER JOIN thumbnails ON products.id = thumbnails.thumb_id WHERE products.id = ?'

// app.get('/products/:id', (req, res) => {
//
//   return query.then(product => res.send(product));
// });

app.get('/products/:id', query);

app.listen(port, console.log(`Listening on port ${port}...`));
