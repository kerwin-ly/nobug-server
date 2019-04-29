// redis config

module.exports = {
  // port: 3000,          // Redis port default 
  host: '127.0.0.1',   // Redis host
  family: 4,           // 4 (IPv4) or 6 (IPv6)
  db: 0,
  maxRetriesPerRequest: null // every command will wait forever until the connection is alive again 
}