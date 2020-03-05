const Sequelize = require('sequelize');
const ProductModel = require('./models/product.js');
const ThumbnailModel = require('./models/thumbnail.js');
const { Benchmark } = require('benchmark');
require('dotenv').config();

// Set up database connection(s)
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

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
});

const Product = ProductModel(sequelize, Sequelize);
const Thumbnail = ThumbnailModel(sequelize, Sequelize);


// Establish associations
Product.hasMany(Thumbnail);
Thumbnail.belongsTo(Product);

// Create tables:
// sequelize.sync({ force: true })
//   .then(() => {
//     console.log('Tables created in designated database.');
//   })
//   .catch(() => {
//     console.error();
//   })

// MariaDB dialect:  Retrieve (CRUD):
// 'SELECT * FROM products INNER JOIN thumbnails ON products.id = thumbnails.thumb_id WHERE products.id = ?'
const query = (req, res) => {
  const suite = new Benchmark.Suite();

  // Add test
  suite.add('retrieve', () => {
    Product.findAll({
      where: {
        id: req.params.id
      },
      include: [{
        model: Thumbnail,
        required: true
      }]
    })
    .then(data => res.send(data))
    .catch(err => res.send(err))
  })
  // Add listener
  .on('cycle', event => {
    console.log(String(event.target));
  })
  // Run async
  .run({ async: true });
};

module.exports = { query };
