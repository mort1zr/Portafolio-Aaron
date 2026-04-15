import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { projects } from '../../data/portfolio';
import type { Project } from '../../data/portfolio';
import './Projects.css';

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      className={`project-card glass-card ${project.featured ? 'project-card--featured' : ''}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      whileHover={{ y: -8 }}
      id={`project-card-${project.id}`}
    >
      {/* Header accent */}
      <div className="project-card__accent" aria-hidden="true" />

      <div className="project-card__number">
        {String(project.id).padStart(2, '0')}
      </div>

      <h3 className="project-card__title">{project.title}</h3>
      <p className="project-card__description">{project.description}</p>

      <div className="project-card__tags">
        {project.tags.map((tag) => (
          <span key={tag} className="badge">{tag}</span>
        ))}
      </div>

      <div className="project-card__links">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card__link"
            aria-label="Ver en GitHub"
            id={`project-${project.id}-github`}
          >
            <FaGithub />
            <span>Código</span>
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card__link project-card__link--live"
            aria-label="Ver demo en vivo"
            id={`project-${project.id}-live`}
          >
            <FaExternalLinkAlt />
            <span>Visitar</span>
          </a>
        )}
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section projects">
      <div className="projects__bg" aria-hidden="true" />
      <div className="section-inner">
        <motion.div
          className="projects__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">Proyectos</p>
          <h2 className="section-title">
            Trabajo <span className="gradient-text">destacado</span>
          </h2>
          <p className="section-subtitle">
            Proyectos que demuestran mi capacidad para construir soluciones reales y escalables.
          </p>
          <div className="divider" />
        </motion.div>

        <div className="projects__grid">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
