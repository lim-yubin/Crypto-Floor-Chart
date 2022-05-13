import "./nav.css";
export default function Nav() {
  return (
    <>
      <div id="nav-container">
        <div id="icon-container">
          <div id="icon-img">
            <img id="icon-png" src="img/icon.png" alt="icon" />
            <img id="icon-svg" src="img/title.svg" alt="icon"></img>
          </div>
        </div>
        <div id="chain-container">
          <div className="chain-nav">Ethereum</div>
          <div className="chain-nav">Klaytn</div>
          <div className="chain-nav">Polygon</div>
          <div className="chain-nav">Solana</div>
        </div>
      </div>
    </>
  );
}
