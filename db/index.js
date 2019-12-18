// MARIADB CALLBACK API
const mariadb = require('mariadb/callback');
require('dotenv').config();

const connection = mariadb.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'images'
});

// CRUD Operations - GET
const retrieveImage = (id, callback) => {
  connection.query('SELECT * FROM products WHERE id=?', [id], (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
};

// CRUD Operations - POST
const addImage = callback => {
  connection.query('INSERT INTO products (name, images, videoEmbed, videoThumb, description) VALUES ("TestName", 3, "TestVideo", "TestVideo2", "This is a test")', (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
};

// CRUD Operations - PUT
const modifyImage = (id, callback) => {
  connection.query('UPDATE products SET description="This is a new description" WHERE id=?', [id], (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
};

// CRUD Operations - DELETE
const deleteImage = (id, callback) => {
  connection.query('DELETE FROM products WHERE id=?', [id], (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports = {connection, retrieveImage, addImage, modifyImage, deleteImage};


// const test = callback => {
//   connection.query("SELECT 1 + 1 AS solution", (error, results) => {
//     if (error) {
//       callback(error, null);
//     } else {
//       console.log('The solution is: ', results[0].solution);
//     }
//   });
// };



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

// MARK'S MYSQL CODE

// const mysqlConfig = require('./config.js');
//
// var connection = mysql.createConnection(mysqlConfig);
//
// // Create functions
// getImage = function(id, callback) {
//     connection.query(`SELECT * FROM Products WHERE id = ${id}`, (err, result) => {
//         if (err) {
//             callback(err, null);
//         } else {
//             callback(null, result);
//         }
//     })
// }
//
// // module.export functions
//
// module.exports.getImage = getImage;
