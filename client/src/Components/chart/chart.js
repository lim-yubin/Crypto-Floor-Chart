import "./chart.css";
import { Line } from "react-chartjs-2";
import { Chart, PolarAreaController } from "chart.js";
import { useState, useEffect } from "react";
import axios from "axios";
import zoomPlugin from "chartjs-plugin-zoom";
Chart.register(zoomPlugin);

export default function LineChart(chain) {
  const [labelArray, setLabelArray] = useState([]);
  const [dataArray, setDataArray] = useState([]);
  const [combinedData, setCombinedData] = useState({
    dates: "",
    pf: "",
    cf: "",
    combined: "",
    index: "",
  });

  const nftName = chain.name;
  const chainName = chain.chain;
  let combiIndex = -1;
  async function getChainPrice() {
    try {
      const response = await axios.get(`https://api.bithumb.com/public/candlestick/${chainName}_KRW/24h`);
      let data = response.data.data;
      let label = [];
      let dArr = [];
      for (let i = 0; i < data.length; i++) {
        let el = new Date(data[i][0]).toLocaleDateString().replace(/ /g, "").slice(0, -1);
        if (el.length === 8) {
          el = el.slice(0, 5) + "0" + el.slice(5, 7) + "0" + el.slice(7);
        }
        if (el.length === 9) {
          if (el[6] !== ".") {
            el = el.slice(0, 8) + "0" + el.slice(8);
          }
          if (el[6] === ".") {
            el = el.slice(0, 5) + "0" + el.slice(5);
          }
        }
        label.push(el);
        dArr.push(data[i][2]);
      }
      // 빗썸 데이터

      const nft = await axios.get(`http://localhost:8080/getnft`, { params: { nftName, chainName } });
      const nftDates = nft.data[0].dates.split(",").map((el) => el.slice(0, 10).replace(/-/g, "."));
      const nftPrice = nft.data[0].savedPrice.split(",");
      const combinedPrice = [];
      let index = label.indexOf(nftDates[0]);
      //DB 조회 데이터

      dArr = dArr.slice(index);

      for (let i = 0; i < nftDates.length; i++) {
        combinedPrice.push(Math.floor(Number(dArr[i]) * Number(nftPrice[i])));
      }
      // Combined!

      // setLabelArray(nftDates);
      // setDataArray(combinedPrice);
      setCombinedData({ ...combinedData, dates: nftDates, combined: combinedPrice, pf: nftPrice, cf: dArr });
      //set Data

      console.log("render");
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getChainPrice();
  }, []);

  const data = {
    labels: combinedData.dates,
    datasets: [
      {
        type: "line",
        label: `${chain.chain}/KRW`,
        borderColor: "rgb(163, 68, 235)",
        borderWidth: 2,
        data: combinedData.combined,
      },
    ],
  };

  const options = {
    // onHover: (event, chartElement) => {
    //   console.log(event);
    // event.target.style.cursor = chartElement[0] ? "pointer" : "default";
    //   if (chartElement[0]) {
    //     document.getElementById("line-container").style.cursor = "pointer";
    //   }

    onClick: (e, el) => {
      // console.log(combinedData);
      if (el[0]) {
        setCombinedData({ ...combinedData, index: el[0].index });
      } else {
        return;
      }
    },
    radius: 3,
    plugins: {
      zoom: {
        limits: {
          x: { min: 0.5, max: 2e3 },
          y: { min: Math.min(...combinedData.combined), max: Math.floor((Math.max(...combinedData.combined) + Math.max(...combinedData.combined) / 5) / 100) * 100 },
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
      legend: {
        display: true,
      },
    },
  };
  return (
    <>
      <div id="chart-container">
        <div id="line-container">
          <Line type="line" options={options} data={data} />
        </div>
        <div id="project-price">
          <div id="selected-date">날짜: {combinedData.dates[combinedData.index]}</div>
          <div id="selected-pf">바닥가: {combinedData.pf[combinedData.index]}</div>
          <div id="selected-cf">
            1{chainName}: {combinedData.cf[combinedData.index]}
          </div>
          <div id="selected-result">한화: {combinedData.combined[combinedData.index]}</div>
        </div>
      </div>
    </>
  );
}
