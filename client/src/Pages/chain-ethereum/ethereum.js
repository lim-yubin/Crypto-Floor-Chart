import "./ethereum.css";
import axios from "axios";
import { useEffect, useState } from "react";
import MakeList from "../../Components/chain/makeList";
export default function Ethereum() {
  const [list, setList] = useState([]);

  async function getEthereumData() {
    try {
      const response = await axios.get("http://localhost:8080/ranking", {
        //서버에서 바로 받지 말고, DB조회로 경로 수정
        params: {
          chain: "ethereum",
        },
      });
      setList(response.data);
      console.log(response.data);
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
        <div className="ranking-title">Ethereum Collections</div>
        <div className="sub-title">Ethereum기반 NFT프로젝트입니다. 24시간 기준, 거래량이 높은 순으로 확인할 수 있습니다. </div>
      </div>
      <div className="eth-list">
        <div className="list-hd">
          <div className="collection-list">Collection</div>
          <div className="eth-price-list">Floor Price</div>
          <div className="eth-krw-list">KRW</div>
        </div>
        {list.map((el, i) => (
          <MakeList data={el} key={i} />
        ))}
      </div>
    </>
  );
}
