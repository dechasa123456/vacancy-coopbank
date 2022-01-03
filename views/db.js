const Pool    = require('pg').Pool;
require('dotenv').config();
const pool = new Pool({
    user: process.env.USER_DB,
    host: process.env.HOST_DB,
    database: process.env.DATABASE_DB,
    password: process.env.PASSWORD_DB,
    port: process.env.PORT_DB,
});
pool.connect(function(err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
});
module.exports = pool;