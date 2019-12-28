const mongoose = require('mongoose');
const faker = require('faker');
const _ = require('lodash');

mongoose.connect('mongodb://localhost/images', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.log('Could not connect to MongoDB:', err));

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

createImage();

//
// async function createImage() {
//   const image = new Image({
//     name: faker.commerce.productName(),
//     primary_image: faker.image.image(),
//     video_embed: _.random(1, 10) <= 5 ? `https://www.youtube.com/watch?v=${faker.random.alphaNumeric(11)}` : null,
//     description: faker.company.catchPhrase(),
//     thumbnails: [
//       _.random(1, 10) <= 5 ? faker.image.image() : null,
//       this.thumbnails[0] !== null ? (_.random(1, 10) <= 5 ? faker.image.image() : null) : null,
//       this.thumbnails[1] !== null ? (_.random(1, 10) <= 5 ? faker.image.image() : null) : null,
//       this.thumbnails[2] !== null ? (_.random(1, 10) <= 5 ? faker.image.image() : null) : null,
//       this.thumbnails[3] !== null ? (_.random(1, 10) <= 5 ? faker.image.image() : null) : null
//     ]
//   });
//
//   const result = await image.save();
//   console.log(result);
// };
//
// createImage();
