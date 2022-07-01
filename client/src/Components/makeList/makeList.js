import { Link } from "react-router-dom";
import "./makeList.css";

export default function MakeList(data) {
  const name = data.data.name;
  const logo = String(data.data.logo);
  const amount = data.data.currentPrice;
  const chain = data.chain;
  const krw = data.data.krw;
  const slug = data.data.slug;
  return (
    <>
      <Link to={`/graph/${chain}/${slug}`} style={{ color: "inherit", textDecoration: "inherit" }}>
        <div id="rank-box">
          <div id="rank-logo">
            <img id="nft-logo" src={logo} alt="nft-logo" />
          </div>
          <div id="rank-name"> {name}</div>
          <div id="chain-price">{amount}</div>
          <div id="krw-price">{krw}</div>
        </div>
      </Link>
    </>
  );
}
