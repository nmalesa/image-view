const mariadb = require('mariadb');
require('dotenv').config()

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  connectionLimit: 5
});

async function asyncFunction() {
  let conn;
  try {
      conn = await pool.getConnection();
      const rows = await conn.query("SELECT 1 as val");
      console.log(rows); // rows: [ { val: 1}, meta: ... ]

      const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
      console.log(res); // res: { affectedRows: 1, insertId: 1, warningStatus: 0 }
  } catch (err) {
      throw err;
  } finally {
    // if (conn) conn.release(); // release to pool
      if (conn) return conn.end();
  }
}

module.exports = {pool, asyncFunction};

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
