const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const connection = require("../server");
router.get("/", (req, res) => {
  try {
    const connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "dladbqls67!A",
      database: "floorchart",
    });
    connection.connect();
    connection.query("SELECT * FROM ethereum", function (err, rows, fields) {
      if (err) console.log(err);
      //   console.log(rows);
      res.json(rows);
      connection.end();
    });
  } catch (err) {
    console.log(err);
  }

  // res.json();
});

module.exports = router;
