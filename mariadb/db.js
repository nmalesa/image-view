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

// Attempt to promisify query to better work with Benchmark library
// pool.getConnection()
//   .then(conn => {
//     conn.query(id)
//       .then(() => {
//         return conn.query('SELECT * FROM products INNER JOIN thumbnails ON products.id = thumbnails.thumb_id WHERE products.id = ?', [id]);
//       })
//       .then(res => {
//         conn.release();
//       })
//       .catch(err => {
//         conn.release();
//       })
//   })
//   .catch(err => {
//     //not connected
//   });



// EXAMPLE MARIADB PROMISES
// pool.getConnection()
//     .then(conn => {
//
//       conn.query("SELECT 1 as val")
//         .then(rows => { // rows: [ {val: 1}, meta: ... ]
//           return conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
//         })
//         .then(res => { // res: { affectedRows: 1, insertId: 1, warningStatus: 0 }
//           conn.release(); // release to pool
//         })
//         .catch(err => {
//           conn.release(); // release to pool
//         })
//
//     }).catch(err => {
//       //not connected
//     });

// EXAMPLE MARIADB ASYNC/AWAIT
// async function asyncFunction() {
//   let conn;
//   try {
//
//     conn = await pool.getConnection();
//     const rows = await conn.query("SELECT 1 as val");
//     // rows: [ {val: 1}, meta: ... ]
//
//     const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
//     // res: { affectedRows: 1, insertId: 1, warningStatus: 0 }
//
//   } catch (err) {
//     throw err;
//   } finally {
//     if (conn) conn.release(); //release to pool
//   }
// }

// WORKING ASYNC/AWAIT QUERY
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
