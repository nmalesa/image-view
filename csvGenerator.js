const faker = require('faker');
const _ = require('lodash');
const fs = require('fs');
const path = require('path');

// Only generate thumbnail if preceding thumbnail exists



// const getFirstThumb = () => {
//   let thumb = _.random(1, 10);
//
//   if (thumb <= 5) {
//     return faker.image.image();
//   }
//   return null;
// };
//
// const getSecondThumb = previousThumbFunc => {
//   let secondThumb;
//
//   if (previousThumbFunc() !== null) {
//     secondThumb = _.random(1, 10);
//     if (secondThumb <= 5) {
//       return faker.image.image();
//     } else {
//       return null;
//     }
//   }
//   return null;
// };
//
// const getThirdThumb = previousThumbFunc => {
//   let thirdThumb;
//
//   if (previousThumbFunc() !== null) {
//     thirdThumb = _.random(1, 10);
//     if (thirdThumb <= 5) {
//       return faker.image.image();
//     } else {
//       return null;
//     }
//   }
//   return null;
// };
//
// const getFourthThumb = previousThumbFunc => {
//   let fourthThumb;
//
//   if (previousThumbFunc() !== null) {
//     fourthThumb = _.random(1, 10);
//     if (fourthThumb <= 5) {
//       return faker.image.image();
//     } else {
//       return null;
//     }
//   }
//   return null;
// };
//
// const getFifthThumb = previousThumbFunc => {
//   let fifthThumb;
//
//   if (previousThumbFunc() !== null) {
//     fifthThumb = _.random(1, 10);
//     if (fifthThumb <= 5) {
//       return faker.image.image();
//     } else {
//       return null;
//     }
//   }
//   return null;
// };
//
// console.log(getFirstThumb());
//
// console.log(getSecondThumb(getFirstThumb));
//
// console.log(getThirdThumb(getSecondThumb));

// console.log(getThirdThumb(getSecondThumb));
//
// console.log(getFourthThumb(getThirdThumb));
//
// console.log(getFifthThumb(getFifthThumb));

// const firstThumb = _.random(1, 10) <= 5 ? faker.image.image() : null;
//
// const secondThumb = firstThumb !== null ? (_.random(1, 10) <= 5 ? faker.image.image() : null) : null;
//
// const thirdThumb = secondThumb !== null ? (_.random(1, 10) <= 5 ? faker.image.image() : null) : null;
//
// const fourthThumb = thirdThumb !== null ? (_.random(1, 10) <= 5 ? faker.image.image() : null) : null;
//
// const fifthThumb = fourthThumb !== null ? (_.random(1, 10) <= 5 ? faker.image.image() : null) : null;

const firstThumb = () => {
  return _.random(1, 10) <= 5 ? faker.image.image() : null;
};

const secondThumb = firstThumb => {
  return firstThumb !== null ? (_.random(1, 10) <= 5 ? faker.image.image() : null) : null;
};

const thirdThumb = secondThumb => {
  return secondThumb !== null ? (_.random(1, 10) <= 5 ? faker.image.image() : null) : null;
};

const fourthThumb = thirdThumb => {
  return thirdThumb !== null ? (_.random(1, 10) <= 5 ? faker.image.image() : null) : null;
};

const fifthThumb = fourthThumb => {
  return fourthThumb !== null ? (_.random(1, 10) <= 5 ? faker.image.image() : null) : null;
};

console.log(firstThumb());

console.log(secondThumb(firstThumb()));

console.log(thirdThumb(secondThumb()));

console.log(fourthThumb(thirdThumb()));

console.log(fifthThumb(fourthThumb()));


// Writing a large amount of data to a csv file using Node's drain event

// SEED PRODUCTS TABLE
// const writeImages = fs.createWriteStream('images.csv');
// writeImages.write('id,name,primary_image,video_embed,description\n', 'utf-8');
//
// function writeOneMillionImages(writer, encoding, callback) {
//   let i = 1000000;
//   let id = 0;
//   function write() {
//     let ok = true;
//     do {
//       i -= 1;
//       id += 1;
//       const name = faker.commerce.productName();
//       const primary_image = faker.image.image();
//       const video_embed = _.random(1, 10) <= 5 ? `https://www.youtube.com/watch?v=${faker.random.alphaNumeric(11)}` : null;
//       const description = faker.company.catchPhrase();
//       const image = `${id},${name},${primary_image},${video_embed},${description}\n`;
//       if (i === 0) {
//         writer.write(image, encoding, callback);
//       } else {
// // see if we should continue, or wait
// // don't pass the callback, because we're not done yet.
//         ok = writer.write(image, encoding);
//       }
//     } while (i > 0 && ok);
//     if (i > 0) {
// // had to stop early!
// // write some more once it drains
//       writer.once('drain', write);
//     }
//   };
// write();
// };
//
// writeOneMillionImages(writeImages, 'utf-8', () => {
//   writeImages.end();
// });
//
// // SEED THUMBNAILS TABLE
// const writeThumbnails = fs.createWriteStream('test.csv');
// writeThumbnails.write('thumb_id,thumb_1,thumb_2,thumb_3,thumb_4,thumb_5\n', 'utf-8');
//
// function writeOneMillionThumbnails(writer, encoding, callback) {
//   let i = 10;
//   let thumb_id = 0;
//   function write() {
//     let ok = true;
//     do {
//       i -= 1;
//       thumb_id += 1;
//       const thumb_1 = firstThumb;
//       const thumb_2 = secondThumb;
//       const thumb_3 = thirdThumb;
//       const thumb_4 = fourthThumb;
//       const thumb_5 = fifthThumb;
//       const thumbnail = `${thumb_id},${thumb_1},${thumb_2},${thumb_3},${thumb_4},${thumb_5}\n`;
//       if (i === 0) {
//         writer.write(thumbnail, encoding, callback);
//       } else {
// // see if we should continue, or wait
// // don't pass the callback, because we're not done yet.
//         ok = writer.write(thumbnail, encoding);
//       }
//     } while (i > 0 && ok);
//     if (i > 0) {
// // had to stop early!
// // write some more once it drains
//       writer.once('drain', write);
//     }
//   };
// write();
// };
//
// writeOneMillionThumbnails(writeThumbnails, 'utf-8', () => {
//   writeThumbnails.end();
// });
