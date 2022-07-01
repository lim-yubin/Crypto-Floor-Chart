const express = require("express");
const cors = require("cors");
const axios = require("axios");
const ethRouter = require("./routes/ethRouter");
const klayRouter = require("./routes/klayRouter");
const solaRouter = require("./routes/solaRouter");
const mysql = require("mysql");
const config = require("./config/config.json");
let pool = mysql.createPool(config);
// const getConnection = require("./config/db");
const app = express();
const port = 8080;
const corsOptions = {
  origin: ["http://localhost:3000"],
};
const OpenseaScraper = require("opensea-scraper");
const options = {
  debug: false,
  logs: false,
  sort: true,
  browserInstance: undefined,
};
const type = "24h";
app.use(cors({ ...corsOptions, methods: ["GET"] }));
app.listen(port, () => console.log(`${port} is running!`));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "dladbqls67!A",
  database: "floorchart",
});

async function getData(chain) {
  let coin;
  if (chain === "ethereum") {
    coin = "ETH";
  }
  if (chain === "klaytn") {
    coin = "KLAY";
  }
  if (chain === "solana") {
    coin = "SOL";
  }
  try {
    const krw = await axios.get(
      `https://api.bithumb.com/public/ticker/${coin}_KRW`
    );
    const ranking = await OpenseaScraper.rankings(type, options, chain);
    //  const nftResponse = await axios.get(`https://api-bff.nftpricefloor.com/nft/${nftName}/chart/pricefloor?interval=all`);
    // console.log(ranking);
    // connection.query(`TRUNCATE ${chain}`);

    const newQry = `INSERT INTO ${chain} (name,slug,logo,currentPrice,currency,krw,volume,date,savedPrice) VALUES (?,?,?,?,?,?,?,'','');`;
    const updateQry = `UPDATE ${chain} SET currentPrice=?, krw=?, volume=? WHERE slug=?;`;
    // const makeVolumeZeroQry = ;
    // const selectQry = ;
    if (ranking.length === 100) {
      for (let i = 0; i < ranking.length; i++) {
        let data = ranking[i],
          amount,
          currency,
          krwPrice;

        if (data.floorPrice === null) {
          amount = "---";
          currency = "---";
          krwPrice = "---";
        } else {
          amount = data.floorPrice.amount;
          currency = data.floorPrice.currency;
          krwPrice = `${Math.floor(
            data.floorPrice.amount * krw.data.data.closing_price
          ).toLocaleString("ko-KR")} ₩`;
        }
        let values = [
          data.name,
          data.slug,
          data.logo,
          amount,
          currency,
          krwPrice,
          data.volume,
        ];
        pool.query(
          `UPDATE ${chain} SET volume=0 WHERE NOT slug="${data.slug}";`,
          function (err, rows) {
            if (err) {
              console.log(err);
            }
          }
        );
        pool.query(
          `SELECT * FROM ${chain} WHERE slug="${data.slug}"`,
          function (err, rows) {
            if (err) {
              console.log(err);
            }
            if (rows.length !== 0) {
              console.log(rows);
              pool.query(
                updateQry,
                [amount, krwPrice, data.volume, data.slug],
                function (err, result) {
                  if (err) {
                    console.log(err);
                  }
                  console.log("바뀐거", result);
                }
              );
            } else if (rows.length === 0) {
              pool.query(newQry, values, function (err, rows) {
                if (err) {
                  console.log(err);
                }
              });
            }
          }
        );
      }
    }
  } catch (err) {
    console.log(err);
  }
}

// server.js 파일에서  openscraper를 이용하여 각종 체인기반의 NFT를 받아온후, DB에 저장(24시간 주기로) ** 중요 **
const getChainData = async () => {
  await getData("ethereum");
  await getData("klaytn");
  await getData("solana");
};

getChainData();
app.use("/ethereum", ethRouter);
app.use("/klaytn", klayRouter);
app.use("/solana", solaRouter);
