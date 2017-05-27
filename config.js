/**
 * Created by Mariana on 25.05.2017.
 */
var path = require('path');


module.exports = {
  // address of mongodb
  db: process.env.MONGOURI || 'mongodb://localhost:27017/expressApp',
  // user: process.env.DB_USER,
  // pass: process.env.DB_PASS,
  // environment
  env: process.env.NODE_ENV || 'development',
  // port on which to listen
  port: process.env.PORT || 3000,
  // path to root directory of this app
  root: path.normalize(__dirname)
};