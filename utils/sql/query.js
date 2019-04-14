const mysql = require('mysql');
const dbConfig = require('../../config/db');
const pool = mysql.createPool(dbConfig);

let query = function(sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection((error, connection) => {
      if (error) {
        reject(error);
      } else {
        connection.query(sql ,values, (error, rows) => {
          if (error) {
            reject(error);
          } else {
            resolve(rows);
          }
          connection.release();
        })
      }
    })
  })
}

module.exports = { query };
