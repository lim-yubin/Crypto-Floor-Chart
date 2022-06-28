import "./nav.css";
import { Link } from "react-router-dom";
export default function Nav() {
  return (
    <>
      <div id="nav-container">
        <div id="icon-container">
          <Link to="/" style={{ textDecoration: "none" }}>
            <div id="icon-img">
              <img id="icon-png" src="img/icon.png" alt="icon" />
              <img id="icon-svg" src="img/title.svg" alt="icon"></img>
            </div>
          </Link>
        </div>
        <div id="search-container">{/* <input id="search-box" type="text" /> */}</div>
        <div id="chain-container">
          <Link to="/ethereum" style={{ textDecoration: "none" }}>
            <div className="chain-nav">Ethereum</div>
          </Link>
          <Link to="/klaytn" style={{ textDecoration: "none" }}>
            <div className="chain-nav">Klaytn</div>
          </Link>
          {/* <Link to="/polygon" style={{ textDecoration: "none" }}>
            <div className="chain-nav">Polygon</div>
          </Link> */}
          <Link to="/solana" style={{ textDecoration: "none" }}>
            <div className="chain-nav">Solana</div>
          </Link>
        </div>
      </div>
    </>
  );
}
