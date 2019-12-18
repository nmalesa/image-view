const express = require('express');
const cors = require('cors');
const app = express();
const {connection, retrieveImage, addImage, modifyImage, deleteImage} = require('../db/index.js');

app.use(cors());
// app.use('/', express.static('public'));


// app.use('/bundle', express.static('public/bundle.js'));
// app.use('/styleSheet', express.static('public/styles.css'));

app.get('/products/:id', (req, res) => {
  retrieveImage(req.params.id, (error, results) => {
    if (error) {
      res.send(error);
    } else {
      res.send(results);
    }
  });
});

app.post('/products', (req, res) => {
  addImage((error, results) => {
    if (error) {
      res.send(error);
    } else {
      res.send(results);
    }
  });
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

app.listen(3010, function() {
    console.log('listening')
});
