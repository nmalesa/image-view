const express = require('express');
const { pool, retrieveImage } = require('./sql/mariadb/db.js');
const redis = require('redis');

const app = express();
const port = process.env.PORT || 3030;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CONFIGURATION FOR DOCKER-COMPOSE
// let client = redis.createClient({
//   host: 'redis-server',
//   port: 6379
// });

const app1 = express();
const app2 = express();

app1.use(express.json());
app2.use(express.json());

const handler = serverNum => (req, res) => {
  console.log(`server ${serverNum}`, req.method, req.url, req.body);
  res.send(`Hello from server ${serverNum}!`);
}

app1.get('/', handler(1));
app2.get('/', handler(2));

app1.listen(8000);
app2.listen(8001);


// let client = redis.createClient();
//
// let redisMiddleware = (req, res, next) => {
//   let key = '__express__' + req.originalUrl || req.url;
//
//   client.get(key, (err, reply) => {
//     if (reply) {
//       res.send(reply);
//     } else {
//       res.sendResponse = res.send;
//       res.send = body => {
//         client.set(key, JSON.stringify(body));
//         res.sendResponse(body);
//       }
//       next();
//     }
//   });
// };
//
// app.get('/products/:id', redisMiddleware, async (req, res) => {
//   try {
//     let retrievedImage = await retrieveImage(req.params.id);
//     res.send(retrievedImage);
//     console.log(`${process.env.MESSAGE}`);
//   } catch (error) {
//     res.send(error);
//   }
// });
//
// app.listen(port, console.log(`Listening on port ${port}...`));
