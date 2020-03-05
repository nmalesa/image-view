const mariadb = require('mariadb');
const faker = require('faker');
const _ = require('lodash');
const { Benchmark } = require('benchmark');
require('dotenv').config({ path: '../.env' });  // Recommended on MariaDB docs

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  connectionLimit: 5,
  database: 'images'
});

const query = (req, res) => {
  const suite = new Benchmark.Suite();

  const id = req.params.id;

  suite.add('retrieve', () => {
    async function retrieveImage(id) {
      try {
        connection = await pool.getConnection();
        let getRequest = await connection.query('SELECT * FROM products INNER JOIN thumbnails ON products.id = thumbnails.thumb_id WHERE products.id = ?', [id]);
        res.send(getRequest);
      } catch (error) {
        res.send(error);
      } finally {
        if (connection) connection.release();
      }
    };
  });

  suite.on('cycle', event => {
    console.log(String(event.target));
  });

  suite.run({ 'async': true });
};

// const suite = new Benchmark.Suite();
//
// suite.add('retrieve', (req, res) => {
//   let id = req.params.id;
//
//   async function retrieveImage(id) {
//     try {
//       connection = await pool.getConnection();
//       let getRequest = await connection.query('SELECT * FROM products INNER JOIN thumbnails ON products.id = thumbnails.thumb_id WHERE products.id = ?', [id]);
//       // return getRequest;
//       res.send(getRequest);
//     } catch (error) {
//       // throw error;
//       res.send(error);
//     } finally {
//       if (connection) connection.release();
//     }
//   };
// });
//
// suite.on('cycle', event => {
//   console.log(String(event.target));
// });
//
// const query = suite.run();




// async function retrieveImage(id) {
//   try {
//     connection = await pool.getConnection();
//     let getRequest = await connection.query('SELECT * FROM products INNER JOIN thumbnails ON products.id = thumbnails.thumb_id WHERE products.id = ?', [id]);
//     return getRequest;
//   } catch (error) {
//     throw error;
//   } finally {
//     if (connection) connection.release();
//   }
// };


module.exports = { pool, query };
