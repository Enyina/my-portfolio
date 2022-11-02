import "./App.scss";
import Topbar from "./components/topbar/Topbar";
import Menu from "./components/menu/Menu";
import Intro from "./components/intro/Intro";
import Portfolio from "./components/portfolio/Portfolio";
import About from "./components/about/About";
import Works from "./components/works/Works";
import Contact from "./components/contact/Contact";
import { useState } from "react";

function App() {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <div className="App">
      <Topbar openMenu={openMenu} setOpenMenu={setOpenMenu} />
      <Menu openMenu={openMenu} setOpenMenu={setOpenMenu} />
      <div className="sections">
        <Intro />
        <Portfolio />
        <Works />

        <About />
        <Contact />
      </div>
    </div>
  );
}

export default App;
