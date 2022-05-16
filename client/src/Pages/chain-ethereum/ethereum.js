import "./ethereum.css";
import axios from "axios";
import { useEffect, useState } from "react";
import MakeList from "../../Components/chain/makeList";
export default function Ethereum() {
  // const ethList = "";
  const [list, setList] = useState([]);

  // getEthereumData();

  async function getEthereumData() {
    try {
      const response = await axios.get("http://localhost:8080", {
        params: {
          chain: "ethereum",
        },
      });

      setList(response.data);
      console.log(response.data[0].name);
      console.log(response.data[1].floorPrice.amount);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getEthereumData();
  }, []);

  return (
    <>
      <div id="eth-list">
        {list.map((el, i) => (
          <MakeList data={el} key={i} />
        ))}
        {/* <MakeList /> */}
      </div>
    </>
  );
}
