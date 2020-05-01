const mariadb = require('mariadb');
const { Benchmark } = require('benchmark');
require('dotenv').config({ path: '../.env' });  // Recommended on MariaDB docs

// SSH TUNNELING
// const pool = mariadb.createPool({
//   host: '127.0.0.1',
//   user: 'root',
//   password: 'password',
//   connectionLimit: 5,
//   database: 'images',
//   port: 3306
// });

const pool = mariadb.createPool({
  host: 'ecommerce-sdc.cdtoyfvfv5qc.us-east-1.rds.amazonaws.com',
  port: 3306,
  user: 'admin',
  password: 'melaniecat',
  connectionLimit: 5,
  database: 'products'
});

async function retrieveImage(id) {
  try {
    connection = await pool.getConnection();
    let getRequest = await connection.query('SELECT * FROM products INNER JOIN thumbnails ON products.id = thumbnails.thumb_id WHERE products.id = ?', [id]);
    return getRequest;
  } catch (error) {
    throw error;
  } finally {
    if (connection) connection.release();
  }
};


module.exports = { pool, retrieveImage };
