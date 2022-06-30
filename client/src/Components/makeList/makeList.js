import { Link } from "react-router-dom";
import "./makeList.css";

export default function MakeList(data) {
  const name = data.data.name;
  const logo = String(data.data.logo);
  const amount = data.data.price;
  const chain = data.chain;

  return (
    <>
      <Link to={`/graph/${chain}/${name}`} style={{ color: "inherit", textDecoration: "inherit" }}>
        <div id="rank-box">
          <div id="rank-logo">
            <img id="nft-logo" src={logo} alt="nft-logo" />
          </div>
          <div id="rank-name"> {name}</div>
          <div id="chain-price">{amount}</div>
          <div id="krw-price">hi</div>
        </div>
      </Link>
    </>
  );
}
