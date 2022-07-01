import "./graph.css";
import LineChart from "../../Components/chart/chart";
import Chart from "chart.js/auto";

import { useParams } from "react-router-dom";

export default function Graph() {
  const { chain, name } = useParams();

  console.log(name);
  function setCoinFunction() {
    let coin;
    if (chain === "ethereum") {
      coin = "ETH";
    }
    if (chain === "klaytn") {
      coin = "KLAY";
    }
    if (chain === "polygon") {
      coin = "MATIC";
    }
    if (chain === "solana") {
      coin = "SOL";
    }
    return coin;
  }

  return (
    <>
      <div id="graph-container">
        <div id="project-title-section">
          <div id="project-chain">
            <div id="chain-icon">{chain}</div>
          </div>
          <div id="project-name">{name}</div>
        </div>
        <div id="project-graph-section">
          <div id="project-graph">
            그래프
            <LineChart chain={setCoinFunction()} name={name} />
          </div>
          <div id="project-price">가격</div>
        </div>
      </div>
    </>
  );
}
