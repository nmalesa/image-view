const mariadb = require('mariadb');
require('dotenv').config();

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  connectionLimit: 5,
  database: 'images'
});












// MARIADB PROMISE API -- DEFAULT

// const mariadb = require('mariadb');
// require('dotenv').config()
//
// const pool = mariadb.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   connectionLimit: 5
// });

// CRUD OPERATIONS - GET
async function retrieveImage(id) {
  let connection;
  try {
    connection = await pool.getConnection();
    let getRequest = await connection.query(`SELECT * FROM products WHERE id=${id}`);
    console.log(getRequest);
    return getRequest;
  } catch (error) {
    throw error;
  }
};

// CRUD OPERATIONS - POST
async function addImage() {
  let connection;
  try {
    connection = await pool.getConnection();
    let postRequest = await connection.query('INSERT INTO products (name, images, videoEmbed, videoThumb, description) VALUES ("TestName", 3, "TestVideo", "TestVideo2", "This is a test")');
    return postRequest;
  } catch (error) {
    throw error;
  }
};

// CRUD OPERATIONS - PUT
async function modifyImage(id) {
  let connection;
  try {
    connection = await pool.getConnection();
    let putRequest = await connection.query(`UPDATE products SET description="This is a new description" WHERE id=${id}`);
    return putRequest;
  } catch (error) {
    throw error;
  }
};

// CRUD OPERATIONS - DELETE
async function deleteImage(id) {
  let connection;
  try {
    connection = await pool.getConnection();
    let deleteRequest = await connection.query(`DELETE FROM products WHERE id=${id}`);
    console.log('test');
    return deleteRequest;
  } catch (error) {
    throw error;
  }
};


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

module.exports = {pool, retrieveImage, addImage, modifyImage, deleteImage};
