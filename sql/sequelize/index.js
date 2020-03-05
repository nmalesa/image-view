const express = require('express');
const { query } = require('./db.js');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/products/:id', query);

app.listen(port, console.log(`Listening on port ${port}...`));
