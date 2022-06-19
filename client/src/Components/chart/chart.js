import { Line } from "react-chartjs-2";
import { useState, useEffect } from "react";
import axios from "axios";
// import Chart from "chart.js/auto";
export default function LineChart(chain, name) {
  const [labelArray, setLabelArray] = useState([]);
  const [dataArray, setDataArray] = useState([]);
  console.log(chain);

  async function getChainPrice() {
    try {
      const response = await axios.get(`https://api.bithumb.com/public/candlestick/${chain.chain}_KRW/24h`);
      let data = response.data.data;
      let label = [],
        dArr = [];
      for (let i = 0; i < data.length; i++) {
        // labelArray.push(new Date(data[i][0]).toLocaleDateString().slice(6).replace(" ", "").replace(".", "/"));
        label.push(new Date(data[i][0]).toLocaleDateString().replace(/ /g, "").slice(0, -1));
        dArr.push(data[i][2]);
      }
      setLabelArray(label);
      setDataArray(dArr);
      console.log("render");
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getChainPrice();
  }, []);
  const data = {
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
      <Line type="line" data={data} width={500} />
    </>
  );
}
