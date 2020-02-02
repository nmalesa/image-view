const mariadb = require('mariadb');
const faker = require('faker');
const _ = require('lodash');
require('dotenv').config();  // Recommended on MariaDB docs

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  connectionLimit: 5,
  database: 'images'
});

// CRUD OPERATIONS - GET
async function retrieveImage(id) {
  let connection;
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

// CRUD OPERATIONS - POST
// async function addImage(name, primary_image, video_embed, description) {
//   let connection;
//   try {
//     connection = await pool.getConnection();
//     let postImageRequest = await connection.query(`INSERT INTO products (name, primary_image, video_embed, description) VALUES (?, ?, ?, ?)`, [name, primary_image, video_embed, description]);
//     return postImageRequest;
//   } catch (error) {
//     throw error;
//   } finally {
//     if (connection) connection.release();
//   }
// };

// async function addThumbnails(product_id, thumb_1, thumb_2, thumb_3, thumb_4, thumb_5) {
//   let connection;
//   console.log(product_id);
//   try {
//     connection = await pool.getConnection();
//     let postThumbRequest = await connection.query('INSERT INTO thumbnails (product_id, thumb_1, thumb_2, thumb_3, thumb_4, thumb_5) VALUES (?, ?, ?, ?, ?, ?)', [product_id, thumb_1, thumb_2, thumb_3, thumb_4, thumb_5]);
//     return postThumbRequest;
//   } catch (error) {
//     throw error;
//   } finally {
//     if (connection) connection.release();
//   }
// };

// CRUD OPERATIONS - PUT
// async function modifyImage(id) {
//   let connection;
//   try {
//     connection = await pool.getConnection();
//     let putRequest = await connection.query(`UPDATE products SET description="This is a new description" WHERE id=${id}`);
//     return putRequest;
//   } catch (error) {
//     throw error;
//   } finally {
//     if (connection) connection.release();
//   }
// };

// CRUD OPERATIONS - DELETE
// async function deleteImage(id) {
//   let connection;
//   try {
//     connection = await pool.getConnection();
//     let deleteRequest = await connection.query(`DELETE FROM products WHERE id=${id}`);
//     console.log('test');
//     return deleteRequest;
//   } catch (error) {
//     throw error;
//   } finally {
//     if (connection) connection.release();
//   }
// };

// EXAMPLE SET-UP FOR MARIADB NODE.JS DRIVER
// async function asyncFunction() {
//   let conn;
//   try {
//       conn = await pool.getConnection();
//       const rows = await conn.query("SELECT 1 as val");
//       console.log(rows); // rows: [ { val: 1}, meta: ... ]
//
//       const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
//       console.log(res); // res: { affectedRows: 1, insertId: 1, warningStatus: 0 }
//   } catch (err) {
//       throw err;
//   } finally {
//     // if (conn) conn.release(); // release to pool
//       if (conn) return conn.end();
//   }
// }

module.exports = { pool, retrieveImage };
