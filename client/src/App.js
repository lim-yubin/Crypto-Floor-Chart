import "./App.css";

import { Route, Routes } from "react-router-dom";
import Home from "./Pages/home/home";
import Nav from "./Components/nav/nav";
import Ethereum from "./Pages/chain-ethereum/ethereum";
import Klaytn from "./Pages/chain-klaytn/klaytn";
import Polygon from "./Pages/chain-polygon/polygon";
import Solana from "./Pages/chain-solana/solana";
import Footer from "./Components/footer/footer";
function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/ethereum" element={<Ethereum />} />
        <Route path="/klaytn" element={<Klaytn />} />
        <Route path="/polygon" element={<Polygon />} />
        <Route path="/solana" element={<Solana />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
