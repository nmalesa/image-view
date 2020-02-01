const Sequelize = require('sequelize');
const ProductModel = require('./models/product.js');
const ThumbnailModel = require('./models/thumbnail.js');
require('dotenv').config();

// Set up database connection(s)
const sequelize = new Sequelize('imageViews', process.env.DB_user, process.env.DB_pass, {
  host: process.env.DB_HOST,
  dialect: 'mariadb',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const Product = ProductModel(sequelize, Sequelize);
const Thumbnail = ThumbnailModel(sequelize, Sequelize);

Thumbnail.belongsTo(Product);

sequelize.sync({ force: true })
  .then(() => {
    console.log('Database and tables created!');
  })
  .catch(() => {
    console.error();
  })

module.exports = { Product, Thumbnail };
