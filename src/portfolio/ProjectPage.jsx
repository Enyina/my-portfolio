import { getPublicProject } from './projects.mjs';
import './project-page.css';

export default function ProjectPage({ slug }) {
  const project = getPublicProject(slug);

  if (!project) {
    return (
      <main className="project-page">
        <a className="project-page__back" href="/#portfolio">← Back to portfolio</a>
        <h1>Project not found</h1>
        <p>This project might have been unpublished or the link may be incorrect.</p>
      </main>
    );
  }

  return (
    <main className="project-page" id="main-content">
      <a className="project-page__back" href="/#portfolio">← Back to portfolio</a>
      <article>
        <p className="project-page__eyebrow">Selected work</p>
        <h1>{project.title}</h1>
        <p>{project.summary}</p>
        {project.imageSrc && (
          <img
            className="project-page__image"
            src={project.imageSrc}
            alt={project.imageAlt || project.title}
            width="1200"
            height="750"
          />
        )}
        {project.repositoryUrl && (
          <p><a className="project-page__link" href={project.repositoryUrl} target="_blank" rel="noopener noreferrer">View source code ↗</a></p>
        )}
      </article>
    </main>
  );
}
