const express = require('express');
const app = express();
const port = 5000;
const name = process.env.NAME || 'World';

app.get('/', (req, res) => {
  res.send(`Hello ${name}!`);
})

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
