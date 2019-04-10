const mysql = require('mysql');
const dbConfig = require('../../config/db');
const connection = mysql.createConnection(dbConfig);

let query = function(sql, values) {
  connection.connect();

  connection.query(sql ,values, (error, rows) => {
    if (error) {
      throw error;
    } else {
      return rows;
    }
  })

  connection.end();
}

module.exports = { query };
