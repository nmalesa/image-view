const express = require('express');
const { Product, Thumbnail } = require('./sequelize.js');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, console.log(`Listening on port ${port}...`));
