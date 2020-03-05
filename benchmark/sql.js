const Benchmark = require('benchmark');
const suite = new Benchmark.Suite;
require('dotenv').config();

const Sequelize = require('sequelize');
const ProductModel = require('../sql/sequelize/models/product.js');
const ThumbnailModel = require('../sql/sequelize/models/thumbnail.js');

const sequelize = new Sequelize('imageViews', 'root', 'password', {
  host: 'localhost',
  dialect: 'mariadb',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// Promise.all([
//   sequelize.authenticate()
//     .then(() => {
//       console.log('Connection has been established successfully.');
//     })
//     .catch(err => {
//       console.error('Unable to connect to the database:', err);
//     })
// ]).then(() => {
//   const Product = ProductModel(sequelize, Sequelize);
//   const Thumbnail = ThumbnailModel(sequelize, Sequelize);
//
//   Thumbnail.belongsTo(Product);

//   suite.add('Sequelize', () => {
//     Product.findAll({
//       where: {
//         id: 8629947
//       }
//     })
//     .then(data => console.log(data))
//     .catch(err => console.log(err))
//   })
//   .on('cycle', event => {
//     console.log(String(event.target));
//   })
//   .run({ async: true })
// });

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  })

const Product = ProductModel(sequelize, Sequelize);
const Thumbnail = ThumbnailModel(sequelize, Sequelize);

Product.hasMany(Thumbnail);
Thumbnail.belongsTo(Product);

const query = () => {
  Product.findAll({
    where: {
      id: 8629947
    },
    include: [{
      model: Thumbnail,
      required: true
    }]
  })
  .then(data => console.log(data))
  .catch(err => console.log(err))
};

query();
