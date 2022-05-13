import "./App.css";

import { Route, Routes } from "react-router-dom";
import Home from "./Pages/home/home";
import Nav from "./Components/nav/nav";
function App() {
  return (
    <>
      <Nav />
      <Home />
    </>
  );
}

export default App;
