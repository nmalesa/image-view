const faker = require('faker');
const _ = require('lodash');
const fs = require('fs');

const writeImages = fs.createWriteStream('images_10.json');
// writeImages.write('id,name,primary_image,video_embed,description,thumbnailTest\n', 'utf-8');

function writeOneMillionImages(writer, encoding, callback) {
  let i = 999;
  function write() {
    let ok = true;
    do {
      i -= 1;
      const nameVar = faker.commerce.productName();
      const primaryImageVar = faker.image.image();
      const videoEmbedVar = _.random(1, 10) <= 5 ? `https://www.youtube.com/watch?v=${faker.random.alphaNumeric(11)}` : null;
      const descriptionVar = faker.company.catchPhrase();
      const thumbnailsArr = ['null', 'null', 'null', 'null', 'null'];

      thumbnailsArr[0] = _.random(1, 10) <= 5 ? faker.image.image() : null;
      thumbnailsArr[1] = thumbnailsArr[0] !== null ? (_.random(1, 10) <= 5 ? faker.image.image() : null) : null;
      thumbnailsArr[2] = thumbnailsArr[1] !== null ? (_.random(1, 10) <= 5 ? faker.image.image() : null) : null;
      thumbnailsArr[3] = thumbnailsArr[2] !== null ? (_.random(1, 10) <= 5 ? faker.image.image() : null) : null;
      thumbnailsArr[4] = thumbnailsArr[3] !== null ? (_.random(1, 10) <= 5 ? faker.image.image() : null) : null;

      const image = JSON.stringify({name: nameVar, primaryImage: primaryImageVar, videoEmbed: videoEmbedVar, description: descriptionVar, thumbnails: thumbnailsArr}) + ',' + '\n';

      if (i === 0) {
        writer.write(image, encoding, callback);
      } else {
// See if we should continue, or wait
// Don't pass the callback, because we're not done yet.
        ok = writer.write(image, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
// Had to stop early!
// Write some more once it drains
      writer.once('drain', write);
    }
  };
write();
};

writeOneMillionImages(writeImages, 'utf-8', () => {
  writeImages.end();
});
