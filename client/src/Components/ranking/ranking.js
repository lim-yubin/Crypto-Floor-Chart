import "./ranking.css";
import axios from "axios";
import { useEffect, useState } from "react";
import MakeList from "../makeList/makeList";
export default function Ranking(chain) {
  const [list, setList] = useState([]);

  const capital = chain.chain.slice(0, 1).toUpperCase() + chain.chain.slice(1);
  async function getEthereumData() {
    try {
      const response = await axios.get(`http://localhost:8080/${chain.chain}`);
      setList(response.data);
      console.log("data변경");
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getEthereumData();
  }, []);

  return (
    <>
      <div className="title-container">
        <div className="ranking-title">{capital} Collections</div>
        <div className="sub-title">{capital} 기반 NFT프로젝트입니다. 24시간 기준, 거래량이 높은 순으로 확인할 수 있습니다. </div>
      </div>
      <div className="chain-list">
        <div className="list-hd">
          <div className="collection-list">Collection</div>
          <div className="chain-price-list">Floor Price</div>
          <div className="chain-krw-list">KRW</div>
        </div>
        {list.map((el, i) => (
          <MakeList data={el} chain={chain.chain} key={i} />
        ))}
      </div>
    </>
  );
}
