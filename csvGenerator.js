const faker = require('faker');
const _ = require('lodash');

const video_id = faker.random.alphaNumeric(11);

const product = {
  name: faker.commerce.productName(),
  primary_image: faker.image.imageUrl(),
  video_embed: `https://www.youtube.com/watch?v=${video_id}`,
  description: faker.company.catchPhrase()
};

const thumbnails = {
  thumb_1: _.random(1, 10),
  thumb_2: null,
  thumb_3: null,
  thumb_4: null,
  thumb_5: null
};

// Only generate thumbnail if preceding thumbnail exists
// TO DO:  Clean up conditional statements into a more concise function (possibly
// using recursion)
if (thumbnails.thumb_1 <= 5) {
  thumbnails.thumb_1 = faker.image.imageUrl();
} else if (thumbnails.thumb_1 >= 6) {
  thumbnails.thumb_1 = null;
}

if (thumbnails.thumb_1 !== null) {
  thumbnails.thumb_2 = _.random(1, 10);
  if (thumbnails.thumb_2 <= 5) {
    thumbnails.thumb_2 = faker.image.imageUrl();
  } else if (thumbnails.thumb_2 >= 6) {
    thumbnails.thumb_2 = null;
  }
} else {
  thumbnails.thumb_2 = null;
}

if (thumbnails.thumb_2 !== null) {
  thumbnails.thumb_3 = _.random(1, 10);
  if (thumbnails.thumb_3 <= 5) {
    thumbnails.thumb_3 = faker.image.imageUrl();
  } else if (thumbnails.thumb_3 >= 6) {
    thumbnails.thumb_3 = null;
  }
} else {
  thumbnails.thumb_3 = null;
}

if (thumbnails.thumb_3 !== null) {
  thumbnails.thumb_4 = _.random(1, 10);
  if (thumbnails.thumb_4 <= 5) {
    thumbnails.thumb_4 = faker.image.imageUrl();
  } else if (thumbnails.thumb_4 >= 6) {
    thumbnails.thumb_4 = null;
  }
} else {
  thumbnails.thumb_4 = null;
}

if (thumbnails.thumb_4 !== null) {
  thumbnails.thumb_5 = _.random(1, 10);
  if (thumbnails.thumb_5 <= 5) {
    thumbnails.thumb_5 = faker.image.imageUrl();
  } else if (thumbnails.thumb_5 >= 6) {
    thumbnails.thumb_5 = null;
  }
} else {
  thumbnails.thumb_5 = null;
}

console.log(thumbnails);
