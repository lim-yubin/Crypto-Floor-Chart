const express = require("express");
const cors = require("cors");
const ethRouter = require("./routes/ethRouter");
const klayRouter = require("./routes/klayRouter");
const solaRouter = require("./routes/solaRouter");
const mysql = require("mysql");
const app = express();
const port = 8080;
const corsOptions = {
  origin: ["http://localhost:3000"],
};
app.use(cors({ ...corsOptions, methods: ["GET"] }));
app.listen(port, () => console.log(`${port} is running!`));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "dladbqls67!A",
  database: "floorchart",
});

//환경 세팅

//매일 24시간 주기로 데이터 저장하기

const OpenseaScraper = require("opensea-scraper");
const options = {
  debug: false,
  logs: false,
  sort: true,
  browserInstance: undefined,
};
const type = "24h";
async function getData(chain) {
  try {
    const ranking = await OpenseaScraper.rankings(type, options, chain);
    // console.log(ranking);
    connection.query(`TRUNCATE ${chain}`);
    const query = `INSERT INTO ${chain} (id,name,slug,logo,currentPrice,currency,volume,date,savedPrice) VALUES (?,?,?,?,?,?,?,'','')`;
    if (ranking.length === 100) {
      for (let i = 0; i < ranking.length; i++) {
        let data = ranking[i];
        let id, amount, currency;
        if (String(i).length === 1) {
          id = "0" + i;
        } else id = i;
        if (data.floorPrice === null) {
          amount = "null";
          currency = "null";
        } else {
          amount = data.floorPrice.amount;
          currency = data.floorPrice.currency;
        }
        let values = [
          id,
          data.name,
          data.slug,
          data.logo,
          amount,
          currency,
          data.volume,
        ];
        connection.query(query, values, function (err, rows, fields) {
          if (err) {
            console.log(err);
          }
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
}

// server.js 파일에서  openscraper를 이용하여 각종 체인기반의 NFT를 받아온후, DB에 저장(24시간 주기로) ** 중요 **
const getChainData = async () => {
  connection.connect();
  await getData("ethereum");
  await getData("klaytn");
  await getData("solana");
  connection.end();
};
getChainData();
app.use("/ethereum", ethRouter);
app.use("/klaytn", klayRouter);
app.use("/solana", solaRouter);
