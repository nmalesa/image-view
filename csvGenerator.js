const faker = require('faker');
const _ = require('lodash');
const fs = require('fs');
const path = require('path');

const thumbnails = [
  {
    thumb_1: _.random(1, 10),
    thumb_2: null,
    thumb_3: null,
    thumb_4: null,
    thumb_5: null
  }
];

// Only generate thumbnail if preceding thumbnail exists
// TO DO:  Clean up conditional statements into a more concise function (possibly
// using recursion)
if (thumbnails[0].thumb_1 <= 5) {
  thumbnails[0].thumb_1 = faker.image.imageUrl();
} else if (thumbnails[0].thumb_1 >= 6) {
  thumbnails[0].thumb_1 = null;
}


if (thumbnails[0].thumb_1 !== null) {
  thumbnails[0].thumb_2 = _.random(1, 10);
  if (thumbnails[0].thumb_2 <= 5) {
    thumbnails[0].thumb_2 = faker.image.imageUrl();
  } else if (thumbnails[0].thumb_2 >= 6) {
    thumbnails[0].thumb_2 = null;
  }
} else {
  thumbnails[0].thumb_2 = null;
}

if (thumbnails[0].thumb_2 !== null) {
  thumbnails[0].thumb_3 = _.random(1, 10);
  if (thumbnails[0].thumb_3 <= 5) {
    thumbnails[0].thumb_3 = faker.image.imageUrl();
  } else if (thumbnails.thumb_3 >= 6) {
    thumbnails[0].thumb_3 = null;
  }
} else {
  thumbnails[0].thumb_3 = null;
}


if (thumbnails[0].thumb_3 !== null) {
  thumbnails[0].thumb_4 = _.random(1, 10);
  if (thumbnails[0].thumb_4 <= 5) {
    thumbnails[0].thumb_4 = faker.image.imageUrl();
  } else if (thumbnails[0].thumb_4 >= 6) {
    thumbnails[0].thumb_4 = null;
  }
} else {
  thumbnails[0].thumb_4 = null;
}

if (thumbnails[0].thumb_4 !== null) {
  thumbnails[0].thumb_5 = _.random(1, 10);
  if (thumbnails[0].thumb_5 <= 5) {
    thumbnails[0].thumb_5 = faker.image.imageUrl();
  } else if (thumbnails[0].thumb_5 >= 6) {
    thumbnails[0].thumb_5 = null;
  }
} else {
  thumbnails[0].thumb_5 = null;
}

const writeImages = fs.createWriteStream('images.csv');
writeImages.write('id,name,primary_image,video_embed,description\n', 'utf-8');

function writeTenMillionImages(writer, encoding, callback) {
  let i = 10000000;
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
// see if we should continue, or wait
// don't pass the callback, because we're not done yet.
        ok = writer.write(image, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
// had to stop early!
// write some more once it drains
      writer.once('drain', write);
    }
  }
write()
}

writeTenMillionImages(writeImages, 'utf-8', () => {
  writeImages.end();
});

// const stream = fs.createWriteStream(path.resolve(__dirname, `images.csv`));
// stream.once('open', (fd) => {
//   stream.write('ID, Name, Image, Video, Description\n', 'utf-8'); // <-- you need a new line for each row
//   for (let idx = 0; idx < 10; idx++) {
//     stream.write(`${idx},${faker.commerce.productName()},${faker.image.image()},${_.random(1, 10) <= 5 ? `https://www.youtube.com/watch?v=${faker.random.alphaNumeric(11)}` : null},${faker.company.catchPhrase()}\n`, 'utf-8'); //  <-- dont forget to new line
//   } // MAKE SURE YOUR ID IS UNIQUE, EVEN ACROSS FILES!
//   stream.end();
// });
