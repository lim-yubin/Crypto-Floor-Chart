import "./chart.css";
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js";
import { useState, useEffect } from "react";
import axios from "axios";
import zoomPlugin from "chartjs-plugin-zoom";
Chart.register(zoomPlugin);

export default function LineChart(chain, name) {
  const [labelArray, setLabelArray] = useState([]);
  const [dataArray, setDataArray] = useState([]);

  async function getChainPrice() {
    try {
      const response = await axios.get(`https://api.bithumb.com/public/candlestick/${chain.chain}_KRW/24h`);
      let data = response.data.data;
      let label = [],
        dArr = [];
      for (let i = 0; i < data.length; i++) {
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
    console.log(dataArray);
  }, []);

  const data = {
    labels: labelArray,
    datasets: [
      {
        type: "line",
        label: `${chain.chain}/KRW`,
        borderColor: "rgb(163, 68, 235)",
        borderWidth: 1,
        data: dataArray,
      },
    ],
  };

  const options = {
    plugins: {
      zoom: {
        limits: {
          // x: { min: 0.5, max: 2e3 },
          y: { min: Math.min(...dataArray), max: Math.floor((Math.max(...dataArray) + Math.max(...dataArray) / 5) / 100) * 100 },
        },
        pan: {
          enabled: true,
          mode: "xy",
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: "xy",
        },
      },
    },
  };
  return (
    <>
      <div id="line-container">
        <Line type="line" options={options} data={data} width={400} />
      </div>
    </>
  );
}
