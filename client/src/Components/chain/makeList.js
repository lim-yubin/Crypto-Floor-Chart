import "./makeList.css";

export default function MakeList(data) {
  const name = data.data.name;
  const logo = String(data.data.logo);
  const amount = data.data.amount;

  // let floorPrice = "Floor Price";
  // if (data.data.floorPrice) {
  //   floorPrice = data.data.floorPrice.amount;
  // }
  //   console.log(Object.keys(floorPrice));
  return (
    <>
      <div id="rank-box">
        <div id="rank-logo">
          <img id="nft-logo" src={logo} alt="nft-logo" />
        </div>
        <div id="rank-name"> {name}</div>
        <div id="eth-price">{amount}</div>
        <div id="krw-price">hi</div>
      </div>
    </>
  );
}
