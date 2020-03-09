const faker = require('faker');
const _ = require('lodash');
const fs = require('fs');

// Writing a large amount of data to a csv file using Node's drain event

// SEED MARIADB PRODUCTS TABLE
const writeImages = fs.createWriteStream('images.csv');
writeImages.write('id,name,primary_image,video_embed,description,thumbnailTest\n', 'utf-8');

function writeOneMillionImages(writer, encoding, callback) {
  let i = 10;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      const name = faker.commerce.productName();
      const primary_image = faker.image.image();
      const video_embed = _.random(1, 10) <= 5 ? `https://www.youtube.com/watch?v=${faker.random.alphaNumeric(11)}` : null;
      const description = faker.company.catchPhrase();
      const image = `${id},${name},${primary_image},${video_embed},${description}\n`;
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

// // SEED MARIADB THUMBNAILS TABLE
const writeThumbnails = fs.createWriteStream('thumbnails.csv');
writeThumbnails.write('thumb_id,thumb_1,thumb_2,thumb_3,thumb_4,thumb_5\n', 'utf-8');

function writeOneMillionThumbnails(writer, encoding, callback) {
  let i = 1000000;
  let thumb_id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      thumb_id += 1;
// Only generate thumbnail if preceding thumbnail exists
      const thumb_1 = _.random(1, 10) <= 5 ? faker.image.image() : null;
      const thumb_2 = thumb_1 !== null ? (_.random(1, 10) <= 5 ? faker.image.image() : null) : null;
      const thumb_3 = thumb_2 !== null ? (_.random(1, 10) <= 5 ? faker.image.image() : null) : null;
      const thumb_4 = thumb_3 !== null ? (_.random(1, 10) <= 5 ? faker.image.image() : null) : null;
      const thumb_5 = thumb_4 !== null ? (_.random(1, 10) <= 5 ? faker.image.image() : null) : null;
      const thumbnail = `${thumb_id},${thumb_1},${thumb_2},${thumb_3},${thumb_4},${thumb_5}\n`;
      if (i === 0) {
        writer.write(thumbnail, encoding, callback);
      } else {
// See if we should continue, or wait
// Don't pass the callback, because we're not done yet.
        ok = writer.write(thumbnail, encoding);
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

writeOneMillionThumbnails(writeThumbnails, 'utf-8', () => {
  writeThumbnails.end();
});
