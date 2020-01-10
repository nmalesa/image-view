const Sequelize = require('sequelize');
require('dotenv').config();

// Passing parameters separately.  May also pass a connection URI.
const sequelize = new Sequelize('images', process.env.DB_user, process.env.DB_pass, {
  host: process.env.DB_HOST,
  dialect: 'mariadb'

  // To create a pool of connections
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// Testing the connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(() => {
    console.error('Unable to connect to the database:', err);
  });
