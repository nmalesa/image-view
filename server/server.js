const express = require('express');
const cors = require('cors');
const faker = require('faker');
const _ = require('lodash');
const app = express();
const port = process.env.PORT || 3010;
const {pool, retrieveImage, addImage, modifyImage, deleteImage} = require('../db/index.js');

app.use(cors());
app.use(express.json());
// app.use('/', express.static('public'));


// app.use('/bundle', express.static('public/bundle.js'));
// app.use('/styleSheet', express.static('public/styles.css'));
app.use(express.urlencoded({extended: true}));

const product = {
  id: 1, // Increment by 1
  name: faker.commerce.productName(),
  images: _.random(1, 9),
  videoEmbed: 'https://www.youtube.com/watch?v=UcTLJ692F70', // Change to random YouTube link generator
  videoThumb: faker.image.imageUrl(),

}

// app.get('/products/:id', (req, res) => {
//   retrieveImage(req.params.id, (error, results) => {
//     if (error) {
//       res.send(error);
//     } else {
//       res.send(results);
//     }
//   });
// });

app.get('/products', async (req, res) => {
  try {
    let image = await retrieveImage();


    await res.send(image);
  } catch (error) {
    console.log(error);
  }
})

// app.post('/products', async (req, res) => {
//   addImage((error, results) => {
//     if (error) {
//       res.send(error);
//     } else {
//       res.send(results);
//     }
//   });
// });

app.post('/products', async (req, res) => {
  try {
    let image = await addImage();
    await res.send(image);
  } catch (error) {
    res.send(error);
  }
});

app.put('/products/:id', (req, res) => {
  modifyImage(req.params.id, (error, results) => {
    if (error) {
      res.send(error);
    } else {
      res.send(results);
    }
  });
});

app.delete('/products/:id', (req, res) => {
  deleteImage(req.params.id, (error, results) => {
    if (error) {
      res.send(error);
    } else {
      res.send(results);
    }
  });
});

// app.get(`/:id`, function (req, res) {
//     db.getImage(req.params.id, (error, result) => {
//         if (error) {
//             res.send(error);
//         } else {
//             res.send(result);
//         }
//     })
// });

app.listen(port, console.log(`Listening on port ${port}...`));
