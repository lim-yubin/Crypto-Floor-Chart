// const dotenv = require("dotenv");
// dotenv.config();

// const config = {
//   development: {
//     username: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME,
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     dialect: "mysql",
//   },
//   test: {
//     username: "root",
//     database: "database_test",
//     password: null,
//     host: "127.0.0.1",
//     dialect: "mysql",
//   },
// };

// module.exports = config;

const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "test",
  password: "1111",
  database: "floorchart",
});

module.exports = db;
