import "./home.css";

export default function Home() {
  return (
    <>
      <div id="home-container">
        <div id="nav-container">
          <div id="icon-container">
            <div id="icon-img">이미지</div>
          </div>
          <div id="chain-container">
            <div className="chain-nav">Ethereum</div>
            <div className="chain-nav">Polygon</div>
            <div className="chain-nav">Klaytn</div>
            <div className="chain-nav">Solana</div>
          </div>
        </div>

        <div id="main">
          <div className="main-section">
            <div className="chain-box">
              <img id="img-eth" src="img/eth.svg" alt="eth-img"></img>
              <div>Ethereum</div>
            </div>
            <div className="chain-box">
              <img id="img-klaytn" src="img/klaytn.svg" alt="klaytn-img"></img>
              <div>Klaytn</div>
            </div>
          </div>
          <div className="main-section">
            <div className="chain-box">
              <img
                id="img-polygon"
                src="img/polygon.svg"
                alt="polygon-img"
              ></img>
              <div>Polygon</div>
            </div>
            <div className="chain-box">
              <img id="img-solana" src="img/solana.svg" alt="solana-img"></img>
              <div>Solana</div>
            </div>
          </div>
        </div>

        <div id="footer"></div>
      </div>
    </>
  );
}
