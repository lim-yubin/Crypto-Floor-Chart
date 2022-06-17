import "./App.css";

import { Route, Routes } from "react-router-dom";
import Home from "./Pages/home/home";
import Nav from "./Components/nav/nav";
import Ethereum from "./Pages/ethereum";
import Klaytn from "./Pages/klaytn";
import Polygon from "./Pages/polygon";
import Solana from "./Pages/solana";
import Footer from "./Components/footer/footer";
import Graph from "./Pages/graph/graph";

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
        <Route path="/graph/:chain/:name" element={<Graph />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
