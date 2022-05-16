import "./makeList.css";

export default function MakeList(data) {
  const name = data.data.name;
  const logo = String(data.data.logo);
  let floorPrice = "Floor Price";
  if (data.data.floorPrice) {
    floorPrice = data.data.floorPrice.amount;
  }
  //   console.log(Object.keys(floorPrice));
  return (
    <>
      <div id="rank-box">
        <div id="rank-logo">
          <img id="nft-logo" src={logo} alt="nft-logo" />
        </div>
        <div id="rank-name"> {name}</div>
        <div id="rank-price">{floorPrice}</div>
      </div>
    </>
  );
}
// export default function MakeList() {
//   return (
//     <>
//       <div id="rank-box">
//         <img id="rank-logo" src={""} alt="nft-logo" />
//         <div id="rank-name"> 유빈</div>
//         <div id="rank-price">1조</div>
//       </div>
//     </>
//   );
// }
