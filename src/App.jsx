import { useState } from 'react';
import './App.scss';
import Topbar from './components/topbar/Topbar';
import Menu from './components/menu/Menu';
import Intro from './components/intro/Intro';
import Portfolio from './components/portfolio/Portfolio';
import About from './components/about/About';
import Works from './components/works/Works';
import Contact from './components/contact/Contact';
import ProjectPage from './portfolio/ProjectPage';
import { readProjectRoute } from './portfolio/routing.mjs';
import { publishedSectionDefaults, resolveVisibleSections } from './portfolio/sections.mjs';

const sectionComponents = {
  projects: Portfolio,
  experience: Works,
  about: About,
  contact: Contact,
};

function App() {
  const [openMenu, setOpenMenu] = useState(false);
  const route = readProjectRoute(window.location.pathname);

  if (route.type !== 'home') {
    return <ProjectPage slug={route.type === 'project' ? route.slug : null} />;
  }

  const visibleSections = resolveVisibleSections(publishedSectionDefaults);
  return (
    <div className="App">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Topbar openMenu={openMenu} setOpenMenu={setOpenMenu} />
      <Menu openMenu={openMenu} setOpenMenu={setOpenMenu} />
      <main className="sections" id="main-content">
        <Intro />
        {visibleSections.map((id) => {
          const Section = sectionComponents[id];
          return Section ? <Section key={id} /> : null;
        })}
      </main>
    </div>
  );
}

export default App;
