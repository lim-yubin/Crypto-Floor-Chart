const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;
const corsOptions = {
  origin: ["http://localhost:3000"],
};

app.use(cors({ ...corsOptions, methods: ["GET"] }));
app.listen(port, () => console.log(`${port} is running!`));

//eth Data얻기
const OpenseaScraper = require("opensea-scraper");
const options = {
  debug: false,
  logs: false,
  sort: true,
  browserInstance: undefined,
};
const type = "24h";

app.get("/ranking", async (req, res) => {
  const chain = req.query.chain;
  const ranking = await OpenseaScraper.rankings(type, options, chain);
  console.log(ranking.length);
  const data = JSON.stringify(ranking);
  res.send(data);
});

// server.js 파일에서  openscraper를 이용하여 각종 체인기반의 NFT를 받아온후, DB에 저장(24시간 주기로) ** 중요 **
