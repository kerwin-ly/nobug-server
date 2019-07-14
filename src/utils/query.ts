const mysql = require('mysql');
import { dbConfig } from '../config';
const pool = mysql.createPool(dbConfig);

export const query = function(sql, values?: any) {
	return new Promise((resolve, reject) => {
		pool.getConnection((error, connection) => {
			if (error) {
				reject(error);
			} else {
				connection.query(sql, values, (error, rows) => {
					if (error) {
						reject(error);
					} else {
						resolve(rows);
					}
					connection.release();
				});
			}
		});
	});
};
