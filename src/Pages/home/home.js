import "./home.css";
export default function Home() {
  return (
    <>
      <div id="main">
        <div id="text-section">
          <h1>Check Your NFT's Floor Price</h1>
          <h2>NFT 바닥가격과, 그 당시 코인시세를 날짜별로 한눈에 확인하세요.</h2>
        </div>

        <div id="chain-section">
          <div className="chain-box">
            <img id="img-eth" src="img/eth.svg" alt="eth-img"></img>
            <div>Ethereum</div>
          </div>
          <div className="chain-box">
            <img id="img-klaytn" src="img/klaytn.svg" alt="klaytn-img"></img>
            <div>Klaytn</div>
          </div>
          <div className="chain-box">
            <img id="img-polygon" src="img/polygon.svg" alt="polygon-img"></img>
            <div>Polygon</div>
          </div>
          <div className="chain-box">
            <img id="img-solana" src="img/solana.svg" alt="solana-img"></img>
            <div>Solana</div>
          </div>
        </div>
      </div>
    </>
  );
}
