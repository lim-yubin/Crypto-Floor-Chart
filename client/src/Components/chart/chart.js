import { Line } from "react-chartjs-2";
import { useState, useEffect } from "react";
import axios from "axios";
// import Chart from "chart.js/auto";
export default function LineChart(chain, name) {
  console.log(chain);

  let labelArray = [];
  let dataArray = [];
  async function getChainPrice() {
    try {
      const response = await axios.get(`https://api.bithumb.com/public/candlestick/${chain.chain}_KRW/24h`);
      let data = response.data.data;
      for (let i = 0; i < data.length; i++) {
        // labelArray.push(new Date(data[i][0]).toLocaleDateString().slice(6).replace(" ", "").replace(".", "/"));
        labelArray.push(new Date(data[i][0]).toLocaleDateString().replace(/ /g, "").slice(0, -1));
        dataArray.push(data[i][2]);
      }
    } catch (err) {
      console.log(err);
    }
  }
  getChainPrice();

  const data = {
    // labels: ["January", "February", "March", "April", "May", "June", "July"],
    labels: labelArray,
    datasets: [
      {
        type: "line",
        label: `${chain.chain}/KRW`,
        borderColor: "rgb(54, 162, 235)",
        borderWidth: 1,
        data: dataArray,
      },
    ],
  };
  return (
    <>
      <Line type="line" data={data} />
    </>
  );
}
