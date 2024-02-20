const mysql = require("mysql2");
const express = require("express");
const tableRouter = express.Router();

const connection = mysql.createPool({
  user: "biruk1",
  password: "1616",
  database: "evangadi_db",
  host: "localhost",
  connectionLimit: 10,
});

// connection.execute("select 'test' ", (err, res) => {
//   if (err) {
//     console.log(err.message);
//   } else {
//     console.log(res);
//   }
// });

// connection.getConnection((err) => {
//   if (err) console.log(err.message);
//   else console.log("database connected");
// });

module.exports = connection.promise();

////// for table creation
// module.exports = connection;
