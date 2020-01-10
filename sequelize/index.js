require('dotenv').config();

const sequelize = new Sequelize('images', process.env.DB_user, process.env.DB_pass, {
  host: process.env.DB_HOST,
  dialect: 'mariadb'

  // To create a pool of connections
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});
