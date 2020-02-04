const mongoose = require('mongoose');
const faker = require('faker');
const _ = require('lodash');

mongoose.connect('mongodb://localhost:27017/images', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.log('Could not connect to MongoDB:', err));

const connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'Connection error: '));
connection.once('open', function() {
  connection.db.collection('products', function(err, collection) {
    collection.find({ name: 'Ergonomic Wooden Bacon' }).toArray(function(err, data) {
      console.log(data);
    });
  });
});

const imageSchema = new mongoose.Schema({
  name: String,
  primaryImage: String,
  videoEmbed: String,
  description: String,
  thumbnails: [ String ]
});

const Image = mongoose.model('Image', imageSchema);

async function createImage() {
  const image = new Image({
    name: faker.commerce.productName(),
    primaryImage: faker.image.image(),
    videoEmbed: _.random(1, 10) <= 5 ? `https://www.youtube.com/watch?v=${faker.random.alphaNumeric(11)}` : null,
    description: faker.company.catchPhrase(),
    thumbnails: ['null', 'null', 'null', 'null', 'null']
  });

  image.thumbnails[0] = _.random(1, 10) <= 5 ? faker.image.image() : null;
  image.thumbnails[1] = image.thumbnails[0] !== null ? (_.random(1, 10) <= 5 ? faker.image.image() : null) : null;
  image.thumbnails[2] = image.thumbnails[1] !== null ? (_.random(1, 10) <= 5 ? faker.image.image() : null) : null;
  image.thumbnails[3] = image.thumbnails[2] !== null ? (_.random(1, 10) <= 5 ? faker.image.image() : null) : null;
  image.thumbnails[4] = image.thumbnails[3] !== null ? (_.random(1, 10) <= 5 ? faker.image.image() : null) : null;

  const result = await image.save();

  console.log(result);
};

// async function getImage(id) {
//   const image = await Image.findById(id);
//
//   console.log(image);
// };
//
// async function getImageByName() {
//   const image = await Image
//     .find({ name: 'Ergonomic Wooden Bacon' })
//
//   console.log(image);
// }

// createImage();

// getImage('5e38b27e5887660933a1e011');

// getImageByName();
