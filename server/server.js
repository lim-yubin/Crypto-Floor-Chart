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

app.get("/", async (req, res) => {
  const chain = req.query.chain;
  const ranking = await OpenseaScraper.rankings(type, options, chain);
  //   res.send(ranking[0]);
  console.log(ranking[0]);
  // res.send(chain);
});
