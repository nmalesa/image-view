const faker = require('faker');
const _ = require('lodash');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// const csvWriter = createCsvWriter({
//   path: 'test.csv',
//   header: [
//     {id: 'name', title: 'name'},
//     {id: 'primary_image', title: 'primary_image'},
//     {id: 'video_embed', title: 'video_embed'},
//     {id: 'description', title: 'description'}
//   ]
// });

const csvWriter = createCsvWriter({
  path: 'out.csv',
  header: [
    {id: 'name', title: 'Name'},
    {id: 'surname', title: 'Surname'},
    {id: 'age', title: 'Age'},
    {id: 'gender', title: 'Gender'},
  ]
});

const data = [
  {
    name: 'John',
    surname: 'Snow',
    age: 26,
    gender: 'M'
  }, {
    name: 'Clair',
    surname: 'White',
    age: 33,
    gender: 'F',
  }, {
    name: 'Fancy',
    surname: 'Brown',
    age: 78,
    gender: 'F'
  }
];

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

csvWriter.writeRecords(data)
  .then(() => console.log('The CSV file was written succssfully'));
