import { motion } from 'framer-motion';
import { FaBriefcase, FaGraduationCap } from 'react-icons/fa';
import { experiences } from '../../data/portfolio';
import type { Experience } from '../../data/portfolio';
import './Experience.css';

function TimelineItem({ exp, index }: { exp: Experience; index: number }) {
  const isLeft = index % 2 === 0;
  return (
    <motion.div
      className={`timeline-item ${isLeft ? 'timeline-item--left' : 'timeline-item--right'}`}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: 'easeOut' }}
      id={`experience-item-${exp.id}`}
    >
      {/* Connector dot */}
      <div className="timeline-item__dot">
        {exp.type === 'work'
          ? <FaBriefcase className="timeline-item__dot-icon" />
          : <FaGraduationCap className="timeline-item__dot-icon" />}
      </div>

      <div className="timeline-item__card glass-card">
        <div className="timeline-item__header">
          <span className={`timeline-item__type-badge ${exp.type === 'work' ? 'badge--work' : 'badge--edu'}`}>
            {exp.type === 'work' ? 'Trabajo' : 'Educación'}
          </span>
          <span className="timeline-item__period">{exp.period}</span>
        </div>
        <h3 className="timeline-item__title">{exp.title}</h3>
        <p className="timeline-item__company">{exp.company}</p>
        {Array.isArray(exp.description) ? (
          <ul className="timeline-item__description" style={{ paddingLeft: '1.2rem', margin: '0.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.4rem', listStyleType: 'disc' }}>
            {exp.description.map((item, idx) => (
              <li key={idx} style={{ display: 'list-item' }}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="timeline-item__description">{exp.description}</p>
        )}
        {exp.tags && (
          <div className="timeline-item__tags">
            {exp.tags.map((tag) => (
              <span key={tag} className="badge">{tag}</span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="section experience">
      <div className="section-inner">
        <motion.div
          className="experience__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">Trayectoria</p>
          <h2 className="section-title">
            Experiencia &amp; <span className="gradient-text">Educación</span>
          </h2>
          <p className="section-subtitle">
            El camino que me ha llevado a donde estoy hoy.
          </p>
          <div className="divider" />
        </motion.div>

        <div className="timeline">
          {/* Center line */}
          <div className="timeline__line" aria-hidden="true" />
          {experiences.map((exp, i) => (
            <TimelineItem key={exp.id} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
