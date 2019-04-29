const dbConfig = require('./db');
const redisConfig = require('./redis');

module.exports = {
  db: dbConfig,
  redis: redisConfig
}