import "./ethereum.css";
import axios from "axios";
export default function Ethereum() {
  getEthereumData();
  async function getEthereumData() {
    try {
      await axios
        .get("http://localhost:8080", {
          params: {
            chain: "ethereum",
          },
        })
        .then((res) => console.log(res.data));
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <h1>Ethereum</h1>
    </>
  );
}
