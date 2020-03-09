const mariadb = require('mariadb');
const { Benchmark } = require('benchmark');
require('dotenv').config({ path: '../.env' });  // Recommended on MariaDB docs

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  connectionLimit: 5,
  database: 'images'
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
