const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const config = require("../config/config.json");
let pool = mysql.createPool(config);
// const connection = require("../server");
router.get("/", (req, res) => {
  try {
    pool.query(
      "SELECT * FROM solana WHERE volume>0 ORDER BY volume DESC",
      function (err, rows, fields) {
        if (err) console.log(err);
        res.json(rows);
      }
    );
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
