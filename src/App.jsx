import { useState } from 'react';
import './App.scss';
import Topbar from './components/topbar/Topbar';
import Menu from './components/menu/Menu';
import Intro from './components/intro/Intro';
import Portfolio from './components/portfolio/Portfolio';
import About from './components/about/About';
import Works from './components/works/Works';
import Contact from './components/contact/Contact';
import { publishedSectionDefaults, resolveVisibleSections } from './portfolio/sections.mjs';

// Existing React components and their styling stay intact until the
// authoritative desktop/mobile design files are available.
const sectionComponents = {
  projects: Portfolio,
  experience: Works,
  about: About,
  contact: Contact,
};

function App() {
  const [openMenu, setOpenMenu] = useState(false);
  const visibleSections = resolveVisibleSections(publishedSectionDefaults);

  return (
    <div className="App">
      <Topbar openMenu={openMenu} setOpenMenu={setOpenMenu} />
      <Menu openMenu={openMenu} setOpenMenu={setOpenMenu} />
      <div className="sections">
        <Intro />
        {visibleSections.map((id) => {
          const Section = sectionComponents[id];
          return Section ? <Section key={id} /> : null;
        })}
      </div>
    </div>
  );
}

export default App;
