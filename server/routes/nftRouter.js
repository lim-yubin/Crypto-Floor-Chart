const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const config = require("../config/config.json");
let pool = mysql.createPool(config);
// const connection = require("../server");
router.get("/", (req, res) => {
  try {
    const slug = req.query.nftName;
    let chain;
    if (req.query.chainName === "ETH") {
      chain = "ethereum";
    }
    if (req.query.chainName === "KLAY") {
      chain = "kalytn";
    }
    if (req.query.chainName === "SOL") {
      chain = "solana";
    }

    console.log(slug);
    console.log(chain);
    const query = `SELECT dates, savedPrice FROM ${chain} WHERE slug="${slug}"; `;
    pool.query(query, function (err, rows, fields) {
      if (err) {
        console.log(err);
      }
      if (rows) {
        res.json(rows);
      }
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
