import { useState } from 'react';
import './portfolio.scss';
import { listPublicProjects, publishedProjects } from '../../portfolio/projects.mjs';

const categories = [
  { id: 'web', label: 'Web apps' },
  { id: 'featured', label: 'Featured' },
];

export default function Portfolio() {
  const [selected, setSelected] = useState('web');
  const projects = listPublicProjects(publishedProjects, selected);

  return (
    <section className="portfolio" id="portfolio" aria-labelledby="portfolio-title">
      <h1 id="portfolio-title">Portfolio</h1>
      <div className="portfolio__filters" role="tablist" aria-label="Filter projects">
        {categories.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={selected === id}
            aria-controls="portfolio-items"
            className={selected === id ? 'portfolio__filter active' : 'portfolio__filter'}
            onClick={() => setSelected(id)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="container" id="portfolio-items" role="tabpanel">
        {projects.length === 0 && <p>No published projects in this category yet.</p>}
        {projects.map((project) => (
          <a className="item" href={`/project/${project.slug}`} key={project.slug} aria-label={`View ${project.title} project details`}>
            {project.imageSrc && (
              <img src={project.imageSrc} alt={project.imageAlt || project.title} loading="lazy" />
            )}
            <span className="portfolio__item-title">{project.title}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
