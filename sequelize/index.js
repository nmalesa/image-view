const express = require('express');
const { query } = require('./db.js');
const { Benchmark } = require('benchmark');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const suite = new Benchmark.Suite();

suite.add('getRequest', () => {
  app.get('/products/:9332123', query);
});

suite.on('cycle', event => {
  console.log(String(event.target));
});

suite.run();

app.listen(port, console.log(`Listening on port ${port}...`));
