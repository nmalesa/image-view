const faker = require('faker');
const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const video_id = faker.random.alphaNumeric(11);

const product =
  {
    name: faker.commerce.productName(),
    primary_image: faker.image.imageUrl(),
    video_embed: _.random(1, 10),
    description: faker.company.catchPhrase()
  };

// Not all products include an embedded video
// if (product.video_embed <= 5) {
//   product.video_embed = `https://www.youtube.com/watch?v=${video_id}`;
// } else if (product.video_embed >= 6) {
//   product.video_embed = null;
// };

// let a = `test${conditional ? a : b} more text`;

// let video = `${product.video_embed <= 5 ? `https://www.youtube.com/watch?v=${video_id}` : product.video_embed = null}`;

// console.log(video);

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

// let video = `${product.video_embed <= 5 ? `https://www.youtube.com/watch?v=${video_id}` : product.video_embed = null}`;

const stream = fs.createWriteStream(path.resolve(__dirname, `test.csv`));
stream.once('open', (fd) => {
  stream.write('ID, Name, Image, Video, Description\n'); // <-- you need a new line for each row
  for (let idx = 0; idx < 10; idx++) {
    stream.write(`${idx},${faker.commerce.productName()},${faker.image.image()},${_.random(1, 10) <= 5 ? `https://www.youtube.com/watch?v=${faker.random.alphaNumeric(11)}` : null},${faker.company.catchPhrase()}\n`); //  <-- dont forget to new line
  } // MAKE SURE YOUR ID IS UNIQUE, EVEN ACROSS FILES!
  stream.end();
});
//
//
//
// // const csvWriter = createCsvWriter({
// //   path: 'test.csv',
// //   header: [
// //     {id: 'id', title: 'ID'},
// //     {id: 'name', title: 'Name'},
// //     {id: 'primary_image', title: 'Image'},
// //     {id: 'video_embed', title: 'Video'},
// //     {id: 'description', title: 'Description'},
// //   ]
// // });
//
// // for (let idx = 0; idx < 10; idx++) {
// //   product[0].id = idx;
// //   csvWriter.writeRecords(product);
// // }
// //
// // console.log('The CSV file was written succssfully.');
