import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaReact, FaHtml5, FaNodeJs, FaJava, FaGithub, FaDocker,
} from 'react-icons/fa';
import {
  SiTypescript, SiJavascript, SiSpring, SiMysql,
  SiPostgresql, SiMongodb, SiApachemaven,
} from 'react-icons/si';
import { TbApi } from 'react-icons/tb';
import { skills } from '../../data/portfolio';
import type { Skill } from '../../data/portfolio';
import './Skills.css';

// Icon resolver
const IconMap: Record<string, React.ElementType> = {
  FaReact, FaHtml5, FaNodeJs, FaJava, FaGithub, FaDocker,
  SiTypescript, SiJavascript, SiSpring, SiMysql,
  SiPostgresql, SiMongodb, SiApachemaven, TbApi,
};

const CATEGORIES = [
  { key: 'all', label: 'Todas' },
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend', label: 'Backend' },
  { key: 'frameworks', label: 'Frameworks' },
  { key: 'database', label: 'Base de datos' },
  { key: 'tools', label: 'Herramientas' },
] as const;

type CategoryKey = typeof CATEGORIES[number]['key'];

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const Icon = IconMap[skill.icon] || FaReact;
  return (
    <motion.div
      className="skill-card glass-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: 'easeOut' as const }}
      whileHover={{ y: -6 }}
      layout
    >
      <div className="skill-card__icon-wrap">
        {skill.icon.endsWith('.svg') ? (
          <img src={skill.icon} alt={skill.name} className="skill-card__icon-img" />
        ) : (
          <Icon className="skill-card__icon" />
        )}
      </div>
      <span className="skill-card__name">{skill.name}</span>
    </motion.div>
  );
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('all');

  const filtered = activeCategory === 'all'
    ? skills
    : skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="section skills">
      <div className="skills__bg-accent" aria-hidden="true" />
      <div className="section-inner">
        <motion.div
          className="skills__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">Tecnologías</p>
          <h2 className="section-title">
            Mi <span className="gradient-text">stack técnico</span>
          </h2>
          <p className="section-subtitle">
            Herramientas y tecnologías con las que construyo soluciones reales.
          </p>
          <div className="divider" />
        </motion.div>

        {/* Filter pills */}
        <div className="skills__filters" role="tablist">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              role="tab"
              aria-selected={activeCategory === cat.key}
              className={`skills__filter-btn ${activeCategory === cat.key ? 'skills__filter-btn--active' : ''}`}
              onClick={() => setActiveCategory(cat.key)}
              id={`skills-filter-${cat.key}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div className="skills__grid" layout>
          {filtered.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
